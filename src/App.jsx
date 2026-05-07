import './gallery.css'; // tambah di App.jsx bagian paling atas import
import React, { useState, useEffect } from 'react';
import { WEDDING, BANKS, LOVE_STORY } from './config';


import CountDown   from './components/CountDown';
import MusicPlayer from './components/MusicPlayer';
import RSVPForm    from './components/RSVPForm';
import GuestBook   from './components/GuestBook';
import Gallery     from './components/Gallery';

import {
  BotanicalDivider,
  PulseRings,
  CornerAccent,
} from './components/Decorations';

/* ────────────────────────────────────────────
   Komponen dekoratif lokal (tidak ada di file
   Decorations.jsx sehingga didefinisikan di sini)
──────────────────────────────────────────── */
function FloralDivider() {
  return (
    <div style={{
      display:        'flex',
      alignItems:     'center',
      justifyContent: 'center',
      gap:            '12px',
      margin:         '16px 0',
      opacity:        0.45,
    }}>
      <div style={{ height: '1px', width: '48px', background: 'var(--primary)' }} />
      <span style={{ color: 'var(--primary)', fontSize: '18px', letterSpacing: '6px' }}>✿ ✦ ✿</span>
      <div style={{ height: '1px', width: '48px', background: 'var(--primary)' }} />
    </div>
  );
}

function FlowerCorner({ style }) {
  return (
    <svg
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ position: 'absolute', pointerEvents: 'none', opacity: 0.08, ...style }}
      aria-hidden="true"
    >
      <circle cx="60" cy="60" r="30" stroke="#44213d" strokeWidth="0.6" />
      <path d="M60 10 Q80 40 60 60 Q40 40 60 10Z" stroke="#44213d" strokeWidth="0.5" />
      <path d="M110 60 Q80 80 60 60 Q80 40 110 60Z" stroke="#44213d" strokeWidth="0.5" />
      <path d="M60 110 Q40 80 60 60 Q80 80 60 110Z" stroke="#44213d" strokeWidth="0.5" />
      <path d="M10 60 Q40 40 60 60 Q40 80 10 60Z" stroke="#44213d" strokeWidth="0.5" />
    </svg>
  );
}

/* ────────────────────────────────────────────
   Kelopak jatuh
──────────────────────────────────────────── */
function FallingPetals() {
  const petals = Array.from({ length: 10 }, (_, i) => i);
  return (
    <div style={{
      position:      'fixed',
      inset:         0,
      pointerEvents: 'none',
      zIndex:        0,
      overflow:      'hidden',
    }}>
      {petals.map((i) => (
        <div
          key={i}
          style={{
            position:        'absolute',
            top:             '-10%',
            left:            `${(i * 10) + Math.random() * 5}%`,
            fontSize:        `${14 + (i % 4) * 4}px`,
            animation:       `petalFall ${6 + (i % 5)}s linear ${i * 0.8}s infinite`,
            opacity:         0.4,
          }}
        >
          {['🌸', '🌺', '✿', '❀'][i % 4]}
        </div>
      ))}
    </div>
  );
}

/* ────────────────────────────────────────────
   Nav Items
──────────────────────────────────────────── */
const NAV_ITEMS = [
  { id: 'cover',   label: 'Beranda', icon: '🏠' },
  { id: 'info',    label: 'Acara',   icon: '📅' },
  { id: 'story',   label: 'Kisah',   icon: '💌' },
  { id: 'gallery', label: 'Galeri',  icon: '📸' },
  { id: 'rsvp',    label: 'RSVP',    icon: '✉️'  },
  { id: 'amplop',  label: 'Amplop',  icon: '💝' },
  { id: 'pesan',   label: 'Ucapan',  icon: '🌸' },
];

/* ────────────────────────────────────────────
   Main App
──────────────────────────────────────────── */
function App() {
  const [activeSection, setActiveSection] = useState('cover');
  const [storyIndex,    setStoryIndex]    = useState(0);
  const [copiedBank,    setCopiedBank]    = useState('');
  const [toast,         setToast]         = useState('');
  const [menuOpen,      setMenuOpen]      = useState(false);

  // ── State untuk cover lock & music trigger ──
  const [isOpen,       setIsOpen]       = useState(false); // false = undangan belum dibuka
  const [playMusic,    setPlayMusic]    = useState(false); // trigger ke MusicPlayer

  /* ── Kunci / buka scroll body saat cover ── */
  useEffect(() => {
    if (!isOpen) {
      // Kunci scroll: sembunyikan overflow body DAN html
      document.body.style.overflow    = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow    = '';
      document.documentElement.style.overflow = '';
    }
    return () => {
      document.body.style.overflow    = '';
      document.documentElement.style.overflow = '';
    };
  }, [isOpen]);

  /* ── Active section via IntersectionObserver ── */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActiveSection(e.target.id); }),
      { threshold: 0.3 }
    );
    document.querySelectorAll('section[id]').forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const scrollTo  = (id)  => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };
  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(''), 2500); };

  /* ── Handler tombol "Buka Undangan" ── */
  const handleBukaUndangan = () => {
    setIsOpen(true);      // buka scroll
    setPlayMusic(true);   // trigger musik
    scrollTo('info');     // scroll ke section info
  };

  const copyNorek = (norek) => {
    navigator.clipboard.writeText(norek)
      .then(() => {
        setCopiedBank(norek);
        showToast(`Nomor ${norek} berhasil disalin ✓`);
        setTimeout(() => setCopiedBank(''), 2500);
      })
      .catch(() => showToast('Silakan salin manual 🙏'));
  };

  const prevStory = () => setStoryIndex((i) => (i - 1 + LOVE_STORY.length) % LOVE_STORY.length);
  const nextStory = () => setStoryIndex((i) => (i + 1) % LOVE_STORY.length);

  return (
    <>
      <FallingPetals />

      {/* ══════════════ NAVIGASI TOP (Desktop) ══════════════════ */}
      <nav className="topbar">
        <span className="brand">
          {WEDDING.mempelai1.split(' ').slice(0, 2).join(' ')} &amp; {WEDDING.mempelai2.split(' ').slice(0, 2).join(' ')}
        </span>
        <div className="nav-links">
          {NAV_ITEMS.map((n) => (
            <a
              key={n.id}
              className={activeSection === n.id ? 'active' : ''}
              onClick={() => scrollTo(n.id)}
            >
              {n.label}
            </a>
          ))}
        </div>
        {/* Hamburger mobile */}
        <button
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          {menuOpen ? '✕' : '☰'}
        </button>
      </nav>

      {/* ── Drawer mobile ── */}
      {menuOpen && (
        <div className="mobile-drawer">
          {NAV_ITEMS.map((n) => (
            <a
              key={n.id}
              className={activeSection === n.id ? 'active' : ''}
              onClick={() => scrollTo(n.id)}
            >
              <span>{n.icon}</span> {n.label}
            </a>
          ))}
        </div>
      )}

      {/* ════════════════ COVER ═══════════════════════════════════ */}
      <section id="cover">
        <PulseRings />
        <CornerAccent style={{ top: 60,  left:  20, width: 100, height: 100 }} />
        <CornerAccent style={{ top: 60,  right: 20, width: 100, height: 100 }} />
        <CornerAccent style={{ bottom: 60, left: 20, width:  80, height:  80 }} />
        <CornerAccent style={{ bottom: 60, right: 20, width: 80, height:  80 }} />

        <div className="fade-up" style={{ textAlign: 'center', zIndex: 1, position: 'relative', padding: '0 16px' }}>
          <p style={{ fontFamily: 'serif', fontSize: 'clamp(20px, 5vw, 28px)', letterSpacing: '6px', color: 'var(--secondary)', marginBottom: '24px', opacity: 0.7 }}>
            ﷽
          </p>

          <p className="subtitle">Undangan Pernikahan</p>

          <h1 style={{ fontFamily: "'Cormorant Garamond', var(--font-display), serif", fontSize: 'clamp(36px, 10vw, 72px)', fontWeight: 400, color: 'var(--primary)', lineHeight: 1.1 }}>
            {WEDDING.mempelai1.split(' ').slice(0, 2).join(' ')}
          </h1>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', margin: '8px 0' }}>
            <div style={{ height: '1px', width: '48px', background: 'linear-gradient(to right, transparent, var(--primary))', opacity: 0.4 }} />
            <p style={{ fontFamily: 'serif', fontSize: 'clamp(22px, 5vw, 32px)', color: 'var(--secondary)', fontStyle: 'italic' }}>&amp;</p>
            <div style={{ height: '1px', width: '48px', background: 'linear-gradient(to left, transparent, var(--primary))', opacity: 0.4 }} />
          </div>

          <h1 style={{ fontFamily: "'Cormorant Garamond', var(--font-display), serif", fontSize: 'clamp(36px, 10vw, 72px)', fontWeight: 400, color: 'var(--primary)', lineHeight: 1.1 }}>
            {WEDDING.mempelai2.split(' ').slice(0, 2).join(' ')}
          </h1>

          <div style={{ margin: '28px 0 20px' }}>
            <FloralDivider />
          </div>

          <p style={{ fontSize: 'clamp(10px, 2vw, 12px)', letterSpacing: '4px', color: 'var(--secondary)', marginBottom: '4px', fontWeight: 500 }}>
            {new Date(WEDDING.tanggal + 'T00:00:00').toLocaleDateString('id-ID', {
              day: '2-digit', month: 'long', year: 'numeric',
            })}
          </p>
          <p style={{ color: 'var(--on-surface-variant)', fontSize: '12px', marginBottom: '36px', letterSpacing: '2px' }}>
            Makassar, Sulawesi Selatan
          </p>

          {/* ── Tombol Buka Undangan → trigger musik + unlock scroll ── */}
          <button className="btn-filled" onClick={handleBukaUndangan}>
            Buka Undangan
          </button>
        </div>
      </section>

      {/* ════════════════ INFO ACARA ══════════════════════════════ */}
      <section id="info">
        <FlowerCorner style={{ top: 0, right: 0, width: 120, height: 120 }} />
        <FlowerCorner style={{ bottom: 0, left: 0, width:  90, height:  90 }} />

        <p className="subtitle">Detail Acara</p>
        <h2>Hari Bahagia Kami</h2>
        <FloralDivider />

        <div className="card-soft" style={{ maxWidth: '480px', width: '100%', textAlign: 'center', marginBottom: '24px', marginTop: '8px' }}>
          <p style={{ fontSize: '13px', color: 'var(--on-surface-variant)', lineHeight: 1.9 }}>
            Dengan memohon rahmat dan ridho Allah SWT, kami mengundang Bapak/Ibu/Saudara/i
            untuk hadir dalam pernikahan putra-putri kami:
          </p>
        </div>

        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <p style={{ fontFamily: 'serif', fontSize: '14px', fontStyle: 'italic', color: 'var(--on-surface-variant)', marginBottom: '2px' }}>
            {WEDDING.ayah1} &amp; {WEDDING.ibu1}
          </p>
          <span style={{ fontSize: '9px', letterSpacing: '3px', color: 'var(--secondary)', display: 'block', marginBottom: '4px', fontWeight: 700 }}>PUTRA KE-1</span>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(22px, 5vw, 30px)', fontStyle: 'italic', color: 'var(--primary)' }}>
            {WEDDING.mempelai1}
          </p>

          <p style={{ fontSize: '22px', letterSpacing: '8px', color: 'var(--secondary)', opacity: 0.5, margin: '10px 0' }}>✿ ✦ ✿</p>

          <p style={{ fontFamily: 'serif', fontSize: '14px', fontStyle: 'italic', color: 'var(--on-surface-variant)', marginBottom: '2px' }}>
            {WEDDING.ayah2} &amp; {WEDDING.ibu2}
          </p>
          <span style={{ fontSize: '9px', letterSpacing: '3px', color: 'var(--secondary)', display: 'block', marginBottom: '4px', fontWeight: 700 }}>PUTRI KE-1</span>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(22px, 5vw, 30px)', fontStyle: 'italic', color: 'var(--primary)' }}>
            {WEDDING.mempelai2}
          </p>
        </div>

        <CountDown />

        {/* Jadwal */}
        <div className="grid-2" style={{ marginTop: '24px', width: '100%', maxWidth: '560px' }}>
          {[
            { icon: '🕌', label: 'AKAD NIKAH', ...WEDDING.akad  },
            { icon: '🎊', label: 'RESEPSI',    ...WEDDING.resepsi },
          ].map((s) => (
            <div key={s.label} className="card" style={{ textAlign: 'center', borderRadius: '12px' }}>
              <div style={{ fontSize: '28px', marginBottom: '10px' }}>{s.icon}</div>
              <p style={{ fontSize: '9px', letterSpacing: '2px', color: 'var(--secondary)', marginBottom: '8px', fontWeight: 700 }}>
                {s.label}
              </p>
              <p style={{ fontFamily: 'serif', fontSize: 'clamp(16px, 3vw, 20px)', color: 'var(--primary)', marginBottom: '4px' }}>
                {s.tanggal}
              </p>
              <p style={{ color: 'var(--on-surface-variant)', fontSize: '13px' }}>{s.waktu}</p>
            </div>
          ))}
        </div>

        {/* Lokasi */}
        <div className="card" style={{ maxWidth: '520px', width: '100%', marginTop: '14px', textAlign: 'center', borderRadius: '12px' }}>
          <div style={{ fontSize: '26px', marginBottom: '10px' }}>📍</div>
          <p style={{ fontSize: '9px', letterSpacing: '2px', color: 'var(--secondary)', marginBottom: '8px', fontWeight: 700 }}>LOKASI</p>
          <p style={{ fontFamily: 'serif', fontSize: 'clamp(18px, 4vw, 22px)', color: 'var(--primary)', marginBottom: '6px' }}>
            {WEDDING.venue}
          </p>
          <p style={{ color: 'var(--on-surface-variant)', fontSize: '13px', marginBottom: '16px' }}>
            {WEDDING.alamat}
          </p>
          <a
            href={WEDDING.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline"
            style={{ display: 'inline-block', textDecoration: 'none' }}
          >
            🗺️ Buka Google Maps
          </a>
        </div>
      </section>

      {/* ════════════════ KISAH CINTA ═════════════════════════════ */}
      <section id="story">
        <FlowerCorner style={{ top: 0, right: 0, width: 100, height: 100 }} />

        <p className="subtitle">Perjalanan Cinta</p>
        <h2>Kisah Kami</h2>
        <FloralDivider />

        <div style={{
          position:   'relative',
          maxWidth:   '520px',
          width:      '100%',
          background: 'var(--surface)',
          border:     '1px solid rgba(209,195,202,0.4)',
          borderRadius: '16px',
          padding:    'clamp(20px, 5vw, 36px)',
          overflow:   'hidden',
        }}>
          <div style={{
            position: 'absolute', top: -40, right: -40,
            width: 140, height: 140, borderRadius: '50%',
            background: 'rgba(196,181,253,0.1)',
            border: '1px solid rgba(196,181,253,0.2)',
            pointerEvents: 'none',
          }} />

          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', marginBottom: '14px' }}>
            <div style={{
              width: 54, height: 54, borderRadius: '50%',
              background: 'linear-gradient(135deg, var(--surface-container-low), var(--surface-container))',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '28px', flexShrink: 0,
              border: '1px solid var(--outline-variant)',
            }}>
              {LOVE_STORY[storyIndex].icon}
            </div>
            <div>
              <p style={{ fontSize: '9px', letterSpacing: '3px', color: 'var(--secondary)', fontWeight: 700 }}>
                {LOVE_STORY[storyIndex].tahun}
              </p>
              <p style={{ fontFamily: 'serif', fontSize: 'clamp(18px, 4vw, 24px)', color: 'var(--primary)', fontStyle: 'italic' }}>
                {LOVE_STORY[storyIndex].judul}
              </p>
            </div>
          </div>

          <p style={{ color: 'var(--on-surface-variant)', lineHeight: 1.85, fontSize: '14px' }}>
            {LOVE_STORY[storyIndex].cerita}
          </p>
        </div>

        {/* Dots */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', margin: '16px 0 14px' }}>
          {LOVE_STORY.map((_, i) => (
            <span
              key={i}
              className={`story-dot ${i === storyIndex ? 'active' : ''}`}
              onClick={() => setStoryIndex(i)}
            />
          ))}
        </div>

        {/* Navigasi */}
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
          <button className="btn-outline" onClick={prevStory}>← Sebelumnya</button>
          <button className="btn-outline" onClick={nextStory}>Selanjutnya →</button>
        </div>
      </section>

      {/* ════════════════ GALLERY ════════════════════════════════ */}
      <section id="gallery">
        <FlowerCorner style={{ top: 0, left: 0, width: 110, height: 110 }} />

        <p className="subtitle">Galeri Foto</p>
        <h2>Momen Berharga</h2>
        <FloralDivider />
        <Gallery />
      </section>

      {/* ════════════════ RSVP ═══════════════════════════════════ */}
      <section id="rsvp">
        <p className="subtitle">Konfirmasi Kehadiran</p>
        <h2>RSVP</h2>
        <FloralDivider />
        <p style={{ color: 'var(--on-surface-variant)', maxWidth: '420px', textAlign: 'center', fontSize: '14px', lineHeight: 1.85, marginBottom: '28px', marginTop: '8px' }}>
          Kehadiranmu adalah kebahagiaan terbesar kami. 🌸<br />
          Mohon konfirmasi paling lambat{' '}
          <strong style={{ color: 'var(--primary)' }}>{WEDDING.batasRsvp}</strong>.
        </p>
        <RSVPForm />
      </section>

      {/* ════════════════ AMPLOP DIGITAL ═════════════════════════ */}
      <section id="amplop">
        <FlowerCorner style={{ bottom: 20, right: 20, width: 100, height: 100 }} />

        <p className="subtitle">Amplop Digital</p>
        <h2>Hadiah &amp; Doa</h2>
        <FloralDivider />
        <p style={{ color: 'var(--on-surface-variant)', maxWidth: '440px', textAlign: 'center', fontSize: '14px', lineHeight: 1.85, marginBottom: '28px', marginTop: '8px' }}>
          Jika kamu berniat memberikan hadiah, kami sangat berterima kasih.<br />
          Doamu pun sudah lebih dari cukup. 🙏
        </p>

        <div style={{ width: '100%', maxWidth: '460px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {BANKS.map((b) => (
            <div key={b.bank} className="bank-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <span style={{ fontSize: '10px', letterSpacing: '3px', color: 'var(--secondary)', fontWeight: 700 }}>
                  {b.bank}
                </span>
                <span style={{
                  fontSize: '9px', color: '#fff',
                  background: 'var(--secondary)',
                  padding: '3px 10px', borderRadius: '20px', letterSpacing: '1px',
                }}>
                  Transfer
                </span>
              </div>
              <p style={{ fontFamily: 'serif', fontSize: 'clamp(20px, 5vw, 28px)', letterSpacing: '3px', color: 'var(--primary)', marginBottom: '4px' }}>
                {b.norek}
              </p>
              <p style={{ fontSize: '13px', color: 'var(--on-surface-variant)', marginBottom: '16px' }}>
                a.n. {b.atas}
              </p>
              <button
                className="btn-outline"
                style={{ fontSize: '11px' }}
                onClick={() => copyNorek(b.norek)}
              >
                {copiedBank === b.norek ? '✓ Tersalin!' : '📋 Salin Nomor'}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* ════════════════ UCAPAN ═════════════════════════════════ */}
      <section id="pesan">
        <p className="subtitle">Buku Tamu</p>
        <h2>Ucapan &amp; Doa</h2>
        <FloralDivider />
        <p style={{ color: 'var(--on-surface-variant)', maxWidth: '440px', textAlign: 'center', fontSize: '14px', lineHeight: 1.85, marginBottom: '28px', marginTop: '8px' }}>
          Tinggalkan ucapan dan doa terbaikmu untuk kami. 💌<br />
          Setiap kata-katamu akan kami simpan sebagai kenangan indah.
        </p>
        <GuestBook />
      </section>

      {/* ════════════════ FOOTER ════════════════════════════════ */}
      <footer className="footer-section">
        <p style={{ fontSize: '26px', letterSpacing: '10px', color: 'rgba(255,255,255,0.35)', marginBottom: '24px' }}>
          ✿ ✦ ✿
        </p>
        <p style={{
          fontFamily: 'serif',
          fontSize:   'clamp(14px, 3vw, 18px)',
          fontStyle:  'italic',
          color:      'rgba(255,255,255,0.88)',
          lineHeight: 2,
          maxWidth:   '520px',
          margin:     '0 auto 14px',
          textAlign:  'center',
          padding:    '0 16px',
        }}>
          "Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu
          istri-istri dari jenismu sendiri, supaya kamu cenderung dan merasa
          tenteram kepadanya..."
        </p>
        <p style={{ fontSize: '10px', color: 'rgba(255,255,255,0.5)', letterSpacing: '2px', marginBottom: '28px', textAlign: 'center' }}>
          QS. Ar-Rum: 21
        </p>

        <div style={{ width: '60px', height: '1px', background: 'rgba(255,255,255,0.2)', margin: '0 auto 20px' }} />

        <p style={{
          fontFamily: 'serif',
          fontSize:   'clamp(18px, 4vw, 22px)',
          fontStyle:  'italic',
          color:      'rgba(255,255,255,0.8)',
          letterSpacing: '2px',
          textAlign:  'center',
        }}>
          {WEDDING.mempelai1} &amp; {WEDDING.mempelai2}
        </p>
        <p style={{ fontSize: '10px', color: 'rgba(255,255,255,0.4)', letterSpacing: '3px', marginTop: '6px', textAlign: 'center' }}>
          {WEDDING.tanggal.split('-').reverse().join('.')}
        </p>
      </footer>

      {/* triggerPlay dikirim ke MusicPlayer */}
      <MusicPlayer triggerPlay={playMusic} />

      {toast && <div className="toast show">{toast}</div>}
    </>
  );
}

export default App;