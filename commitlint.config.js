"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Configuration = {
    extends: ['@commitlint/config-conventional'],
    parserPreset: 'conventional-changelog-atom',
    formatter: '@commitlint/format',
    rules: {
        'type-enum': [
            2,
            'always',
            ['feat', 'fix', 'docs', 'style', 'refactor', 'test', 'revert'],
        ],
    },
    ignores: [(commit) => commit === ''],
    defaultIgnores: true,
    helpUrl: 'https://github.com/conventional-changelog/commitlint/#what-is-commitlint',
    prompt: {
        messages: {},
        questions: {
            type: {
                description: 'please input type:',
            },
        },
    },
};
module.exports = Configuration;
//# sourceMappingURL=commitlint.config.js.map