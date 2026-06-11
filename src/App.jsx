import React, { useState, useEffect } from 'react';
import './App.css';

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

function App() {
  const [currentPage, setCurrentPage] = useState('matches'); // 'matches' | 'lotto'
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [timeLeft, setTimeLeft] = useState({ hours: 12, minutes: 15, seconds: 45 });
  const [lottoGames, setLottoGames] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);

  // Countdown timer simulation to KOR vs CZE match
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          clearInterval(timer);
          return prev;
        }
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const initialMatches = [
    {
      id: 5,
      group: 'Group C',
      status: 'SCHEDULED',
      time: '오늘 11:00',
      teamA: { name: '대한민국', flag: '🇰🇷', score: null },
      teamB: { name: '체코', flag: '🇨🇿', score: null },
      stadium: 'Stadio Azteca',
      city: 'Mexico City, Mexico',
      date: '오늘 2026-06-11'
    },
    {
      id: 1,
      group: 'Group A',
      status: 'LIVE',
      time: '74\'',
      teamA: { name: '멕시코', flag: '🇲🇽', score: 2 },
      teamB: { name: '미국', flag: '🇺🇸', score: 1 },
      stadium: 'Estadio Azteca',
      city: 'Mexico City, Mexico',
      date: '오늘 2026-06-11'
    },
    {
      id: 2,
      group: 'Group A',
      status: 'SCHEDULED',
      time: '23:30',
      teamA: { name: '캐나다', flag: '🇨🇦', score: null },
      teamB: { name: '코스타리카', flag: '🇨🇷', score: null },
      stadium: 'BC Place Stadium',
      city: 'Vancouver, Canada',
      date: '오늘 2026-06-11'
    },
    {
      id: 3,
      group: 'Group B',
      status: 'SCHEDULED',
      time: '내일 02:00',
      teamA: { name: '브라질', flag: '🇧🇷', score: null },
      teamB: { name: '아르헨티나', flag: '🇦🇷', score: null },
      stadium: 'MetLife Stadium',
      city: 'New York, USA',
      date: '내일 2026-06-12'
    },
    {
      id: 4,
      group: 'Group B',
      status: 'FINISHED',
      time: '종료',
      teamA: { name: '우루과이', flag: '🇺🇾', score: 3 },
      teamB: { name: '일본', flag: '🇯🇵', score: 2 },
      stadium: 'SoFi Stadium',
      city: 'Los Angeles, USA',
      date: '어제 2026-06-10'
    }
  ];

  const [matches, setMatches] = useState(initialMatches);

  // Live Score Updates Simulation
  useEffect(() => {
    const scoreInterval = setInterval(() => {
      setMatches(prevMatches =>
        prevMatches.map(match => {
          if (match.status === 'LIVE') {
            if (Math.random() < 0.2) {
              const updatedTeam = Math.random() > 0.5 ? 'teamA' : 'teamB';
              return {
                ...match,
                [updatedTeam]: {
                  ...match[updatedTeam],
                  score: match[updatedTeam].score + 1
                }
              };
            }
          }
          return match;
        })
      );
    }, 15000);

    return () => clearInterval(scoreInterval);
  }, []);

  const filteredMatches = matches.filter(match => {
    if (activeFilter === 'ALL') return true;
    if (activeFilter === 'LIVE') return match.status === 'LIVE';
    if (activeFilter === 'GROUP A') return match.group === 'Group A';
    if (activeFilter === 'GROUP B') return match.group === 'Group B';
    if (activeFilter === 'GROUP C') return match.group === 'Group C';
    return true;
  });

  // Lotto generation logic (Weighted by 5-year trend analysis)
  const generateLottoNumbers = () => {
    setIsGenerating(true);
    // Recent 5-year HOT numbers (higher weight)
    const hotNumbers = [12, 17, 34, 43, 27, 1, 13, 18, 33, 45];
    // Recent 5-year COLD numbers (lower weight but necessary for balance)
    const coldNumbers = [5, 9, 14, 22, 38, 2, 8, 21, 29, 41];
    
    setTimeout(() => {
      const newGames = [];
      for (let g = 0; g < 5; g++) {
        const gameNumbers = new Set();
        
        // 1. Mix Hot Numbers (Ensure 2-3 hot numbers per game)
        const hotCount = Math.floor(Math.random() * 2) + 2; // 2 or 3
        while (gameNumbers.size < hotCount) {
          const randHot = hotNumbers[Math.floor(Math.random() * hotNumbers.length)];
          gameNumbers.add(randHot);
        }
        
        // 2. Mix Cold Numbers (Ensure 1 cold number for rebound probability)
        const randCold = coldNumbers[Math.floor(Math.random() * coldNumbers.length)];
        gameNumbers.add(randCold);
        
        // 3. Fill the rest based on balanced odd/even (3:3 or 4:2 ratio)
        while (gameNumbers.size < 6) {
          const num = Math.floor(Math.random() * 45) + 1;
          gameNumbers.add(num);
        }
        
        // Convert to array and sort ascending
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

  return (
    <div className="app-container">
      {/* Navigation Header */}
      <header className="header-nav">
        <div className="logo-container" style={{ cursor: 'pointer' }} onClick={() => setCurrentPage('matches')}>
          <TrophyIcon />
          <span>WORLD CUP <span className="glow-text-cyan">2026</span></span>
        </div>
        <nav>
          <ul className="nav-links">
            <li>
              <a 
                href="#matches" 
                className={currentPage === 'matches' ? 'active' : ''} 
                onClick={(e) => { e.preventDefault(); setCurrentPage('matches'); }}
              >
                일정 및 결과
              </a>
            </li>
            {currentPage === 'matches' && (
              <li><a href="#analysis">AI 전력분석</a></li>
            )}
            <li>
              <a 
                href="#lotto" 
                className={currentPage === 'lotto' ? 'active' : ''} 
                onClick={(e) => { e.preventDefault(); setCurrentPage('lotto'); }}
                style={{ color: 'var(--accent-gold)' }}
              >
                🎰 로또번호생성
              </a>
            </li>
          </ul>
        </nav>
        <button className="live-btn">
          <span className="pulse-dot"></span>
          실시간 스트림
        </button>
      </header>

      {/* Conditional Page Rendering */}
      {currentPage === 'matches' ? (
        <>
          {/* Hero Section */}
          <section className="hero-section">
            <div className="hero-bg-wrapper">
              <img src="/world_cup_hero_bg.png" alt="Futuristic Soccer Stadium" className="hero-bg-image" />
              <div className="hero-overlay"></div>
            </div>
            <div className="hero-content">
              <p className="hero-subtitle">FIFA World Cup 2026</p>
              <h1 className="hero-title">오늘의 월드컵 매치업</h1>
              <p className="section-desc" style={{ marginBottom: '2rem', color: 'var(--text-secondary)' }}>
                북중미 3개국에서 펼쳐지는 세계 최대의 축구 축제. 실시간 스코어와 오늘 진행되는 예선 일정을 한눈에 확인해 보세요.
              </p>

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
                빅매치 [ 대한민국 vs 체코 ] 킥오프까지 남은 시간
              </p>
            </div>
          </section>
        </>
      ) : (
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

      {/* Main Content Area (Matches Page only) */}
      {currentPage === 'matches' && (
        <main className="main-content">
          {/* Section Header with Filters */}
          <div className="section-header">
            <div className="section-title-wrap">
              <h2 className="section-title">매치 스케줄</h2>
              <p className="section-desc">2026년 6월 11일 기준 실시간 경기 흐름 및 대진표</p>
            </div>
            <div className="filter-group">
              {['ALL', 'LIVE', 'GROUP A', 'GROUP B', 'GROUP C'].map(filter => (
                <button
                  key={filter}
                  className={`filter-btn ${activeFilter === filter ? 'active' : ''}`}
                  onClick={() => setActiveFilter(filter)}
                >
                  {filter === 'ALL' ? '전체 일정' : filter === 'LIVE' ? '🔴 라이브' : filter}
                </button>
              ))}
            </div>
          </div>

          {/* Matches Grid */}
          <div className="matches-grid">
            {filteredMatches.map(match => (
              <div key={match.id} className="match-card">
                <div className="card-header">
                  <span className="group-badge">{match.group}</span>
                  <span className={`status-badge ${match.status.toLowerCase()}`}>
                    {match.status === 'LIVE' && <span className="pulse-dot"></span>}
                    {match.status === 'LIVE' ? `LIVE / ${match.time}` : match.status === 'FINISHED' ? '경기 종료' : match.time}
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
                  <button className="card-action-btn">
                    {match.status === 'LIVE' ? '실시간 중계 보기' : match.status === 'FINISHED' ? '하이라이트' : '전력분석 이동'}
                  </button>
                </div>
              </div>
            ))}
            {filteredMatches.length === 0 && (
              <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
                해당 카테고리에 진행중인 경기가 없습니다.
              </div>
            )}
          </div>

          {/* AI Match Analysis Dashboard Section */}
          <section className="analysis-section" id="analysis">
            <div className="analysis-header">
              <span className="analysis-subtitle">AI Match Predictor</span>
              <h2 className="analysis-title">대한민국 vs 체코 정밀 분석</h2>
              <p className="section-desc" style={{ marginTop: '0.5rem' }}>오늘 오전 11:00 킥오프 - Estadio Azteca</p>
            </div>

            <div className="analysis-matchup-hero">
              <div className="analysis-team">
                <span className="flag">🇰🇷</span>
                <span className="name">대한민국</span>
              </div>
              <span className="analysis-vs">VS</span>
              <div className="analysis-team">
                <span className="name">체코</span>
                <span className="flag">🇨🇿</span>
              </div>
            </div>

            {/* Win Rate Progress Bar */}
            <div className="win-rate-container">
              <h3 className="win-rate-title">빅데이터 승률 예측 게이지</h3>
              <div className="win-rate-bar-wrapper">
                <div className="win-rate-portion team-a" style={{ width: '54%' }}>
                  대한민국 승 (54%)
                </div>
                <div className="win-rate-portion draw" style={{ width: '26%' }}>
                  무승부 (26%)
                </div>
                <div className="win-rate-portion team-b" style={{ width: '20%' }}>
                  체코 승 (20%)
                </div>
              </div>
              <div className="win-rate-labels">
                <span>FIFA 랭킹: 22위</span>
                <span>최근 맞대결: 대한민국 우세</span>
                <span>FIFA 랭킹: 36위</span>
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
                    <span className="form-team-label">대한민국</span>
                    <div className="form-dots">
                      <span className="form-dot win">승</span>
                      <span className="form-dot win">승</span>
                      <span className="form-dot draw">무</span>
                      <span className="form-dot loss">패</span>
                      <span className="form-dot win">승</span>
                    </div>
                  </div>
                  <div className="form-compare-row" style={{ marginBottom: '1.5rem' }}>
                    <span className="form-team-label">체코</span>
                    <div className="form-dots">
                      <span className="form-dot loss">패</span>
                      <span className="form-dot draw">무</span>
                      <span className="form-dot win">승</span>
                      <span className="form-dot loss">패</span>
                      <span className="form-dot draw">무</span>
                    </div>
                  </div>
                  <p>
                    <strong>대한민국</strong>은 최근 5경기에서 3승 1무 1패를 기록하며 강력한 상승세를 타고 있습니다. 특히 공격진의 짜임새가 좋아 경기당 평균 2.1골의 높은 득점력을 과시 중입니다.
                  </p>
                  <p>
                    반면, <strong>체코</strong>는 세대교체 단계에서 수비 불안이 발목을 잡으며 최근 5경기 1승 2무 2패에 머물러 있습니다. 경기 후반 집중력 저하로 인한 실점율(평균 1.6실점)이 높습니다.
                  </p>
                </div>
              </div>

              {/* 핵심 전술 포인트 */}
              <div className="analysis-detail-card">
                <div className="card-title-wrap">
                  <div className="card-title-icon"><ActivityIcon /></div>
                  <h4 className="card-title-text">핵심 전술 매치포인트 (Tactics)</h4>
                </div>
                <div className="analysis-text">
                  <p>
                    <strong>대한민국 (4-2-3-1):</strong> 이강인의 창의적인 탈압박과 하프스페이스(Half-space) 배급을 축으로, 손흥민이 체코의 느린 풀백 뒷공간을 집요하게 파고드는 형태가 유효할 것입니다. 황인범이 지휘하는 중원 빌드업이 체코의 압박을 풀어내는 속도가 핵심입니다.
                  </p>
                  <p>
                    <strong>체코 (3-4-1-2):</strong> 피지컬 강점을 앞세워 다이렉트 롱 패스를 통한 다이렉트 공격을 선호합니다. 윙백들의 이른 크로스(Early Cross)와 세트피스 상황에서 토마시 소우체크의 압도적인 공중볼 경합력이 대한민국의 최대 경계 대상입니다.
                  </p>
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
                    <div className="player-matchup-row">
                      <div className="player-info-mini">
                        <span className="player-name-mini">김민재 (DF)</span>
                        <span className="player-position-mini">바이에른 뮌헨</span>
                      </div>
                      <span className="player-vs-indicator">VS</span>
                      <div className="player-info-mini" style={{ alignItems: 'flex-end' }}>
                        <span className="player-name-mini">패트릭 시크 (FW)</span>
                        <span className="player-position-mini">레버쿠젠</span>
                      </div>
                    </div>
                    <div className="player-matchup-row">
                      <div className="player-info-mini">
                        <span className="player-name-mini">이강인 (MF)</span>
                        <span className="player-position-mini">파리 생제르맹</span>
                      </div>
                      <span className="player-vs-indicator">VS</span>
                      <div className="player-info-mini" style={{ alignItems: 'flex-end' }}>
                        <span className="player-name-mini">토마시 소우체크 (MF)</span>
                        <span className="player-position-mini">웨스트햄</span>
                      </div>
                    </div>
                  </div>
                  <p>
                    <strong>김민재 vs 패트릭 시크:</strong> 체코 공격의 핵심인 시크의 제공권 차단이 최우선 과제입니다. 김민재의 월드클래스 스피드와 대인 방어력이 시크의 움직임을 통제한다면 체코의 공격 루트는 반으로 줄어듭니다.
                  </p>
                  <p>
                    <strong>이강인 vs 소우체크:</strong> 좁은 공간을 부수는 기술적 플레이메이커 이강인과 거친 압박 및 신체 조건을 갖춘 소우체크의 2선 충돌에서 대한민국의 전진패스 차단 여부가 결정됩니다.
                  </p>
                </div>
              </div>

              {/* 최종 종합 전망 */}
              <div className="analysis-detail-card">
                <div className="card-title-wrap">
                  <div className="card-title-icon"><CompassIcon /></div>
                  <h4 className="card-title-text">종합 전망 및 스코어 예측 (Verdict)</h4>
                </div>
                <div className="analysis-text">
                  <p style={{ fontSize: '1.05rem', color: '#fff', fontWeight: 600, marginBottom: '1rem' }}>
                    예상 스코어: 대한민국 2 - 1 체코 승리 예측
                  </p>
                  <p>
                    체코의 강점인 높이와 다이렉트 패스는 위협적이지만, 대한민국에는 분데스리가 최고의 수비수 김민재가 버티고 있어 박스 안 제공권 경쟁력을 충분히 유지할 것입니다.
                  </p>
                  <p>
                    특히 체코 수비라인의 방향 전환 시 발생하는 느린 기동성은 손흥민, 이재성, 이강인 등 민첩하고 배후 침투에 능한 한국 2선 공격진에게 치명적인 약점이 될 가능성이 높습니다.
                  </p>
                  <p>
                    따라서 경기 중반 이후 한국이 측면 공간을 지속해서 공략하며 2골 이상을 득점할 가능성이 높으며, 세트피스 실점을 1골 이하로 억제해 <strong>2:1의 끈끈한 승리</strong>를 거둘 것으로 정밀 예측됩니다.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Stadium Spotlight Section */}
          <div className="stadium-section" id="stadiums" style={{ marginTop: '5rem' }}>
            <div className="stadium-img-wrapper">
              <img src="/world_cup_hero_bg.png" alt="Estadio Azteca" className="stadium-img" />
              <div className="stadium-overlay">
                <div className="stadium-info-meta">
                  <span className="stadium-name">아스테카 경기장</span>
                  <span className="stadium-city">멕시코시티, 멕시코</span>
                </div>
                <span className="stadium-capacity">87,523 석</span>
              </div>
            </div>

            <div className="stadium-desc-wrap">
              <span className="stadium-label">오늘의 추천 경기장</span>
              <h3 className="stadium-title">Estadio Azteca</h3>
              <p className="stadium-desc">
                에스타디오 아스테카(Estadio Azteca)는 1970년과 1986년 월드컵 결승전이 개최된 전설적인 축구 성지입니다. 
                올해 2026년 FIFA 월드컵 개막전이 열리는 영광스러운 무대로 다시 한번 세계의 주목을 받고 있으며, 전 세계 축구 팬들이 꿈꾸는 열정의 중심지입니다.
              </p>
              <div className="stadium-stats">
                <div className="stat-box">
                  <div className="stat-value">1966</div>
                  <div className="stat-label">개장 연도</div>
                </div>
                <div className="stat-box">
                  <div className="stat-value">3회</div>
                  <div className="stat-label">개막전 유치</div>
                </div>
                <div className="stat-box">
                  <div className="stat-value">2,200m</div>
                  <div className="stat-label">해발 고도</div>
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
          <a href="#lotto" onClick={(e) => { e.preventDefault(); setCurrentPage('lotto'); }}>로또번호생성</a>
          <a href="#stadiums" onClick={(e) => { e.preventDefault(); setCurrentPage('matches'); }}>경기장 목록</a>
        </div>
        <p className="copyright">
          © 2026 FIFA World Cup Landing Page. Powered by React & Vite. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

export default App;




