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
