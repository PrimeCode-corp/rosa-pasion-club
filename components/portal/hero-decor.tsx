/**
 * Decoración del hero: lianas verdes para las esquinas vacías y pétalos de rosa sueltos.
 * Verde salvia apagado (#4F6A42 → #9AB083): combina con el rosa del fondo y el vino/rojo de la marca
 * sin competir con ellos.
 */

const STEM = '#4F6A42';
const LEAF_DARK = '#5E7C4F';
const LEAF_MID = '#7C9A67';
const LEAF_LIGHT = '#9AB083';
const VEIN = '#C9D7B8';

type LeafProps = { x: number; y: number; angle: number; len: number; color: string; vein?: boolean };

/** Hoja lanceolada con nervio central opcional. */
function Leaf({ x, y, angle, len, color, vein = true }: LeafProps) {
  const w = len * 0.38;
  return (
    <g transform={`translate(${x} ${y}) rotate(${angle})`}>
      <path
        d={`M0 0C${len * 0.25} ${-w} ${len * 0.7} ${-w * 0.9} ${len} 0C${len * 0.7} ${w * 0.9} ${len * 0.25} ${w} 0 0Z`}
        fill={color}
      />
      {vein && (
        <path
          d={`M${len * 0.08} 0Q${len * 0.5} ${-w * 0.12} ${len * 0.9} 0`}
          stroke={VEIN}
          strokeWidth={Math.max(0.6, len * 0.035)}
          fill='none'
          strokeLinecap='round'
          opacity='0.75'
        />
      )}
    </g>
  );
}

/**
 * Liana que nace en una esquina (0,0) y se extiende hacia dentro con zarcillos en espiral.
 * Para la esquina inferior derecha se usa la misma pieza girada 180°.
 */
export function CornerVine({
  className = '',
  flip = false,
  style,
}: {
  className?: string;
  flip?: boolean;
  style?: React.CSSProperties;
}) {
  return (
    <svg
      viewBox='0 0 420 300'
      className={className}
      fill='none'
      aria-hidden='true'
      style={{ ...(flip ? { transform: 'rotate(180deg)' } : null), ...style }}
    >
      <g stroke={STEM} strokeLinecap='round' strokeLinejoin='round'>
        {/* tallo principal horizontal, termina en espiral */}
        <path
          strokeWidth='2.6'
          d='M-10 34C52 22 104 64 160 54S256 12 306 40C338 58 348 94 320 106C300 114 288 96 302 88C310 84 316 92 311 97'
        />
        {/* raíz secundaria, más baja */}
        <path
          strokeWidth='2'
          d='M-10 112C36 120 70 160 120 152S188 118 214 146C228 164 212 184 196 176C186 170 192 158 202 162'
        />
        {/* raíz vertical que cae por el borde */}
        <path
          strokeWidth='1.8'
          d='M30 -10C40 38 28 82 58 112S92 172 72 214C64 230 44 228 46 214C47 206 56 204 58 210'
        />
        {/* zarcillos finos */}
        <path strokeWidth='1.1' d='M160 54C170 30 196 22 206 34C214 44 204 54 196 48' />
        <path strokeWidth='1.1' d='M248 30C262 10 286 8 292 20C296 30 286 36 280 30' />
        <path strokeWidth='1.1' d='M120 152C128 176 120 196 104 196C94 196 92 184 100 182' />
        <path strokeWidth='1' d='M58 112C80 114 92 128 86 138C82 144 74 140 77 134' />
      </g>

      {/* hojas sobre el tallo principal */}
      <Leaf x={40} y={30} angle={-35} len={30} color={LEAF_MID} />
      <Leaf x={62} y={34} angle={40} len={26} color={LEAF_DARK} />
      <Leaf x={112} y={52} angle={-50} len={34} color={LEAF_LIGHT} />
      <Leaf x={138} y={56} angle={30} len={24} color={LEAF_DARK} />
      <Leaf x={192} y={44} angle={-40} len={28} color={LEAF_MID} />
      <Leaf x={226} y={34} angle={25} len={30} color={LEAF_LIGHT} />
      <Leaf x={270} y={28} angle={-55} len={22} color={LEAF_DARK} />
      <Leaf x={322} y={60} angle={10} len={20} color={LEAF_MID} />

      {/* hojas sobre la raíz secundaria */}
      <Leaf x={30} y={114} angle={20} len={24} color={LEAF_DARK} />
      <Leaf x={78} y={140} angle={-30} len={28} color={LEAF_MID} />
      <Leaf x={150} y={142} angle={-60} len={22} color={LEAF_LIGHT} />
      <Leaf x={168} y={132} angle={35} len={20} color={LEAF_DARK} />

      {/* hojas sobre la raíz vertical */}
      <Leaf x={36} y={56} angle={160} len={22} color={LEAF_LIGHT} />
      <Leaf x={48} y={92} angle={25} len={20} color={LEAF_MID} />
      <Leaf x={78} y={170} angle={170} len={24} color={LEAF_DARK} />

      {/* capullos rojos al final de dos zarcillos (guiño a la rosa) */}
      <path d='M206 34c3-8 11-9 13-3 2 5-5 9-13 3Z' fill='#A3121A' />
      <path d='M292 20c2-8 10-10 13-5 3 5-4 10-13 5Z' fill='#C8141E' />
    </svg>
  );
}

/** Pétalo de rosa: forma redondeada con muesca superior, degradado rojo→vino y brillo en el borde. */
export function RosePetal({ id, className = '', style }: { id: string; className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox='0 0 40 44' className={className} style={style} aria-hidden='true'>
      <defs>
        <radialGradient id={`${id}-fill`} cx='45%' cy='38%' r='70%'>
          <stop offset='0' stopColor='#E3343C' />
          <stop offset='0.55' stopColor='#B8121B' />
          <stop offset='1' stopColor='#6E0F14' />
        </radialGradient>
      </defs>
      <path
        d='M20 42C9 37 2 26 3.5 15.5C4.8 6.5 11.5 1.5 17 4.5C18.4 5.3 19.4 6.3 20 7.4C20.6 6.3 21.6 5.3 23 4.5C28.5 1.5 35.2 6.5 36.5 15.5C38 26 31 37 20 42Z'
        fill={`url(#${id}-fill)`}
      />
      {/* borde superior iluminado (curvatura del pétalo) */}
      <path
        d='M7.5 13.5C9 8.5 13 6 16.5 7.6'
        stroke='#FF8A8F'
        strokeWidth='1.4'
        strokeLinecap='round'
        fill='none'
        opacity='0.55'
      />
      {/* pliegue central */}
      <path d='M20 10C19 20 19.5 30 20 39' stroke='#5A0B10' strokeWidth='0.8' fill='none' opacity='0.35' />
    </svg>
  );
}
