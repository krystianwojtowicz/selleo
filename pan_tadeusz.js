import { readFile, writeFileSync } from 'fs';

function readTextFile(filename) {
  return new Promise((resolve, reject) => {
    readFile(filename, 'utf8', (err, data) => {
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
  const lines = text.split('\n');

  lines.forEach((line) => {
    const words = line.replace(/[^\w\s]/g, '').split(/\s+/);
    words.some((word) => {
      const trimmedWord = word.trim();

      if (trimmedWord) {
        if (!uniqueWords.has(trimmedWord)) {
          uniqueWords.add(trimmedWord);
          return true;
        }
      }
    });
  });
  return [...uniqueWords];
}

async function main() {
  try {
    const text = await readTextFile('pan_tadeusz.txt');
    const wordList = createWordList(text);

    writeFileSync('word_list.txt', wordList.join('\n'));
    console.log('Word list created successfully.');
  } catch (error) {
    console.error('Error:', error);
  }
}

main();
