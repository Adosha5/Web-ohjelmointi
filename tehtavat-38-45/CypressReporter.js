'use strict';

const Mocha = require('mocha');
var fs = require("fs");

const {
  EVENT_RUN_BEGIN,
  EVENT_RUN_END,
  EVENT_TEST_FAIL,
  EVENT_TEST_PASS,
  EVENT_SUITE_BEGIN,
  EVENT_SUITE_END,
  EVENT_TEST_BEGIN,
  EVENT_TEST_END
} = Mocha.Runner.constants;

// this reporter outputs test results, indenting two spaces per suite
class CypressReporter {
  constructor(runner) {
    const stats = runner.stats;
    let results = [];

    runner   
      .once(EVENT_TEST_BEGIN, () => {
        //console.log('Test begin');
      })
      .on(EVENT_SUITE_BEGIN, () => {
   
     })
      .on(EVENT_RUN_END, (suite) => {
        //console.log("EVENT_TEST_END", stats);
      })
      .on(EVENT_TEST_PASS, test => {
        // Test#fullTitle() returns the suite name(s)
        // prepended to the test title
        //console.log(test);
        console.log('\x1b[32m', test.title + " PASSED ", '\x1b[0m');
        results.push({assignment: test.parent.title,  status : "PASSED", title : test.title})
      })
      .on(EVENT_TEST_FAIL, (test, err) => {
        //let txt = `${test.fullTitle()} : error: ${err.message} FAILED`
        //let txt = `${test.title} : error: ${err.message} FAILED`
        console.log('\x1b[31m', test.title + " FAILED ", '\x1b[0m');
        results.push({assignment: test.parent.title,  status : "FAILED", title: test.title})
      })
      .once(EVENT_RUN_END, () => {
        //console.log(`end: ${stats.passes}/${stats.passes + stats.failures} ok`);
        //console.log(results);

        let totalPoints = 0;
        let r = this.groupBy(results, "assignment");
        for(var testCase in r)
        {
          //console.log(testCase);
          //console.log(r[testCase]);
          let passed = 0, failed = 0;        
          for(var t=0; t < r[testCase].length; t++)
          {
            var testRun = r[testCase][t];
            if ( testRun.status == "PASSED")
              passed++;
            else
              failed++;
          }
          let total = passed + failed;
          let tulos = passed / total;
          let pisteet = tulos >= 0.5 ? 1 : 0;
          totalPoints += pisteet;
          console.log(`${testRun.assignment}: passed/failed: ${passed}/${failed} tulos: ${tulos.toFixed(1)} -> pisteet: ${pisteet}`);
        }

        var txt = `KOKONAISPISTEET:${totalPoints}`;
        console.log(txt);
        fs.writeFileSync('result.txt', txt)
      });
  }

  groupBy(xs, key) {
    return xs.reduce(function(rv, x) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  }
}

module.exports = CypressReporter;
