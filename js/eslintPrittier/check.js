const fs = require('fs');
const exec = require('child_process').exec;
const CLIEngine = require('eslint').CLIEngine;
const cli = new CLIEngine({});
function getErrorLevel(number) {
  switch (number) {
    case 2:
      return 'error';
    case 1:
      return 'warn';
    default:
  }
  return 'undefined';
}
let pass = 0;
exec(`git diff --cached --name-only| grep -E ".(js|vue)$"`, (error, stdout) => {
  if (stdout.length) {
    const array = stdout.split('\n');
    array.pop();
    let l = array.length;
    for (let i = l - 1; i >= 0; i--) {
      try {
        fs.statSync(array[i]);
      } catch (error) {
        array.splice(array.indexOf(array[i]), 1);
        i--;
      }
    }
    // array.filter(f => {
    //   try {
    //     fs.statSync(f);
    //     return true;
    //   } catch (error) {
    //     console.log(array, array.indexOf(f));
    //     // array.splice(array.indexOf(f), 1);
    //     console.log(error);
    //     return false;
    //   }
    // });
    const results = cli.executeOnFiles(array).results;
    let errorCount = 0;
    let warningCount = 0;
    results.forEach((result) => {
      errorCount += result.errorCount;
      warningCount += result.warningCount;
      if (result.messages.length > 0) {
        console.log('\n');
        console.log(result.filePath);
        result.messages.forEach((obj) => {
          const level = getErrorLevel(obj.severity);
          console.log(`   ${obj.line}:${obj.column}  ${level}  ${obj.message}  ${obj.ruleId}`);
          pass = 1;
        });
      }
    });
    if (warningCount > 0 || errorCount > 0) {
      console.log(`\n   ${errorCount + warningCount} problems (${errorCount} ${'errors'} ${warningCount} warnings)`);
    }
    process.exit(pass);
  }
  if (error !== null) {
    console.log(`exec error: ${error}`);
  }
});
