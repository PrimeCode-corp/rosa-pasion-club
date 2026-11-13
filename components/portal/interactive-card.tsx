'use client';

import React, { useState } from 'react';
import { RotateCw } from 'lucide-react';

interface InteractiveCardProps {
  member: {
    id: string;
    code: string;
    cardNumber?: string | null;
    name: string;
    documentType?: string;
    documentNumber?: string | null;
    recipientName?: string | null;
    status: 'ACTIVA' | 'VENCIDA' | 'SUSPENDIDA';
    validFrom: string;
    validUntil: string;
    isCurrentlyActive: boolean;
    daysRemaining: number;
    hasPendingPayment?: boolean;
  } | null;
  onOpenRedeemModal?: () => void;
  onOpenRenewalModal?: () => void;
  /** Muestra la pista "Toca la tarjeta…" debajo de la tarjeta. */
  showHint?: boolean;
}

/** Duración del giro (referencia: public/references/card-transición.mp4, giro vertical de ~0.5–0.8 s). */
const FLIP_MS = 800;
const FLIP_EASING = 'cubic-bezier(0.65, 0, 0.35, 1)';

/** Acabado blanco con sombra suave, sin borde dorado (referencia: public/references/card-1.jpg). */
const CARD_SURFACE: React.CSSProperties = {
  background:
    'radial-gradient(120% 90% at 0% 0%, #FFFFFF 0%, rgba(255,255,255,0) 60%), linear-gradient(140deg, #FFFFFF 0%, #F7F6F8 45%, #EDECF0 100%)',
  boxShadow:
    '0 22px 44px -22px rgba(70, 40, 55, 0.38), 0 6px 14px -6px rgba(70, 40, 55, 0.14), inset 0 1px 0 rgba(255,255,255,0.95)',
  border: '1px solid rgba(20, 10, 15, 0.07)',
  backfaceVisibility: 'hidden',
  WebkitBackfaceVisibility: 'hidden',
};

export function InteractiveCard({
  member,
  showHint = true,
}: InteractiveCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const toggleFlip = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setIsFlipped((f) => !f);
  };

  const hasMember = !!member;
  const memberName = hasMember
    ? (member.recipientName || member.name).trim()
    : '';
  const memberCode = hasMember
    ? (member.cardNumber || member.code).trim().toUpperCase()
    : '';
  // Tamaño del nombre según su longitud (igual que la tarjeta original)
  const nameFontSize =
    memberName.length > 26
      ? 12
      : memberName.length > 20
        ? 13.5
        : memberName.length > 15
          ? 15
          : 16.5;

  // Giro vertical (eje X), como en la referencia. Sin inclinación al pasar el cursor.
  const transform = `rotateX(${isFlipped ? 180 : 0}deg)`;

  return (
    <div className='flex w-full flex-col items-center'>
      <div
        className='@container relative w-full select-none'
        style={{ perspective: '1100px' }}
      >
        <div
          onClick={toggleFlip}
          className='relative aspect-[598/350] w-full cursor-pointer motion-reduce:!transition-none'
          style={{
            transformStyle: 'preserve-3d',
            transform,
            transition: `transform ${FLIP_MS}ms ${FLIP_EASING}`,
          }}
          title='Toca para girar la tarjeta'
          role='button'
          aria-label={
            isFlipped
              ? 'Ver el frente de la tarjeta'
              : 'Ver el reverso de la tarjeta'
          }
        >
          {/* ======================= FRENTE ======================= */}
          <div
            className='absolute inset-0 overflow-hidden rounded-[5.5cqw]'
            style={CARD_SURFACE}
          >
            {/* Diseño oficial Rosa Pasión Club. multiply: el blanco de la plantilla deja ver el acabado de la superficie */}
            <picture className='pointer-events-none absolute inset-0 h-full w-full'>
              <source
                srcSet='/card-template-white-clean.webp'
                type='image/webp'
              />
              <img
                src='/card-template-white-clean.png'
                alt='Rosa Pasión Club'
                className='h-full w-full select-none object-cover mix-blend-multiply'
              />
            </picture>

            {/* Nombre y código del socio sobre la plantilla */}
            <svg
              viewBox='0 0 598 350'
              className='pointer-events-none absolute inset-0 h-full w-full select-none'
            >
              {hasMember ? (
                <>
                  <text
                    x='272'
                    y='248'
                    fill='#7C1314'
                    fontFamily="'Playfair Display', Georgia, serif"
                    fontWeight='700'
                    fontSize={nameFontSize}
                    letterSpacing='1.2'
                  >
                    {memberName.toUpperCase()}
                  </text>
                  <text
                    x='272'
                    y='273'
                    fill='#7C1314'
                    fontFamily="'Playfair Display', Georgia, serif"
                    fontWeight='700'
                    fontSize='15.5'
                    letterSpacing='2.8'
                  >
                    {memberCode}
                  </text>
                </>
              ) : (
                <>
                  <line
                    x1='272'
                    y1='244'
                    x2='455'
                    y2='244'
                    stroke='#7C1314'
                    strokeWidth='2.2'
                    strokeDasharray='8 6'
                    strokeLinecap='round'
                    opacity='0.4'
                  />
                  <line
                    x1='272'
                    y1='269'
                    x2='375'
                    y2='269'
                    stroke='#7C1314'
                    strokeWidth='2.2'
                    strokeDasharray='8 6'
                    strokeLinecap='round'
                    opacity='0.4'
                  />
                </>
              )}
            </svg>

            {/* Estado del socio */}
            {member && (
              <span
                className={`absolute right-[5%] top-[8%] inline-flex items-center gap-[1cqw] rounded-full border px-[2.2cqw] py-[0.6cqw] text-[2.3cqw] font-semibold tracking-wider ${
                  member.hasPendingPayment
                    ? 'border-amber-300/70 bg-amber-50/90 text-amber-800'
                    : member.status === 'ACTIVA'
                      ? 'border-emerald-300/70 bg-emerald-50/90 text-emerald-800'
                      : 'border-rose-300/70 bg-rose-50/90 text-rose-800'
                }`}
              >
                <span
                  className={`h-[1.3cqw] w-[1.3cqw] rounded-full ${
                    member.hasPendingPayment
                      ? 'bg-amber-500'
                      : member.status === 'ACTIVA'
                        ? 'bg-emerald-500'
                        : 'bg-rose-500'
                  }`}
                />
                {member.hasPendingPayment ? 'PAGO EN REVISIÓN' : member.status}
              </span>
            )}

            {/* Línea de luz que recorre el borde de forma ocasional (ver .card-shine en globals.css) */}
            <span aria-hidden='true' className='card-shine' />

            {/* Pista girar */}
            <span className='absolute bottom-[6%] right-[5%] inline-flex items-center gap-[0.8cqw] font-inter text-[2.2cqw] text-[#7C1314]/60'>
              <RotateCw className='h-[2.4cqw] w-[2.4cqw]' />
              Girar
            </span>
          </div>

          {/* ======================= REVERSO ======================= */}
          <div
            className='absolute inset-0 overflow-hidden rounded-[5.5cqw] bg-white'
            style={{ ...CARD_SURFACE, transform: 'rotateX(180deg)' }}
          >
            <picture className='pointer-events-none absolute inset-0 h-full w-full'>
              <source
                srcSet='/card-template-white-back.webp'
                type='image/webp'
              />
              <img
                src='/card-template-white-back.png'
                alt='Reverso Rosa Pasión Club - Marcas aliadas'
                className='h-full w-full select-none object-cover'
              />
            </picture>
            {/* Línea de luz que recorre el borde de forma ocasional (ver .card-shine en globals.css) */}
            <span aria-hidden='true' className='card-shine' />

            <span className='absolute bottom-[3%] right-[3%] inline-flex items-center gap-[0.8cqw] rounded-full bg-white/90 px-[1.6cqw] py-[0.5cqw] font-inter text-[2.2cqw] text-[#7C1314]/80 shadow-sm'>
              <RotateCw className='h-[2.4cqw] w-[2.4cqw]' />
              Volver al frente
            </span>
          </div>
        </div>
      </div>

      {showHint && (
        <p className='mt-2.5 inline-flex items-center gap-1.5 font-inter text-[11px] text-[#8A7A80]'>
          <RotateCw className='h-3 w-3' />
          Toca la tarjeta para ver el reverso y QR
        </p>
      )}
    </div>
  );
}
