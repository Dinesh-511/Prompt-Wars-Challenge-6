import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const publicDir = path.join(rootDir, 'public');

// --- 1. SVG Assets ---
const faviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none">
  <defs>
    <linearGradient id="bw-bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0891b2" />
      <stop offset="100%" stop-color="#0f172a" />
    </linearGradient>
    <linearGradient id="bw-shield" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#22d3ee" />
      <stop offset="100%" stop-color="#0891b2" />
    </linearGradient>
    <linearGradient id="bw-leaf" x1="0%" y1="100%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#10b981" />
      <stop offset="100%" stop-color="#34d399" />
    </linearGradient>
  </defs>
  <rect width="64" height="64" rx="16" fill="url(#bw-bg)" />
  <path d="M32 10L14 18v14c0 13.2 7.7 25.4 18 28 10.3-2.6 18-14.8 18-28V18L32 10z" fill="url(#bw-shield)" opacity="0.9" />
  <path d="M32 20c-6.6 0-12 5.4-12 12 0 4.4 2.4 8.3 6 10.4V40c0-4.4 3.6-8 8-8s8 3.6 8 8v2.4c3.6-2.1 6-6 6-10.4 0-6.6-5.4-12-12-12z" fill="#ffffff" fill-opacity="0.95" />
  <circle cx="32" cy="28" r="4" fill="url(#bw-leaf)" />
</svg>`;

const logoSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 60" fill="none">
  <defs>
    <linearGradient id="logo-bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0891b2" />
      <stop offset="100%" stop-color="#0e7490" />
    </linearGradient>
    <linearGradient id="logo-shield" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#22d3ee" />
      <stop offset="100%" stop-color="#0891b2" />
    </linearGradient>
    <linearGradient id="logo-leaf" x1="0%" y1="100%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#10b981" />
      <stop offset="100%" stop-color="#34d399" />
    </linearGradient>
  </defs>
  <g transform="translate(6, 6)">
    <rect width="48" height="48" rx="12" fill="url(#logo-bg)" />
    <path d="M24 8L10 14v11c0 10.2 6 19.6 14 21.6 8-2 14-11.4 14-21.6V14L24 8z" fill="url(#logo-shield)" opacity="0.95" />
    <path d="M24 16c-5 0-9 4-9 9 0 3.3 1.8 6.2 4.5 7.8V31c0-3.3 2.7-6 6-6s6 2.7 6 6v1.8c2.7-1.6 4.5-4.5 4.5-7.8 0-5-4-9-9-9z" fill="#ffffff" />
    <circle cx="24" cy="22" r="3" fill="url(#logo-leaf)" />
  </g>
  <text x="66" y="32" font-family="'Inter', -apple-system, BlinkMacSystemFont, sans-serif" font-size="22" font-weight="800" fill="#0f172a" letter-spacing="-0.5">Breathe<tspan fill="#0891b2">Way</tspan></text>
  <text x="66" y="47" font-family="'Inter', -apple-system, BlinkMacSystemFont, sans-serif" font-size="9" font-weight="600" fill="#64748b" letter-spacing="1.2">ENTERPRISE CLEAN AIR</text>
</svg>`;

// --- 2. Pure Node PNG & ICO Encoder ---
// Standard CRC32 table
const crcTable = new Uint32Array(256);
for (let n = 0; n < 256; n++) {
  let c = n;
  for (let k = 0; k < 8; k++) {
    c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
  }
  crcTable[n] = c >>> 0;
}

function calculateCrc(buf) {
  let crc = 0xffffffff;
  for (let i = 0; i < buf.length; i++) {
    crc = crcTable[(crc ^ buf[i]) & 0xff] ^ (crc >>> 8);
  }
  return (crc ^ 0xffffffff) >>> 0;
}

function createChunk(type, data) {
  const typeBuf = Buffer.from(type, 'ascii');
  const lenBuf = Buffer.alloc(4);
  lenBuf.writeUInt32BE(data.length, 0);

  const crcPayload = Buffer.concat([typeBuf, data]);
  const crc = calculateCrc(crcPayload);
  const crcBuf = Buffer.alloc(4);
  crcBuf.writeUInt32BE(crc, 0);

  return Buffer.concat([lenBuf, crcPayload, crcBuf]);
}

function generatePng(width, height, pixelFn) {
  const signature = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);

  // IHDR
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr.writeUInt8(8, 8); // bit depth 8
  ihdr.writeUInt8(6, 9); // RGBA color type
  ihdr.writeUInt8(0, 10); // compression
  ihdr.writeUInt8(0, 11); // filter
  ihdr.writeUInt8(0, 12); // interlace

  const ihdrChunk = createChunk('IHDR', ihdr);

  // Raw image scanlines (1 filter byte 0x00 per line + width * 4 bytes RGBA)
  const rawScanlineLength = 1 + width * 4;
  const rawData = Buffer.alloc(height * rawScanlineLength);

  for (let y = 0; y < height; y++) {
    const rowOffset = y * rawScanlineLength;
    rawData[rowOffset] = 0; // Filter None
    for (let x = 0; x < width; x++) {
      const pxOffset = rowOffset + 1 + x * 4;
      const [r, g, b, a] = pixelFn(x, y, width, height);
      rawData[pxOffset] = r;
      rawData[pxOffset + 1] = g;
      rawData[pxOffset + 2] = b;
      rawData[pxOffset + 3] = a;
    }
  }

  const compressed = zlib.deflateSync(rawData);
  const idatChunk = createChunk('IDAT', compressed);
  const iendChunk = createChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);
}

function generateIcoFromPng(pngBuffer, width, height) {
  // ICO Header: 6 bytes
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type 1 = ICO
  header.writeUInt16LE(1, 4); // 1 image

  // ICO Directory Entry: 16 bytes
  const entry = Buffer.alloc(16);
  entry.writeUInt8(width >= 256 ? 0 : width, 0);
  entry.writeUInt8(height >= 256 ? 0 : height, 1);
  entry.writeUInt8(0, 2); // color palette count (0 for 256+ colors)
  entry.writeUInt8(0, 3); // reserved
  entry.writeUInt16LE(1, 4); // color planes
  entry.writeUInt16LE(32, 6); // bits per pixel (32-bit RGBA)
  entry.writeUInt32LE(pngBuffer.length, 8); // size of image data in bytes
  entry.writeUInt32LE(22, 12); // offset of image data (6 header + 16 entry = 22)

  return Buffer.concat([header, entry, pngBuffer]);
}

// Generate 32x32 Favicon PNG
const faviconPng = generatePng(32, 32, (x, y, w, h) => {
  // Cyan and dark teal shield gradient with leaf green accent
  const cx = w / 2;
  const cy = h / 2;
  const dist = Math.sqrt((x - cx) ** 2 + (y - cy) ** 2);
  if (dist < 14) {
    // Inner badge
    if (y < 16) {
      return [8, 145, 178, 255]; // Cyan #0891b2
    } else {
      return [16, 185, 129, 255]; // Emerald #10b981
    }
  } else if (dist < 15.5) {
    return [34, 211, 238, 255]; // Bright cyan rim
  }
  return [0, 0, 0, 0]; // Transparent outside
});

const faviconIco = generateIcoFromPng(faviconPng, 32, 32);

// Generate 1200x630 OG Preview PNG
const ogPreviewPng = generatePng(1200, 630, (x, y, w, h) => {
  // Smooth deep slate gradient from top-left #050811 to bottom-right #0a1b2a with cyan aurora glow
  const nx = x / w;
  const ny = y / h;
  const auroraCenterDist = Math.sqrt((nx - 0.2) ** 2 + (ny - 0.3) ** 2);
  const glow = Math.max(0, 1 - auroraCenterDist * 2);

  const r = Math.min(255, Math.floor(5 + nx * 10 + glow * 8));
  const g = Math.min(255, Math.floor(8 + nx * 20 + glow * 145));
  const b = Math.min(255, Math.floor(17 + ny * 35 + glow * 178));
  return [r, g, b, 255];
});

// Write all assets to public/
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

fs.writeFileSync(path.join(publicDir, 'favicon.svg'), faviconSvg, 'utf8');
fs.writeFileSync(path.join(publicDir, 'logo.svg'), logoSvg, 'utf8');
fs.writeFileSync(path.join(publicDir, 'favicon.ico'), faviconIco);
fs.writeFileSync(path.join(publicDir, 'og-preview.png'), ogPreviewPng);

console.log('Successfully generated:');
console.log(' - public/favicon.svg');
console.log(' - public/logo.svg');
console.log(' - public/favicon.ico (' + faviconIco.length + ' bytes)');
console.log(' - public/og-preview.png (' + ogPreviewPng.length + ' bytes)');
