const fs = require('fs');

const sstXml = fs.readFileSync('extracted_xlsx/xl/sharedStrings.xml', 'utf8');
const sst = [];
const sstRegex = /<si>([\s\S]*?)<\/si>/g;
let m;
while ((m = sstRegex.exec(sstXml)) !== null) {
  const tMatches = m[1].match(/<t[^>]*>([^<]*)<\/t>/g) || [];
  const text = tMatches.map(t => t.replace(/<t[^>]*>/, '').replace(/<\/t>/, '')).join('');
  sst.push(text);
}

const sheetXml = fs.readFileSync('extracted_xlsx/xl/worksheets/sheet3.xml', 'utf8');
const rowRegex = /<row r="(\d+)"[^>]*>([\s\S]*?)<\/row>/g;
const items = [];

let rMatch;
while ((rMatch = rowRegex.exec(sheetXml)) !== null) {
  const rowNum = parseInt(rMatch[1], 10);
  if (rowNum < 6 || rowNum > 75) continue;
  
  const rowContent = rMatch[2];
  const cRegex = /<c r="([A-Z]+)\d+"([^>]*?)(?:\/>|>([\s\S]*?)<\/c>)/g;
  const cells = {};
  let cMatch;
  while ((cMatch = cRegex.exec(rowContent)) !== null) {
    const col = cMatch[1];
    const attrs = cMatch[2] || '';
    const inner = cMatch[3] || '';
    const vMatch = inner.match(/<v>([^<]*)<\/v>/);
    let val = vMatch ? vMatch[1] : '';
    if (attrs.includes('t="s"') && val !== '') {
      val = sst[parseInt(val, 10)];
    }
    cells[col] = val;
  }
  
  const sr = parseInt(cells.A, 10);
  items.push({
    sr,
    rowNum,
    category: cells.C || '',
    itemNo: cells.D || '',
    designNo: cells.E || '',
    igiCertNo: cells.F === '—' ? '' : (cells.F || ''),
    huid: cells.G || '',
    packingList: cells.H || '',
    metalCode: cells.I || '',
    karat: cells.J || '',
    metalColor: cells.K || '',
    grossWeight: parseFloat(cells.L) || 0,
    netWeight: parseFloat(cells.M) || 0,
    diaPcs: parseInt(cells.N, 10) || 0,
    diaCt: parseFloat(cells.O) || 0,
    diamondDetails: cells.P || '',
    stoneType: cells.Q === '—' ? '' : (cells.Q || ''),
    stonePcs: parseInt(cells.R, 10) || 0,
    stoneCt: parseFloat(cells.S) || 0,
    imageSource: `image${sr + 1}.jpeg`
  });
}

console.log('Extracted items count:', items.length);
console.log('Item 1:', items[0]);
console.log('Item 20:', items[19]);
console.log('Item 45:', items[44]);
console.log('Item 70:', items[69]);
fs.writeFileSync('all_packing_items.json', JSON.stringify(items, null, 2));
