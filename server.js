import fs from 'fs';
import objectHash from 'object-hash';

function createUniqueWordArrayWithMD5(text) {
  const uniqueWords = new Map();

  const lines = text.split('\n');

  lines.forEach((line) => {
    const words = line.match(/\b\w+\b/g);

    if (words && words.length > 0) {
      let foundUniqueWord = false;
      words.forEach((word) => {
        const trimmedWord = word.trim();

        if (!foundUniqueWord && !uniqueWords.has(trimmedWord)) {
          const md5Hash = objectHash(trimmedWord, { algorithm: 'md5' });
          uniqueWords.set(trimmedWord, md5Hash);
          foundUniqueWord = true;
        }
      });
    }
  });

  return uniqueWords;
}

fs.readFile('pan_tadeusz.txt', 'utf8', (err, data) => {
  if (err) {
    console.error('Błąd podczas wczytywania pliku:', err);
    return;
  }

  const uniqueWordsWithMD5 = createUniqueWordArrayWithMD5(data);

  let outputText = '';
  uniqueWordsWithMD5.forEach((md5Hash, word) => {
    outputText += `${word} ${md5Hash}\n`;
  });

  fs.writeFile('unique_words_with_md5.txt', outputText, (err) => {
    if (err) {
      console.error('Błąd podczas zapisu pliku:', err);
      return;
    }
    console.log('Dane zostały zapisane do pliku unique_words_with_md5.txt');
  });
});
