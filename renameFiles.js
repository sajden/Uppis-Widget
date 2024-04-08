const fs = require('fs');
const path = require('path');

const buildDirectoryJs = path.join(__dirname, 'build', 'static', 'js');
const buildDirectoryCss = path.join(__dirname, 'build', 'static', 'css');

const renameFiles = (directory, oldExt, newExt) => {
  fs.readdir(directory, (err, files) => {
    if (err) {
      console.error(`Could not list the directory: ${directory}`, err);
      process.exit(1);
    }

    files.forEach((file) => {
      if (file.startsWith('main.') && file.endsWith(oldExt)) {
        const filePath = path.join(directory, file);
        const newFilePath = path.join(directory, `main${newExt}`);
        fs.rename(filePath, newFilePath, function (err) {
          if (err) {
            console.error(`Could not rename the file: ${file}`, err);
            process.exit(1);
          }
          console.log(`Renamed ${file} to main${newExt}`);
        });
      }
    });
  });
};

// Rename JavaScript files
renameFiles(buildDirectoryJs, '.js', '.js');
// Rename CSS files
renameFiles(buildDirectoryCss, '.css', '.css');
