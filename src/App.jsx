import './gallery.css';
import React, { useState, useEffect, useRef } from 'react';
import { WEDDING, BANKS, LOVE_STORY, MEMPELAI } from './config';
import BrideGroomSection from './components/BrideGroomSection';

import CountDown   from './components/CountDown';
import MusicPlayer from './components/MusicPlayer';
import RSVPForm    from './components/RSVPForm';
import GuestBook   from './components/GuestBook';
import Gallery     from './components/Gallery';

import {
  BotanicalDivider,
  BugisDividerLine,
  PulseRings,
  CornerAccent,
  SulapaEppa,
  FloatingParticles,
} from './components/Decorations';

/* ════════════════════════════════════════════════
   KOMPONEN LOKAL
════════════════════════════════════════════════ */

/* ── Divider utama (gold + Sulapa Eppa) ── */
function GoldDivider() {
  return <BotanicalDivider />;
}

/* ── Divider section ── */
function SectionDivider() {
  return <BugisDividerLine />;
}

/* ── Ornamen sudut dengan motif Bugis ── */
function BugisCorner({ style }) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ position: 'absolute', pointerEvents: 'none', ...style }}
      aria-hidden="true"
    >
      <path d="M6 6 L6 42" stroke="rgba(201,168,76,0.3)" strokeWidth="1" />
      <path d="M6 6 L42 6" stroke="rgba(201,168,76,0.3)" strokeWidth="1" />
      <path d="M14 14 L14 36" stroke="rgba(201,168,76,0.15)" strokeWidth="0.6" />
      <path d="M14 14 L36 14" stroke="rgba(201,168,76,0.15)" strokeWidth="0.6" />
      {/* Sulapa Eppa kecil */}
      <polygon points="6,6 12,6 6,12" fill="rgba(201,168,76,0.25)" />
      <circle cx="6" cy="6" r="2" fill="rgba(201,168,76,0.5)" />
    </svg>
  );
}

/* ── NAV ITEMS ── */
const NAV_ITEMS = [
  { id: 'cover',   label: 'Beranda', icon: '🏠' },
  { id: 'info',    label: 'Acara',   icon: '📅' },
  { id: 'story',   label: 'Kisah',   icon: '💌' },
  { id: 'gallery', label: 'Galeri',  icon: '📸' },
  { id: 'rsvp',    label: 'RSVP',    icon: '✉️'  },
  { id: 'amplop',  label: 'Amplop',  icon: '💝' },
  { id: 'pesan',   label: 'Ucapan',  icon: '🌸' },
];

/* ════════════════════════════════════════════════
   MAIN APP
════════════════════════════════════════════════ */
function App() {
  const [activeSection, setActiveSection] = useState('cover');
  const [storyIndex,    setStoryIndex]    = useState(0);
  const [copiedBank,    setCopiedBank]    = useState('');
  const [toast,         setToast]         = useState('');
  const [menuOpen,      setMenuOpen]      = useState(false);
  const [isOpen,        setIsOpen]        = useState(false);
  const [playMusic,     setPlayMusic]     = useState(false);
  const [autoScrolling, setAutoScrolling] = useState(false);

  const autoScrollRef = useRef(null);

  /* ── Kunci scroll saat cover masih tampil ── */
  useEffect(() => {
    if (!isOpen) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [isOpen]);

  /* ── IntersectionObserver untuk active nav ── */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActiveSection(e.target.id); }),
      { threshold: 0.3 }
    );
    document.querySelectorAll('section[id]').forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  /* ── Stop auto scroll saat user scroll manual ── */
  useEffect(() => {
    if (!autoScrolling) return;

    const stopScroll = () => {
      cancelAnimationFrame(autoScrollRef.current);
      setAutoScrolling(false);
    };

    window.addEventListener('wheel',     stopScroll, { passive: true });
    window.addEventListener('touchmove', stopScroll, { passive: true });
    window.addEventListener('keydown',   stopScroll);

    return () => {
      window.removeEventListener('wheel',     stopScroll);
      window.removeEventListener('touchmove', stopScroll);
      window.removeEventListener('keydown',   stopScroll);
    };
  }, [autoScrolling]);

  /* ── Fungsi auto scroll ── */
  const startAutoScroll = () => {
    if (autoScrollRef.current) cancelAnimationFrame(autoScrollRef.current);

    setAutoScrolling(true);

    const speed = 0.55; // px per frame — ubah nilai ini untuk atur kecepatan

    const step = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (window.scrollY >= maxScroll) {
        setAutoScrolling(false);
        return;
      }
      window.scrollBy(0, speed);
      autoScrollRef.current = requestAnimationFrame(step);
    };

    autoScrollRef.current = requestAnimationFrame(step);
  };

  const scrollTo  = (id) => {
    // Jika sedang auto scroll, hentikan dulu
    if (autoScrollRef.current) {
      cancelAnimationFrame(autoScrollRef.current);
      setAutoScrolling(false);
    }
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(''), 2500); };

  const handleBukaUndangan = () => {
    setIsOpen(true);
    setPlayMusic(true);

    // Scroll ke section info dulu, lalu mulai auto scroll
    const target = document.getElementById('info');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
      // Tunggu smooth scroll selesai (~900ms) baru mulai auto scroll
      setTimeout(() => {
        startAutoScroll();
      }, 950);
    }
  };

  const handleStopAutoScroll = () => {
    cancelAnimationFrame(autoScrollRef.current);
    setAutoScrolling(false);
  };

  const copyNorek = (norek) => {
    navigator.clipboard.writeText(norek)
      .then(() => { setCopiedBank(norek); showToast(`Nomor ${norek} disalin ✓`); setTimeout(() => setCopiedBank(''), 2500); })
      .catch(() => showToast('Silakan salin manual 🙏'));
  };

  const prevStory = () => setStoryIndex((i) => (i - 1 + LOVE_STORY.length) % LOVE_STORY.length);
  const nextStory = () => setStoryIndex((i) => (i + 1) % LOVE_STORY.length);

  /* ── warna teks & label umum ── */
  const T  = { color: 'var(--text-primary)' };
  const T2 = { color: 'var(--text-secondary)' };
  const TG = { color: 'var(--gold)' };

  return (
    <>
      <FloatingParticles />

      {/* ══════════════ NAV ══════════════════════════════════════ */}
      <nav className="topbar">
        <span className="brand">
          {WEDDING.mempelai1.split(' ')[0]} &amp; {WEDDING.mempelai2.split(' ')[0]}
        </span>
        <div className="nav-links">
          {NAV_ITEMS.map((n) => (
            <a key={n.id} className={activeSection === n.id ? 'active' : ''} onClick={() => scrollTo(n.id)}>
              {n.label}
            </a>
          ))}
        </div>
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
          {menuOpen ? '✕' : '☰'}
        </button>
      </nav>

      {menuOpen && (
        <div className="mobile-drawer">
          {NAV_ITEMS.map((n) => (
            <a key={n.id} className={activeSection === n.id ? 'active' : ''} onClick={() => scrollTo(n.id)}>
              <span>{n.icon}</span> {n.label}
            </a>
          ))}
        </div>
      )}

      {/* ══════════════ COVER ════════════════════════════════════ */}
      <section id="cover">
        {/* Background motif Sulapa Eppa besar */}
        <SulapaEppa style={{ width: 600, height: 600, top: '50%', left: '50%', transform: 'translate(-50%,-50%)', opacity: 1 }} />

        {/* Glow effect */}
        <div style={{
          position: 'absolute', width: '500px', height: '500px',
          borderRadius: '50%', top: '50%', left: '50%',
          transform: 'translate(-50%,-50%)',
          background: 'radial-gradient(circle, rgba(120,80,200,0.12) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        <PulseRings />

        {/* Sudut ornamen */}
        <BugisCorner style={{ top: 80,  left:  20, width: 80, height: 80 }} />
        <BugisCorner style={{ top: 80,  right: 20, width: 80, height: 80, transform: 'scaleX(-1)' }} />
        <BugisCorner style={{ bottom: 80, left: 20, width: 70, height: 70, transform: 'scaleY(-1)' }} />
        <BugisCorner style={{ bottom: 80, right: 20, width: 70, height: 70, transform: 'scale(-1,-1)' }} />

        {/* Konten cover */}
        <div className="fade-up" style={{ textAlign: 'center', zIndex: 1, position: 'relative', padding: '0 20px' }}>
          {/* Basmallah */}
          <p style={{
            fontFamily: 'serif', fontSize: 'clamp(22px, 5vw, 30px)',
            letterSpacing: '4px', color: 'rgba(201,168,76,0.6)',
            marginBottom: '28px',
          }}>
            ﷽
          </p>

          {/* Label */}
          <p style={{
            fontFamily: 'Poppins, sans-serif', fontSize: '9px',
            letterSpacing: '0.5em', textTransform: 'uppercase',
            fontWeight: 600, color: 'rgba(201,168,76,0.7)',
            marginBottom: '20px',
          }}>
            Undangan Pernikahan
          </p>

          {/* Nama Pengantin */}
          <h1 style={{
            fontFamily: "'Cinzel', serif",
            fontSize: 'clamp(32px, 9vw, 68px)',
            fontWeight: 400, letterSpacing: '0.08em',
            color: 'var(--champagne)',
            lineHeight: 1.1,
            textShadow: '0 0 40px rgba(201,168,76,0.2)',
          }}>
            {WEDDING.mempelai1.split(' ').slice(0, 2).join(' ')}
          </h1>

          {/* & dengan garis emas */}
          <div style={{
            display: 'flex', alignItems: 'center',
            justifyContent: 'center', gap: '16px', margin: '10px 0',
          }}>
            <div style={{ height: '1px', width: '60px', background: 'linear-gradient(to right, transparent, rgba(201,168,76,0.5))' }} />
            <p style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(24px, 5vw, 36px)',
              color: 'var(--gold)', fontStyle: 'italic',
            }}>&amp;</p>
            <div style={{ height: '1px', width: '60px', background: 'linear-gradient(to left, transparent, rgba(201,168,76,0.5))' }} />
          </div>

          <h1 style={{
            fontFamily: "'Cinzel', serif",
            fontSize: 'clamp(32px, 9vw, 68px)',
            fontWeight: 400, letterSpacing: '0.08em',
            color: 'var(--champagne)',
            lineHeight: 1.1,
            textShadow: '0 0 40px rgba(201,168,76,0.2)',
          }}>
            {WEDDING.mempelai2.split(' ').slice(0, 2).join(' ')}
          </h1>

          {/* Divider Sulapa Eppa */}
          <div style={{ display: 'flex', justifyContent: 'center', margin: '24px 0 20px' }}>
            <GoldDivider />
          </div>

          {/* Tanggal */}
          <p style={{
            fontSize: 'clamp(10px,2vw,12px)', letterSpacing: '0.4em',
            color: 'rgba(201,168,76,0.8)', marginBottom: '4px', fontWeight: 600,
            fontFamily: 'Poppins, sans-serif', textTransform: 'uppercase',
          }}>
            {new Date(WEDDING.tanggal + 'T00:00:00').toLocaleDateString('id-ID', {
              day: '2-digit', month: 'long', year: 'numeric',
            })}
          </p>
          <p style={{ ...T2, fontSize: '11px', marginBottom: '36px', letterSpacing: '0.2em', fontFamily: 'Poppins, sans-serif' }}>
            Makassar, Sulawesi Selatan
          </p>

          {/* Tombol */}
          <button className="btn-filled" onClick={handleBukaUndangan}>
            Buka Undangan
          </button>
        </div>
      </section>

      {/* ══════════════ INFO ACARA ════════════════════════════════ */}
      <section id="info">
        <SulapaEppa style={{ width: 400, height: 400, top: -80, right: -80, opacity: 1 }} />
        <BugisCorner style={{ top: 20, left: 20, width: 70, height: 70 }} />
        <BugisCorner style={{ top: 20, right: 20, width: 70, height: 70, transform: 'scaleX(-1)' }} />

        <p className="subtitle">Detail Acara</p>
        <h2>Hari Bahagia Kami</h2>
        <div style={{ display: 'flex', justifyContent: 'center', margin: '16px 0' }}>
          <SectionDivider />
        </div>

        {/* Kalimat undangan */}
        <div className="card-soft" style={{ maxWidth: '500px', width: '100%', textAlign: 'center', marginBottom: '28px' }}>
          <p style={{ ...T2, fontSize: '13px', lineHeight: 1.9, fontFamily: 'Poppins, sans-serif' }}>
            Dengan memohon rahmat dan ridho Allah SWT, kami mengundang Bapak/Ibu/Saudara/i untuk
            hadir dalam pernikahan putra-putri kami:
          </p>
        </div>

        {/* Nama lengkap + orang tua — BrideGroomSection */}
        <BrideGroomSection mempelai={MEMPELAI} />

        <CountDown />

        {/* Jadwal */}
        <div className="grid-2" style={{ marginTop: '28px', width: '100%', maxWidth: '560px' }}>
          {[
            { icon: '🕌', label: 'Akad Nikah', ...WEDDING.akad  },
            { icon: '🎊', label: 'Resepsi',    ...WEDDING.resepsi },
          ].map((s) => (
            <div key={s.label} className="card" style={{ textAlign: 'center', borderRadius: '14px' }}>
              <div style={{ fontSize: '28px', marginBottom: '10px' }}>{s.icon}</div>
              <p style={{ ...TG, fontSize: '9px', letterSpacing: '0.25em', marginBottom: '8px', fontWeight: 700, fontFamily: 'Poppins, sans-serif', textTransform: 'uppercase' }}>
                {s.label}
              </p>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(16px,3vw,20px)', ...T, marginBottom: '4px' }}>
                {s.tanggal}
              </p>
              <p style={{ ...T2, fontSize: '13px', fontFamily: 'Poppins, sans-serif' }}>{s.waktu}</p>
            </div>
          ))}
        </div>

        {/* Lokasi */}
        <div className="card" style={{ maxWidth: '520px', width: '100%', marginTop: '14px', textAlign: 'center', borderRadius: '14px' }}>
          <div style={{ fontSize: '24px', marginBottom: '10px' }}>📍</div>
          <p style={{ ...TG, fontSize: '9px', letterSpacing: '0.25em', marginBottom: '8px', fontWeight: 700, fontFamily: 'Poppins, sans-serif', textTransform: 'uppercase' }}>
            Lokasi
          </p>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(18px,4vw,22px)', ...T, marginBottom: '6px' }}>
            {WEDDING.venue}
          </p>
          <p style={{ ...T2, fontSize: '13px', marginBottom: '16px', fontFamily: 'Poppins, sans-serif' }}>
            {WEDDING.alamat}
          </p>
          <a href={WEDDING.mapsUrl} target="_blank" rel="noopener noreferrer"
            className="btn-outline" style={{ display: 'inline-block', textDecoration: 'none' }}>
            🗺️ Buka Google Maps
          </a>
        </div>
      </section>

      {/* ══════════════ KISAH CINTA ═══════════════════════════════ */}
      <section id="story">
        <SulapaEppa style={{ width: 350, height: 350, bottom: -60, left: -60, opacity: 1 }} />

        <p className="subtitle">Perjalanan Cinta</p>
        <h2>Kisah Kami</h2>
        <div style={{ display: 'flex', justifyContent: 'center', margin: '16px 0' }}>
          <SectionDivider />
        </div>

        {/* Story card */}
        <div style={{
          position: 'relative', maxWidth: '520px', width: '100%',
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(201,168,76,0.2)',
          borderRadius: '16px',
          padding: 'clamp(20px,5vw,36px)',
          backdropFilter: 'blur(12px)',
          overflow: 'hidden',
        }}>
          {/* Corner accent dalam card */}
          <div style={{
            position: 'absolute', top: -40, right: -40,
            width: 130, height: 130, borderRadius: '50%',
            background: 'rgba(120,80,200,0.07)',
            border: '1px solid rgba(160,126,224,0.15)',
            pointerEvents: 'none',
          }} />

          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', marginBottom: '14px' }}>
            {/* Icon tahun */}
            <div style={{
              width: 54, height: 54, borderRadius: '50%',
              background: 'linear-gradient(135deg, rgba(201,168,76,0.15), rgba(120,80,200,0.1))',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '26px', flexShrink: 0,
              border: '1px solid rgba(201,168,76,0.25)',
              boxShadow: '0 0 12px rgba(201,168,76,0.1)',
            }}>
              {LOVE_STORY[storyIndex].icon}
            </div>
            <div>
              <p style={{ ...TG, fontSize: '9px', letterSpacing: '0.3em', fontWeight: 700, fontFamily: 'Poppins, sans-serif', textTransform: 'uppercase', marginBottom: '4px' }}>
                {LOVE_STORY[storyIndex].tahun}
              </p>
              <p style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 'clamp(18px, 4vw, 24px)',
                color: 'var(--champagne)', fontStyle: 'italic',
              }}>
                {LOVE_STORY[storyIndex].judul}
              </p>
            </div>
          </div>

          <p style={{ ...T2, lineHeight: 1.9, fontSize: '14px', fontFamily: 'Poppins, sans-serif' }}>
            {LOVE_STORY[storyIndex].cerita}
          </p>
        </div>

        {/* Dots */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', margin: '18px 0 14px' }}>
          {LOVE_STORY.map((_, i) => (
            <span key={i} className={`story-dot ${i === storyIndex ? 'active' : ''}`} onClick={() => setStoryIndex(i)} />
          ))}
        </div>

        {/* Navigasi */}
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
          <button className="btn-outline" onClick={prevStory}>← Sebelumnya</button>
          <button className="btn-outline" onClick={nextStory}>Selanjutnya →</button>
        </div>
      </section>

      {/* ══════════════ GALLERY ═══════════════════════════════════ */}
      <section id="gallery">
        <SulapaEppa style={{ width: 300, height: 300, top: -40, right: -40, opacity: 1 }} />
        <BugisCorner style={{ top: 20, left: 20, width: 65, height: 65 }} />

        <p className="subtitle">Galeri Foto</p>
        <h2>Momen Berharga</h2>
        <div style={{ display: 'flex', justifyContent: 'center', margin: '16px 0 24px' }}>
          <SectionDivider />
        </div>
        <Gallery />
      </section>

      {/* ══════════════ RSVP ══════════════════════════════════════ */}
      <section id="rsvp">
        <p className="subtitle">Konfirmasi Kehadiran</p>
        <h2>RSVP</h2>
        <div style={{ display: 'flex', justifyContent: 'center', margin: '16px 0' }}>
          <SectionDivider />
        </div>
        <p style={{ ...T2, maxWidth: '420px', textAlign: 'center', fontSize: '13px', lineHeight: 1.85, marginBottom: '28px', fontFamily: 'Poppins, sans-serif' }}>
          Kehadiranmu adalah kebahagiaan terbesar kami. 🌸<br />
          Mohon konfirmasi paling lambat{' '}
          <strong style={TG}>{WEDDING.batasRsvp}</strong>.
        </p>
        <RSVPForm />
      </section>

      {/* ══════════════ AMPLOP DIGITAL ════════════════════════════ */}
      <section id="amplop">
        <SulapaEppa style={{ width: 350, height: 350, bottom: -60, right: -60, opacity: 1 }} />

        <p className="subtitle">Amplop Digital</p>
        <h2>Hadiah &amp; Doa</h2>
        <div style={{ display: 'flex', justifyContent: 'center', margin: '16px 0' }}>
          <SectionDivider />
        </div>
        <p style={{ ...T2, maxWidth: '440px', textAlign: 'center', fontSize: '13px', lineHeight: 1.85, marginBottom: '28px', fontFamily: 'Poppins, sans-serif' }}>
          Jika kamu berniat memberikan hadiah, kami sangat berterima kasih.<br />
          Doamu pun sudah lebih dari cukup. 🙏
        </p>

        <div style={{ width: '100%', maxWidth: '460px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {BANKS.map((b) => (
            <div key={b.bank} className="bank-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <span style={{ ...TG, fontSize: '11px', letterSpacing: '0.25em', fontWeight: 700, fontFamily: 'Poppins, sans-serif', textTransform: 'uppercase' }}>
                  {b.bank}
                </span>
                <span style={{
                  fontSize: '9px', color: '#0d0f1a',
                  background: 'linear-gradient(135deg, #c9a84c, #e8c87a)',
                  padding: '3px 12px', borderRadius: '20px', letterSpacing: '0.12em', fontWeight: 600,
                  fontFamily: 'Poppins, sans-serif',
                }}>
                  Transfer
                </span>
              </div>
              <p style={{
                fontFamily: "'Cinzel', serif", fontSize: 'clamp(18px, 5vw, 26px)',
                letterSpacing: '0.12em', color: 'var(--champagne)', marginBottom: '4px',
                textShadow: '0 0 12px rgba(201,168,76,0.2)',
              }}>
                {b.norek}
              </p>
              <p style={{ ...T2, fontSize: '12px', marginBottom: '16px', fontFamily: 'Poppins, sans-serif' }}>
                a.n. {b.atas}
              </p>
              <button className="btn-outline" style={{ fontSize: '11px' }} onClick={() => copyNorek(b.norek)}>
                {copiedBank === b.norek ? '✓ Tersalin!' : '📋 Salin Nomor'}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════ UCAPAN ════════════════════════════════════ */}
      <section id="pesan">
        <p className="subtitle">Buku Tamu</p>
        <h2>Ucapan &amp; Doa</h2>
        <div style={{ display: 'flex', justifyContent: 'center', margin: '16px 0' }}>
          <SectionDivider />
        </div>
        <p style={{ ...T2, maxWidth: '440px', textAlign: 'center', fontSize: '13px', lineHeight: 1.85, marginBottom: '28px', fontFamily: 'Poppins, sans-serif' }}>
          Tinggalkan ucapan dan doa terbaikmu untuk kami. 💌<br />
          Setiap kata-katamu akan kami simpan sebagai kenangan indah.
        </p>
        <GuestBook />
      </section>

      {/* ══════════════ FOOTER ════════════════════════════════════ */}
      <footer className="footer-section">
        {/* Sulapa Eppa footer */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '28px', opacity: 0.4 }}>
          <svg viewBox="0 0 60 60" width="40" height="40" fill="none">
            <polygon points="30,6 54,30 30,54 6,30" stroke="rgba(201,168,76,0.8)" strokeWidth="1" fill="none"/>
            <polygon points="30,14 46,30 30,46 14,30" stroke="rgba(201,168,76,0.5)" strokeWidth="0.7" fill="none"/>
            <circle cx="30" cy="30" r="3" fill="rgba(201,168,76,0.6)"/>
          </svg>
        </div>

        <p style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 'clamp(14px, 3vw, 17px)',
          fontStyle: 'italic',
          color: 'rgba(245,230,200,0.75)',
          lineHeight: 2, maxWidth: '520px',
          margin: '0 auto 14px', textAlign: 'center', padding: '0 16px',
        }}>
          "Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu
          istri-istri dari jenismu sendiri, supaya kamu cenderung dan merasa
          tenteram kepadanya..."
        </p>
        <p style={{ fontSize: '10px', color: 'rgba(201,168,76,0.45)', letterSpacing: '0.2em', marginBottom: '28px', textAlign: 'center', fontFamily: 'Poppins, sans-serif' }}>
          QS. AR-RUM : 21
        </p>

        <div style={{ width: '60px', height: '1px', background: 'rgba(201,168,76,0.2)', margin: '0 auto 20px' }} />

        <p style={{
          fontFamily: "'Cinzel', serif",
          fontSize: 'clamp(18px, 4vw, 22px)',
          letterSpacing: '0.12em',
          color: 'var(--champagne)',
          textAlign: 'center',
          textShadow: '0 0 20px rgba(201,168,76,0.25)',
        }}>
          {WEDDING.mempelai1} &amp; {WEDDING.mempelai2}
        </p>
        <p style={{ fontSize: '10px', color: 'rgba(201,168,76,0.4)', letterSpacing: '0.3em', marginTop: '6px', textAlign: 'center', fontFamily: 'Poppins, sans-serif', textTransform: 'uppercase' }}>
          {WEDDING.tanggal.split('-').reverse().join('.')}
        </p>
      </footer>

      <MusicPlayer triggerPlay={playMusic} />

      {/* ══════════════ TOMBOL STOP AUTO SCROLL ══════════════════ */}
      {autoScrolling && (
        <button
          onClick={handleStopAutoScroll}
          style={{
            position: 'fixed', bottom: '80px', right: '20px', zIndex: 999,
            background: 'rgba(13,15,26,0.85)',
            border: '1px solid rgba(201,168,76,0.4)',
            color: 'var(--gold)', borderRadius: '50px',
            padding: '9px 18px', fontSize: '11px',
            letterSpacing: '0.15em', cursor: 'pointer',
            backdropFilter: 'blur(10px)',
            fontFamily: 'Poppins, sans-serif',
            fontWeight: 600,
            boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
            transition: 'opacity 0.3s',
          }}
        >
          ⏸ Stop Scroll
        </button>
      )}

      {toast && <div className="toast show">{toast}</div>}
    </>
  );
}

export default App;