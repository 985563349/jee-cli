#! /usr/bin/env node

const program = require('commander');
const create = require('../lib/create');

program.version(`v${require('../package.json').version}`).usage('<command> [option]');

program
  .command('generate <name> <path>')
  .alias('g')
  .description('generate template')
  .option('-f --force', 'overwrite targe directory if it exist')
  .action((name, path, option) => {
    create(name, path, option);
  });

program.command('202155').action(() => {
  console.log('WJ love LYG!');
});

program.parse(process.argv);
