const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('Installing required packages...');
try {
  execSync('npm install svg2png png-to-ico --save-dev');
} catch (error) {
  console.error('Failed to install packages:', error);
  process.exit(1);
}

// After installation, we can require the packages
const svg2png = require('svg2png');
const pngToIco = require('png-to-ico');

const svgPath = path.join(__dirname, '../public/favicon.svg');
const pngPath = path.join(__dirname, '../public/favicon.png');
const icoPath = path.join(__dirname, '../public/favicon.ico');

async function generateFavicon() {
  try {
    console.log('Reading SVG file...');
    const svgBuffer = fs.readFileSync(svgPath);
    
    console.log('Converting SVG to PNG...');
    const pngBuffer = await svg2png(svgBuffer, { width: 32, height: 32 });
    fs.writeFileSync(pngPath, pngBuffer);
    
    console.log('Converting PNG to ICO...');
    const icoBuffer = await pngToIco([pngPath]);
    fs.writeFileSync(icoPath, icoBuffer);
    
    console.log('Favicon generation complete!');
    console.log('Files created:');
    console.log('- public/favicon.png');
    console.log('- public/favicon.ico');
  } catch (error) {
    console.error('Error generating favicon:', error);
  }
}

generateFavicon(); 