export function BambooArt({ className = '' }: { className?: string }) {
  return (
    <svg
      className={`bamboo-art ${className}`}
      viewBox="0 0 560 460"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="stalkA" x1="360" y1="20" x2="360" y2="460" gradientUnits="userSpaceOnUse">
          <stop stopColor="#b6dea1" stopOpacity=".9" />
          <stop offset=".45" stopColor="#72a971" stopOpacity=".55" />
          <stop offset="1" stopColor="#355b3f" stopOpacity=".1" />
        </linearGradient>
        <linearGradient id="stalkB" x1="460" y1="0" x2="460" y2="460" gradientUnits="userSpaceOnUse">
          <stop stopColor="#d7efb0" stopOpacity=".75" />
          <stop offset=".5" stopColor="#8fbd7f" stopOpacity=".36" />
          <stop offset="1" stopColor="#476d4d" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="leafA" x1="300" y1="80" x2="410" y2="120" gradientUnits="userSpaceOnUse">
          <stop stopColor="#d5f0a9" />
          <stop offset="1" stopColor="#5c9468" stopOpacity=".3" />
        </linearGradient>
        <linearGradient id="leafB" x1="430" y1="130" x2="530" y2="150" gradientUnits="userSpaceOnUse">
          <stop stopColor="#b8dfa5" />
          <stop offset="1" stopColor="#4c7a57" stopOpacity=".15" />
        </linearGradient>
        <filter id="softGlow" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="18" />
        </filter>
      </defs>
      <circle cx="430" cy="170" r="150" fill="#76a877" opacity=".12" filter="url(#softGlow)" />
      <g className="stalk stalk-1">
        <rect x="344" y="-20" width="15" height="500" rx="7.5" fill="url(#stalkA)" />
        <path d="M344 74h15M344 166h15M344 258h15M344 350h15" stroke="#d4ecc1" strokeOpacity=".22" strokeWidth="2" />
        <g className="leaves leaves-1">
          <path d="M352 92c34-26 70-32 104-17-24 28-58 37-104 17Z" fill="url(#leafA)" />
          <path d="M350 160C308 142 281 116 270 81c35 4 61 25 80 79Z" fill="url(#leafA)" opacity=".65" />
          <path d="M352 245c37-23 71-25 102-7-24 23-55 29-102 7Z" fill="url(#leafB)" opacity=".5" />
        </g>
      </g>
      <g className="stalk stalk-2">
        <rect x="449" y="20" width="10" height="440" rx="5" fill="url(#stalkB)" />
        <path d="M449 100h10M449 190h10M449 280h10M449 370h10" stroke="#d4ecc1" strokeOpacity=".15" strokeWidth="1.5" />
        <g className="leaves leaves-2">
          <path d="M452 121c30-20 61-24 91-11-20 22-50 29-91 11Z" fill="url(#leafB)" />
          <path d="M452 205c-31-12-50-34-57-64 28 3 46 20 57 64Z" fill="url(#leafB)" opacity=".55" />
        </g>
      </g>
      <g className="stalk stalk-3">
        <rect x="286" y="110" width="7" height="350" rx="3.5" fill="url(#stalkA)" opacity=".38" />
        <path d="M286 186h7M286 262h7M286 338h7" stroke="#d4ecc1" strokeOpacity=".14" strokeWidth="1.4" />
        <g className="leaves leaves-3">
          <path d="M290 200c-26-8-44-24-53-48 26 0 43 13 53 48Z" fill="url(#leafB)" opacity=".32" />
        </g>
      </g>
      <g opacity=".8" className="floating-leaves">
        <path className="float-leaf f1" d="M230 80c12-13 28-16 43-9-8 14-23 19-43 9Z" fill="#a8d49b" opacity=".55" />
        <path className="float-leaf f2" d="M489 250c10-11 23-14 36-8-8 12-20 16-36 8Z" fill="#c4e4a8" opacity=".35" />
        <path className="float-leaf f3" d="M260 340c9-9 20-11 31-6-6 10-16 13-31 6Z" fill="#8fbd7f" opacity=".4" />
      </g>
    </svg>
  )
}
