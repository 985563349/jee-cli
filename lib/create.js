const { join } = require('path');
const fs = require('fs-extra');
const inquirer = require('inquirer');
const Generator = require('./Generator');

module.exports = async function (name, path, option) {
  const cwd = process.cwd();
  const targetDir = join(cwd, path, name);

  if (fs.existsSync(targetDir)) {
    if (option.force) {
      await fs.remove(targetDir);
    } else {
      const { action } = await inquirer.prompt([
        {
          name: 'action',
          type: 'list',
          message: 'Target directory already exists Pick an action:',
          choices: [
            { name: 'Overwrite', value: 'overwrite' },
            { name: 'Cancel', value: false },
          ],
        },
      ]);

      if (!action) {
        return;
      } else if (action === 'overwrite') {
        await fs.remove(targetDir);
        console.log('Removed successfully!');
      }
    }
  }

  const generator = new Generator(name, targetDir, option);
  generator.create();
};
