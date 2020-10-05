const path = require('path')
const fs = require('fs')
const { checkDependencies } = require('../../repo-convention')

for (let i = 1; i < process.argv.length; i++) {
  const file = path.normalize((path.join(process.cwd(), process.argv[i])))
  if (file.startsWith(path.join(process.cwd(), 'dtmi/'))) {
    console.log('\nchecking: ' + file)
    const dtdlJson = JSON.parse(fs.readFileSync(file, 'utf-8'))
    const id = dtdlJson['@id']
    console.log('Scanning dependencies for: ' + id)
    if (!checkDependencies(id)) {
      process.exit(1)
    }
  } else {
    console.debug('Skipping file: ' + file)
  }
}
