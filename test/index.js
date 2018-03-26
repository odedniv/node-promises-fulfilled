/* eslint-env node, mocha */

const { expect } = require('chai');
const promisesFulfilled = require('../index');

describe('promisesFulfilled', () => {
  it("should resolve when all have resolved", () => {
    return promisesFulfilled([Promise.resolve(1), Promise.resolve('a')])
      .then((result) => expect(result).to.deep.equal([1, 'a']));
  });

  it("should not reject with first error", () => {
    return promisesFulfilled([Promise.resolve('a'), Promise.reject('b'), Promise.reject('c'), Promise.resolve('d')])
      .catch((err) => expect(err).to.equal('b'));
  });

  it("should wait for all promises when all resolved, return result in order", () => {
    var resolved = false;
    return promisesFulfilled([Promise.resolve('a'), new Promise((resolve) => { resolved = true; resolve('b'); }), Promise.resolve('c')])
      .then((result) => {
        expect(result).to.deep.equal(['a', 'b', 'c']);
        expect(resolved).to.be.true;
      });
  });

  it("should wait for all promises when one rejected", () => {
    var resolved = false;
    return promisesFulfilled([Promise.reject('a'), new Promise((resolve) => { resolved = true; resolve(); })])
      .catch((err) => {
        expect(err).to.equal('a');
        expect(resolved).to.be.true;
      });
  });
});
