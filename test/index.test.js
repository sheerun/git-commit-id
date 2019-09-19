const execSync = require('child_process').execSync
const gitCommitId = require('../')

it('gets git commit id', () => {
  const commitId = execSync('git rev-parse HEAD').toString().trim()
  expect(gitCommitId()).toEqual(commitId)
})

it('return undefined if not in git repository', () => {
  const commitId = execSync('git rev-parse HEAD').toString().trim()
  expect(gitCommitId({ cwd: '/tmp' })).toEqual(undefined)
})

it('returns emptry tree id for fresh repository', () => {
  execSync('rm -rf /tmp/g && mkdir /tmp/g && cd /tmp/g && git init')
  expect(gitCommitId({ cwd: '/tmp/g' })).toEqual('4b825dc642cb6eb9a060e54bf8d69288fbee4904')
})
