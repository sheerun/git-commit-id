const execSync = require('child_process').execSync
const gitCommitId = require('../')
const fs = require('fs-extra')
const os = require('os')
const path = require('path')

const tmp = os.tmpdir()
const cwd = path.join(tmp, 'g')

beforeEach(() => {
  fs.removeSync(cwd)
  fs.mkdirpSync(cwd)
})

function git (commands, options = {}) {
  return execSync('git ' + commands, { cwd: options.cwd || cwd })
    .toString()
    .trim()
}

it('return undefined if not in git repository', () => {
  expect(gitCommitId({ cwd: '/tmp' })).toEqual(undefined)
})

it('returns emptry tree id for fresh repository', () => {
  git('init')
  expect(gitCommitId({ cwd })).toEqual(
    '4b825dc642cb6eb9a060e54bf8d69288fbee4904'
  )
})

it('gets git commit id for commit', () => {
  git('init')
  git('commit --allow-empty -m test --author="User <user@example.com>"')
  expect(gitCommitId({ cwd })).toEqual(git('rev-parse HEAD'))
})

it('gets git commit id for this repo', () => {
  const commitId = git('rev-parse HEAD', { cwd: process.cwd() })
  expect(gitCommitId()).toEqual(commitId)
})

it('gets git commit id for detached head', () => {
  git('init')
  git('commit --allow-empty -m test --author="User <user@example.com>"')
  git('commit --allow-empty -m test2 --author="User <user@example.com>"')
  git('checkout HEAD^')
  expect(gitCommitId({ cwd })).toEqual(git('rev-parse HEAD'))
})
