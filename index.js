'use strict';

function promisesFulfilled(promises) {
  return new Promise(function (resolve, reject) {
    var finished = 0;
    var results = [];
    var error = false;
    var firstErr = undefined;

    function checkFinished() {
      if (finished < promises.length) return;
      if (!error) {
        resolve(results);
      } else {
        reject(firstErr);
      }
    }

    promises.forEach(function (promise, i) {
      promise
        .then(function (result) {
          results[i] = result;
          finished++;
          checkFinished();
        })
        .catch(function (err) {
          error = true;
          firstErr = firstErr || err;
          finished++;
          checkFinished();
        });
    });

    checkFinished();
  });
}

module.exports = promisesFulfilled;
