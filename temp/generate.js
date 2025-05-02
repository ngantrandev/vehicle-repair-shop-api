const fs = require('fs');
const path = require('path');

const inputFile = path.join(__dirname, 'uploaded-images.json');
const outputSQL = path.join(__dirname, 'update-bookings.sql');

const images = JSON.parse(fs.readFileSync(inputFile, 'utf-8'));

const sqlStatements = images.map(({ name, url }) => {
    const oldPath = `uploads\\\\${name}`;
    return `UPDATE bookings SET image_url = '${url}' WHERE image_url = '${oldPath}';`;
});

fs.writeFileSync(outputSQL, sqlStatements.join('\n'), 'utf-8');

console.log(`file SQL: ${outputSQL}`);
