const fs = require('fs');

// Read lines from files
const kaylaLinesFile = '../data/kaylaLines.txt';
const lorneLinesFile = '../data/lorneLines.txt';

const kaylaLines = fs.readFileSync(kaylaLinesFile, 'utf-8').split('\n');
const lorneLines = fs.readFileSync(lorneLinesFile, 'utf-8').split('\n');

// Tokenize lines for Kayla
const kaylaTokens = kaylaLines.map(line => line.match(/[\w'@-]+|[^\w\s]+/g)).filter(tokens => tokens && tokens.length > 0);

// Tokenize lines for Lorne
const lorneTokens = lorneLines.map(line => line.match(/[\w'@-]+|[^\w\s]+/g)).filter(tokens => tokens && tokens.length > 0);

// Convert tokens to string
const kaylaTokenString = kaylaTokens.map(tokens => tokens.join(' ')).join('\n');
const lorneTokenString = lorneTokens.map(tokens => tokens.join(' ')).join('\n');

// Write token strings to files
fs.writeFileSync('../data/kaylaTokens.txt', kaylaTokenString, 'utf-8');
fs.writeFileSync('../data/lorneTokens.txt', lorneTokenString, 'utf-8');

console.log('Tokens exported to files.');
