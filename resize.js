const path = require('path');
const fs = require('fs');
const sharp = require('sharp');
const filepath = process.argv[2];
const dirname = path.dirname(filepath);

const [fileName, extension] = path.basename(filepath).split('.');

const destination = `${dirname}/redimensioned`;

if (!fs.existsSync(destination)) {
  fs.mkdirSync(destination);
}

const sizes = [128, 48, 32, 24, 16];

sizes.forEach((size) => {
  sharp(filepath)
    .clone()
    .resize({ width: size })
    .toFile(`${destination}/${fileName}-${size}.${extension}`)
    .then((info) => {
      console.log(info);
    })
    .catch((err) => console.error(err));
});
