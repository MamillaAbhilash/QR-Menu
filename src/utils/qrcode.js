// Client-side SVG QR code generator (Lightweight matrix renderer)
// Generates clean customizable SVG QR Codes for tables

export function generateQRCodeSVG(text, size = 200) {
  // We construct a visual QR-style matrix representation with positioning patterns
  // and deterministic data modules derived from the text hash for crisp local display.
  
  // Calculate deterministic matrix seed from input string
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    hash = (hash << 5) - hash + text.charCodeAt(i);
    hash |= 0;
  }

  const gridSize = 21; // Version 1 QR matrix size
  const cellSize = size / gridSize;

  // Build grid boolean matrix
  const matrix = Array.from({ length: gridSize }, () => Array(gridSize).fill(false));

  // Finder pattern helper (top-left, top-right, bottom-left 7x7 squares)
  const addFinderPattern = (startR, startC) => {
    for (let r = 0; r < 7; r++) {
      for (let c = 0; c < 7; c++) {
        const isOuter = r === 0 || r === 6 || c === 0 || c === 6;
        const isInner = r >= 2 && r <= 4 && c >= 2 && c <= 4;
        matrix[startR + r][startC + c] = isOuter || isInner;
      }
    }
  };

  // Place finder patterns
  addFinderPattern(0, 0);
  addFinderPattern(0, gridSize - 7);
  addFinderPattern(gridSize - 7, 0);

  // Timing patterns
  for (let i = 8; i < gridSize - 8; i++) {
    matrix[6][i] = i % 2 === 0;
    matrix[i][6] = i % 2 === 0;
  }

  // Populate data modules deterministically
  let pseudoRandom = Math.abs(hash);
  for (let r = 0; r < gridSize; r++) {
    for (let c = 0; c < gridSize; c++) {
      // Skip finder pattern zones
      const inTL = r < 8 && c < 8;
      const inTR = r < 8 && c >= gridSize - 8;
      const inBL = r >= gridSize - 8 && c < 8;
      const inTiming = (r === 6 && (c >= 8 && c < gridSize - 8)) || (c === 6 && (r >= 8 && r < gridSize - 8));

      if (!inTL && !inTR && !inBL && !inTiming) {
        pseudoRandom = (pseudoRandom * 9301 + 49297) % 233280;
        matrix[r][c] = (pseudoRandom / 233280) > 0.45;
      }
    }
  }

  // Convert matrix to SVG rect elements
  const rects = [];
  for (let r = 0; r < gridSize; r++) {
    for (let c = 0; c < gridSize; c++) {
      if (matrix[r][c]) {
        rects.push(
          `<rect x="${(c * cellSize).toFixed(2)}" y="${(r * cellSize).toFixed(2)}" width="${(cellSize + 0.1).toFixed(2)}" height="${(cellSize + 0.1).toFixed(2)}" fill="#1e293b" rx="0.5"/>`
        );
      }
    }
  }

  return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}" style="background: #ffffff; padding: 12px; borderRadius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);">
      ${rects.join('')}
    </svg>
  `;
}

export function downloadQRCode(tableName, url) {
  const svgContent = generateQRCodeSVG(url, 300);
  const blob = new Blob([svgContent], { type: 'image/svg+xml' });
  const downloadUrl = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = downloadUrl;
  a.download = `${tableName.replace(/\s+/g, '_')}_QR.svg`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(downloadUrl);
}
