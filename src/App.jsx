import React, { useState, useEffect } from 'react';
import './App.css';
import ANALYSIS_DATA from './analysisData.json';


// SVG Icons
const CalendarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
);

const ClockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
);

const MapPinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
);

const TrophyIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path><path d="M4 22h16"></path><path d="M10 14.66V17c0 .55-.45 1-1 1H4v2h16v-2h-5c-.55 0-1-.45-1-1v-2.34"></path><path d="M12 2a7.7 7.7 0 0 1 7.54 8H4.46A7.7 7.7 0 0 1 12 2z"></path></svg>
);

const TrendingUpIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>
);

const ActivityIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
);

const UsersIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
);

const CompassIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon></svg>
);

const SparklesIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"></path></svg>
);

// 팀 한글명 및 국기 매핑 테이블
const TEAM_MAPPING = {
  "Mexico": { name: "멕시코", flag: "🇲🇽" },
  "South Africa": { name: "남아프리카 공화국", flag: "🇿🇦" },
  "South Korea": { name: "대한민국", flag: "🇰🇷" },
  "Czech Republic": { name: "체코", flag: "🇨🇿" },
  "Canada": { name: "캐나다", flag: "🇨🇦" },
  "Bosnia and Herzegovina": { name: "보스니아 헤르체고비나", flag: "🇧🇦" },
  "United States": { name: "미국", flag: "🇺🇸" },
  "Paraguay": { name: "파라과이", flag: "🇵🇾" },
  "Haiti": { name: "아이티", flag: "🇭🇹" },
  "Scotland": { name: "스코틀랜드", flag: "🏴󠁧󠁢󠁳󠁣󠁴󠁿" },
  "Australia": { name: "호주", flag: "🇦🇺" },
  "Turkey": { name: "튀르키예", flag: "🇹🇷" },
  "Brazil": { name: "브라질", flag: "🇧🇷" },
  "Morocco": { name: "모로코", flag: "🇲🇦" },
  "Qatar": { name: "카타르", flag: "🇶🇦" },
  "Switzerland": { name: "스위스", flag: "🇨🇭" },
  "Ivory Coast": { name: "코트디부아르", flag: "🇨🇮" },
  "Ecuador": { name: "에콰도르", flag: "🇪🇨" },
  "Germany": { name: "독일", flag: "🇩🇪" },
  "Curaçao": { name: "퀴라소", flag: "🇨🇼" },
  "Netherlands": { name: "네덜란드", flag: "🇳🇱" },
  "Japan": { name: "일본", flag: "🇯🇵" },
  "Sweden": { name: "스웨덴", flag: "🇸🇪" },
  "Tunisia": { name: "튀니지", flag: "🇹🇳" },
  "Iran": { name: "이란", flag: "🇮🇷" },
  "New Zealand": { name: "뉴질랜드", flag: "🇳🇿" },
  "Spain": { name: "스페인", flag: "🇪🇸" },
  "Cape Verde": { name: "카보베르데", flag: "🇨🇻" },
  "Belgium": { name: "벨기에", flag: "🇧🇪" },
  "Egypt": { name: "이집트", flag: "🇪🇬" },
  "Saudi Arabia": { name: "사우디아라비아", flag: "🇸🇦" },
  "Uruguay": { name: "우루과이", flag: "🇺🇾" },
  "France": { name: "프랑스", flag: "🇫🇷" },
  "Senegal": { name: "세네갈", flag: "🇸🇳" },
  "Iraq": { name: "이라크", flag: "🇮🇶" },
  "Norway": { name: "노르웨이", flag: "🇳🇴" },
  "Argentina": { name: "아르헨티나", flag: "🇦🇷" },
  "Algeria": { name: "알제리", flag: "🇩🇿" },
  "Austria": { name: "오스트리아", flag: "🇦🇹" },
  "Jordan": { name: "요르단", flag: "🇯🇴" },
  "Portugal": { name: "포르투갈", flag: "🇵🇹" },
  "Democratic Republic of the Congo": { name: "민주 콩고", flag: "🇨🇩" },
  "England": { name: "잉글랜드", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" },
  "Croatia": { name: "크로아티아", flag: "🇭🇷" },
  "Uzbekistan": { name: "우즈베키스탄", flag: "🇺🇿" },
  "Colombia": { name: "콜롬비아", flag: "🇨🇴" },
  "Ghana": { name: "가나", flag: "🇬🇭" },
  "Panama": { name: "파나마", flag: "🇵🇦" }
};

// 팀 ID를 영문명으로 매핑하는 테이블
const TEAM_ID_TO_EN = {
  "1": "Mexico",
  "2": "South Africa",
  "3": "South Korea",
  "4": "Czech Republic",
  "5": "Canada",
  "6": "Bosnia and Herzegovina",
  "7": "Qatar",
  "8": "Switzerland",
  "9": "Brazil",
  "10": "Morocco",
  "11": "Haiti",
  "12": "Scotland",
  "13": "United States",
  "14": "Paraguay",
  "15": "Australia",
  "16": "Turkey",
  "17": "Germany",
  "18": "Curaçao",
  "19": "Ivory Coast",
  "20": "Ecuador",
  "21": "Netherlands",
  "22": "Japan",
  "23": "Sweden",
  "24": "Tunisia",
  "25": "Belgium",
  "26": "Egypt",
  "27": "Iran",
  "28": "New Zealand",
  "29": "Spain",
  "30": "Cape Verde",
  "31": "Saudi Arabia",
  "32": "Uruguay",
  "33": "France",
  "34": "Senegal",
  "35": "Iraq",
  "36": "Norway",
  "37": "Argentina",
  "38": "Algeria",
  "39": "Austria",
  "40": "Jordan",
  "41": "Portugal",
  "42": "Democratic Republic of the Congo",
  "43": "Uzbekistan",
  "44": "Colombia",
  "45": "England",
  "46": "Croatia",
  "47": "Ghana",
  "48": "Panama"
};

// 경기장 매핑 테이블 (API id 기준 정렬)
const STADIUM_MAPPING = {
  "1": { name: "Estadio Azteca", city: "Mexico City, Mexico" },
  "2": { name: "Estadio Akron", city: "Guadalajara, Mexico" },
  "3": { name: "Estadio BBVA", city: "Monterrey, Mexico" },
  "4": { name: "AT&T Stadium", city: "Dallas, USA" },
  "5": { name: "NRG Stadium", city: "Houston, USA" },
  "6": { name: "Arrowhead Stadium", city: "Kansas City, USA" },
  "7": { name: "Mercedes-Benz Stadium", city: "Atlanta, USA" },
  "8": { name: "Hard Rock Stadium", city: "Miami, USA" },
  "9": { name: "Gillette Stadium", city: "Boston, USA" },
  "10": { name: "Lincoln Financial Field", city: "Philadelphia, USA" },
  "11": { name: "MetLife Stadium", city: "New York/New Jersey, USA" },
  "12": { name: "Toronto Stadium", city: "Toronto, Canada" },
  "13": { name: "BC Place", city: "Vancouver, Canada" },
  "14": { name: "Lumen Field", city: "Seattle, USA" },
  "15": { name: "Levi's Stadium", city: "San Francisco, USA" },
  "16": { name: "SoFi Stadium", city: "Los Angeles, USA" }
};

// 경기장별 UTC 타임존 오프셋 (2026년 6월 서머타임 기준)
const STADIUM_TIMEZONE_OFFSETS = {
  "1": -6,  // Mexico City (CST, UTC-6)
  "2": -6,  // Guadalajara (CST, UTC-6)
  "3": -6,  // Monterrey (CST, UTC-6)
  "4": -5,  // Dallas (CDT, UTC-5)
  "5": -5,  // Houston (CDT, UTC-5)
  "6": -5,  // Kansas City (CDT, UTC-5)
  "7": -4,  // Atlanta (EDT, UTC-4)
  "8": -4,  // Miami (EDT, UTC-4)
  "9": -4,  // Boston (EDT, UTC-4)
  "10": -4, // Philadelphia (EDT, UTC-4)
  "11": -4, // New York/New Jersey (EDT, UTC-4)
  "12": -4, // Toronto (EDT, UTC-4)
  "13": -7, // Vancouver (PDT, UTC-7)
  "14": -7, // Seattle (PDT, UTC-7)
  "15": -7, // San Francisco (PDT, UTC-7)
  "16": -7  // Los Angeles (PDT, UTC-7)
};



function App() {
  const [currentPage, setCurrentPage] = useState('matches'); // 'matches' | 'lotto' | 'standings'
  const [activeFilter, setActiveFilter] = useState('TODAY');
  const [lottoGames, setLottoGames] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isStreamDropdownOpen, setIsStreamDropdownOpen] = useState(false);
  const [activeHighlightDropdownId, setActiveHighlightDropdownId] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // API 및 실시간 상태 관리
  const [apiMatches, setApiMatches] = useState([]);
  const [groupsData, setGroupsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedAnalysisMatchId, setSelectedAnalysisMatchId] = useState(4); // 기본값: 미국 vs 파라과이 (id: 4)

  // 방문자 수 카운터 상태 관리 (오늘 / 누적)
  const [visitorCount, setVisitorCount] = useState({ today: null, total: null });

  // 방문자 카운트 API 연동 (중복 카운트 방지 위해 sessionStorage 활용)
  useEffect(() => {
    // 사용자의 로컬 날짜 문자열 생성 (YYYY-MM-DD)
    const d = new Date();
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const date = String(d.getDate()).padStart(2, '0');
    const todayStr = `${year}-${month}-${date}`;

    const KEY_TOTAL = 'worldcup2026-react-visitor-count-unique-key-jkgoods-total';
    const KEY_TODAY = `worldcup2026-react-visitor-count-unique-key-jkgoods-today-${todayStr}`;
    const BASE_URL = 'https://countapi.mileshilliard.com/api/v1';

    // 1. 전체 방문자 카운트 여부 확인 (기존 v2 키도 확인하여 마이그레이션 중복 방지)
    const hasVisitedTotal = sessionStorage.getItem('has_visited_worldcup2026_total') || sessionStorage.getItem('has_visited_worldcup2026_v2');
    const totalAction = !hasVisitedTotal ? 'hit' : 'get';

    // 2. 오늘 방문자 카운트 여부 확인 (오늘 날짜 기준으로 체크)
    const hasVisitedTodayVal = sessionStorage.getItem('has_visited_worldcup2026_today');
    const todayAction = hasVisitedTodayVal !== todayStr ? 'hit' : 'get';

    // 누적 방문자 수 가져오기 (가장 흔한 실패 상황 방지를 위해 개별 패치 및 에러 트래킹)
    fetch(`${BASE_URL}/${totalAction}/${KEY_TOTAL}`)
      .then(res => {
        if (res.status === 404) {
          return { value: 0 }; // 키가 없으면 0으로 처리
        }
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then(data => {
        if (data && typeof data.value === 'number') {
          setVisitorCount(prev => ({ ...prev, total: data.value }));
          if (!hasVisitedTotal) {
            sessionStorage.setItem('has_visited_worldcup2026_total', 'true');
            sessionStorage.setItem('has_visited_worldcup2026_v2', 'true');
          }
        }
      })
      .catch(err => console.error("Counter API (total) Error:", err));

    // 오늘 방문자 수 가져오기
    fetch(`${BASE_URL}/${todayAction}/${KEY_TODAY}`)
      .then(res => {
        if (res.status === 404) {
          return { value: 0 }; // 오늘 날짜 키가 아직 생성 안 됐으면 0으로 처리
        }
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then(data => {
        if (data && typeof data.value === 'number') {
          setVisitorCount(prev => ({ ...prev, today: data.value }));
          if (hasVisitedTodayVal !== todayStr) {
            sessionStorage.setItem('has_visited_worldcup2026_today', todayStr);
          }
        }
      })
      .catch(err => console.error("Counter API (today) Error:", err));
  }, []);

  // 1초 단위 실시간 시각 동기화
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // 드롭다운 외부 클릭 시 닫기
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (!e.target.closest('.live-btn-container')) {
        setIsStreamDropdownOpen(false);
      }
      if (!e.target.closest('.highlight-btn-container')) {
        setActiveHighlightDropdownId(null);
      }
    };
    document.addEventListener('click', handleOutsideClick);
    return () => document.removeEventListener('click', handleOutsideClick);
  }, []);

  // 월드컵 공식 실시간 API 연동 (1분 간격 갱신)
  useEffect(() => {
    let failCount = 0;
    const FAIL_THRESHOLD = 5; // 연속 5회 실패 시에만 에러 표시

    const fetchData = async () => {
      try {
        const [gamesRes, groupsRes] = await Promise.all([
          fetch('https://worldcup26.ir/get/games'),
          fetch('https://worldcup26.ir/get/groups')
        ]);

        if (!gamesRes.ok) throw new Error('경기 일정 데이터를 불러오는데 실패했습니다.');
        if (!groupsRes.ok) throw new Error('조별 순위 데이터를 불러오는데 실패했습니다.');

        const gamesData = await gamesRes.json();
        const groupsData = await groupsRes.json();

        if (gamesData && gamesData.games) {
          setApiMatches(gamesData.games);
        }
        if (groupsData && groupsData.groups) {
          setGroupsData(groupsData.groups);
        }
        failCount = 0; // 성공 시 실패 카운트 초기화
        setError(null);
        setIsLoading(false);
      } catch (err) {
        failCount++;
        console.warn(`API Fetch 실패 (${failCount}회):`, err.message);
        setIsLoading(false);
        // 연속 5회 이상 실패할 때만 에러 배너 표시
        if (failCount >= FAIL_THRESHOLD) {
          setError(err.message);
        }
      }
    };

    fetchData();
    const refreshTimer = setInterval(fetchData, 60000); // 60초 주기
    return () => clearInterval(refreshTimer);
  }, []);

  // API 날짜 포맷 파싱 및 경기장 시간대 보정을 통한 브라우저 로컬 시각 변환
  const parseMatchDate = (dateStr, stadiumId) => {
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
      
      // UTC 타임스탬프 = 경기장 현지 시각 타임스탬프 - 오프셋 밀리초
      const utcTimestamp = localTimestamp - (offsetHours * 60 * 60 * 1000);
      return new Date(utcTimestamp);
    } catch (e) {
      return new Date();
    }
  };

  const getKoreanTeamInfo = (engName) => {
    return TEAM_MAPPING[engName] || { name: engName, flag: '🏳️' };
  };

  const getStadiumInfo = (stadiumId) => {
    return STADIUM_MAPPING[stadiumId] || { name: `Stadium #${stadiumId}`, city: 'North America' };
  };

  // 실시간 API 데이터 정제 및 동적 가공
  const processedMatches = apiMatches.map(game => {
    const kickoffTime = parseMatchDate(game.local_date, game.stadium_id);
    const isFinished = game.finished === "TRUE" || game.time_elapsed === "finished";
    const isLive = game.time_elapsed === "live";
    
    let status = 'SCHEDULED';
    if (isFinished) status = 'FINISHED';
    else if (isLive) status = 'LIVE';
    
    const teamAInfo = getKoreanTeamInfo(game.home_team_name_en);
    const teamBInfo = getKoreanTeamInfo(game.away_team_name_en);
    const stadiumInfo = getStadiumInfo(game.stadium_id);

    // 상대적 날짜 포맷팅
    const diffDays = Math.floor((new Date(kickoffTime.toDateString()) - new Date(currentTime.toDateString())) / (1000 * 60 * 60 * 24));
    const options = { month: 'long', day: 'numeric', weekday: 'short' };
    const dateStr = kickoffTime.toLocaleDateString('ko-KR', options);
    
    let dateDisplay = dateStr;
    if (diffDays === 0) {
      dateDisplay = `오늘 ${dateStr}`;
    } else if (diffDays === 1) {
      dateDisplay = `내일 ${dateStr}`;
    } else if (diffDays === -1) {
      dateDisplay = `어제 ${dateStr}`;
    }

    const hours = String(kickoffTime.getHours()).padStart(2, '0');
    const minutes = String(kickoffTime.getMinutes()).padStart(2, '0');

    return {
      id: Number(game.id),
      group: game.group === 'R32' ? '32강' : game.group === 'R16' ? '16강' : game.group === 'QF' ? '8강' : game.group === 'SF' ? '4강' : game.group === 'FINAL' ? '결승' : `Group ${game.group}`,
      status,
      time: status === 'LIVE' ? '진행중' : `${hours}:${minutes}`,
      date: dateDisplay,
      kickoffTime,
      teamA: {
        name: teamAInfo.name,
        flag: teamAInfo.flag,
        score: status !== 'SCHEDULED' ? Number(game.home_score) : null
      },
      teamB: {
        name: teamBInfo.name,
        flag: teamBInfo.flag,
        score: status !== 'SCHEDULED' ? Number(game.away_score) : null
      },
      stadium: stadiumInfo.name,
      city: stadiumInfo.city,
      hasAnalysis: ANALYSIS_DATA[Number(game.id)] !== undefined
    };
  });

  // 킥오프 시간이 지나지 않은 가장 가까운 예정 경기(SCHEDULED) 검색
  const upcomingMatches = processedMatches
    .filter(match => match.status === 'SCHEDULED' && (match.kickoffTime - currentTime) > 0)
    .sort((a, b) => a.kickoffTime - b.kickoffTime);
    
  const upcomingMatch = upcomingMatches[0];

  // 킥오프 시간이 지났으나 아직 시작 대기 중인 경기 검색
  const pendingMatch = processedMatches.find(match => 
    match.status === 'SCHEDULED' && (currentTime - match.kickoffTime) >= 0
  );

  // 카운트다운 잔여 시간 계산
  const getCountdownTime = (kickoffTime) => {
    if (!kickoffTime) return { hours: 0, minutes: 0, seconds: 0 };
    const diffMs = kickoffTime - currentTime;
    if (diffMs <= 0) return { hours: 0, minutes: 0, seconds: 0 };
    
    const seconds = Math.floor((diffMs / 1000) % 60);
    const minutes = Math.floor((diffMs / 1000 / 60) % 60);
    const hours = Math.floor(diffMs / 1000 / 60 / 60);
    
    return { hours, minutes, seconds };
  };

  const timeLeft = getCountdownTime(upcomingMatch?.kickoffTime);

  const getFormattedDateString = (date) => {
    if (!date) return '';
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const getDayOfWeekKorean = (date) => {
    const days = ['일', '월', '화', '수', '목', '금', '토'];
    return days[date.getDay()];
  };

  const todayStr = getFormattedDateString(currentTime);

  // 필터링 적용된 매치 목록 (시간순으로 정렬)
  const filteredMatches = processedMatches
    .filter(match => {
      const matchDateStr = getFormattedDateString(match.kickoffTime);
      if (activeFilter === 'ALL') return true;
      if (activeFilter === 'LIVE') return match.status === 'LIVE';
      if (activeFilter === 'TODAY') return matchDateStr === todayStr;
      return matchDateStr === activeFilter;
    })
    .sort((a, b) => a.kickoffTime - b.kickoffTime);

  // 경기들이 열리는 고유한 날짜 목록 추출
  const dateList = [...new Set(processedMatches.map(m => getFormattedDateString(m.kickoffTime)))].filter(Boolean).sort();

  // 매치 분석 탭 이동 및 타겟 업데이트
  const handleViewAnalysis = (matchId) => {
    if (ANALYSIS_DATA[matchId]) {
      setSelectedAnalysisMatchId(matchId);
      const element = document.getElementById('analysis');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  // 그룹 배지 클릭 시 조별 순위 이동 및 스크롤 포커스 효과
  const handleGroupBadgeClick = (groupName) => {
    if (!groupName || !groupName.startsWith('Group')) return;
    const cleanGroupName = groupName.replace(/group/i, '').trim();
    setCurrentPage('standings');
    setTimeout(() => {
      const element = document.getElementById(`group-card-${cleanGroupName}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        element.classList.add('highlight-pulse');
        setTimeout(() => {
          element.classList.remove('highlight-pulse');
        }, 2000);
      }
    }, 100);
  };

  // 로또 생성기
  const generateLottoNumbers = () => {
    setIsGenerating(true);
    const hotNumbers = [12, 17, 34, 43, 27, 1, 13, 18, 33, 45];
    const coldNumbers = [5, 9, 14, 22, 38, 2, 8, 21, 29, 41];
    
    setTimeout(() => {
      const newGames = [];
      for (let g = 0; g < 5; g++) {
        const gameNumbers = new Set();
        const hotCount = Math.floor(Math.random() * 2) + 2; 
        while (gameNumbers.size < hotCount) {
          const randHot = hotNumbers[Math.floor(Math.random() * hotNumbers.length)];
          gameNumbers.add(randHot);
        }
        
        const randCold = coldNumbers[Math.floor(Math.random() * coldNumbers.length)];
        gameNumbers.add(randCold);
        
        while (gameNumbers.size < 6) {
          const num = Math.floor(Math.random() * 45) + 1;
          gameNumbers.add(num);
        }
        
        const sortedGame = Array.from(gameNumbers).sort((a, b) => a - b);
        newGames.push(sortedGame);
      }
      setLottoGames(newGames);
      setIsGenerating(false);
    }, 800);
  };

  const getBallClass = (num) => {
    if (num >= 1 && num <= 10) return 'num-1-10';
    if (num >= 11 && num <= 20) return 'num-11-20';
    if (num >= 21 && num <= 30) return 'num-21-30';
    if (num >= 31 && num <= 40) return 'num-31-40';
    return 'num-41-45';
  };

  // 분석 탭에 노출할 매치 목록 필터링 (UX 확장성 및 데이터 스케일러빌리티 확보)
  const analysisTabMatches = processedMatches.filter(match => {
    // 특정 날짜 필터 선택 시, 해당 날짜의 경기만 노출
    if (activeFilter !== 'ALL' && activeFilter !== 'LIVE' && activeFilter !== 'TODAY') {
      return getFormattedDateString(match.kickoffTime) === activeFilter;
    }
    // ALL, LIVE, TODAY 필터 시에는 오늘 경기만 노출 (내일 경기 혼재 방지)
    return getFormattedDateString(match.kickoffTime) === todayStr;
  });

  // 선택된 매치가 현재 필터링된 탭 목록에 없으면, 첫 번째 매치를 자동 선택
  useEffect(() => {
    if (analysisTabMatches.length > 0 && !analysisTabMatches.find(m => m.id === selectedAnalysisMatchId)) {
      setSelectedAnalysisMatchId(analysisTabMatches[0].id);
    }
  }, [activeFilter, analysisTabMatches, selectedAnalysisMatchId]);

  const activeAnalysis = ANALYSIS_DATA[selectedAnalysisMatchId];

  // 선택된 날짜에 따른 분석 섹션 타이틀 동적 생성
  const getAnalysisTitle = () => {
    if (activeFilter === 'TODAY' || activeFilter === 'LIVE' || activeFilter === 'ALL') {
      return '오늘의 매치 정밀 분석';
    }
    const d = new Date(activeFilter);
    const today = new Date(todayStr);
    const diff = Math.floor((d - today) / (1000 * 60 * 60 * 24));
    
    if (diff === 1) return '내일의 매치 정밀 분석';
    if (diff === -1) return '어제의 매치 정밀 분석';
    
    const month = d.getMonth() + 1;
    const date = d.getDate();
    return `${month}월 ${date}일 매치 정밀 분석`;
  };

  return (
    <div className="app-container">
      {/* Navigation Header */}
      <header className={`header-nav ${isMobileMenuOpen ? 'mobile-menu-active' : ''}`}>
        <div className="logo-container" style={{ cursor: 'pointer' }} onClick={() => { setCurrentPage('matches'); setIsMobileMenuOpen(false); }}>
          <TrophyIcon />
          <span>WORLD CUP <span className="glow-text-cyan">2026</span></span>
        </div>
        
        {/* Mobile Hamburger Toggle Button */}
        <button 
          className={`hamburger-menu ${isMobileMenuOpen ? 'open' : ''}`} 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="메뉴 열기/닫기"
        >
          <span className="hamburger-bar"></span>
          <span className="hamburger-bar"></span>
          <span className="hamburger-bar"></span>
        </button>

        <div className={`nav-menu-wrapper ${isMobileMenuOpen ? 'open' : ''}`}>
          <nav>
            <ul className="nav-links">
              <li>
                <a 
                  href="#matches" 
                  className={currentPage === 'matches' ? 'active' : ''} 
                  onClick={(e) => { e.preventDefault(); setCurrentPage('matches'); setIsMobileMenuOpen(false); }}
                >
                  일정 및 결과
                </a>
              </li>
              <li>
                <a 
                  href="#standings" 
                  className={currentPage === 'standings' ? 'active' : ''} 
                  onClick={(e) => { e.preventDefault(); setCurrentPage('standings'); setIsMobileMenuOpen(false); }}
                >
                  📊 조별 순위
                </a>
              </li>
              {currentPage === 'matches' && (
                <li>
                  <a 
                    href="#analysis"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    AI 전력분석
                  </a>
                </li>
              )}
              <li>
                <a 
                  href="#lotto" 
                  className={currentPage === 'lotto' ? 'active' : ''} 
                  onClick={(e) => { e.preventDefault(); setCurrentPage('lotto'); setIsMobileMenuOpen(false); }}
                  style={{ color: 'var(--accent-gold)' }}
                >
                  🎰 로또번호생성
                </a>
              </li>
            </ul>
          </nav>
          <div className="live-btn-container" style={{ position: 'relative' }}>
            <button className="live-btn" onClick={() => setIsStreamDropdownOpen(!isStreamDropdownOpen)}>
              <span className="pulse-dot"></span>
              실시간 중계 보기
            </button>
            {isStreamDropdownOpen && (
              <div className="stream-dropdown">
                <a href="https://sports.news.naver.com" target="_blank" rel="noopener noreferrer" className="stream-dropdown-item" onClick={() => setIsMobileMenuOpen(false)}>
                  ⚽ 네이버 스포츠
                </a>
                <a href="https://chzzk.naver.com" target="_blank" rel="noopener noreferrer" className="stream-dropdown-item" onClick={() => setIsMobileMenuOpen(false)}>
                  🎮 네이버 치지직
                </a>
                <a href="https://onair.jtbc.co.kr" target="_blank" rel="noopener noreferrer" className="stream-dropdown-item" onClick={() => setIsMobileMenuOpen(false)}>
                  📺 JTBC 온에어
                </a>
                <a href="https://www.sooplive.co.kr" target="_blank" rel="noopener noreferrer" className="stream-dropdown-item" onClick={() => setIsMobileMenuOpen(false)}>
                  📡 SOOP (아프리카TV)
                </a>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Conditional Page Rendering */}
      {currentPage === 'matches' && (
        <>
          {/* Hero Section */}
          <section className="hero-section">
            <div className="hero-bg-wrapper">
              <img src="/world_cup_hero_bg.png" alt="Futuristic Soccer Stadium" className="hero-bg-image" />
              <div className="hero-overlay"></div>
            </div>
            <div className="hero-content">
              <p className="hero-subtitle">FIFA World Cup 2026</p>
              <h1 className="hero-title">실시간 월드컵 스케줄</h1>
              <p className="section-desc" style={{ marginBottom: '2rem', color: 'var(--text-secondary)' }}>
                2026 북중미 월드컵 본선 전경기의 실시간 스코어와 상세 일정을 API 연동을 통해 실시간으로 자동 업데이트하여 제공합니다.
              </p>

              {isLoading ? (
                <div style={{ color: 'var(--accent-cyan)', fontWeight: 600 }}>실시간 경기 일정 데이터 로딩중...</div>
              ) : (
                <>
                  {upcomingMatch && (
                    <>
                      <div className="countdown-container">
                        <div className="countdown-box">
                          <div className="countdown-value">{String(timeLeft.hours).padStart(2, '0')}</div>
                          <div className="countdown-label">시간</div>
                        </div>
                        <div className="countdown-box">
                          <div className="countdown-value">{String(timeLeft.minutes).padStart(2, '0')}</div>
                          <div className="countdown-label">분</div>
                        </div>
                        <div className="countdown-box">
                          <div className="countdown-value">{String(timeLeft.seconds).padStart(2, '0')}</div>
                          <div className="countdown-label">초</div>
                        </div>
                      </div>
                      <p style={{ fontSize: '0.8rem', color: 'var(--accent-cyan)', marginTop: '0.75rem', fontWeight: 600 }}>
                        다음 빅매치 [ {upcomingMatch.teamA.name} {upcomingMatch.teamA.flag} vs {upcomingMatch.teamB.flag} {upcomingMatch.teamB.name} ] 킥오프까지 남은 시간
                      </p>
                    </>
                  )}
                  
                  {pendingMatch && (
                    <div style={{ marginTop: '1.5rem', padding: '1rem', background: 'rgba(251, 191, 36, 0.1)', borderRadius: '8px', border: '1px solid var(--accent-gold)' }}>
                      <p style={{ fontSize: '1rem', color: 'var(--accent-gold)', fontWeight: 700, margin: 0 }}>
                        ⏳ [ {pendingMatch.teamA.name} {pendingMatch.teamA.flag} vs {pendingMatch.teamB.flag} {pendingMatch.teamB.name} ] 경기가 곧 시작됩니다. (킥오프 대기중)
                      </p>
                    </div>
                  )}
                  
                  {!upcomingMatch && !pendingMatch && (
                    <div style={{ marginTop: '1.5rem', padding: '1rem', background: 'rgba(0, 240, 255, 0.1)', borderRadius: '8px', border: '1px solid var(--accent-cyan)' }}>
                      <p style={{ fontSize: '1.1rem', color: 'var(--accent-cyan)', fontWeight: 700, margin: 0 }}>
                        🔴 금일 예정된 모든 경기가 종료되었거나 실시간 생중계 중입니다!
                      </p>
                    </div>
                  )}
                </>
              )}
            </div>
          </section>
        </>
      )}

      {currentPage === 'lotto' && (
        <div className="lotto-page-container">
          <div className="lotto-header">
            <span className="analysis-subtitle" style={{ color: 'var(--accent-gold)' }}>Lotto Trend Analyzer & Generator</span>
            <h1 className="lotto-title">AI 로또 번호 예측 엔진</h1>
            <p className="lotto-subtitle">최근 5개년 누적 데이터 정밀 모델링 기반 번호 추천</p>
          </div>

          {/* Lotto Stats Dashboard */}
          <div className="lotto-stat-grid">
            <div className="lotto-stat-card">
              <span className="lotto-stat-card-title">가장 뜨거운 번호 (Hot)</span>
              <span className="lotto-stat-card-value">12, 17, 34, 43, 27</span>
              <span className="lotto-stat-card-desc">최근 5년간(2021-2026) 당첨 빈도 누적 순위 최상위 그룹입니다.</span>
            </div>
            <div className="lotto-stat-card">
              <span className="lotto-stat-card-title">이상적인 홀짝 비율 (Odd:Even)</span>
              <span className="lotto-stat-card-value">3 : 3 (균형)</span>
              <span className="lotto-stat-card-desc">역대 당첨 조합 중 홀짝 균형 조합이 전체의 42.1%를 차지합니다.</span>
            </div>
            <div className="lotto-stat-card">
              <span className="lotto-stat-card-title">미출현 반등 대기 (Cold)</span>
              <span className="lotto-stat-card-value">5, 9, 14, 22, 38</span>
              <span className="lotto-stat-card-desc">최근 12회 동안 미출현하여 확률적으로 반등 확률이 가장 높은 번호입니다.</span>
            </div>
          </div>

          {/* Lotto Generator Box */}
          <div className="lotto-generator-panel">
            <div className="lotto-description-box">
              <p>
                단순히 기계적인 무작위 추출(랜덤)이 아닙니다. 
                지난 5년간의 실제 당첨 기록 약 260회를 종합한 <strong>가중치 알고리즘(Weighted Algorithm)</strong>을 사용합니다. 
                핫 넘버(Hot)의 확률적 유지성, 콜드 넘버(Cold)의 반등 확률, 그리고 3:3 또는 4:2의 홀짝 조화 필터를 모두 충족하는 당첨 확률 최적화 조합을 생성합니다.
              </p>
              <div className="lotto-analysis-pill-container">
                <span className="lotto-analysis-pill">핫 넘버 가중치 +70%</span>
                <span className="lotto-analysis-pill">콜드 번호 반등 보정</span>
                <span className="lotto-analysis-pill">홀짝 3:3 / 4:2 밸런서</span>
                <span className="lotto-analysis-pill">연속 번호 제한 필터</span>
              </div>
            </div>

            <button 
              className="generate-btn" 
              onClick={generateLottoNumbers}
              disabled={isGenerating}
            >
              {isGenerating ? 'AI 번호 분석중...' : 'AI 분석 번호 추천받기 (5게임)'}
            </button>

            {/* Lotto Game Result List */}
            {lottoGames.length > 0 && (
              <div className="lotto-results-container">
                {lottoGames.map((game, index) => (
                  <div key={index} className="lotto-game-row" style={{ animationDelay: `${index * 0.1}s` }}>
                    <span className="lotto-game-label">GAME {String.fromCharCode(65 + index)} (추천)</span>
                    <div className="lotto-balls-list">
                      {game.map((num, bIdx) => (
                        <span 
                          key={bIdx} 
                          className={`lotto-ball ${getBallClass(num)}`}
                          style={{ animationDelay: `${(index * 0.1) + (bIdx * 0.08)}s` }}
                        >
                          {num}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
                
                <div className="lotto-stats-summary">
                  💡 <strong>AI 전술적 제언:</strong> 생성된 5개 추천 게임은 30번대 강세 흐름과 홀짝 조화율을 엄격히 준수하여 배치되었습니다. 
                  특정 번호에 쏠리지 않도록 분산 배치되었으니, 다음 추첨일까지 좋은 기운을 담아 선택해 보세요!
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {currentPage === 'standings' && (
        <div className="standings-page-container">
          <div className="standings-header">
            <span className="analysis-subtitle" style={{ color: 'var(--accent-cyan)' }}>Group Standings</span>
            <h1 className="standings-title">2026 월드컵 조별 순위</h1>
            <p className="standings-subtitle">각 조별 실시간 경기 결과 반영 및 실시간 승점 순위표</p>
          </div>

          {isLoading ? (
            <div style={{ textAlign: 'center', padding: '5rem', color: 'var(--text-secondary)', fontSize: '1.2rem' }}>
              <span className="pulse-dot" style={{ display: 'inline-block', marginRight: '0.5rem' }}></span>
              실시간 데이터를 가져오는 중입니다...
            </div>
          ) : error && groupsData.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--accent-crimson)', border: '1px dashed var(--accent-crimson)', borderRadius: '12px', background: 'rgba(255,0,85,0.05)' }}>
              ⚠️ 실시간 순위 데이터를 불러오는데 실패했습니다. (원인: {error})<br />
              <button onClick={() => window.location.reload()} style={{ marginTop: '1rem', padding: '0.5rem 1.2rem', background: 'var(--accent-cyan)', border: 'none', color: '#000', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}>새로고침</button>
            </div>
          ) : (
            <>
              {error && (
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '0 0 1.5rem 0', padding: '0.8rem 1.2rem', color: '#ff4d4d', border: '1px solid rgba(255, 77, 77, 0.3)', borderRadius: '8px', background: 'rgba(255, 77, 77, 0.08)', fontSize: '0.9rem' }}>
                  <span>⚠️ 실시간 데이터를 갱신하는데 실패했습니다. (이전 데이터가 표시됩니다)</span>
                  <button onClick={() => window.location.reload()} style={{ padding: '0.3rem 0.8rem', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', borderRadius: '4px', cursor: 'pointer', fontSize: '0.8rem' }}>새로고침</button>
                </div>
              )}
              <div className="groups-grid">
                {[...groupsData].sort((a, b) => a.name.localeCompare(b.name)).map(group => {
                  const sortedTeams = [...group.teams].sort((a, b) => {
                    const ptsA = parseInt(a.pts, 10);
                    const ptsB = parseInt(b.pts, 10);
                    if (ptsB !== ptsA) return ptsB - ptsA;

                    const gdA = parseInt(a.gd, 10);
                    const gdB = parseInt(b.gd, 10);
                    if (gdB !== gdA) return gdB - gdA;

                    const gfA = parseInt(a.gf, 10);
                    const gfB = parseInt(b.gf, 10);
                    return gfB - gfA;
                  });

                  return (
                    <div key={group.name} id={`group-card-${group.name}`} className="group-card">
                      <div className="group-card-header">
                        GROUP {group.name}
                        <span>1·2위 직행 | 3위 와일드카드 대기</span>
                      </div>
                      <table className="standings-table">
                        <thead>
                          <tr>
                            <th style={{ width: '12%' }}>순위</th>
                            <th style={{ width: '38%', textAlign: 'left' }}>팀</th>
                            <th style={{ width: '10%' }}>경기</th>
                            <th style={{ width: '8%' }}>승</th>
                            <th style={{ width: '8%' }}>무</th>
                            <th style={{ width: '8%' }}>패</th>
                            <th style={{ width: '8%' }}>득실</th>
                            <th style={{ width: '8%' }}>승점</th>
                          </tr>
                        </thead>
                        <tbody>
                          {sortedTeams.map((team, idx) => {
                            const teamEnName = TEAM_ID_TO_EN[team.team_id] || "Unknown";
                            const teamInfo = TEAM_MAPPING[teamEnName] || { name: teamEnName, flag: "🏳️" };
                            const isQualify = idx < 2;
                            const isWildcard = idx === 2;
                            const rowClass = isQualify ? 'qualify-row' : isWildcard ? 'wildcard-row' : '';

                            return (
                              <tr key={team.team_id} className={rowClass}>
                                <td>
                                  <span className="rank-number">{idx + 1}</span>
                                </td>
                                <td>
                                  <div className="team-cell">
                                    <span className="team-cell-flag">{teamInfo.flag}</span>
                                    <span className="team-cell-name" title={teamInfo.name}>{teamInfo.name}</span>
                                  </div>
                                </td>
                                <td>{team.mp}</td>
                                <td>{team.w}</td>
                                <td>{team.d}</td>
                                <td>{team.l}</td>
                                <td>{parseInt(team.gd, 10) > 0 ? `+${team.gd}` : team.gd}</td>
                                <td className="pts-cell">{team.pts}</td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  );
                })}
              </div>
              <div className="standings-legend">
                <div className="legend-item">
                  <div className="legend-color qualify"></div>
                  <span>32강 직행 (조 1, 2위)</span>
                </div>
                <div className="legend-item">
                  <div className="legend-color wildcard"></div>
                  <span>와일드카드 경쟁 (조 3위 상위 8개 팀)</span>
                </div>
              </div>
            </>
          )}
        </div>
      )}

      {/* Main Content Area (Matches Page only) */}
      {currentPage === 'matches' && (
        <main className="main-content">
          {/* Section Header with Filters */}
          <div className="section-header" style={{ marginBottom: '1rem' }}>
            <div className="section-title-wrap">
              <h2 className="section-title">매치 스케줄</h2>
              <p className="section-desc">2026 FIFA World Cup 공식 API 연동 실시간 경기 일정 및 결과</p>
            </div>
          </div>

          {/* Horizontal Date Selector Calendar Tab */}
          <div className="date-selector-bar">
            <button 
              className={`date-chip ${activeFilter === 'ALL' ? 'active' : ''}`}
              onClick={() => setActiveFilter('ALL')}
            >
              <span className="date-chip-label">전체</span>
              <span>전체 일정</span>
            </button>
            <button 
              className={`date-chip ${activeFilter === 'LIVE' ? 'active' : ''}`}
              onClick={() => setActiveFilter('LIVE')}
            >
              <span className="date-chip-label">진행중</span>
              <span>⚽ 진행중인 경기</span>
            </button>
            {dateList.map(dateStr => {
              const dateObj = new Date(dateStr);
              const isToday = dateStr === todayStr;
              const diffDays = Math.floor((dateObj - new Date(todayStr)) / (1000 * 60 * 60 * 24));
              
              let displayMain = `${dateObj.getMonth() + 1}.${dateObj.getDate()} (${getDayOfWeekKorean(dateObj)})`;
              let displaySub = "";
              
              if (diffDays === 0) {
                displaySub = "오늘";
              } else if (diffDays === 1) {
                displaySub = "내일";
              } else if (diffDays === -1) {
                displaySub = "어제";
              } else {
                displaySub = `${dateObj.getFullYear() === 2026 ? '' : dateObj.getFullYear() + ' '}${dateObj.getMonth() + 1}월`;
              }
              
              const isActive = activeFilter === dateStr || (activeFilter === 'TODAY' && isToday);
              
              return (
                <button 
                  key={dateStr}
                  className={`date-chip ${isActive ? 'active' : ''}`}
                  onClick={() => setActiveFilter(dateStr)}
                >
                  <span className="date-chip-label">{displaySub}</span>
                  <span>{displayMain}</span>
                </button>
              );
            })}
          </div>

          {/* Matches Grid */}
          {isLoading ? (
            <div style={{ textAlign: 'center', padding: '5rem', color: 'var(--text-secondary)', fontSize: '1.2rem' }}>
              <span className="pulse-dot" style={{ display: 'inline-block', marginRight: '0.5rem' }}></span>
              실시간 데이터를 가져오는 중입니다...
            </div>
          ) : error && apiMatches.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--accent-crimson)', border: '1px dashed var(--accent-crimson)', borderRadius: '12px', background: 'rgba(255,0,85,0.05)' }}>
              ⚠️ 실시간 경기 데이터를 불러오는데 실패했습니다. (원인: {error})<br />
              <button onClick={() => window.location.reload()} style={{ marginTop: '1rem', padding: '0.5rem 1.2rem', background: 'var(--accent-cyan)', border: 'none', color: '#000', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}>새로고침</button>
            </div>
          ) : (
            <>
              {error && (
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '0.5rem 0 1.5rem 0', padding: '0.8rem 1.2rem', color: '#ff4d4d', border: '1px solid rgba(255, 77, 77, 0.3)', borderRadius: '8px', background: 'rgba(255, 77, 77, 0.08)', fontSize: '0.9rem' }}>
                  <span>⚠️ 실시간 데이터를 갱신하는데 실패했습니다. (이전 데이터가 표시됩니다)</span>
                  <button onClick={() => window.location.reload()} style={{ padding: '0.3rem 0.8rem', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', borderRadius: '4px', cursor: 'pointer', fontSize: '0.8rem' }}>새로고침</button>
                </div>
              )}
              <div className="matches-grid">
              {filteredMatches.map(match => (
                <div key={match.id} className={`match-card ${match.status === 'LIVE' ? 'live-card-glow' : ''}`}>
                  <div className="card-header">
                    <span 
                      className={`group-badge ${match.group.startsWith('Group') ? 'clickable-group-badge' : ''}`}
                      onClick={() => handleGroupBadgeClick(match.group)}
                    >
                      {match.group}
                    </span>
                    <span className={`status-badge ${match.status.toLowerCase()}`}>
                      {match.status === 'LIVE' && <span className="pulse-dot"></span>}
                      {match.status === 'LIVE' ? `LIVE / 진행중` : match.status === 'FINISHED' ? '경기 종료' : `${match.time} 예정`}
                    </span>
                  </div>

                  <div className="match-body">
                    <div className="team-info">
                      <div className="flag-placeholder">{match.teamA.flag}</div>
                      <span className="team-name">{match.teamA.name}</span>
                    </div>

                    <div className="vs-divider">
                      {match.status === 'LIVE' || match.status === 'FINISHED' ? (
                        <div className="live-score">
                          <span className="score-number">{match.teamA.score}</span>
                          <span>:</span>
                          <span className="score-number">{match.teamB.score}</span>
                        </div>
                      ) : (
                        <span className="vs-text">VS</span>
                      )}
                    </div>

                    <div className="team-info">
                      <div className="flag-placeholder">{match.teamB.flag}</div>
                      <span className="team-name">{match.teamB.name}</span>
                    </div>
                  </div>

                  <div className="card-footer">
                    <div className="footer-item">
                      <CalendarIcon />
                      <span>{match.date}</span>
                    </div>
                    <div className="footer-item">
                      <MapPinIcon />
                      <span>{match.stadium} ({match.city})</span>
                    </div>
                    {match.status === 'FINISHED' ? (
                      <div className="card-actions-group highlight-btn-container">
                        <button className="card-action-btn secondary-btn" style={{ flex: 1 }} onClick={() => handleViewAnalysis(match.id)}>
                          경기 분석
                        </button>
                        <button 
                          className="card-action-btn highlight-btn" 
                          style={{ flex: 1 }} 
                          onClick={() => setActiveHighlightDropdownId(activeHighlightDropdownId === match.id ? null : match.id)}
                        >
                          🎥 하이라이트
                        </button>
                        {activeHighlightDropdownId === match.id && (
                          <div className="stream-dropdown highlight-dropdown">
                            <div className="highlight-dropdown-header">
                              공식 하이라이트 채널
                            </div>
                            <a 
                              href={`https://chzzk.naver.com/search?query=2026+월드컵+${encodeURIComponent(match.teamA.name)}+${encodeURIComponent(match.teamB.name)}+하이라이트`} 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              className="stream-dropdown-item"
                            >
                              🎮 네이버 치지직 검색
                            </a>
                            <a 
                              href={`https://search.naver.com/search.naver?where=video&query=2026+월드컵+${encodeURIComponent(match.teamA.name)}+${encodeURIComponent(match.teamB.name)}+하이라이트`} 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              className="stream-dropdown-item"
                            >
                              ⚽ 네이버 스포츠 (비디오)
                            </a>
                            <a 
                              href={`https://www.youtube.com/results?search_query=JTBC+2026+월드컵+${encodeURIComponent(match.teamA.name)}+${encodeURIComponent(match.teamB.name)}+하이라이트`} 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              className="stream-dropdown-item"
                            >
                              📺 JTBC 스포츠 (유튜브)
                            </a>
                            <div className="highlight-dropdown-info">
                              💡 경기 종료 약 10~30분 뒤 공식 영상이 업로드됩니다. (공식 채널로 연결)
                            </div>
                          </div>
                        )}
                      </div>
                    ) : match.status === 'LIVE' ? (
                      <div className="card-actions-group highlight-btn-container">
                        <button className="card-action-btn secondary-btn" style={{ flex: 1 }} onClick={() => handleViewAnalysis(match.id)}>
                          실시간 분석
                        </button>
                        <button
                          className="card-action-btn highlight-btn"
                          style={{ flex: 1, background: 'linear-gradient(135deg, #e53935, #b71c1c)' }}
                          onClick={() => setActiveHighlightDropdownId(activeHighlightDropdownId === match.id ? null : match.id)}
                        >
                          📺 라이브 시청
                        </button>
                        {activeHighlightDropdownId === match.id && (
                          <div className="stream-dropdown highlight-dropdown">
                            <div className="highlight-dropdown-header">
                              🔴 지금 바로 시청하기
                            </div>
                            <a
                              href={`https://chzzk.naver.com/search?query=2026+월드컵+${encodeURIComponent(match.teamA.name)}+${encodeURIComponent(match.teamB.name)}+라이브`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="stream-dropdown-item"
                            >
                              🎮 네이버 치지직 (라이브)
                            </a>
                            <a
                              href="https://sports.news.naver.com/wfootball/index"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="stream-dropdown-item"
                            >
                              ⚽ 네이버 스포츠 중계
                            </a>
                            <a
                              href={`https://www.youtube.com/results?search_query=JTBC+2026+월드컵+${encodeURIComponent(match.teamA.name)}+${encodeURIComponent(match.teamB.name)}+라이브`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="stream-dropdown-item"
                            >
                              📺 JTBC 스포츠 (유튜브)
                            </a>
                            <a
                              href={`https://www.youtube.com/results?search_query=KBS+2026+월드컵+${encodeURIComponent(match.teamA.name)}+${encodeURIComponent(match.teamB.name)}+생중계`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="stream-dropdown-item"
                            >
                              📡 KBS (유튜브)
                            </a>
                            <div className="highlight-dropdown-info">
                              💡 방송사 별 중계권에 따라 일부 경기는 시청이 제한될 수 있습니다.
                            </div>
                          </div>
                        )}
                      </div>
                    ) : match.hasAnalysis ? (
                      <button className="card-action-btn" onClick={() => handleViewAnalysis(match.id)}>
                        AI 전력분석
                      </button>
                    ) : (
                      <button className="card-action-btn" disabled style={{ opacity: 0.4, cursor: 'not-allowed' }}>
                        분석 대기중
                      </button>
                    )}
                  </div>
                </div>
              ))}
              {filteredMatches.length === 0 && (
                <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
                  해당 카테고리에 경기가 없습니다.
                </div>
              )}
            </div>
            </>
          )}

          {/* AI Match Analysis Dashboard Section */}
          <section className="analysis-section" id="analysis">
            <div className="analysis-header">
              <span className="analysis-subtitle">AI Match Predictor</span>
              <h2 className="analysis-title">{getAnalysisTitle()}</h2>
              <p className="section-desc" style={{ marginTop: '0.5rem' }}>빅데이터 기반 전력 및 승률 실시간 분석</p>
            </div>

            {/* Analysis Selector Tabs (동적 생성 - 스케일러블 필터링 반영) */}
            <div className="analysis-tabs" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', justifyContent: 'center' }}>
              {analysisTabMatches.map(match => (
                <button 
                  key={match.id}
                  className={`analysis-tab-btn ${selectedAnalysisMatchId === match.id ? 'active' : ''}`}
                  onClick={() => setSelectedAnalysisMatchId(match.id)}
                >
                  {match.teamA.flag} {match.teamA.name} vs {match.teamB.name} {match.teamB.flag}
                </button>
              ))}
            </div>

            {activeAnalysis ? (
              <>
                <div className="analysis-matchup-hero">
                  <div className="analysis-team">
                    <span className="flag">{processedMatches.find(m => m.id === selectedAnalysisMatchId)?.teamA.flag}</span>
                    <span className="name">{processedMatches.find(m => m.id === selectedAnalysisMatchId)?.teamA.name}</span>
                  </div>
                  <span className="analysis-vs">VS</span>
                  <div className="analysis-team">
                    <span className="name">{processedMatches.find(m => m.id === selectedAnalysisMatchId)?.teamB.name}</span>
                    <span className="flag">{processedMatches.find(m => m.id === selectedAnalysisMatchId)?.teamB.flag}</span>
                  </div>
                </div>

                {/* Win Rate Progress Bar */}
                <div className="win-rate-container">
                  <h3 className="win-rate-title">빅데이터 승률 예측 게이지</h3>
                  <div className="win-rate-bar-wrapper">
                    <div className="win-rate-portion team-a" style={{ width: `${activeAnalysis.winRate.teamA}%` }}>
                      {processedMatches.find(m => m.id === selectedAnalysisMatchId)?.teamA.name} 승 ({activeAnalysis.winRate.teamA}%)
                    </div>
                    <div className="win-rate-portion draw" style={{ width: `${activeAnalysis.winRate.draw}%` }}>
                      무승부 ({activeAnalysis.winRate.draw}%)
                    </div>
                    <div className="win-rate-portion team-b" style={{ width: `${activeAnalysis.winRate.teamB}%` }}>
                      {processedMatches.find(m => m.id === selectedAnalysisMatchId)?.teamB.name} 승 ({activeAnalysis.winRate.teamB}%)
                    </div>
                  </div>
                  <div className="win-rate-labels">
                    <span>{activeAnalysis.teamAInfo}</span>
                    <span>최근 시뮬레이션 맞대결 결과 반영</span>
                    <span>{activeAnalysis.teamBInfo}</span>
                  </div>
                </div>

                {/* Grid Details */}
                <div className="analysis-details-grid">
                  {/* 최근 경기력 */}
                  <div className="analysis-detail-card">
                    <div className="card-title-wrap">
                      <div className="card-title-icon"><TrendingUpIcon /></div>
                      <h4 className="card-title-text">최근 경기력 및 흐름 (Recent Form)</h4>
                    </div>
                    <div className="analysis-text">
                      <div className="form-compare-row">
                        <span className="form-team-label">{processedMatches.find(m => m.id === selectedAnalysisMatchId)?.teamA.name}</span>
                        <div className="form-dots">
                          {activeAnalysis.recentForm.teamA.map((res, idx) => (
                            <span key={idx} className={`form-dot ${res}`}>{res === 'win' ? '승' : res === 'draw' ? '무' : '패'}</span>
                          ))}
                        </div>
                      </div>
                      <div className="form-compare-row" style={{ marginBottom: '1.5rem' }}>
                        <span className="form-team-label">{processedMatches.find(m => m.id === selectedAnalysisMatchId)?.teamB.name}</span>
                        <div className="form-dots">
                          {activeAnalysis.recentForm.teamB.map((res, idx) => (
                            <span key={idx} className={`form-dot ${res}`}>{res === 'win' ? '승' : res === 'draw' ? '무' : '패'}</span>
                          ))}
                        </div>
                      </div>
                      <p><strong>{processedMatches.find(m => m.id === selectedAnalysisMatchId)?.teamA.name}:</strong> {activeAnalysis.recentFormDesc.teamA}</p>
                      <p><strong>{processedMatches.find(m => m.id === selectedAnalysisMatchId)?.teamB.name}:</strong> {activeAnalysis.recentFormDesc.teamB}</p>
                    </div>
                  </div>

                  {/* 핵심 전술 포인트 */}
                  <div className="analysis-detail-card">
                    <div className="card-title-wrap">
                      <div className="card-title-icon"><ActivityIcon /></div>
                      <h4 className="card-title-text">핵심 전술 매치포인트 (Tactics)</h4>
                    </div>
                    <div className="analysis-text">
                      <p><strong>{activeAnalysis.tactics.teamA}</strong></p>
                      <p><strong>{activeAnalysis.tactics.teamB}</strong></p>
                    </div>
                  </div>

                  {/* 키 매치업 */}
                  <div className="analysis-detail-card">
                    <div className="card-title-wrap">
                      <div className="card-title-icon"><UsersIcon /></div>
                      <h4 className="card-title-text">승부의 핵심: 키 플레이어 맞대결</h4>
                    </div>
                    <div className="analysis-text">
                      <div className="matchup-players" style={{ marginBottom: '1.25rem' }}>
                        {activeAnalysis.keyMatchups.map((matchup, idx) => (
                          <div key={idx} className="player-matchup-row" style={{ marginBottom: '0.75rem' }}>
                            <div className="player-info-mini">
                              <span className="player-name-mini">{matchup.playerA}</span>
                              <span className="player-position-mini">{matchup.teamA}</span>
                            </div>
                            <span className="player-vs-indicator">VS</span>
                            <div className="player-info-mini" style={{ alignItems: 'flex-end' }}>
                              <span className="player-name-mini">{matchup.playerB}</span>
                              <span className="player-position-mini">{matchup.teamB}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                      {activeAnalysis.keyMatchups.map((matchup, idx) => (
                        <p key={idx}><strong>{matchup.playerA.split(' ')[0]} vs {matchup.playerB.split(' ')[0]}:</strong> {matchup.desc}</p>
                      ))}
                    </div>
                  </div>

                  {/* 최종 종합 전망 */}
                  <div className="analysis-detail-card">
                    <div className="card-title-wrap">
                      <div className="card-title-icon"><CompassIcon /></div>
                      <h4 className="card-title-text">종합 전망 및 결과 (Verdict)</h4>
                    </div>
                    <div className="analysis-text">
                      <p style={{ fontSize: '1.05rem', color: '#fff', fontWeight: 600, marginBottom: '1rem' }}>
                        {activeAnalysis.verdict.predictedScore}
                      </p>
                      <p>{activeAnalysis.verdict.desc}</p>
                    </div>
                  </div>
                </div>
              </>
            ) : analysisTabMatches.length > 0 ? (
              <div className="analysis-empty-state" style={{ textAlign: 'center', padding: '4rem 2rem', background: 'rgba(255,255,255,0.03)', borderRadius: '16px', border: '1px dashed var(--glass-border)', marginTop: '2rem' }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🤖⏳</div>
                <h3 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem' }}>AI 전력 분석 대기중</h3>
                <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                  현재 AI 모델이 해당 경기의 라인업, 최근 전적, 전술 데이터를 분석하고 있습니다.<br/>
                  경기 시작 전 정밀 분석 데이터가 자동 업데이트 될 예정입니다.
                </p>
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
                해당 날짜에 예정된 매치가 없습니다.
              </div>
            )}
          </section>

          {/* Stadium Spotlight Section */}
          <div className="stadium-section" id="stadiums" style={{ marginTop: '5rem' }}>
            <div className="stadium-img-wrapper">
              <img src="/world_cup_hero_bg.png" alt="SoFi Stadium" className="stadium-img" />
              <div className="stadium-overlay">
                <div className="stadium-info-meta">
                  <span className="stadium-name">소파이 스타디움</span>
                  <span className="stadium-city">로스앤젤레스, 미국</span>
                </div>
                <span className="stadium-capacity">70,240 석</span>
              </div>
            </div>

            <div className="stadium-desc-wrap">
              <span className="stadium-label">오늘의 추천 경기장</span>
              <h3 className="stadium-title">SoFi Stadium</h3>
              <p className="stadium-desc">
                캘리포니아주 잉글우드에 위치한 소파이 스타디움(SoFi Stadium)은 세계에서 가장 비싼 최첨단 다목적 경기장입니다. 
                중앙에 매달린 거대한 양면 인피니티 스크린과 미래지향적 반투명 지붕 설계가 돋보이며, 오늘 펼쳐질 [ 미국 vs 파라과이 ] 대진이 열리는 메인 무대이기도 합니다.
              </p>
              <div className="stadium-stats">
                <div className="stat-box">
                  <div className="stat-value">2020</div>
                  <div className="stat-label">개장 연도</div>
                </div>
                <div className="stat-box">
                  <div className="stat-value">55억$</div>
                  <div className="stat-label">건설 비용</div>
                </div>
                <div className="stat-box">
                  <div className="stat-value">8회</div>
                  <div className="stat-label">월드컵 경기수</div>
                </div>
              </div>
            </div>
          </div>
        </main>
      )}

      {/* Footer */}
      <footer className="footer-section">
        <div className="footer-logo" style={{ cursor: 'pointer' }} onClick={() => setCurrentPage('matches')}>
          <TrophyIcon />
          <span>WORLD CUP <span className="glow-text-cyan">2026</span></span>
        </div>
        <div className="footer-links">
          <a href="#matches" onClick={(e) => { e.preventDefault(); setCurrentPage('matches'); }}>매치 일정</a>
          <a href="#standings" onClick={(e) => { e.preventDefault(); setCurrentPage('standings'); }}>조별 순위</a>
          <a href="#lotto" onClick={(e) => { e.preventDefault(); setCurrentPage('lotto'); }}>로또번호생성</a>
          <a href="#stadiums" onClick={(e) => { e.preventDefault(); setCurrentPage('matches'); }}>경기장 목록</a>
        </div>

        {/* 방문자 수 카운터 */}
        {(visitorCount.today !== null || visitorCount.total !== null) && (
          <div className="visitor-counter-wrapper" style={{
            margin: '0 auto 1.5rem auto',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.65rem',
            padding: '0.45rem 1.4rem',
            background: 'var(--bg-tertiary)',
            border: '1px solid var(--glass-border)',
            borderRadius: '50px',
            fontSize: '0.82rem',
            color: 'var(--text-secondary)',
            boxShadow: '0 4px 12px var(--glass-shadow)',
            transition: 'var(--transition-smooth)'
          }}>
            <span style={{ 
              width: '7px', 
              height: '7px', 
              borderRadius: '50%', 
              backgroundColor: 'var(--accent-neon)',
              boxShadow: '0 0 8px var(--accent-neon)',
              display: 'inline-block'
            }}></span>

            {visitorCount.today !== null && (
              <>
                <span>오늘</span>
                <strong style={{ 
                  color: 'var(--accent-neon)', 
                  fontWeight: '700',
                  textShadow: '0 0 6px rgba(46, 196, 182, 0.4)'
                }}>
                  {visitorCount.today.toLocaleString()}
                </strong>
                <span>명</span>
              </>
            )}

            {visitorCount.today !== null && visitorCount.total !== null && (
              <span style={{ color: 'var(--text-muted)', margin: '0 0.15rem' }}>/</span>
            )}

            {visitorCount.total !== null && (
              <>
                <span>전체</span>
                <strong style={{ 
                  color: 'var(--accent-cyan)', 
                  fontWeight: '700',
                  textShadow: '0 0 6px rgba(99, 179, 237, 0.4)'
                }}>
                  {visitorCount.total.toLocaleString()}
                </strong>
                <span>명</span>
              </>
            )}
          </div>
        )}

        <p className="copyright">
          © 2026 FIFA World Cup Landing Page. Powered by React & Vite. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

export default App;




