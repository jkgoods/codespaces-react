import fs from 'fs';
import path from 'path';

// Target files
const ANALYSIS_JSON_PATH = path.resolve('src/analysisData.json');

async function run() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error('⚠️ GEMINI_API_KEY 환경 변수가 설정되어 있지 않습니다.');
    process.exit(1);
  }

  console.log('⚽ 월드컵 매치 정보 가져오는 중...');
  const res = await fetch('https://worldcup26.ir/get/games');
  if (!res.ok) {
    throw new Error('월드컵 API 호출 실패');
  }
  const data = await res.json();
  const games = data.games || [];

  // 현재 시간 기준 내일(48시간 이내) 경기 필터링
  const now = new Date();
  const upcomingGames = games.filter(g => {
    // API 날짜 형식 파싱 (MM/DD/YYYY HH:MM)
    try {
      const [datePart, timePart] = g.local_date.split(' ');
      const [month, day, year] = datePart.split('/');
      const [hours, minutes] = timePart.split(':');
      const gameDate = new Date(year, month - 1, day, hours, minutes);
      
      const diffTime = gameDate - now;
      const diffHours = diffTime / (1000 * 60 * 60);
      
      // 48시간 이내에 시작되는 예정된 경기
      return diffHours > 0 && diffHours <= 48 && g.finished === 'FALSE';
    } catch (e) {
      return false;
    }
  });

  if (upcomingGames.length === 0) {
    console.log('✅ 48시간 이내에 새로 진행될 예정된 경리가 없습니다.');
    return;
  }

  // 기존 분석 데이터 파일 읽기
  let analysisData = {};
  if (fs.existsSync(ANALYSIS_JSON_PATH)) {
    analysisData = JSON.parse(fs.readFileSync(ANALYSIS_JSON_PATH, 'utf8'));
  }

  console.log(`🤖 총 ${upcomingGames.length}개의 예정된 경기 발견. AI 분석 생성을 시작합니다.`);

  for (const game of upcomingGames) {
    const gameId = game.id;
    
    // 이미 분석 데이터가 있으면 생략
    if (analysisData[gameId]) {
      console.log(`➡️ [Match #${gameId}] ${game.home_team_name_en} vs ${game.away_team_name_en} - 이미 분석이 존재하므로 스킵합니다.`);
      continue;
    }

    console.log(`🌀 [Match #${gameId}] ${game.home_team_name_en} vs ${game.away_team_name_en} AI 분석 데이터 생성 중...`);
    
    const prompt = `
당신은 전세계 축구 통계 및 전력을 정밀 예측하는 축구 전문 AI 분석가입니다.
2026 FIFA 북중미 월드컵 조별리그 [${game.home_team_name_en}] 대 [${game.away_team_name_en}] 경기에 대한 정밀 분석 데이터를 작성해야 합니다.

아래 템플릿에 맞추어 완전한 JSON 형식으로만 응답해 주세요. 마크다운 백틱(\`\`\`json) 등 텍스트 포맷 없이 순수한 JSON 텍스트 자체만 반환해야 합니다. 한국어로 친절하고 전문적으로 작성해 주세요.

{
  "matchupName": "${game.home_team_name_en} vs ${game.away_team_name_en}",
  "stadiumInfo": "예정된 경기 - Stadium #${game.stadium_id}",
  "winRate": { "teamA": [홈팀 승리 확률 %, 예: 45], "draw": [무승부 확률 %, 예: 30], "teamB": [원정팀 승리 확률 %, 예: 25] },
  "teamAInfo": "FIFA 랭킹 및 홈팀 간략 요약 (예: FIFA 랭킹: 15위)",
  "teamBInfo": "FIFA 랭킹 및 원정팀 간략 요약 (예: FIFA 랭킹: 38위)",
  "recentForm": {
    "teamA": ["win", "win", "draw", "loss", "win"],
    "teamB": ["loss", "draw", "win", "loss", "draw"]
  },
  "recentFormDesc": {
    "teamA": "홈팀의 최근 5경기 흐름 및 전력 1~2문장 요약",
    "teamB": "원정팀의 최근 5경기 흐름 및 전력 1~2문장 요약"
  },
  "tactics": {
    "teamA": "홈팀의 예상 포메이션(예: 4-3-3) 및 경기 운영 전략 2문장 내외",
    "teamB": "원정팀의 예상 포메이션(예: 5-4-1) 및 경기 운영 전략 2문장 내외"
  },
  "keyMatchups": [
    {
      "playerA": "홈팀 키 플레이어 이름 (포지션)",
      "teamA": "홈팀 키 플레이어의 소속팀",
      "playerB": "원정팀 키 플레이어 이름 (포지션)",
      "teamB": "원정팀 키 플레이어의 소속팀",
      "desc": "두 선수의 매치업이 경기에 미칠 영향 및 핵심 포인트 2문장 내외"
    },
    {
      "playerA": "홈팀 세컨드 키 플레이어 이름 (포지션)",
      "teamA": "소속팀",
      "playerB": "원정팀 세컨드 키 플레이어 이름 (포지션)",
      "teamB": "소속팀",
      "desc": "두 플레이어의 맞대결 및 공수 핵심 대결 구도 설명 2문장 내외"
    }
  ],
  "verdict": {
    "predictedScore": "예상 스코어: [홈팀] [골수] - [골수] [원정팀] [승리팀 또는 무승부 예측]",
    "desc": "경기 전반에 대한 최종 스코어 예측 시나리오 및 전술적 대인 관계를 종합한 3~4문장 분석"
  }
}
`;

    try {
      const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
      const response = await fetch(geminiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          contents: [{
            parts: [{ text: prompt }]
          }]
        })
      });

      if (!response.ok) {
        throw new Error(`Gemini API 호출 에러: ${response.statusText}`);
      }

      const geminiData = await response.json();
      const rawText = geminiData.candidates[0].content.parts[0].text;
      
      // JSON 클렌징 (백틱 마크다운 기호 제거)
      const cleanJsonStr = rawText
        .replace(/```json/g, '')
        .replace(/```/g, '')
        .trim();

      const parsedAnalysis = JSON.parse(cleanJsonStr);
      
      // 데이터 누적
      analysisData[gameId] = parsedAnalysis;
      console.log(`✅ [Match #${gameId}] 분석 생성 완료!`);

      // API 호출 제한 방지용 딜레이 (무료 티어 초당 호출수 제한 완화)
      await new Promise(resolve => setTimeout(resolve, 3000));
      
    } catch (e) {
      console.error(`❌ [Match #${gameId}] 분석 생성 중 에러 발생:`, e.message);
    }
  }

  // 변경된 데이터 저장
  fs.writeFileSync(ANALYSIS_JSON_PATH, JSON.stringify(analysisData, null, 2), 'utf8');
  console.log('🎉 모든 매치 분석 데이터 업데이트 완료!');
}

run().catch(console.error);
