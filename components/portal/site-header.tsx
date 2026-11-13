"use client";

import { useState } from "react";
import Image from "next/image";
import { CircleArrowRight, Menu, Search, ShoppingBasket, X } from "lucide-react";

const NAV_LINKS = [
  { label: "Beneficios", href: "#directorio" },
  { label: "Aliados", href: "#directorio-negocios" },
  { label: "Comunidad", href: "#comunidad" },
  { label: "Membresía", href: "#solicitar-membresia" },
  { label: "Cómo canjear", href: "#como-canjear" },
];

/**
 * Enredadera decorativa (sobre las esquinas del menú).
 * Coordenadas en px: el borde izquierdo de la píldora queda en x=73 y su borde superior en y=32.
 * Nace fuera de la píldora (rizo + capullo), se apoya en la esquina y avanza sobre el borde
 * hacia el centro del menú, donde termina en una espiral curvada hacia dentro.
 */
const VINE_STEM = "#7C1314";
const LEAF_LIGHT = "#C8414A";
const LEAF_DARK = "#7C1314";

function Leaf({ x, y, angle, len, color, vein = false }: {
  x: number; y: number; angle: number; len: number; color: string; vein?: boolean;
}) {
  const w = len * 0.36;
  return (
    <g transform={`translate(${x} ${y}) rotate(${angle})`}>
      <path
        d={`M0 0C${len * 0.3} ${-w} ${len * 0.72} ${-w} ${len} 0C${len * 0.72} ${w} ${len * 0.3} ${w} 0 0Z`}
        fill={color}
      />
      {vein && <path d={`M${len * 0.12} 0L${len * 0.85} 0`} stroke="#F3D8D4" strokeWidth="0.45" />}
    </g>
  );
}

function Vine({ className = "", flip = false }: { className?: string; flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 160 42"
      className={className}
      fill="none"
      aria-hidden="true"
      style={flip ? { transform: "scaleX(-1)" } : undefined}
    >
      <g stroke={VINE_STEM} strokeWidth="0.75" strokeLinecap="round">
        {/* tallo principal: espiral interior → esquina de la píldora → rizo exterior */}
        <path d="M151 14C132 26 112 33 92 33 76 33 60 23 42 18 28 14 14 8 6 13 0 17 1 25 7 26" />
        {/* espiral interior (curva hacia dentro, sobre el menú) */}
        <path d="M151 14c3-2 4-6 1-8-2-2-6 0-5 3 1 2 3 2 4 0" />
        {/* segunda hebra paralela */}
        <path d="M64 24C84 31 112 30 147 11" />
        {/* espiral en la esquina de la píldora */}
        <path d="M62 22c5-1 10 1 10 6 0 4-5 5-6 2-1-2 1-3 3-2" />
        {/* zarcillo superior con espiral */}
        <path d="M30 15c3-3 4-8 7-10 3-2 6 1 4 3-1 2-3 1-3 0" />
        {/* zarcillo inferior con espiral */}
        <path d="M44 19c1 3 4 5 6 5 2 0 3-2 1-3-1-1-2 0-2 1" />
        {/* rizo exterior con capullo colgante */}
        <path d="M7 26c4 0 7 3 6 6-1 2-4 2-4 0 0-2 3-2 5 0 1 1 2 2 2 3" />
      </g>
      {/* capullo */}
      <path d="M16 35c-2 0-3 2-2 3 1 2 4 1 4-1 0-1-1-2-2-2Z" fill={LEAF_DARK} />
      {/* hoja verde en la esquina */}
      <Leaf x={64} y={33} angle={65} len={7} color="#BFC98F" />
      {/* hojas */}
      <Leaf x={24} y={11} angle={-70} len={6} color={LEAF_DARK} />
      <Leaf x={26} y={19} angle={-22} len={10} color={LEAF_LIGHT} vein />
      <Leaf x={55} y={22} angle={-25} len={5.5} color={LEAF_DARK} />
      <Leaf x={96} y={36} angle={-35} len={10} color={LEAF_LIGHT} vein />
      <Leaf x={104} y={28} angle={-15} len={5.5} color={LEAF_DARK} />
      <Leaf x={118} y={34} angle={-40} len={7} color={LEAF_DARK} />
      <Leaf x={133} y={21} angle={22} len={10} color={LEAF_LIGHT} vein />
      <Leaf x={141} y={18} angle={8} len={5.5} color={LEAF_DARK} />
    </svg>
  );
}

/** Ramo de flores de cerezo para la esquina superior derecha. */
function CornerBlossoms({ className = "" }: { className?: string }) {
  const flower = (cx: number, cy: number, r: number, fill: string) => (
    <g transform={`translate(${cx} ${cy})`}>
      {[0, 72, 144, 216, 288].map((a) => (
        <ellipse key={a} cx="0" cy={-r * 0.62} rx={r * 0.5} ry={r * 0.68} fill={fill} transform={`rotate(${a})`} />
      ))}
      <circle r={r * 0.24} fill="#F4D3A0" />
      <circle r={r * 0.1} fill="#C98A3B" />
    </g>
  );
  return (
    <svg viewBox="0 0 120 150" className={className} aria-hidden="true">
      <path
        d="M120 6C104 22 94 40 88 62s-12 42-26 58M96 44c-10 2-20 8-26 16M90 76c8 6 14 14 16 24"
        stroke="#C9A15B"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
      {flower(104, 22, 16, "#F3D9D4")}
      {flower(80, 50, 19, "#EBC4BE")}
      {flower(112, 64, 14, "#F3B9CB")}
      {flower(66, 88, 17, "#EFCFC9")}
      {flower(100, 104, 13, "#EBC4BE")}
      {flower(58, 122, 11, "#F3B9CB")}
      <ellipse cx="72" cy="58" rx="4" ry="6" fill="#EBC4BE" transform="rotate(-30 72 58)" />
      <ellipse cx="48" cy="138" rx="4" ry="6" fill="#EFCFC9" transform="rotate(20 48 138)" />
    </svg>
  );
}

export function SiteHeader({ catalogUrl }: { catalogUrl: string }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const focusSearch = () => {
    setMenuOpen(false);
    const input = document.getElementById("buscar-comercio") as HTMLInputElement | null;
    document.getElementById("directorio")?.scrollIntoView({ behavior: "smooth", block: "start" });
    setTimeout(() => input?.focus({ preventScroll: true }), 450);
  };

  return (
    <header className="font-inter relative z-50 bg-rp-cream text-[#1F1A1C]">
      {/* Flores decorativas en la esquina superior derecha */}
      <CornerBlossoms className="pointer-events-none absolute right-0 top-0 hidden h-[84px] w-[62px] translate-x-[30px] lg:block xl:h-[100px] xl:w-[74px] xl:translate-x-[28px] 2xl:h-[150px] 2xl:w-[110px] 2xl:translate-x-6" />
      {/* Pétalo / hoja flotante */}
      <span className="pointer-events-none absolute right-[170px] top-[84px] hidden h-2.5 w-2 -rotate-[35deg] rounded-[60%_0] bg-[#B8C48F]/80 lg:block" />

      <div className="relative mx-auto flex max-w-[1440px] items-center justify-between gap-3 px-4 pb-4 pt-6 sm:px-8 lg:px-8 lg:pb-5 lg:pt-[34px] xl:gap-4 xl:px-12">
        {/* LOGO */}
        <a href="#inicio" className="flex flex-shrink-0 items-center" aria-label="Rosa Pasión Club - Inicio">
          <Image
            src="/logo-horizontal.png"
            alt="Rosa Pasión Club - Flores y Detalles"
            width={2170}
            height={725}
            priority
            className="h-10 w-auto sm:h-11 xl:h-[50px]"
          />
        </a>

        {/* NAV PÍLDORA CON ENREDADERAS (desktop) */}
        <nav className="relative hidden lg:block" aria-label="Navegación principal">
          <ul className="relative flex items-center gap-[clamp(0.8rem,2.3vw,4.25rem)] rounded-full border border-rp-wine/45 bg-rp-cream px-5 py-[10px] xl:px-10 xl:py-[11px]">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="whitespace-nowrap text-[14px] font-medium xl:text-[15px] text-[#1F1A1C] transition-colors hover:text-rp-red"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          {/* Enredaderas por encima del borde de la píldora */}
          <Vine className="pointer-events-none absolute -left-[73px] -top-[32px] z-10 h-[42px] w-[160px]" />
          <Vine flip className="pointer-events-none absolute -right-[73px] -top-[32px] z-10 h-[42px] w-[160px]" />
        </nav>

        {/* ACCIONES */}
        <div className="flex flex-shrink-0 items-center gap-2 xl:gap-2.5">
          <a
            href="#solicitar-membresia"
            className="hidden items-center gap-1.5 rounded-full bg-rp-wine py-[6px] pl-4 pr-2 text-[14px] xl:gap-2 xl:py-[7px] xl:pl-5 xl:pr-2.5 xl:text-[15px] font-medium text-white shadow-sm transition hover:bg-rp-logo active:scale-95 sm:inline-flex"
          >
            <span>Ser Socio</span>
            <CircleArrowRight className="h-[22px] w-[22px] stroke-[1.75]" />
          </a>
          <a
            href={catalogUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-9 w-10 xl:w-11 items-center justify-center rounded-full border border-rp-line text-[#2B2427] transition hover:bg-rp-blush"
            aria-label="Ver catálogo"
            title="Catálogo Rosa Pasión"
          >
            <ShoppingBasket className="h-[18px] w-[18px] stroke-[1.75]" />
          </a>
          <button
            type="button"
            onClick={focusSearch}
            className="inline-flex h-9 w-10 xl:w-11 cursor-pointer items-center justify-center rounded-full border border-rp-line text-[#2B2427] transition hover:bg-rp-blush"
            aria-label="Buscar comercio o beneficio"
          >
            <Search className="h-[18px] w-[18px] stroke-[2]" />
          </button>
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            className="inline-flex h-9 w-10 xl:w-11 cursor-pointer items-center justify-center rounded-full border border-rp-line text-[#2B2427] transition hover:bg-rp-blush lg:hidden"
            aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X className="h-[18px] w-[18px]" /> : <Menu className="h-[18px] w-[18px]" />}
          </button>
        </div>
      </div>

      {/* MENÚ MÓVIL */}
      {menuOpen && (
        <div className="px-4 pb-4 sm:px-8 lg:hidden">
          <ul className="flex flex-col overflow-hidden rounded-3xl border border-rp-wine/45 bg-rp-cream">
            {NAV_LINKS.map((link) => (
              <li key={link.href} className="border-b border-[#EFDCD7] last:border-b-0">
                <a
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="block px-5 py-3 text-[15px] font-medium hover:bg-rp-blush"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li className="p-3 sm:hidden">
              <a
                href="#solicitar-membresia"
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-center gap-2 rounded-full bg-rp-wine py-2.5 text-[15px] font-medium text-white transition hover:bg-rp-logo"
              >
                <span>Ser Socio</span>
                <CircleArrowRight className="h-5 w-5 stroke-[1.75]" />
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
