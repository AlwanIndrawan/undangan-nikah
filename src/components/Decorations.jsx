import React from 'react';

/* ══════════════════════════════════════════════════════
   DECORATIONS — Modern Cinematic Bugis Heritage
   ══════════════════════════════════════════════════════ */

/* ── Gold divider dengan motif Sulapa Eppa (segi empat Bugis) ── */
export function BotanicalDivider() {
  return (
    <div style={{
      display: 'flex', alignItems: 'center',
      gap: '12px', margin: '16px 0', width: '100%', maxWidth: '360px',
    }}>
      <div style={{
        flex: 1, height: '1px',
        background: 'linear-gradient(to right, transparent, rgba(201,168,76,0.5))',
      }} />
      {/* Sulapa Eppa — simbol empat penjuru arah Bugis (belah ketupat) */}
      <svg viewBox="0 0 40 40" width="28" height="28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <polygon
          points="20,4 36,20 20,36 4,20"
          stroke="rgba(201,168,76,0.7)"
          strokeWidth="1"
          fill="none"
        />
        <polygon
          points="20,10 30,20 20,30 10,20"
          stroke="rgba(201,168,76,0.4)"
          strokeWidth="0.8"
          fill="none"
        />
        <circle cx="20" cy="20" r="2.5" fill="rgba(201,168,76,0.6)" />
      </svg>
      <div style={{
        flex: 1, height: '1px',
        background: 'linear-gradient(to left, transparent, rgba(201,168,76,0.5))',
      }} />
    </div>
  );
}

/* ── Label kecil uppercase ── */
export function SectionLabel({ children }) {
  return (
    <p style={{
      fontFamily:    'Poppins, sans-serif',
      fontSize:      '10px',
      letterSpacing: '0.4em',
      textTransform: 'uppercase',
      fontWeight:    600,
      color:         'rgba(201,168,76,0.8)',
      textAlign:     'center',
      marginBottom:  '16px',
    }}>
      {children}
    </p>
  );
}

/* ── Garis tipis ── */
export function HeadingRule() {
  return (
    <div style={{
      width: '48px', height: '1px',
      background: 'rgba(201,168,76,0.3)',
      margin: '16px auto 0',
    }} />
  );
}

/* ── Ornamen sudut Bugis (motif garis geometrik premium) ── */
export function BugisCornerAccent({ style }) {
  return (
    <svg
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ position: 'absolute', pointerEvents: 'none', ...style }}
      aria-hidden="true"
    >
      {/* Garis tepi sudut */}
      <path d="M8 8 L8 52" stroke="rgba(201,168,76,0.35)" strokeWidth="1" />
      <path d="M8 8 L52 8" stroke="rgba(201,168,76,0.35)" strokeWidth="1" />
      {/* Garis kedua (lebih dalam) */}
      <path d="M16 16 L16 44" stroke="rgba(201,168,76,0.18)" strokeWidth="0.7" />
      <path d="M16 16 L44 16" stroke="rgba(201,168,76,0.18)" strokeWidth="0.7" />
      {/* Titik pojok */}
      <circle cx="8" cy="8" r="2" fill="rgba(201,168,76,0.5)" />
      <circle cx="16" cy="16" r="1.2" fill="rgba(201,168,76,0.3)" />
    </svg>
  );
}

/* ── Alias lama agar App.jsx tidak error ── */
export function CornerAccent({ style }) {
  return <BugisCornerAccent style={style} />;
}

/* ── Sulapa Eppa besar (dekorasi background section) ── */
export function SulapaEppa({ style }) {
  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ position: 'absolute', pointerEvents: 'none', ...style }}
      aria-hidden="true"
    >
      {/* Belah ketupat besar */}
      <polygon points="100,10 190,100 100,190 10,100"
        stroke="rgba(201,168,76,0.08)" strokeWidth="0.8" fill="none" />
      {/* Lapisan 2 */}
      <polygon points="100,30 170,100 100,170 30,100"
        stroke="rgba(201,168,76,0.06)" strokeWidth="0.6" fill="none" />
      {/* Lapisan 3 kecil */}
      <polygon points="100,60 140,100 100,140 60,100"
        stroke="rgba(201,168,76,0.05)" strokeWidth="0.5" fill="none" />
      {/* Garis silang */}
      <line x1="100" y1="10" x2="100" y2="190" stroke="rgba(201,168,76,0.04)" strokeWidth="0.5" />
      <line x1="10"  y1="100" x2="190" y2="100" stroke="rgba(201,168,76,0.04)" strokeWidth="0.5" />
    </svg>
  );
}

/* ── Motif border Bugis (horizontal divider) ── */
export function BugisDividerLine() {
  return (
    <div style={{
      display: 'flex', alignItems: 'center',
      justifyContent: 'center', gap: '8px',
      margin: '20px 0', width: '100%', maxWidth: '400px',
    }}>
      {/* Kiri */}
      <div style={{ flex:1, height:'1px', background:'linear-gradient(to right,transparent,rgba(201,168,76,0.4))' }} />
      {/* Motif Sulapa Eppa kecil 3x */}
      {[0,1,2].map(i => (
        <svg key={i} viewBox="0 0 16 16" width="10" height="10" fill="none">
          <polygon points="8,1 15,8 8,15 1,8"
            stroke={`rgba(201,168,76,${0.6 - i * 0.15})`}
            strokeWidth="1" fill="none" />
        </svg>
      ))}
      {/* Kanan */}
      <div style={{ flex:1, height:'1px', background:'linear-gradient(to left,transparent,rgba(201,168,76,0.4))' }} />
    </div>
  );
}

/* ── Pulse rings (cover) — warna gold/purple ── */
export function PulseRings() {
  return (
    <>
      <div className="cover-pulse-ring" style={{
        width: 520, height: 520,
        top: '50%', left: '50%',
        transform: 'translate(-50%,-50%)',
        border: '1px solid rgba(201,168,76,0.08)',
      }} />
      <div className="cover-pulse-ring" style={{
        width: 380, height: 380,
        top: '50%', left: '50%',
        transform: 'translate(-50%,-50%)',
        animationDelay: '1s',
        border: '1px solid rgba(120,80,200,0.1)',
      }} />
      <div className="cover-pulse-ring" style={{
        width: 240, height: 240,
        top: '50%', left: '50%',
        transform: 'translate(-50%,-50%)',
        animationDelay: '2s',
        border: '1px solid rgba(201,168,76,0.12)',
      }} />
    </>
  );
}

/* ── Floating gold particles ── */
export function FloatingParticles() {
  const particles = Array.from({ length: 18 }, (_, i) => ({
    id: i,
    left: `${5 + (i * 5.2) % 90}%`,
    delay: `${(i * 0.7) % 8}s`,
    duration: `${7 + (i % 5) * 1.5}s`,
    size: i % 3 === 0 ? 3 : i % 3 === 1 ? 2 : 1.5,
    opacity: i % 2 === 0 ? 0.5 : 0.3,
  }));

  return (
    <div style={{
      position: 'fixed', inset: 0,
      pointerEvents: 'none', zIndex: 0, overflow: 'hidden',
    }}>
      {particles.map(p => (
        <div key={p.id} style={{
          position: 'absolute',
          bottom: '-5%',
          left: p.left,
          width: `${p.size}px`,
          height: `${p.size}px`,
          borderRadius: '50%',
          background: p.id % 3 === 0
            ? 'rgba(201,168,76,0.7)'
            : p.id % 3 === 1
              ? 'rgba(160,126,224,0.5)'
              : 'rgba(245,230,200,0.4)',
          animation: `particleDrift ${p.duration} linear ${p.delay} infinite`,
        }} />
      ))}
    </div>
  );
}

/* ── LeafDeco lama (tidak dipakai tapi disimpan agar tidak error) ── */
export function LeafDeco({ style }) { return null; }
export function BotanicalCurve()   { return null; }