'use strict';
var Generator = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = Generator.extend({
  init: function () {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to ' + chalk.magenta('Floston Paradise') + '!'
    ));

    var prompts = [
      {
        name: 'repo',
        message: chalk.blue('Project') + ' Repository of the project?'
      },
      {
        name: 'name',
        message: chalk.blue('Project') + ' Name of the project?'
      },
      {
        name: 'description',
        message: chalk.blue('Project') + ' Description of the project?'
      },
      {
        type: 'checkbox',
        name: 'targets',
        message: chalk.blue('Project') + ' For which targets do you aim?',
        choices: [
          { name: 'Electron', value: 'electron' }
        ],
        defaults: []
      }
    ];

    return this.prompt(prompts).then(function (props) {
      // To access props later use this.props.someAnswer;
      this.props = props;
    }.bind(this));
  },

  boostrap: function () {
    const tpl = {
      git: {
        name: this.user.git.name(),
        email: this.user.git.email()
      },
      name: this.props.name,
      description: this.props.description,
      repo: this.props.repo,
      electron: this.props.targets.includes('electron'),
    }

    tpl.call = tpl.electron ? 'electron lib/index.js' : 'node lib/index.js'

    this.fs.copyTpl([
			`${this.templatePath()}/**`,
			'!**/cli.js'
		], this.destinationPath(), tpl);
  },

  install: function () {
    this.installDependencies({
      bower: false,
      npm: false,
      yarn: true
    });
  }
});
