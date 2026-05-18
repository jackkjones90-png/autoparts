const fs = require('fs');
const path = require('path');
const file = path.join(__dirname, 'lib/data/products.ts');
let content = fs.readFileSync(file, 'utf8');
content = content.replace(/"inStock": false/g, '"inStock": true');
fs.writeFileSync(file, content);
console.log('Stock updated!');
