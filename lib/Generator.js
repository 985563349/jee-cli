const fs = require('fs-extra');
const path = require('path');

class Generator {
  constructor(name, targetDir, option) {
    this.name = name;
    this.targetDir = targetDir;
    this.option = option;
    this.templateDir = path.resolve(__dirname, '../template', option.type ?? 'ts');
  }

  create() {
    const filenames = fs.readdirSync(this.templateDir);
    fs.ensureDirSync(this.targetDir);

    filenames.forEach((filename) => {
      const entry = path.join(this.templateDir, filename);
      const outlet = path.join(this.targetDir, filename);
      const ext = path.parse(filename).ext;

      if (['.js', '.ts', '.tsx'].includes(ext)) {
        const data = require(entry)(this.name);
        fs.writeFileSync(outlet, data);
      } else {
        fs.copySync(entry, outlet);
      }
    });

    console.log('The file was generated successfully!');
  }
}

module.exports = Generator;
