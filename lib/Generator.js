const fs = require('fs-extra');
const path = require('path');
const Handlebars = require('handlebars');

class Generator {
  constructor(name, targetDir, option) {
    this.name = name;
    this.targetDir = targetDir;
    this.option = option;
    this.templateDir = path.resolve(__dirname, '../template');
  }

  create() {
    const files = this.readdirSync(this.templateDir);

    files.forEach((file) => {
      const entry = path.join(this.templateDir, file);
      const output = path.join(
        this.targetDir,
        file.replace(/\[name\]/, this.name).replace('.hbs', '')
      );
      const ext = path.parse(file).ext;

      if (ext === '.hbs') {
        const template = Handlebars.compile(fs.readFileSync(entry, 'utf-8'));
        try {
          fs.outputFileSync(output, template({ name: this.name }));
        } catch {
          console.log('Template compilation exception!');
        }
      } else {
        fs.copySync(entry, output);
      }
    });

    console.log('The file was generated successfully!');
  }

  readdirSync(dirPath) {
    const result = [];

    const traverse = (entry) => {
      const files = fs.readdirSync(entry);

      files.forEach((file) => {
        const filePath = path.join(entry, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
          traverse(filePath);
        } else {
          result.push(filePath.replace(new RegExp(`^${dirPath}/`), ''));
        }
      });
    };

    traverse(dirPath);

    return result;
  }
}

module.exports = Generator;
