'use client';

import { useEffect, useState, type ReactNode } from 'react';
import Image from 'next/image';
import { CornerVine, RosePetal } from './hero-decor';
import { Gift, PartyPopper, Phone, Truck, UserRoundPlus } from 'lucide-react';

const TOTAL_SLIDES = 5;

/** Redes oficiales y teléfono de Rosa Pasión (bloque izquierdo del hero). */
const SOCIAL_LINKS = [
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/rosapasion_tarapoto/',
    path: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z',
  },
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/Rosapasion',
    path: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z',
  },
  {
    label: 'TikTok',
    href: 'https://www.tiktok.com/@rosapasion.tarapoto',
    path: 'M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z',
  },
];
const PHONE_DISPLAY = '+51 952 226 282';
const PHONE_HREF = 'tel:+51952226282';

/** Paso a paso de la suscripción (franja inferior del hero). */
const STEPS_TITLE = '¿Cómo funciona tu suscripción?';
const STEPS = [
  {
    icon: UserRoundPlus,
    title: 'Te inscribes',
    text: 'Fácil desde nuestra web, sin recordar fechas.',
  },
  {
    icon: Truck,
    title: 'Llevamos la alegría',
    text: 'Ramos frescos cada 15 días en Tarapoto.',
  },
  {
    icon: Gift,
    title: 'Disfrutas más',
    text: 'Flores y beneficios en comercios aliados.',
  },
  {
    icon: PartyPopper,
    title: '¡Ya eres parte del club!',
    text: 'Flores, sorpresas y beneficios exclusivos.',
  },
];

/** Pétalos y hojas flotantes (posiciones en % del área del hero, tomadas de la referencia). */
const PETALS = [
  { left: 20.5, top: 7, rot: -30, size: 1 },
  { left: 7, top: 41, rot: 20, size: 0.8 },
  { left: 31, top: 52, rot: -40, size: 0.9 },
  { left: 58.5, top: 9, rot: 145, size: 0.75 },
  { left: 81.5, top: 61, rot: -25, size: 1 },
  { left: 87.5, top: 39, rot: 200, size: 0.85 },
  { left: 92, top: 16, rot: -20, size: 0.95 },
  { left: 17, top: 41, rot: 70, size: 0.65 },
  { left: 96, top: 49, rot: -110, size: 0.7 },
];

function LongArrow({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox='0 0 58 30'
      className={className}
      fill='none'
      aria-hidden='true'
    >
      <path d='M0 15h47' stroke='currentColor' strokeWidth='1.3' />
      <circle
        cx='43'
        cy='15'
        r='13.5'
        stroke='currentColor'
        strokeWidth='1.3'
      />
      <path
        d='M43 9.5 48.5 15 43 20.5'
        stroke='currentColor'
        strokeWidth='1.3'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}

/**
 * Palabras del título que se alternan. Cada una con su propio tracking;
 * el padding izquierdo igual al tracking compensa el espacio que deja tras la última letra
 * para que la palabra quede centrada.
 */
const TITLE_WORDS = [
  { text: 'Rosa', className: 'tracking-[0.14em] pl-[0.14em]' },
  { text: 'Pasión', className: 'tracking-[-0.025em]' },
  { text: 'Club', className: 'tracking-[0.14em] pl-[0.14em]' },
];
/** Inicio del título: un poco antes de que acabe la aparición de lianas y pétalos (~1.4 s, ver globals.css), para que se solapen. */
const TITLE_START_DELAY_MS = 400;
const TITLE_INTERVAL_MS = 2200;
/** Escalonado (ms) entre letras al entrar y al salir, y pausa antes de que entre la nueva palabra. */
const LETTER_IN_STAGGER_MS = 60;
const LETTER_OUT_STAGGER_MS = 35;
const WORD_IN_DELAY_MS = 160;

export function HeroShowcase({
  catalogUrl,
  aside,
}: {
  catalogUrl: string;
  /** Contenido de la columna derecha (tarjeta de socio), elevado para formar la escalinata. */
  aside?: ReactNode;
}) {
  // index: palabra visible · prev: la que está saliendo · cycle: reinicia las animaciones en cada cambio
  // El título empieza oculto (index -1) y arranca cuando termina la aparición de lianas y pétalos;
  // desde ahí alterna sin pausa.
  const [title, setTitle] = useState({ index: -1, prev: -1, cycle: 0 });
  useEffect(() => {
    const advance = () =>
      setTitle((t) => ({
        index: (t.index + 1) % TITLE_WORDS.length,
        prev: t.index,
        cycle: t.cycle + 1,
      }));
    let interval: ReturnType<typeof setInterval> | undefined;
    const start = setTimeout(() => {
      advance();
      interval = setInterval(advance, TITLE_INTERVAL_MS);
    }, TITLE_START_DELAY_MS);
    return () => {
      clearTimeout(start);
      if (interval) clearInterval(interval);
    };
  }, []);

  const [slide, setSlide] = useState(1);
  const prev = () => setSlide((s) => (s <= 1 ? TOTAL_SLIDES : s - 1));
  const next = () => setSlide((s) => (s >= TOTAL_SLIDES ? 1 : s + 1));

  return (
    <section
      id='inicio'
      className='font-inter relative flex w-full flex-1 flex-col overflow-hidden bg-rp-cream text-[#110B0D]'
    >
      {/* Zona sobre la franja: lianas en las esquinas vacías (superior izquierda e inferior derecha) */}
      <div className='relative flex flex-1 flex-col'>
        <CornerVine className='hero-vine-reveal pointer-events-none absolute left-0 top-0 z-0 hidden w-[min(25vw,440px)] 2xl:w-[min(30vw,440px)] opacity-90 lg:block' />
        <CornerVine
          flip
          style={{ animationDelay: '250ms' }}
          className='hero-vine-reveal pointer-events-none absolute bottom-0 right-0 z-0 hidden w-[min(25vw,440px)] 2xl:w-[min(30vw,440px)] opacity-90 lg:block'
        />

        {/* ================= ÁREA PRINCIPAL ================= */}
        <div className='@container relative mx-auto flex w-full max-w-[1440px] flex-1 flex-col justify-center px-4 sm:px-8 lg:px-8 xl:px-12'>
          <div className='relative flex w-full flex-col items-center pb-10 pt-2 lg:block lg:h-[min(39.06cqw,484.4px)] lg:pb-0 lg:pt-0'>
            {/* Pétalos flotantes */}
            {PETALS.map((p, i) => (
              <RosePetal
                key={i}
                id={`hero-petal-${i}`}
                className={`${p.left < 50 ? 'hero-petal-from-left' : 'hero-petal-from-right'} pointer-events-none absolute hidden drop-shadow-[0_2px_2px_rgba(92,11,16,0.25)] lg:block`}
                style={{
                  // izquierda: aparecen de izquierda a derecha; derecha: de derecha a izquierda
                  animationDelay: `${150 + (p.left < 50 ? p.left : 100 - p.left) * 14}ms`,
                  left: `${p.left}%`,
                  top: `${p.top}%`,
                  width: `min(${1.5 * p.size}cqw, ${18.6 * p.size}px)`,
                  height: `min(${1.65 * p.size}cqw, ${20.5 * p.size}px)`,
                  transform: `rotate(${p.rot}deg)`,
                  opacity: 0.9,
                }}
              />
            ))}

            {/* Círculo rosa detrás del ramo */}
            <div
              aria-hidden='true'
              className='pointer-events-none absolute left-1/2 top-[11cqw] aspect-square w-[62vw] max-w-[300px] -translate-x-1/2 rounded-full bg-gradient-to-b from-[#F6BDCF] to-[#EFA6BE] lg:top-[min(1.7cqw,21.08px)] lg:w-[min(17cqw,210.8px)] lg:max-w-none'
            />

            {/* Título gigante */}
            <h1 className='font-display pointer-events-none relative z-10 select-none whitespace-nowrap text-center text-[15.5cqw] leading-[0.95] text-rp-wine lg:absolute lg:left-1/2 lg:-top-[min(0.8cqw,9.92px)] lg:-translate-x-1/2 lg:text-[min(14.2cqw,176.08px)] lg:leading-none'>
              <span className='sr-only'>Rosa Pasión Club</span>
              {/* Ambas palabras ocupan la misma celda: el ancho no cambia al alternar */}
              <span aria-hidden='true' className='inline-grid'>
                {TITLE_WORDS.map((word, i) => {
                  const state =
                    i === title.index
                      ? 'in'
                      : i === title.prev
                        ? 'out'
                        : 'hidden';
                  return (
                    <span
                      // la key cambia en cada ciclo para que las animaciones se reinicien
                      key={`${word.text}-${state === 'hidden' ? 'idle' : title.cycle}`}
                      className={`${word.className} col-start-1 row-start-1`}
                    >
                      {Array.from(word.text).map((char, j) => (
                        <span
                          key={j}
                          className={`hero-letter hero-letter-${state}`}
                          style={{
                            animationDelay:
                              state === 'in'
                                ? `${WORD_IN_DELAY_MS + j * LETTER_IN_STAGGER_MS}ms`
                                : state === 'out'
                                  ? `${j * LETTER_OUT_STAGGER_MS}ms`
                                  : undefined,
                          }}
                        >
                          {char}
                        </span>
                      ))}
                    </span>
                  );
                })}
              </span>
            </h1>

            {/* Ramo de rosas (fondo-hero.png) */}
            <div className='relative z-20 -mt-[9.5cqw] w-[70vw] max-w-[340px] lg:absolute lg:left-1/2 lg:top-[min(1.5cqw,18.6px)] lg:mt-0 lg:w-[min(30.5cqw,378.2px)] lg:max-w-none lg:-translate-x-1/2'>
              <Image
                src='/fondo-hero.png'
                alt='Ramo de rosas rojas'
                width={1134}
                height={1387}
                priority
                sizes='(min-width: 1024px) 30vw, 70vw'
                className='h-auto w-full rotate-20 drop-shadow-[0_18px_30px_rgba(147,48,84,0.18)]'
              />
            </div>

            {/* Bloque izquierdo */}
            <div className='relative z-20 mt-6 w-full max-w-md text-center lg:absolute lg:left-0 lg:top-[min(19.6cqw,243.04px)] lg:mt-0 lg:w-[min(31cqw,384.4px)] lg:max-w-none lg:text-left'>
              <h2 className='font-display text-[22px] leading-tight tracking-[-0.02em] text-[#110B0D] lg:text-[min(1.6cqw,19.84px)]'>
                Más que flores, una comunidad para ti
              </h2>
              <p className='mt-2 text-[15px] font-[450] leading-[1.45] text-[#1A1416] lg:mt-[min(0.8cqw,9.92px)] lg:text-[min(1.1cqw,13.64px)]'>
                Presenta tu tarjeta física o digital en cualquiera de nuestras
                marcas aliadas para disfrutar de descuentos y cortesías
                exclusivas por ser parte de Rosa Pasión Club.
              </p>

              <div className='mt-3 flex items-center justify-center gap-3 lg:mt-[min(1.1cqw,13.64px)] lg:justify-start lg:gap-[min(1.6cqw,19.84px)]'>
                {/* Redes sociales */}
                <div className='flex items-center gap-2 lg:gap-[min(0.6cqw,7.44px)]'>
                  {SOCIAL_LINKS.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target='_blank'
                      rel='noopener noreferrer'
                      aria-label={`${social.label} de Rosa Pasión`}
                      title={social.label}
                      className='flex h-8 w-8 items-center justify-center rounded-full border border-rp-wine/25 text-rp-wine transition hover:border-rp-logo hover:bg-rp-logo hover:text-white lg:h-[min(2.6cqw,32.24px)] lg:w-[min(2.6cqw,32.24px)]'
                    >
                      <svg
                        viewBox='0 0 24 24'
                        className='h-3.5 w-3.5 fill-current lg:h-[min(1.15cqw,14.26px)] lg:w-[min(1.15cqw,14.26px)]'
                        aria-hidden='true'
                      >
                        <path d={social.path} />
                      </svg>
                    </a>
                  ))}
                </div>

                {/* Teléfono */}
                <a
                  href={PHONE_HREF}
                  className='flex items-center gap-1.5 text-[13px] font-medium text-rp-ink transition hover:text-rp-logo lg:text-[min(1.05cqw,13.02px)]'
                >
                  <Phone className='h-3.5 w-3.5 text-rp-wine lg:h-[min(1.1cqw,13.64px)] lg:w-[min(1.1cqw,13.64px)]' />
                  <span>{PHONE_DISPLAY}</span>
                </a>
              </div>

              <div className='mt-3 flex items-center justify-center gap-3 lg:mt-[min(1.1cqw,13.64px)] lg:justify-start lg:gap-[min(0.9cqw,11.16px)]'>
                <a
                  href='#solicitar-membresia'
                  className='rounded-full bg-rp-wine px-5 py-2.5 text-[14px] font-semibold text-white transition hover:bg-rp-logo active:scale-95 lg:px-[min(1.25cqw,15.5px)] lg:py-[min(0.85cqw,10.54px)] lg:text-[min(1.1cqw,13.64px)]'
                >
                  Solicitar Membresía
                </a>
                <a
                  href={catalogUrl}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='group flex items-center gap-2 text-[13px] font-medium text-[#110B0D] lg:gap-[min(0.5cqw,6.2px)] lg:text-[min(1.02cqw,12.65px)]'
                >
                  <span>Catálogo</span>
                  <LongArrow className='h-7 w-14 transition-transform group-hover:translate-x-1 lg:h-[min(2.9cqw,35.96px)] lg:w-[min(5.6cqw,69.44px)]' />
                </a>
              </div>
            </div>

            {/* Columna derecha: tarjeta de socio. Escalinata: texto (abajo) → ramo (centro) → tarjeta (arriba) */}
            {aside && (
              <div className='relative z-30 mt-10 w-full max-w-sm lg:absolute lg:right-0 lg:top-[min(7cqw,86.8px)] lg:mt-0 lg:w-[min(25cqw,310px)] lg:max-w-none'>
                {aside}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ================= PASO A PASO DE LA SUSCRIPCIÓN ================= */}
      <div className='bg-rp-blush'>
        <ol className='@container mx-auto grid w-full max-w-[1440px] grid-cols-1 gap-x-6 gap-y-6 px-4 py-8 sm:grid-cols-2 sm:px-8 lg:grid-cols-[0.9fr_repeat(4,1fr)] lg:gap-x-[min(2cqw,28px)] lg:px-8 lg:py-[min(2cqw,24.8px)] xl:px-12'>
          {/* Título del proceso */}
          <li className='flex items-center sm:col-span-2 lg:col-span-1'>
            <h2 className='font-display text-[20px] leading-[1.1] tracking-[-0.01em] text-rp-wine lg:text-[min(1.6cqw,18px)]'>
              {STEPS_TITLE}
            </h2>
          </li>

          {STEPS.map(({ icon: Icon, title, text }, i) => (
            <li
              key={title}
              className='flex items-center gap-3 lg:border-l lg:border-rp-wine/15 lg:pl-[min(2cqw,28px)]'
            >
              <span className='relative flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-rp-wine text-rp-cream lg:h-[min(3.1cqw,40px)] lg:w-[min(3.1cqw,40px)]'>
                <Icon
                  className='h-[18px] w-[18px] lg:h-[min(1.6cqw,20px)] lg:w-[min(1.6cqw,20px)]'
                  strokeWidth={2}
                />
                <span className='absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-rp-cream text-[9px] font-bold text-rp-wine ring-1 ring-rp-wine/20'>
                  {i + 1}
                </span>
              </span>
              <div className='min-w-0'>
                <h3 className='text-[14px] font-semibold leading-tight text-rp-wine lg:text-[min(1.12cqw,14.5px)]'>
                  {title}
                </h3>
                <p className='mt-0.5 text-[12px] leading-snug text-rp-ink/75 lg:text-[min(0.95cqw,12.5px)]'>
                  {text}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
