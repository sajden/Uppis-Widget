const fs = require('fs');
const path = require('path');

const buildDirectory = path.join(__dirname, 'build', 'static', 'js');

fs.readdir(buildDirectory, (err, files) => {
  if (err) {
    console.error('Could not list the directory.', err);
    process.exit(1);
  }

  files.forEach((file, index) => {
    const filePath = path.join(buildDirectory, file);
    if (file.startsWith('main.') && file.endsWith('.js')) {
      const newFilePath = path.join(buildDirectory, 'main.js');
      fs.rename(filePath, newFilePath, function (err) {
        if (err) {
          console.error('Could not rename the file.', err);
          process.exit(1);
        }
        console.log(`Renamed ${file} to main.js`);
      });
    }
  });
});
