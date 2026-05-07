import React, { useState, useEffect, useRef } from 'react';
import { MUSIC } from '../config';

/**
 * MusicPlayer
 * Props:
 *   triggerPlay (boolean) – kalau berubah jadi true, langsung play musik.
 *                           Di-set dari luar saat user klik "Buka Undangan".
 */
function MusicPlayer({ triggerPlay = false }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress,  setProgress]  = useState(0);
  const [toast,     setToast]     = useState('');
  const audioRef = useRef(null);

  /* ── Trigger dari tombol "Buka Undangan" ── */
  useEffect(() => {
    if (!triggerPlay) return;
    if (!MUSIC.enabled) return;
    const audio = audioRef.current;
    if (!audio) return;

    audio.play()
      .then(() => {
        setIsPlaying(true);
        showToast('Musik diputar 🎵');
      })
      .catch(() => {
        // Harusnya tidak terjadi karena ini dari interaksi user langsung
        showToast('Gagal memutar musik');
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [triggerPlay]);

  /* ── Progress bar ── */
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const update = () => {
      if (audio.duration) setProgress((audio.currentTime / audio.duration) * 100);
    };
    audio.addEventListener('timeupdate', update);
    return () => audio.removeEventListener('timeupdate', update);
  }, []);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 2500);
  };

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    try {
      if (isPlaying) {
        audio.pause();
        setIsPlaying(false);
        showToast('Musik dijeda ⏸');
      } else {
        await audio.play();
        setIsPlaying(true);
        showToast('Musik diputar 🎵');
      }
    } catch {
      showToast('Gagal memutar musik');
    }
  };

  const handleProgressClick = (e) => {
    const audio = audioRef.current;
    if (!audio || !audio.duration) return;
    const rect  = e.currentTarget.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    audio.currentTime = ratio * audio.duration;
  };

  /* ── Musik belum disetup ── */
  if (!MUSIC.enabled) {
    return (
      <>
        <button
          className="music-btn"
          onClick={() => showToast('Set enabled: true di config.js untuk memutar musik')}
          title="Setup musik di src/config.js"
        >
          🎵
        </button>
        <div className={`toast ${toast ? 'show' : ''}`}>{toast}</div>
      </>
    );
  }

  return (
    <>
      <audio ref={audioRef} loop preload="auto">
        <source src={MUSIC.src} type="audio/mpeg" />
      </audio>

      {/* ── Tombol musik + progress ── */}
      <div style={{
        position:      'fixed',
        bottom:        '28px',
        right:         '24px',
        zIndex:        200,
        display:       'flex',
        flexDirection: 'column',
        alignItems:    'center',
        gap:           '6px',
      }}>
        {/* Progress bar */}
        <div
          style={{
            width:        '52px',
            cursor:       'pointer',
            background:   'rgba(109,83,137,0.25)',
            borderRadius: '2px',
            height:       '3px',
          }}
          onClick={handleProgressClick}
        >
          <div style={{
            height:       '3px',
            background:   'var(--secondary)',
            borderRadius: '2px',
            width:        `${progress}%`,
            transition:   'width 0.5s linear',
          }} />
        </div>

        {/* Tombol play/pause */}
        <button
          className="music-btn"
          onClick={togglePlay}
          title={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? '⏸' : '▶'}
        </button>
      </div>

      <div className={`toast ${toast ? 'show' : ''}`}>{toast}</div>
    </>
  );
}

export default MusicPlayer;