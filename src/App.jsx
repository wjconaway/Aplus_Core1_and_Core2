import { Link, Navigate, Route, Routes, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import { certificationCatalog, exams } from './data/catalog';

const THEME_KEY = 'aplus-theme';
const APP_STATE_KEY = 'aplus-app-state-v1';
const QUESTION_PRESETS = [10, 25, 50, 75];

const EXAMS = {
  core1: {
    slug: 'core1',
    certification: 'A+',
    title: 'Core 1',
    code: '220-1201',
    badge: 'Hardware & Network',
    description: 'Imported from the legacy site and cleaned enough to build on without embarrassment.',
    questions: exams.core1,
  },
  core2: {
    slug: 'core2',
    certification: 'A+',
    title: 'Core 2',
    code: '220-1202',
    badge: 'Software & Security',
    description: 'Imported from the legacy site and cleaned enough to build on without embarrassment.',
    questions: exams.core2,
  },
};

function shuffle(items) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function getStoredTheme() {
  if (typeof window === 'undefined') return 'dark';
  return window.localStorage.getItem(THEME_KEY) || 'dark';
}

function loadAppState() {
  if (typeof window === 'undefined') {
    return { bookmarks: {}, history: [], activeSession: null, lastSessionSummary: null };
  }

  try {
    const parsed = JSON.parse(window.localStorage.getItem(APP_STATE_KEY) || 'null');
    return parsed || { bookmarks: {}, history: [], activeSession: null, lastSessionSummary: null };
  } catch {
    return { bookmarks: {}, history: [], activeSession: null, lastSessionSummary: null };
  }
}

function saveAppState(state) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(APP_STATE_KEY, JSON.stringify(state));
}

function createSession({ examId, mode, count }) {
  const exam = EXAMS[examId];
  const shuffled = shuffle(exam.questions).slice(0, Math.min(count, exam.questions.length));
  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    examId,
    mode,
    count: shuffled.length,
    questionIds: shuffled.map((question) => question.id),
    currentIndex: 0,
    answers: {},
    flagged: {},
    skipped: {},
    revealedCurrent: false,
    startedAt: Date.now(),
    elapsedMs: 0,
    timerRunning: mode === 'exam',
    timerLastStartedAt: mode === 'exam' ? Date.now() : null,
    completedAt: null,
  };
}

function calculateSessionMetrics(session) {
  const exam = EXAMS[session.examId];
  const questions = session.questionIds.map((id) => exam.questions.find((question) => question.id === id)).filter(Boolean);
  const answered = questions.filter((question) => session.answers[question.id]);
  const correct = answered.filter((question) => session.answers[question.id]?.selectedLetter === question.answer);
  const missed = answered.filter((question) => session.answers[question.id]?.selectedLetter !== question.answer);
  const byDomain = questions.reduce((accumulator, question) => {
    const bucket = accumulator[question.domain] || { total: 0, correct: 0 };
    bucket.total += 1;
    if (session.answers[question.id]?.selectedLetter === question.answer) bucket.correct += 1;
    accumulator[question.domain] = bucket;
    return accumulator;
  }, {});

  return {
    questions,
    answered,
    correct,
    missed,
    byDomain,
    percent: answered.length ? Math.round((correct.length / answered.length) * 100) : 0,
  };
}

function getElapsedMs(session) {
  return session.timerRunning && session.timerLastStartedAt
    ? session.elapsedMs + (Date.now() - session.timerLastStartedAt)
    : session.elapsedMs;
}

function formatDuration(ms) {
  const totalSeconds = Math.max(0, Math.round(ms / 1000));
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${String(seconds).padStart(2, '0')}`;
}

function App() {
  const [theme, setTheme] = useState(getStoredTheme);
  const [appState, setAppState] = useState(loadAppState);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  useEffect(() => {
    saveAppState(appState);
  }, [appState]);

  function toggleBookmark(examId, questionId) {
    setAppState((current) => {
      const key = `${examId}:${questionId}`;
      const next = { ...current.bookmarks };
      if (next[key]) delete next[key];
      else next[key] = { examId, questionId, savedAt: Date.now() };
      return { ...current, bookmarks: next };
    });
  }

  function startSession({ examId, mode, count }) {
    const session = createSession({ examId, mode, count });
    setAppState((current) => ({ ...current, activeSession: session }));
    return session;
  }

  function updateSession(mutator) {
    setAppState((current) => {
      if (!current.activeSession) return current;
      return { ...current, activeSession: mutator(current.activeSession) };
    });
  }

  function finishSession() {
    setAppState((current) => {
      const session = current.activeSession;
      if (!session) return current;
      const elapsedMs = getElapsedMs(session);
     const finished = {
  ...session,
  currentIndex: session.questionIds.length,
  elapsedMs,
  timerRunning: false,
  timerLastStartedAt: null,
  completedAt: Date.now(),
};

      const metrics = calculateSessionMetrics(finished);
      const summary = {
        sessionId: finished.id,
        examId: finished.examId,
        mode: finished.mode,
        completedAt: finished.completedAt,
        elapsedMs,
        score: metrics.correct.length,
        total: metrics.questions.length,
        percent: metrics.questions.length ? Math.round((metrics.correct.length / metrics.questions.length) * 100) : 0,
        missedQuestionIds: metrics.missed.map((question) => question.id),
        domains: metrics.byDomain,
      };
      return {
        ...current,
        activeSession: finished,
        lastSessionSummary: summary,
        history: [summary, ...current.history].slice(0, 12),
      };
    });
  }

  function clearSession() {
    setAppState((current) => ({ ...current, activeSession: null }));
  }

  return (
    <div className="shell">
      <button className="theme-toggle" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} type="button">
        {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
      </button>
      <Routes>
        <Route
          path="/"
          element={<Dashboard appState={appState} startSession={startSession} />}
        />
        <Route
          path="/certification/:certId"
          element={<CertificationRoute appState={appState} startSession={startSession} />}
        />
        <Route
          path="/session"
          element={appState.activeSession ? (
            <SessionPage
              appState={appState}
              updateSession={updateSession}
              finishSession={finishSession}
              clearSession={clearSession}
              toggleBookmark={toggleBookmark}
            />
          ) : <Navigate to="/" replace />}
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

function Dashboard({ appState, startSession }) {
  const navigate = useNavigate();
  const activeSession = appState.activeSession;
  const lastSummary = appState.lastSessionSummary;

  const progressCards = Object.entries(EXAMS).map(([examId, exam]) => {
    const relevant = appState.history.filter((entry) => entry.examId === examId);
    const domainTotals = {};
    relevant.forEach((entry) => {
      Object.entries(entry.domains || {}).forEach(([domain, stats]) => {
        const bucket = domainTotals[domain] || { total: 0, correct: 0 };
        bucket.total += stats.total;
        bucket.correct += stats.correct;
        domainTotals[domain] = bucket;
      });
    });
    const topDomain = Object.entries(domainTotals)
      .sort((a, b) => (b[1].correct / Math.max(b[1].total, 1)) - (a[1].correct / Math.max(a[1].total, 1)))[0];

    return {
      examId,
      label: `${exam.title} (${exam.code})`,
      attempts: relevant.length,
      topDomain,
    };
  });

  return (
    <main className="page dashboard-page">
      <section className="hero dashboard-hero">
        <div>
          <p className="eyebrow">Premium dashboard / dark-first</p>
          <h1>Build recall, not fake confidence.</h1>
          <p className="hero-copy">
            Start fast, resume exactly where you left off, and see domain progress without turning the screen into a cockpit.
          </p>
        </div>
        <div className="hero-stat-card">
          <span className="badge">Live now</span>
          <h2>A+ Certification</h2>
          <p>Network+ and Security+ stay visible, but honestly marked as coming soon.</p>
        </div>
      </section>

      <section className="priority-grid">
        <div className="panel panel-large">
          <div className="section-head">
            <h2>Certifications</h2>
            <p>A+ is live. The others can wait until they deserve daylight.</p>
          </div>
          <div className="cert-grid">
            {certificationCatalog.map((certification) => (
              <article key={certification.id} className={`cert-card ${certification.status !== 'live' ? 'disabled' : ''}`}>
                <div className="card-topline">
                  <span className="badge">{certification.status === 'live' ? 'Live' : 'Coming soon'}</span>
                  <h3>{certification.label}</h3>
                </div>
                <p>{certification.tagline}</p>
                {certification.status === 'live' ? (
                  <div className="card-actions">
                    <Link to={`/certification/${certification.id}`} className="primary-btn button-link">Start studying</Link>
                    <button type="button" className="secondary-btn" onClick={() => {
                      startSession({ examId: 'core1', mode: 'study', count: 25 });
                      navigate('/session');
                    }}>
                      Fast start
                    </button>
                  </div>
                ) : (
                  <div className="coming-soon-note">Visible now. Not pretending it’s ready.</div>
                )}
              </article>
            ))}
          </div>
        </div>

        <div className="panel">
          <div className="section-head">
            <h2>Resume last session</h2>
            <p>Exact state restore, including skips, flags, and paused timer state.</p>
          </div>
          {activeSession ? (
            <div className="resume-card">
              <strong>{EXAMS[activeSession.examId].title} • {activeSession.mode === 'exam' ? 'Exam Mode' : 'Study Mode'}</strong>
              <p>Question {activeSession.currentIndex + 1} of {activeSession.questionIds.length}</p>
              <button className="primary-btn" type="button" onClick={() => navigate('/session')}>Resume session</button>
            </div>
          ) : lastSummary ? (
            <div className="resume-card muted-card">
              <strong>Last completed: {EXAMS[lastSummary.examId].title}</strong>
              <p>{lastSummary.percent}% • {formatDuration(lastSummary.elapsedMs)}</p>
            </div>
          ) : (
            <div className="empty-card">No saved session yet.</div>
          )}
        </div>
      </section>

      <section className="panel">
        <div className="section-head">
          <h2>Progress by domain</h2>
          <p>Both percentages and raw counts, because pretty numbers alone are bullshit.</p>
        </div>
        <div className="progress-domain-grid">
          {progressCards.map((card) => (
            <article key={card.examId} className="domain-progress-card">
              <h3>{card.label}</h3>
              <p>{card.attempts ? `${card.attempts} saved attempt${card.attempts === 1 ? '' : 's'}` : 'No history yet'}</p>
              {card.topDomain ? (
                <div>
                  <strong>{card.topDomain[0]}</strong>
                  <p>
                    {Math.round((card.topDomain[1].correct / Math.max(card.topDomain[1].total, 1)) * 100)}% • {card.topDomain[1].correct}/{card.topDomain[1].total} correct
                  </p>
                </div>
              ) : (
                <p>Progress appears after real sessions, not fake placeholder stats.</p>
              )}
            </article>
          ))}
        </div>
      </section>

      <section className="secondary-grid">
        <div className="panel">
          <div className="section-head">
            <h2>Recent activity</h2>
            <p>Useful, but secondary.</p>
          </div>
          <div className="stack-list">
            {appState.history.length ? appState.history.slice(0, 5).map((item) => (
              <div key={item.sessionId} className="stack-item">
                <strong>{EXAMS[item.examId].title} • {item.percent}%</strong>
                <span>{item.score}/{item.total} correct • {formatDuration(item.elapsedMs)}</span>
              </div>
            )) : <div className="empty-card">No activity yet.</div>}
          </div>
        </div>

        <div className="panel">
          <div className="section-head">
            <h2>Bookmarks</h2>
            <p>Saved locally in the browser for now.</p>
          </div>
          <div className="stack-list">
            {Object.values(appState.bookmarks).length ? Object.values(appState.bookmarks).slice(0, 5).map((bookmark) => (
              <div key={`${bookmark.examId}:${bookmark.questionId}`} className="stack-item">
                <strong>{EXAMS[bookmark.examId].title}</strong>
                <span>Question #{bookmark.questionId}</span>
              </div>
            )) : <div className="empty-card">No bookmarked questions yet.</div>}
          </div>
        </div>
      </section>
    </main>
  );
}

function CertificationRoute({ appState, startSession }) {
  const { certId } = useParams();
  const certification = certificationCatalog.find((item) => item.id === certId);
  if (!certification || certification.status !== 'live') return <Navigate to="/" replace />;
  return <CertificationPage certification={certification} appState={appState} startSession={startSession} />;
}

function CertificationPage({ certification, appState, startSession }) {
  const navigate = useNavigate();

  return (
    <main className="page">
      <Link to="/" className="back-link">← Back to dashboard</Link>
      <section className="panel panel-large">
        <div className="section-head">
          <div>
            <span className="badge">Certification</span>
            <h1>{certification.label}</h1>
          </div>
          <p>{certification.tagline}</p>
        </div>

        <div className="exam-card-grid">
          {certification.exams.map((examMeta) => {
            const exam = EXAMS[examMeta.id];
            const bookmarkCount = Object.values(appState.bookmarks).filter((bookmark) => bookmark.examId === examMeta.id).length;
            return (
              <article key={examMeta.id} className="exam-setup-card">
                <div>
                  <span className="badge">{examMeta.badge}</span>
                  <h2>{examMeta.label}</h2>
                  <p className="exam-code">{examMeta.code}</p>
                  <p>{exam.description}</p>
                  <p className="muted-copy">{exam.questions.length} questions • bookmarks: {bookmarkCount}</p>
                </div>

                <div className="preset-row">
                  {QUESTION_PRESETS.map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      className="preset-chip"
                      onClick={() => {
                        startSession({ examId: examMeta.id, mode: 'study', count: preset });
                        navigate('/session');
                      }}
                    >
                      {preset === 75 ? 'Full exam' : preset}
                    </button>
                  ))}
                </div>

                <div className="mode-actions">
                  <button
                    type="button"
                    className="primary-btn"
                    onClick={() => {
                      startSession({ examId: examMeta.id, mode: 'study', count: 25 });
                      navigate('/session');
                    }}
                  >
                    Start Study Mode
                  </button>
                  <div className="inline-secondary-actions">
                    <button
                      type="button"
                      className="secondary-btn"
                      onClick={() => {
                        startSession({ examId: examMeta.id, mode: 'exam', count: 75 });
                        navigate('/session');
                      }}
                    >
                      Full Exam Mode
                    </button>
                    <button
                      type="button"
                      className="secondary-btn"
                      onClick={() => {
                        startSession({ examId: examMeta.id, mode: 'review', count: 25 });
                        navigate('/session');
                      }}
                    >
                      Missed Review
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </main>
  );
}

function SessionPage({ appState, updateSession, finishSession, clearSession, toggleBookmark }) {
  const navigate = useNavigate();
  const session = appState.activeSession;
  const exam = EXAMS[session.examId];
  const questions = session.questionIds.map((id) => exam.questions.find((question) => question.id === id)).filter(Boolean);
  const metrics = calculateSessionMetrics(session);
  const current = questions[session.currentIndex];
  const isReviewMode = session.mode === 'review';
  const isExamMode = session.mode === 'exam';
  const isStudyMode = session.mode === 'study';
  const isComplete = !!session.completedAt || session.currentIndex >= questions.length || !current;
  const progress = questions.length ? (session.currentIndex / questions.length) * 100 : 0;
  const selectedLetter = current ? session.answers[current.id]?.selectedLetter : null;
  const revealed = current ? (isStudyMode ? !!session.answers[current.id] : !!session.revealedCurrent) : false;
  const elapsed = getElapsedMs(session);

  useEffect(() => {
    if (!isExamMode) return undefined;
    const interval = window.setInterval(() => {
      updateSession((currentSession) => ({ ...currentSession }));
    }, 1000);
    return () => window.clearInterval(interval);
  }, [isExamMode, updateSession]);

  function answer(letter) {
    if (!current) return;
    updateSession((currentSession) => ({
      ...currentSession,
      answers: {
        ...currentSession.answers,
        [current.id]: {
          selectedLetter: letter,
          correct: letter === current.answer,
          answeredAt: Date.now(),
        },
      },
      revealedCurrent: currentSession.mode === 'exam' ? true : currentSession.revealedCurrent,
      skipped: { ...currentSession.skipped, [current.id]: false },
    }));
  }

  function next() {
    updateSession((currentSession) => ({
      ...currentSession,
      currentIndex: Math.min(currentSession.currentIndex + 1, currentSession.questionIds.length),
      revealedCurrent: false,
    }));
  }

  function skip() {
    if (!current) return;
    updateSession((currentSession) => ({
      ...currentSession,
      skipped: { ...currentSession.skipped, [current.id]: true },
      currentIndex: Math.min(currentSession.currentIndex + 1, currentSession.questionIds.length),
      revealedCurrent: false,
    }));
  }

  function toggleFlag() {
    if (!current) return;
    updateSession((currentSession) => ({
      ...currentSession,
      flagged: { ...currentSession.flagged, [current.id]: !currentSession.flagged[current.id] },
    }));
  }

  function submitExam() {
    finishSession();
  }

  if (isComplete) {
    const summary = appState.lastSessionSummary && appState.lastSessionSummary.sessionId === session.id
      ? appState.lastSessionSummary
      : null;

    return (
      <main className="page">
        <Link to="/" className="back-link">← Back to dashboard</Link>
        <section className="results-card panel-large">
          <span className="badge">{exam.title} • {session.mode === 'exam' ? 'Exam Mode' : session.mode === 'study' ? 'Study Mode' : 'Missed Review'}</span>
          <h1>Session complete</h1>
          <p className="score">{metrics.correct.length} / {metrics.questions.length}</p>
          <p>{summary ? `${summary.percent}% correct` : `${metrics.percent}% correct`} • {formatDuration(summary ? summary.elapsedMs : elapsed)}</p>

          <div className="result-grid">
            <div className="result-box">
              <h3>Missed questions</h3>
              <p>{metrics.missed.length}</p>
            </div>
            <div className="result-box">
              <h3>Flagged</h3>
              <p>{Object.values(session.flagged).filter(Boolean).length}</p>
            </div>
            <div className="result-box">
              <h3>Domains</h3>
              <p>{Object.keys(metrics.byDomain).length}</p>
            </div>
          </div>

          <div className="stack-list compact">
            {Object.entries(metrics.byDomain).map(([domain, stats]) => (
              <div key={domain} className="stack-item">
                <strong>{domain}</strong>
                <span>{Math.round((stats.correct / Math.max(stats.total, 1)) * 100)}% • {stats.correct}/{stats.total}</span>
              </div>
            ))}
          </div>

          <div className="post-exam-actions">
            <button type="button" className="primary-btn" onClick={() => {
              const reviewSession = createSession({ examId: session.examId, mode: 'review', count: Math.max(metrics.missed.length, 1) });
              reviewSession.questionIds = shuffle(metrics.missed.map((question) => question.id));
              updateSession(() => reviewSession);
            }}>
              Review missed questions
            </button>
            <button type="button" className="secondary-btn" onClick={() => {
              updateSession(() => createSession({ examId: session.examId, mode: session.mode, count: session.count }));
            }}>
              Retry whole exam
            </button>
            <button type="button" className="secondary-btn" onClick={() => {
              clearSession();
              navigate('/');
            }}>
              Return to dashboard
            </button>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="page">
      <Link to="/" className="back-link">← Back to dashboard</Link>
      <section className="quiz-shell panel-large">
        <div className="quiz-header">
          <div>
            <span className="badge">{exam.certification} • {exam.title} ({exam.code})</span>
            <h1>{isExamMode ? 'Exam Mode' : isReviewMode ? 'Missed Review' : 'Study Mode'}</h1>
            <p className="muted-copy">{exam.badge}</p>
          </div>
          <div className="session-meta">
            <strong>{isExamMode ? formatDuration(elapsed) : `${metrics.correct.length} correct so far`}</strong>
            <span>Question {session.currentIndex + 1} of {questions.length}</span>
          </div>
        </div>

        <div className="progress-row">
          <div className="progress-bar"><div className="progress-fill" style={{ width: `${progress}%` }} /></div>
          <p>{Object.values(session.skipped).filter(Boolean).length} skipped • {Object.values(session.flagged).filter(Boolean).length} flagged</p>
        </div>

        <article className="question-card">
          <div className="question-toolbar">
            <button type="button" className="ghost-btn" onClick={toggleFlag}>{session.flagged[current.id] ? '★ Flagged' : '☆ Flag question'}</button>
            <button type="button" className="ghost-btn" onClick={() => toggleBookmark(session.examId, current.id)}>
              {appState.bookmarks[`${session.examId}:${current.id}`] ? 'Saved' : 'Bookmark'}
            </button>
          </div>
          <h2>{current.question}</h2>
          <div className="options">
            {current.options.map((option) => {
              const letter = option[0];
              const className = [
                'option-btn',
                revealed && current.answer === letter ? 'correct' : '',
                revealed && selectedLetter === letter && current.answer !== letter ? 'incorrect' : '',
              ].filter(Boolean).join(' ');
              return (
                <button key={option} type="button" className={className} onClick={() => answer(letter)} disabled={isExamMode ? !!selectedLetter : false}>
                  {option}
                </button>
              );
            })}
          </div>
        </article>

        {(revealed || isStudyMode && selectedLetter) && (
          <section className="explanation-card">
            <p><strong>Correct answer:</strong> {current.answer}</p>
            <p>{current.explanation}</p>
            <div className="info-pills">
              <span className="info-pill">Domain: {current.domain}</span>
              <span className="info-pill">Objective: {current.objective}</span>
              {session.answers[current.id]?.selectedLetter && session.answers[current.id]?.selectedLetter !== current.answer ? (
                <span className="info-pill warn">Your answer: {session.answers[current.id]?.selectedLetter}</span>
              ) : null}
            </div>
          </section>
        )}

        <div className="nav-actions">
          <button type="button" className="secondary-btn" onClick={skip}>Pass for now</button>
          {isExamMode && !revealed ? (
            <button type="button" className="primary-btn" onClick={() => updateSession((currentSession) => ({ ...currentSession, revealedCurrent: true }))} disabled={!selectedLetter}>
              Check answer
            </button>
          ) : session.currentIndex + 1 >= questions.length ? (
            <button type="button" className="primary-btn" onClick={submitExam}>Finish session</button>
          ) : (
            <button type="button" className="primary-btn" onClick={next}>Next question</button>
          )}
        </div>
      </section>
    </main>
  );
}

export default App;
