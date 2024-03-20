const fs = require('fs');
const hash = require('object-hash');

function readTextFile(filename) {
  return new Promise((resolve, reject) => {
    fs.readFile(filename, 'utf8', (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}

function createWordList(text) {
  const uniqueWords = new Set();
  const wordHashes = new Map(); // Mapa przechowująca pary słowo -> skrót

  const lines = text.split('\n');

  lines.forEach((line) => {
    const words = line.replace(/[^\w\s]/g, '').split(/\s+/);
    words.forEach((word) => {
      const trimmedWord = word.trim();

      if (trimmedWord) {
        if (!uniqueWords.has(trimmedWord)) {
          uniqueWords.add(trimmedWord);
          const md5Hash = hash(trimmedWord, { algorithm: 'md5' }); // Generowanie skrótu MD5 za pomocą object-hash
          wordHashes.set(trimmedWord, md5Hash); // Dodajemy słowo i jego skrót do mapy
        }
      }
    });
  });

  return Array.from(wordHashes.entries());
}

async function main() {
  try {
    const text = await readTextFile('pan_tadeusz.txt');
    const wordList = createWordList(text);

    fs.writeFileSync('word_list.txt', wordList.join('\n'));
    console.log('Word list created successfully.');
  } catch (error) {
    console.error('Error:', error);
  }
}

main();
