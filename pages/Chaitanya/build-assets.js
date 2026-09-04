const fs = require('fs');
const path = require('path');

const imgDir = path.join(__dirname, 'assets/images');
const iconDir = path.join(__dirname, 'assets/icons');

if (!fs.existsSync(imgDir)) fs.mkdirSync(imgDir, { recursive: true });
if (!fs.existsSync(iconDir)) fs.mkdirSync(iconDir, { recursive: true });

const petAvatars = {
  'bruno-dog.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="100%" height="100%">
  <defs>
    <linearGradient id="bgG" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FCF8ED"/>
      <stop offset="100%" stop-color="#EAF4EE"/>
    </linearGradient>
    <linearGradient id="goldFur" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#F7C844"/>
      <stop offset="100%" stop-color="#E5A93C"/>
    </linearGradient>
    <linearGradient id="darkFur" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#D99726"/>
      <stop offset="100%" stop-color="#BD7E17"/>
    </linearGradient>
  </defs>
  <rect width="200" height="200" rx="32" fill="url(#bgG)"/>
  <circle cx="100" cy="110" r="70" fill="url(#goldFur)"/>
  <path d="M45 75 C35 95 35 140 55 145 C65 147 70 120 65 95 Z" fill="url(#darkFur)"/>
  <path d="M155 75 C165 95 165 140 145 145 C135 147 130 120 135 95 Z" fill="url(#darkFur)"/>
  <ellipse cx="100" cy="95" rx="52" ry="48" fill="url(#goldFur)"/>
  <ellipse cx="100" cy="118" rx="28" ry="22" fill="#FFF2D6"/>
  <circle cx="80" cy="88" r="7" fill="#1C2A22"/>
  <circle cx="82" cy="86" r="2.5" fill="#FFFFFF"/>
  <circle cx="120" cy="88" r="7" fill="#1C2A22"/>
  <circle cx="122" cy="86" r="2.5" fill="#FFFFFF"/>
  <path d="M92 108 C92 104 108 104 108 108 C108 116 92 116 92 108 Z" fill="#1C2A22"/>
  <path d="M100 114 L100 122 M94 122 C97 125 100 123 100 122 C100 123 103 125 106 122" stroke="#1C2A22" stroke-width="2.5" stroke-linecap="round" fill="none"/>
  <path d="M96 124 C96 132 104 132 104 124 Z" fill="#F47272"/>
  <rect x="70" y="150" width="60" height="12" rx="6" fill="#1A3C2B"/>
  <circle cx="100" cy="164" r="8" fill="#F3BA2F"/>
  <circle cx="100" cy="164" r="3" fill="#1A3C2B"/>
</svg>`,

  'luna-cat.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="100%" height="100%">
  <defs>
    <linearGradient id="bgG2" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#F5F2FA"/>
      <stop offset="100%" stop-color="#EAF4EE"/>
    </linearGradient>
    <linearGradient id="grayFur" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#9AAAB4"/>
      <stop offset="100%" stop-color="#7C8F9E"/>
    </linearGradient>
  </defs>
  <rect width="200" height="200" rx="32" fill="url(#bgG2)"/>
  <polygon points="55,95 40,40 90,65" fill="url(#grayFur)"/>
  <polygon points="60,90 48,50 85,70" fill="#F9CCD4"/>
  <polygon points="145,95 160,40 110,65" fill="url(#grayFur)"/>
  <polygon points="140,90 152,50 115,70" fill="#F9CCD4"/>
  <circle cx="100" cy="120" r="65" fill="url(#grayFur)"/>
  <ellipse cx="100" cy="100" rx="50" ry="44" fill="url(#grayFur)"/>
  <ellipse cx="78" cy="94" rx="9" ry="11" fill="#48BB78"/>
  <ellipse cx="78" cy="94" rx="3.5" ry="9" fill="#1C2A22"/>
  <circle cx="80" cy="91" r="2.5" fill="#FFFFFF"/>
  <ellipse cx="122" cy="94" rx="9" ry="11" fill="#48BB78"/>
  <ellipse cx="122" cy="94" rx="3.5" ry="9" fill="#1C2A22"/>
  <circle cx="124" cy="91" r="2.5" fill="#FFFFFF"/>
  <polygon points="96,108 104,108 100,113" fill="#F9CCD4"/>
  <path d="M100 113 C98 116 94 116 93 114 M100 113 C102 116 106 116 107 114" stroke="#1C2A22" stroke-width="2" stroke-linecap="round" fill="none"/>
  <line x1="55" y1="108" x2="88" y2="111" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" opacity="0.8"/>
  <line x1="55" y1="117" x2="88" y2="115" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" opacity="0.8"/>
  <line x1="145" y1="108" x2="112" y2="111" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" opacity="0.8"/>
  <line x1="145" y1="117" x2="112" y2="115" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" opacity="0.8"/>
  <rect x="75" y="148" width="50" height="10" rx="5" fill="#E5A93C"/>
  <circle cx="100" cy="158" r="6" fill="#F3BA2F"/>
</svg>`,

  'oliver-beagle.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="100%" height="100%">
  <defs>
    <linearGradient id="bgG3" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFF5EB"/>
      <stop offset="100%" stop-color="#EAF4EE"/>
    </linearGradient>
  </defs>
  <rect width="200" height="200" rx="32" fill="url(#bgG3)"/>
  <circle cx="100" cy="115" r="65" fill="#FFFFFF"/>
  <ellipse cx="100" cy="98" rx="48" ry="44" fill="#FFFFFF"/>
  <path d="M52 80 C50 60 75 60 90 75 C70 95 55 95 52 80 Z" fill="#8C532B"/>
  <path d="M148 80 C150 60 125 60 110 75 C130 95 145 95 148 80 Z" fill="#8C532B"/>
  <path d="M48 75 C30 95 32 135 52 140 C62 142 66 115 60 90 Z" fill="#2D2A26"/>
  <path d="M152 75 C170 95 168 135 148 140 C138 142 134 115 140 90 Z" fill="#8C532B"/>
  <circle cx="82" cy="92" r="6.5" fill="#1C2A22"/>
  <circle cx="84" cy="90" r="2.2" fill="#FFFFFF"/>
  <circle cx="118" cy="92" r="6.5" fill="#1C2A22"/>
  <circle cx="120" cy="90" r="2.2" fill="#FFFFFF"/>
  <ellipse cx="100" cy="115" rx="22" ry="18" fill="#F7F4EB"/>
  <path d="M93 106 C93 102 107 102 107 106 C107 114 93 114 93 106 Z" fill="#1C2A22"/>
  <path d="M100 112 L100 119 M95 119 C98 122 100 120 100 119 C100 120 102 122 105 119" stroke="#1C2A22" stroke-width="2" stroke-linecap="round" fill="none"/>
  <path d="M72 145 Q100 170 128 145 Z" fill="#E53E3E"/>
  <circle cx="100" cy="154" r="3" fill="#FFFFFF"/>
</svg>`,

  'bella-cat.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="100%" height="100%">
  <defs>
    <linearGradient id="bgG4" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FDF1E6"/>
      <stop offset="100%" stop-color="#FCF8ED"/>
    </linearGradient>
  </defs>
  <rect width="200" height="200" rx="32" fill="url(#bgG4)"/>
  <circle cx="100" cy="120" r="68" fill="#FFFFFF"/>
  <polygon points="62,90 52,48 92,72" fill="#FFFFFF"/>
  <polygon points="65,85 58,56 88,74" fill="#FAD2E1"/>
  <polygon points="138,90 148,48 108,72" fill="#FFFFFF"/>
  <polygon points="135,85 142,56 112,74" fill="#FAD2E1"/>
  <ellipse cx="100" cy="102" rx="55" ry="46" fill="#FFFFFF"/>
  <ellipse cx="100" cy="120" rx="32" ry="18" fill="#FFF5EB"/>
  <ellipse cx="80" cy="96" rx="8" ry="10" fill="#3182CE"/>
  <ellipse cx="80" cy="96" rx="3.5" ry="8" fill="#1C2A22"/>
  <circle cx="82" cy="93" r="2.2" fill="#FFFFFF"/>
  <ellipse cx="120" cy="96" rx="8" ry="10" fill="#3182CE"/>
  <ellipse cx="120" cy="96" rx="3.5" ry="8" fill="#1C2A22"/>
  <circle cx="122" cy="93" r="2.2" fill="#FFFFFF"/>
  <ellipse cx="100" cy="107" rx="5" ry="4" fill="#F687B3"/>
  <path d="M97 113 Q100 116 103 113" stroke="#1C2A22" stroke-width="2" stroke-linecap="round" fill="none"/>
  <line x1="55" y1="108" x2="86" y2="110" stroke="#CBD5E0" stroke-width="1.8"/>
  <line x1="55" y1="115" x2="86" y2="114" stroke="#CBD5E0" stroke-width="1.8"/>
  <line x1="145" y1="108" x2="114" y2="110" stroke="#CBD5E0" stroke-width="1.8"/>
  <line x1="145" y1="115" x2="114" y2="114" stroke="#CBD5E0" stroke-width="1.8"/>
  <polygon points="92,148 80,140 80,156" fill="#ED64A6"/>
  <polygon points="108,148 120,140 120,156" fill="#ED64A6"/>
  <circle cx="100" cy="148" r="6" fill="#D53F8C"/>
</svg>`,

  'milo-rabbit.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="100%" height="100%">
  <defs>
    <linearGradient id="bgG5" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#EAF4EE"/>
      <stop offset="100%" stop-color="#F5F2FA"/>
    </linearGradient>
  </defs>
  <rect width="200" height="200" rx="32" fill="url(#bgG5)"/>
  <path d="M60 70 C40 80 35 130 50 145 C60 150 68 120 68 85 Z" fill="#D69E2E"/>
  <path d="M140 70 C160 80 165 130 150 145 C140 150 132 120 132 85 Z" fill="#D69E2E"/>
  <circle cx="100" cy="125" r="62" fill="#ECC94B"/>
  <ellipse cx="100" cy="100" rx="46" ry="42" fill="#ECC94B"/>
  <ellipse cx="100" cy="116" rx="24" ry="18" fill="#FFFFFF"/>
  <circle cx="82" cy="94" r="6" fill="#1C2A22"/>
  <circle cx="84" cy="92" r="2" fill="#FFFFFF"/>
  <circle cx="118" cy="94" r="6" fill="#1C2A22"/>
  <circle cx="120" cy="92" r="2" fill="#FFFFFF"/>
  <polygon points="97,108 103,108 100,112" fill="#F687B3"/>
  <path d="M100 112 L100 116 M96 116 Q100 118 104 116" stroke="#1C2A22" stroke-width="2" stroke-linecap="round" fill="none"/>
  <line x1="58" y1="112" x2="88" y2="114" stroke="#718096" stroke-width="1.5"/>
  <line x1="58" y1="118" x2="88" y2="117" stroke="#718096" stroke-width="1.5"/>
  <line x1="142" y1="112" x2="112" y2="114" stroke="#718096" stroke-width="1.5"/>
  <line x1="142" y1="118" x2="112" y2="117" stroke="#718096" stroke-width="1.5"/>
  <circle cx="74" cy="108" r="7" fill="#F687B3" opacity="0.4"/>
  <circle cx="126" cy="108" r="7" fill="#F687B3" opacity="0.4"/>
</svg>`,

  'gallery-1.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="100%" height="100%">
  <defs>
    <linearGradient id="g1" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#E2F1E8"/>
      <stop offset="100%" stop-color="#FDE9D9"/>
    </linearGradient>
  </defs>
  <rect width="400" height="300" rx="20" fill="url(#g1)"/>
  <circle cx="200" cy="150" r="80" fill="#E5A93C" opacity="0.2"/>
  <text x="200" y="140" font-size="64" text-anchor="middle" dominant-baseline="middle">🐕</text>
  <text x="200" y="210" font-family="sans-serif" font-size="18" font-weight="bold" fill="#1A3C2B" text-anchor="middle">Sunny Afternoon Walk</text>
  <text x="200" y="235" font-family="sans-serif" font-size="13" fill="#687D71" text-anchor="middle">Bruno exploring the green park trails</text>
</svg>`,

  'gallery-2.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="100%" height="100%">
  <defs>
    <linearGradient id="g2" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#E8EDF5"/>
      <stop offset="100%" stop-color="#F5E8F3"/>
    </linearGradient>
  </defs>
  <rect width="400" height="300" rx="20" fill="url(#g2)"/>
  <circle cx="200" cy="150" r="80" fill="#3182CE" opacity="0.15"/>
  <text x="200" y="140" font-size="64" text-anchor="middle" dominant-baseline="middle">🐱</text>
  <text x="200" y="210" font-family="sans-serif" font-size="18" font-weight="bold" fill="#1A3C2B" text-anchor="middle">Cozy Window Nap</text>
  <text x="200" y="235" font-family="sans-serif" font-size="13" fill="#687D71" text-anchor="middle">Luna catching warm sunlight</text>
</svg>`,

  'gallery-3.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="100%" height="100%">
  <defs>
    <linearGradient id="g3" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFF0E6"/>
      <stop offset="100%" stop-color="#EAF4EE"/>
    </linearGradient>
  </defs>
  <rect width="400" height="300" rx="20" fill="url(#g3)"/>
  <circle cx="200" cy="150" r="80" fill="#E53E3E" opacity="0.15"/>
  <text x="200" y="140" font-size="64" text-anchor="middle" dominant-baseline="middle">🐶</text>
  <text x="200" y="210" font-family="sans-serif" font-size="18" font-weight="bold" fill="#1A3C2B" text-anchor="middle">Fetch Champion</text>
  <text x="200" y="235" font-family="sans-serif" font-size="13" fill="#687D71" text-anchor="middle">Oliver with his favorite red ball</text>
</svg>`,

  'gallery-4.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="100%" height="100%">
  <defs>
    <linearGradient id="g4" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#F3E8FF"/>
      <stop offset="100%" stop-color="#FAF7F2"/>
    </linearGradient>
  </defs>
  <rect width="400" height="300" rx="20" fill="url(#g4)"/>
  <circle cx="200" cy="150" r="80" fill="#805AD5" opacity="0.15"/>
  <text x="200" y="140" font-size="64" text-anchor="middle" dominant-baseline="middle">🐰</text>
  <text x="200" y="210" font-family="sans-serif" font-size="18" font-weight="bold" fill="#1A3C2B" text-anchor="middle">Garden Snacking</text>
  <text x="200" y="235" font-family="sans-serif" font-size="13" fill="#687D71" text-anchor="middle">Milo enjoying crispy lettuce and clover</text>
</svg>`,

  'gallery-5.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="100%" height="100%">
  <defs>
    <linearGradient id="g5" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FCE7F3"/>
      <stop offset="100%" stop-color="#FEF3C7"/>
    </linearGradient>
  </defs>
  <rect width="400" height="300" rx="20" fill="url(#g5)"/>
  <circle cx="200" cy="150" r="80" fill="#EC4899" opacity="0.15"/>
  <text x="200" y="140" font-size="64" text-anchor="middle" dominant-baseline="middle">🐱</text>
  <text x="200" y="210" font-family="sans-serif" font-size="18" font-weight="bold" fill="#1A3C2B" text-anchor="middle">Fluffy Elegance</text>
  <text x="200" y="235" font-family="sans-serif" font-size="13" fill="#687D71" text-anchor="middle">Bella posing after a fresh spa brush</text>
</svg>`,

  'gallery-6.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="100%" height="100%">
  <defs>
    <linearGradient id="g6" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#E0F2FE"/>
      <stop offset="100%" stop-color="#DCFCE7"/>
    </linearGradient>
  </defs>
  <rect width="400" height="300" rx="20" fill="url(#g6)"/>
  <circle cx="200" cy="150" r="80" fill="#0284C7" opacity="0.15"/>
  <text x="200" y="140" font-size="64" text-anchor="middle" dominant-baseline="middle">🐾</text>
  <text x="200" y="210" font-family="sans-serif" font-size="18" font-weight="bold" fill="#1A3C2B" text-anchor="middle">Playdate Fun</text>
  <text x="200" y="235" font-family="sans-serif" font-size="13" fill="#687D71" text-anchor="middle">Bruno & friends playing tug of war</text>
</svg>`
};

Object.keys(petAvatars).forEach(file => {
  fs.writeFileSync(path.join(imgDir, file), petAvatars[file], 'utf8');
});

console.log('Saved SVG images to:', imgDir);
