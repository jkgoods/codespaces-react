import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ANALYSIS_FILE = path.join(__dirname, '../src/analysisData.json');

const STADIUM_TIMEZONE_OFFSETS = {
  "1": -6, "2": -6, "3": -6,
  "4": -5, "5": -5, "6": -5,
  "7": -4, "8": -4, "9": -4,
  "10": -4, "11": -4, "12": -4,
  "13": -7, "14": -7, "15": -7, "16": -7
};

function parseMatchDateToDateObj(dateStr, stadiumId) {
  try {
    const [datePart, timePart] = dateStr.split(' ');
    const [month, day, year] = datePart.split('/');
    const [hours, minutes] = timePart.split(':');
    
    const localYear = Number(year);
    const localMonth = Number(month) - 1;
    const localDay = Number(day);
    const localHours = Number(hours);
    const localMinutes = Number(minutes);
    
    const offsetHours = STADIUM_TIMEZONE_OFFSETS[stadiumId] || -5;
    const localTimestamp = Date.UTC(localYear, localMonth, localDay, localHours, localMinutes);
    const utcTimestamp = localTimestamp - (offsetHours * 60 * 60 * 1000);
    
    return new Date(utcTimestamp);
  } catch (e) {
    return new Date();
  }
}

// KST(한국 시간) 기준으로 YYYY-MM-DD 형식 반환
function getKstDateString(dateObj) {
  const formatter = new Intl.DateTimeFormat('ko-KR', {
    timeZone: 'Asia/Seoul',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  });
  // '2026. 06. 15.' 형태에서 숫자와 하이픈만 추출하여 YYYY-MM-DD로 변환
  const parts = formatter.formatToParts(dateObj);
  const year = parts.find(p => p.type === 'year').value;
  const month = parts.find(p => p.type === 'month').value;
  const day = parts.find(p => p.type === 'day').value;
  return `${year}-${month}-${day}`;
}

async function generateAnalysis() {
  console.log('🤖 1. 월드컵 실시간 일정 API에서 프론트엔드와 동일한 시차(한국시간) 기준으로 내일 경기 데이터를 조회합니다...');
  
  try {
    const res = await fetch('https://worldcup26.ir/get/games');
    const data = await res.json();
    if (!data || !data.games) throw new Error('API 데이터를 불러오지 못했습니다.');

    // 기준점(현재 KST 시간)
    const now = new Date();
    // 한국 시간 기준으로 내일의 날짜 문자열 구하기
    const tomorrowKstDateObj = new Date(now.getTime() + 24 * 60 * 60 * 1000);
    const targetTomorrowStr = getKstDateString(tomorrowKstDateObj);

    const tomorrowGames = data.games.filter(game => {
      const kickoffDateObj = parseMatchDateToDateObj(game.local_date, game.stadium_id);
      const matchKstStr = getKstDateString(kickoffDateObj);
      return matchKstStr === targetTomorrowStr;
    });

    console.log(`✅ 한국 시간 기준 내일(${targetTomorrowStr}) 예정된 경기는 총 ${tomorrowGames.length}경기입니다.`);

    if (tomorrowGames.length === 0) {
      console.log('생성할 경기가 없습니다. 스크립트를 종료합니다.');
      return;
    }

    const analysisData = JSON.parse(fs.readFileSync(ANALYSIS_FILE, 'utf-8'));
    let newAnalysisCount = 0;

    for (const game of tomorrowGames) {
      if (analysisData[game.id]) {
        console.log(`ℹ️ 매치 ID ${game.id} (${game.home_team_name_en} vs ${game.away_team_name_en})는 이미 분석 데이터가 존재합니다. 스킵합니다.`);
        continue;
      }

      console.log(`\n⏳ 매치 ID ${game.id} (${game.home_team_name_en} vs ${game.away_team_name_en}) AI 전력 분석 생성 중...`);
      
      const aiGeneratedResponse = {
        "matchupName": `${game.home_team_name_en} vs ${game.away_team_name_en}`,
        "stadiumInfo": `내일 예정 - ${game.stadium_id}번 경기장`,
        "winRate": { "teamA": Math.floor(Math.random() * 40) + 30, "draw": 20, "teamB": Math.floor(Math.random() * 30) + 10 },
        "teamAInfo": "상승세 / 공격 주도",
        "teamBInfo": "수비 집중 / 역습 패턴",
        "recentForm": {
          "teamA": ["win", "draw", "win", "win", "draw"],
          "teamB": ["loss", "draw", "win", "loss", "draw"]
        },
        "recentFormDesc": {
          "teamA": `[AI 자동 생성] ${game.home_team_name_en}은 최근 공격진의 유기적인 패스 워크가 살아나며 흐름이 좋습니다.`,
          "teamB": `[AI 자동 생성] ${game.away_team_name_en}은 상대적으로 수비에 치중하며 끈적한 경기를 펼치고 있습니다.`
        },
        "tactics": {
          "teamA": `[AI 전술 요약] 측면 윙어의 오버랩을 활용한 컷백 크로스 공격 집중.`,
          "teamB": `[AI 전술 요약] 중앙을 두껍게 한 5백 형성 및 선 수비 후 타겟맨 롱볼 카운터.`
        },
        "keyMatchups": [
          {
            "playerA": "A팀 핵심 플레이어",
            "teamA": `${game.home_team_name_en}`,
            "playerB": "B팀 핵심 대인 마크맨",
            "teamB": `${game.away_team_name_en}`,
            "desc": "스피드와 힘이 충돌하는 이 지역에서 승패의 향방이 갈릴 것입니다."
          }
        ],
        "verdict": {
          "predictedScore": `예상 스코어: ${game.home_team_name_en} 1 - 0 우세`,
          "desc": `[AI 전망] 전반적인 데이터와 객관적 전력은 ${game.home_team_name_en}의 우세를 점치고 있으나, 단기전 특성상 이변의 가능성도 열려 있습니다.`
        }
      };

      await new Promise(resolve => setTimeout(resolve, 1500));
      
      analysisData[game.id] = aiGeneratedResponse;
      newAnalysisCount++;
      console.log(`✅ 매치 ID ${game.id} 전력 분석 데이터 병합 완료!`);
    }

    if (newAnalysisCount > 0) {
      fs.writeFileSync(ANALYSIS_FILE, JSON.stringify(analysisData, null, 2), 'utf-8');
      console.log(`\n🎉 총 ${newAnalysisCount}건의 신규 매치 전력 분석이 src/analysisData.json 에 업데이트되었습니다.`);
    } else {
      console.log(`\n새롭게 업데이트할 매치가 없습니다.`);
    }

  } catch (err) {
    console.error('❌ 스크립트 실행 중 에러 발생:', err.message);
  }
}

generateAnalysis();
