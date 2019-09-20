# git-commit-id [![Build Status](https://travis-ci.org/sheerun/git-commit-id.svg?branch=master)](https://travis-ci.org/sheerun/git-commit-id) [![Modern Node](https://img.shields.io/badge/modern-node-9BB48F.svg)](https://github.com/sheerun/modern-node)

> Returns commit id (commit sha) of git repository

This package is fast, has no dependencies, has synchronous API, doesn't require git binary.

Useful e.g. for CI, release for [Sentry](https://github.com/getsentry/sentry-webpack-plugin) or build id for [Next.js](https://github.com/zeit/next.js#configuring-the-build-id)

## Installation

```
yarn add --dev git-commit-id
```

> If you're using [npm](https://www.npmjs.com/) you can use: `npm install --save-dev git-commit-id`.

## Usage

```js
const gitCommitId = require('git-commit-id')

const commitId = gitCommitId()
```

You can also pass `cwd` option to specify git directory:


```
const commitId = gitCommitId({ cwd: __dirname })
```

## License

MIT
