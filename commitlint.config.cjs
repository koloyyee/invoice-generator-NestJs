'use strict';

const Configuration = {
    extends: ['@commitlint/config-conventional'],
    formatter: '@commitlint/format',
    rules: {
        'type-enum': [
            2,
            'always',
            ['feat', 'fix', 'docs', 'style', 'refactor', 'test', 'revert'],
        ],
        'header-max-length': [1, 'always', 72],
        'subject-full-stop': [1, 'always', '.'],
    },
};
module.exports = Configuration;
