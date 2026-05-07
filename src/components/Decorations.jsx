import React from 'react';

/* ── Garis pemisah botanical (dari Amethyst template) ── */
export function BotanicalDivider() {
  return (
    <div className="botanical-divider">
      <div className="line" />
      <span className="icon">✦</span>
      <span className="icon" style={{ fontSize: '14px' }}>❤</span>
      <span className="icon">✦</span>
      <div className="line" />
    </div>
  );
}

/* ── Label kecil uppercase di atas heading ── */
export function SectionLabel({ children }) {
  return (
    <p style={{
      fontFamily:    'Manrope, sans-serif',
      fontSize:      '11px',
      letterSpacing: '0.3em',
      textTransform: 'uppercase',
      fontWeight:    700,
      color:         'var(--secondary)',
      textAlign:     'center',
      marginBottom:  '16px',
    }}>
      {children}
    </p>
  );
}

/* ── Garis tipis bawah heading ── */
export function HeadingRule() {
  return (
    <div style={{
      width:      '48px',
      height:     '1px',
      background: 'rgba(122, 81, 112, 0.2)',
      margin:     '16px auto 0',
    }} />
  );
}

/* ── SVG ilustrasi daun sudut (dekoratif) ── */
export function LeafDeco({ style }) {
  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ position: 'absolute', pointerEvents: 'none', ...style }}
      aria-hidden="true"
    >
      <path
        d="M100 20C100 20 80 60 40 80C60 100 100 120 100 120C100 120 140 100 160 80C120 60 100 20 100 20Z"
        stroke="#7a5170"
        strokeWidth="0.6"
        opacity="0.18"
      />
      <path d="M100 120V180" stroke="#7a5170" strokeWidth="0.5" opacity="0.12" />
    </svg>
  );
}

/* ── SVG kurva botanical footer ── */
export function BotanicalCurve() {
  return (
    <svg
      viewBox="0 0 200 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: '200px', height: '40px', opacity: 0.3, display: 'block', margin: '0 auto' }}
      aria-hidden="true"
    >
      <path
        d="M0 20C40 20 60 5 100 20C140 35 160 20 200 20"
        stroke="#7a5170"
        strokeWidth="0.5"
      />
      <path d="M70 20L80 10M130 20L120 30" stroke="#7a5170" strokeWidth="0.5" />
      <circle cx="100" cy="20" r="3" fill="#7a5170" />
    </svg>
  );
}

/* ── Cincin animasi di cover (pulse ring) ── */
export function PulseRings() {
  return (
    <>
      <div className="cover-pulse-ring" style={{ width: 520, height: 520, top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }} />
      <div className="cover-pulse-ring" style={{ width: 380, height: 380, top: '50%', left: '50%', transform: 'translate(-50%,-50%)', animationDelay: '0.8s' }} />
      <div className="cover-pulse-ring" style={{ width: 240, height: 240, top: '50%', left: '50%', transform: 'translate(-50%,-50%)', animationDelay: '1.4s' }} />
    </>
  );
}

/* ── Corner accent SVG (top-right atau bottom-left) ── */
export function CornerAccent({ style }) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ position: 'absolute', pointerEvents: 'none', opacity: 0.1, ...style }}
      aria-hidden="true"
    >
      <path
        d="M10 90C30 70 40 30 90 10M10 90C10 50 50 10 90 10"
        stroke="#44213d"
        strokeWidth="0.6"
      />
      <circle cx="90" cy="10" r="2.5" fill="#44213d" />
    </svg>
  );
}