const fs = require('fs')
const path = require('path')

function gitCommitId (options = {}) {
  const cwd = options.cwd || process.cwd()

  if (!fs.existsSync(path.join(cwd, '.git'))) {
    return
  }

  const head = fs.readFileSync(path.join(cwd, '.git', 'HEAD'), 'utf-8')
  const ref = head.match('refs/heads/.*')[0]

  return fs.readFileSync(path.join(cwd, '.git', ref), 'utf-8').trim()
}

module.exports = gitCommitId
