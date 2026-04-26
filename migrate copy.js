const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, 'public');
const enLocalesPath = path.join(publicDir, 'locales', 'en');
const arLocalesPath = path.join(publicDir, 'locales', 'ar');

if (!fs.existsSync(enLocalesPath)) fs.mkdirSync(enLocalesPath, { recursive: true });
if (!fs.existsSync(arLocalesPath)) fs.mkdirSync(arLocalesPath, { recursive: true });

let enJson = {};
let arJson = {};

function generateKey(enStr) {
    // Generate a simple key based on the english text
    let key = enStr.toLowerCase()
        .replace(/[^a-z0-9\s]/g, '')
        .replace(/\s+/g, '_')
        .substring(0, 40);
    // Remove trailing underscore
    if (key.endsWith('_')) key = key.substring(0, key.length - 1);
    if (!key) key = "key_" + Math.random().toString(36).substring(7);
    return key;
}

function walk(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const stat = fs.statSync(path.join(dir, file));
    if (stat.isDirectory()) {
      if (file !== 'node_modules' && file !== '.git') {
        walk(path.join(dir, file), fileList);
      }
    } else if (file.endsWith('.html')) {
      fileList.push(path.join(dir, file));
    }
  }
  return fileList;
}

const htmlFiles = walk(publicDir);

for (const file of htmlFiles) {
    let content = fs.readFileSync(file, 'utf8');
    
    // Find all data-en="..." data-ar="..." 
    // This regex looks for data-en="..." and data-ar="..." in any order on the same element
    // Actually, safer to find elements with data-en first, then extract both
    
    const regex = /data-en=["']([^"']*)["']\s*data-ar=["']([^"']*)["']/g;
    const regex2 = /data-ar=["']([^"']*)["']\s*data-en=["']([^"']*)["']/g;
    
    let modified = false;
    
    content = content.replace(regex, (match, en, ar) => {
        let key = generateKey(en);
        // handle duplicates
        let count = 1;
        let originalKey = key;
        while(enJson[key] && enJson[key] !== en) {
            key = `${originalKey}_${count}`;
            count++;
        }
        
        enJson[key] = en;
        arJson[key] = ar;
        modified = true;
        return `data-i18n="${key}"`;
    });
    
    content = content.replace(regex2, (match, ar, en) => {
        let key = generateKey(en);
        let count = 1;
        let originalKey = key;
        while(enJson[key] && enJson[key] !== en) {
            key = `${originalKey}_${count}`;
            count++;
        }
        
        enJson[key] = en;
        arJson[key] = ar;
        modified = true;
        return `data-i18n="${key}"`;
    });

    // Handle single data-en where data-ar might be on another line or further down
    const singleRegex = /data-en=["']([^"']*)["']/g;
    content = content.replace(singleRegex, (match, en) => {
        // If it was already replaced by the dual regex, it won't have data-ar next to it maybe?
        // Wait, if I just replaced dual, what's left is either single or separated by newlines.
        // Let's do a more robust parse by finding `data-en` and `data-ar` separately, but that's hard to replace.
        return match; 
    });

    if (modified) {
        fs.writeFileSync(file, content, 'utf8');
        console.log(`Updated ${file}`);
    }
}

// Write JSON files
fs.writeFileSync(path.join(enLocalesPath, 'translation.json'), JSON.stringify(enJson, null, 2));
fs.writeFileSync(path.join(arLocalesPath, 'translation.json'), JSON.stringify(arJson, null, 2));

console.log('Migration complete. Created translation JSONs.');
