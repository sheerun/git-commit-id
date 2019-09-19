const fs = require('fs')
const path = require('path')

function readFileSync(filepath) {
  try {
    return fs.readFileSync(filepath, 'utf-8').trim()
  } catch (e) {
    if (e.code == 'ENOENT') {
      return
    }

    throw e
  }
}

function gitCommitId (options = {}) {
  const cwd = options.cwd || process.cwd()

  const head = readFileSync(path.join(cwd, '.git', 'HEAD'))

  if (!head) {
    return
  }

  const ref = head.match('refs/heads/.*')[0]

  return readFileSync(path.join(cwd, '.git', ref)) || "4b825dc642cb6eb9a060e54bf8d69288fbee4904"
}

module.exports = gitCommitId
