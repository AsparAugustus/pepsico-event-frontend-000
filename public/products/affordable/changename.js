const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('What prefix would you like to use? ', function(prefix) {
  fs.readdir('.', function(err, files) {
    if (err) {
      console.error(err);
      rl.close();
      return;
    }

    files.forEach(function(file) {
      const ext = path.extname(file);
      if (ext === '.jpg') {
        const newName = `${prefix}_${file}`;
        fs.rename(file, newName, function(err) {
          if (err) {
            console.error(err);
            rl.close();
            return;
          }

          console.log(`Renamed file ${file} to ${newName}`);
        });
      }
    });

    rl.close();
  });
});

