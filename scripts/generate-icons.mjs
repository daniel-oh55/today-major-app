/**
 * PWA 아이콘 생성 스크립트
 * 자체 디자인: 네이비(#1e3a5f) 배경 + 흰색 원 + 네이비 "M"
 * 외부 로고/이미지 사용 없음
 *
 * 실행: node scripts/generate-icons.mjs
 */

import { deflateSync } from "node:zlib";
import { writeFileSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

// ── CRC32 ──────────────────────────────────────────────
const CRC_TABLE = (() => {
  const t = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    t[n] = c;
  }
  return t;
})();

function crc32(buf) {
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) c = CRC_TABLE[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}

function pngChunk(type, data) {
  const typeBuf = Buffer.from(type, "ascii");
  const lenBuf = Buffer.allocUnsafe(4);
  lenBuf.writeUInt32BE(data.length, 0);
  const crcBuf = Buffer.allocUnsafe(4);
  crcBuf.writeUInt32BE(crc32(Buffer.concat([typeBuf, data])), 0);
  return Buffer.concat([lenBuf, typeBuf, data, crcBuf]);
}

/** RGBA 픽셀 배열로 PNG Buffer 생성 (표준 zlib IDAT) */
function buildPNG(size, rgba) {
  const PNG_SIG = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

  const ihdr = Buffer.allocUnsafe(13);
  ihdr.writeUInt32BE(size, 0);
  ihdr.writeUInt32BE(size, 4);
  ihdr[8] = 8; ihdr[9] = 6; // 8-bit RGBA
  ihdr[10] = 0; ihdr[11] = 0; ihdr[12] = 0;

  const rowLen = 1 + size * 4;
  const raw = Buffer.allocUnsafe(size * rowLen);
  for (let y = 0; y < size; y++) {
    raw[y * rowLen] = 0; // filter None
    for (let x = 0; x < size; x++) {
      const src = (y * size + x) * 4;
      const dst = y * rowLen + 1 + x * 4;
      raw[dst]     = rgba[src];
      raw[dst + 1] = rgba[src + 1];
      raw[dst + 2] = rgba[src + 2];
      raw[dst + 3] = rgba[src + 3];
    }
  }

  const idat = deflateSync(raw, { level: 6 });
  return Buffer.concat([PNG_SIG, pngChunk("IHDR", ihdr), pngChunk("IDAT", idat), pngChunk("IEND", Buffer.alloc(0))]);
}

// ── 픽셀 폰트 "M" (5×7) ────────────────────────────────
const M_GLYPH = [
  [1, 0, 0, 0, 1],
  [1, 1, 0, 1, 1],
  [1, 0, 1, 0, 1],
  [1, 0, 0, 0, 1],
  [1, 0, 0, 0, 1],
  [1, 0, 0, 0, 1],
  [1, 0, 0, 0, 1],
];

function generateIcon(size, maskable) {
  const cx = size / 2;
  const cy = size / 2;
  // maskable: safe zone 80% (10% padding) 기준
  const contentScale = maskable ? 0.72 : 0.90;
  const circleR = (size / 2) * contentScale;

  // "M" 크기: circleR * 0.38 정도로 내접
  const pixSz = Math.max(1, Math.round(circleR * 0.19));
  const rows = M_GLYPH.length;
  const cols = M_GLYPH[0].length;
  const mW = cols * pixSz;
  const mH = rows * pixSz;
  const mX0 = Math.round(cx - mW / 2);
  const mY0 = Math.round(cy - mH / 2);

  // 네이비 픽셀 좌표 집합 (Set 대신 2D 배열 사용)
  const isNavyM = new Uint8Array(size * size);
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (!M_GLYPH[row][col]) continue;
      for (let py = 0; py < pixSz; py++) {
        for (let px = 0; px < pixSz; px++) {
          const fx = mX0 + col * pixSz + px;
          const fy = mY0 + row * pixSz + py;
          if (fx >= 0 && fx < size && fy >= 0 && fy < size) {
            isNavyM[fy * size + fx] = 1;
          }
        }
      }
    }
  }

  const BG_R = 30, BG_G = 58, BG_B = 95; // #1e3a5f
  const rgba = new Uint8Array(size * size * 4);

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const i = (y * size + x) * 4;
      const dx = x - cx;
      const dy = y - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist <= circleR) {
        if (isNavyM[y * size + x]) {
          rgba[i]     = BG_R;
          rgba[i + 1] = BG_G;
          rgba[i + 2] = BG_B;
          rgba[i + 3] = 255;
        } else {
          rgba[i]     = 255;
          rgba[i + 1] = 255;
          rgba[i + 2] = 255;
          rgba[i + 3] = 255;
        }
      } else {
        rgba[i]     = BG_R;
        rgba[i + 1] = BG_G;
        rgba[i + 2] = BG_B;
        rgba[i + 3] = 255;
      }
    }
  }

  return buildPNG(size, rgba);
}

// ── 생성 ──────────────────────────────────────────────
const iconsDir = join(__dirname, "..", "public", "icons");
mkdirSync(iconsDir, { recursive: true });

const targets = [
  { file: "icon-192.png",          size: 192, maskable: false },
  { file: "icon-512.png",          size: 512, maskable: false },
  { file: "maskable-icon-192.png", size: 192, maskable: true  },
  { file: "maskable-icon-512.png", size: 512, maskable: true  },
];

for (const { file, size, maskable } of targets) {
  const buf = generateIcon(size, maskable);
  writeFileSync(join(iconsDir, file), buf);
  console.log(`✓ ${file}  (${buf.length.toLocaleString()} bytes)`);
}
console.log("아이콘 생성 완료.");
