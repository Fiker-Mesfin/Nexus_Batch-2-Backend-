// index.js
const fs = require('fs/promises');

async function readFiles() {
  try {
    const files = ['a.txt', 'b.txt', 'c.txt'];
    const contents = await Promise.all(
      files.map(file => fs.readFile(file, 'utf-8'))
    );

    let totalCharacters = 0;

    contents.forEach((content, index) => {
      console.log(`Content of ${files[index]}:`);
      console.log(content);
      console.log('---');
      totalCharacters += content.length;
    });

    console.log(`Total number of characters: ${totalCharacters}`);
  } catch (err) {
    console.error('Error reading files:', err.message);
  }
}

readFiles();

