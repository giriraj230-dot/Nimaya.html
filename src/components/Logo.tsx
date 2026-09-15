interface LogoProps {
  className?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  layout?: 'horizontal' | 'vertical' | 'mark-only';
  showTagline?: boolean;
}

export function Logo({
  className = '',
  size = 'md',
  layout = 'horizontal',
  showTagline = false,
}: LogoProps) {
  // Dimension scales for horizontal lockup
  const iconSizes = {
    xs: 'w-7 h-7',
    sm: 'w-9 h-9',
    md: 'w-11 h-11',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24',
  };

  const textSizes = {
    xs: 'text-base',
    sm: 'text-xl',
    md: 'text-2xl',
    lg: 'text-3xl sm:text-4xl',
    xl: 'text-4xl sm:text-5xl',
  };

  const taglineSizes = {
    xs: 'text-[9px] tracking-wide',
    sm: 'text-[10px] tracking-wide',
    md: 'text-xs tracking-wider',
    lg: 'text-sm tracking-widest',
    xl: 'text-base tracking-widest',
  };

  // Standalone Vector Mother & Baby Emblem
  const Emblem = ({ className: emblemClass = '' }: { className?: string }) => (
    <svg
      viewBox="0 0 160 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${emblemClass} shrink-0`}
      aria-hidden="true"
    >
      {/* Peach Swaddle Blanket */}
      <path
        d="M 68 82 C 48 94 44 116 56 130 C 68 144 94 145 110 134 C 122 124 118 110 108 102 C 98 94 82 88 68 82 Z"
        fill="#E5B5A1"
      />

      {/* Mother's Flowing Botanical Hair (Sage Green Fill) */}
      <path
        d="M 82 18 C 62 18 46 32 38 52 C 32 68 26 84 12 96 C 28 98 42 90 48 78 C 52 72 54 64 56 56 C 62 38 75 26 88 22 C 102 18 116 24 120 34 C 124 45 120 58 112 68 C 108 73 103 76 99 79 C 96 76 97 70 101 64 C 105 56 106 46 103 38 C 99 28 91 22 82 18 Z"
        fill="#557355"
      />

      {/* Mother's Botanical Leaf on Left */}
      <path
        d="M 38 82 C 22 88 14 104 12 120 C 28 118 40 108 46 94 C 48 88 46 84 38 82 Z"
        fill="#557355"
      />
      <path
        d="M 18 114 C 27 108 36 101 41 91"
        stroke="#FAF8F5"
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      {/* Mother's Profile (Forehead, Gentle Nose, Kiss onto Baby) */}
      <path
        d="M 90 28 C 84 38 76 50 76 60 C 76 66 80 70 82 72 C 78 76 74 80 70 84"
        stroke="#557355"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Mother's Relaxed Closed Eye & Eyebrow */}
      <path
        d="M 72 54 C 75 58 81 58 84 54"
        stroke="#557355"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <path
        d="M 73 48 C 77 44 83 45 87 48"
        stroke="#557355"
        strokeWidth="1.8"
        strokeLinecap="round"
      />

      {/* Outer Protective Cradling Arm */}
      <path
        d="M 44 94 C 52 126 76 144 106 142 C 130 140 144 122 144 98 C 144 84 134 70 118 70"
        stroke="#557355"
        strokeWidth="4"
        strokeLinecap="round"
      />

      {/* Baby's Nestled Head */}
      <path
        d="M 70 80 C 78 72 94 72 104 82 C 114 92 112 110 102 118 C 94 124 80 124 70 114"
        stroke="#557355"
        strokeWidth="3.2"
        strokeLinecap="round"
      />

      {/* Baby's Closed Smiling Eye & Eyebrow */}
      <path
        d="M 85 90 C 88 94 93 94 96 90"
        stroke="#557355"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M 86 85 C 89 82 93 83 96 85"
        stroke="#557355"
        strokeWidth="1.6"
        strokeLinecap="round"
      />

      {/* Baby's Nose & Sweet Sleeping Smile */}
      <path
        d="M 93 96 C 95 98 96 99 97 97"
        stroke="#557355"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M 87 104 C 91 108 97 107 100 103"
        stroke="#557355"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* Baby's Ear */}
      <path
        d="M 106 94 C 111 96 111 103 106 105"
        stroke="#557355"
        strokeWidth="2.2"
        strokeLinecap="round"
      />

      {/* Baby's Gentle Hand */}
      <path
        d="M 100 112 C 104 114 106 120 102 124 C 96 127 92 124 90 118"
        stroke="#E5B5A1"
        strokeWidth="2.2"
        strokeLinecap="round"
      />

      {/* Floating Coral Heart */}
      <path
        d="M 128 46 C 124 40 117 41 115 45 C 112 51 117 58 128 66 C 139 58 144 51 141 45 C 139 41 132 40 128 46 Z"
        fill="#EE9893"
      />
    </svg>
  );

  // Mark-only mode
  if (layout === 'mark-only') {
    return (
      <div className={`inline-flex items-center justify-center ${className}`}>
        <Emblem className={iconSizes[size]} />
      </div>
    );
  }

  // Vertical (Stacked) mode — exactly like the uploaded logo sheet
  if (layout === 'vertical') {
    return (
      <div className={`inline-flex flex-col items-center text-center ${className}`}>
        {/* Emblem */}
        <Emblem className={iconSizes[size]} />

        {/* Wordmark with Leaf Dot */}
        <div className="mt-3 relative inline-flex items-center">
          <span className={`font-serif-brand font-medium tracking-tight text-[#557355] leading-none ${textSizes[size]}`}>
            n
            <span className="relative inline-block">
              i
              {/* Organic leaf tittle replacing the dot of 'i' */}
              <svg
                viewBox="0 0 16 16"
                className="absolute -top-1.5 -right-0.5 w-3 h-3 text-[#557355] fill-current transform -rotate-12"
              >
                <path d="M 2 12 C 2 7 6 3 14 2 C 13 10 9 14 4 14 C 3 14 2 13 2 12 Z" />
              </svg>
            </span>
            maya
          </span>
          <span className="text-[10px] sm:text-xs font-bold text-[#557355] ml-0.5 -mt-3">
            TM
          </span>
        </div>

        {/* Tagline */}
        {showTagline && (
          <span className={`font-sans-brand font-normal text-[#557355] mt-2 block ${taglineSizes[size]}`}>
            Gentle care, from the very beginning.
          </span>
        )}
      </div>
    );
  }

  // Horizontal layout (default: ideal for Navbar, Cards, headers)
  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      {/* Emblem */}
      <Emblem className={iconSizes[size]} />

      {/* Brand Text Block */}
      <div className="flex flex-col text-left">
        <div className="flex items-center">
          <span className={`font-serif-brand font-medium tracking-tight text-[#557355] leading-none ${textSizes[size]}`}>
            n
            <span className="relative inline-block">
              i
              {/* Organic leaf tittle replacing the dot of 'i' */}
              <svg
                viewBox="0 0 16 16"
                className="absolute -top-1.5 -right-0.5 w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#557355] fill-current transform -rotate-12"
              >
                <path d="M 2 12 C 2 7 6 3 14 2 C 13 10 9 14 4 14 C 3 14 2 13 2 12 Z" />
              </svg>
            </span>
            maya
          </span>
          <span className="text-[9px] sm:text-[10px] font-bold text-[#557355] ml-0.5 -mt-2">
            TM
          </span>
        </div>

        {showTagline && (
          <span className={`font-sans-brand text-[#557355]/85 tracking-wider mt-1 hidden sm:block ${taglineSizes[size]}`}>
            Gentle care, from the very beginning.
          </span>
        )}
      </div>
    </div>
  );
}
