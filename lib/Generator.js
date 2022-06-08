const fs = require('fs-extra');
const path = require('path');
const Handlebars = require('handlebars');

class Generator {
  constructor(name, targetDir, option) {
    this.name = name;
    this.targetDir = targetDir;
    this.option = option;
    this.templateDir = path.resolve(__dirname, '../template', this.option.type ?? 'ts');
  }

  create() {
    const files = fs.readdirSync(this.templateDir);
    fs.ensureDirSync(this.targetDir);

    files.forEach((file) => {
      const entry = path.join(this.templateDir, file);
      const output = path.join(this.targetDir, file.replace('.handlebars', ''));
      const ext = path.parse(file).ext;

      if (ext === '.handlebars') {
        const template = Handlebars.compile(fs.readFileSync(entry, 'utf-8'));
        try {
          fs.writeFileSync(output, template({name: this.name}));
        } catch {
          console.log('Template compilation exception!')
        }
      } else {
        fs.copySync(entry, output);
      }
    });

    console.log('The file was generated successfully!');
  }
}

module.exports = Generator;
