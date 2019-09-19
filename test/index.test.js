const execSync = require('child_process').execSync
const gitCommitId = require('../')

const cwd = '/tmp/g'

beforeEach(() => {
  execSync(`rm -rf ${cwd} && mkdir ${cwd}`)
})

function git(commands) {
  return execSync('git ' + commands, { cwd }).toString().trim()
}

it('return undefined if not in git repository', () => {
  expect(gitCommitId({ cwd: '/tmp' })).toEqual(undefined)
})

it('returns emptry tree id for fresh repository', () => {
  git('init')
  expect(gitCommitId({ cwd })).toEqual('4b825dc642cb6eb9a060e54bf8d69288fbee4904')
})

it('gets git commit id', () => {
  git('init')
  git('commit --allow-empty -m test')
  expect(gitCommitId({ cwd })).toEqual(git('rev-parse HEAD'))
})
