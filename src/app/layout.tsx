import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Shashwat Srivastava",
  description: "Software Developer building complex systems and solving real problems.",
  icons: {
    icon: "/logo.svg",
  },
};

const BLUR_LAYERS = [
  { blur: "0.078125px", zIndex: 1, stop: [0, 12.5, 25, 37.5] },
  { blur: "0.15625px",  zIndex: 2, stop: [12.5, 25, 37.5, 50] },
  { blur: "0.3125px",   zIndex: 3, stop: [25, 37.5, 50, 62.5] },
  { blur: "0.625px",    zIndex: 4, stop: [37.5, 50, 62.5, 75] },
  { blur: "1.25px",     zIndex: 5, stop: [50, 62.5, 75, 87.5] },
  { blur: "2.5px",      zIndex: 6, stop: [62.5, 75, 87.5, 100] },
  { blur: "5px",        zIndex: 7, stop: [75, 87.5, 100, 100] },
  { blur: "10px",       zIndex: 8, stop: [87.5, 100, 100, 100] },
];

function mask([a, b, c, d]: number[]) {
  return `linear-gradient(to top, rgba(0,0,0,0) ${a}%, rgba(0,0,0,1) ${b}%, rgba(0,0,0,1) ${c}%, rgba(0,0,0,0) ${d}%)`;
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=satoshi@100,300,400,500,700&f[]=bespoke-serif@300,400,500,600,700&display=swap"
        />
      </head>
      <body
        suppressHydrationWarning
        style={{
          backgroundColor: "#0f0f0f",
          color: "hsl(0 0% 98%)",
          fontFamily: "'Satoshi', sans-serif",
          fontWeight: 100,
          minHeight: "100vh",
          WebkitFontSmoothing: "antialiased",
        }}
      >


        {/* Logo top left */}
        <a href="/" aria-label="Home" style={{
          position: "fixed",
          top: "1.25rem",
          left: "1.25rem",
          zIndex: 60,
          display: "block",
          width: "2rem",
          height: "2rem",
        }}>
          <img src="/logo.svg" alt="Shashwat Srivastava" style={{ width: "100%", height: "100%" }} />
        </a>

        {/* Frosted-glass top gradient */}
        <div
          aria-hidden="true"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            height: "10rem",
            zIndex: 50,
            pointerEvents: "none",
            userSelect: "none",
          }}
        >
          {BLUR_LAYERS.map((layer) => (
            <div
              key={layer.zIndex}
              style={{
                position: "absolute",
                inset: 0,
                zIndex: layer.zIndex,
                backdropFilter: `blur(${layer.blur})`,
                WebkitBackdropFilter: `blur(${layer.blur})`,
                maskImage: mask(layer.stop),
                WebkitMaskImage: mask(layer.stop),
                pointerEvents: "none",
              }}
            />
          ))}
        </div>

        {/* Noise texture */}
        <div
          aria-hidden="true"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 10,
            pointerEvents: "none",
            backgroundImage: "url('/images/noise.png')",
            backgroundSize: "128px",
            backgroundRepeat: "repeat",
            opacity: 0.06,
          }}
        />

        {children}
      </body>
    </html>
  );
}