/* eslint-env node, mocha */

const { expect } = require('chai');
const fulfilled = require('../index');

describe('promisesFulfilled', () => {
  it("resolves when all promises are resolved", () => {
    return fulfilled([Promise.resolve(1), Promise.resolve('a')])
      .then((result) => expect(result).to.deep.equal([1, 'a']));
  });

  it("rejects with first error", () => {
    return fulfilled([Promise.resolve('a'), Promise.reject('b'), Promise.reject('c'), Promise.resolve('d')])
      .catch((err) => expect(err).to.equal('b'));
  });

  it("waits for all promises when all resolved, return result in order", () => {
    var resolved = false;
    return fulfilled([Promise.resolve('a'), new Promise((resolve) => { resolved = true; resolve('b'); }), Promise.resolve('c')])
      .then((result) => {
        expect(result).to.deep.equal(['a', 'b', 'c']);
        expect(resolved).to.be.true;
      });
  });

  it("waits for all promises when one rejected", () => {
    var resolved = false;
    return fulfilled([Promise.reject('a'), new Promise((resolve) => { resolved = true; resolve(); })])
      .catch((err) => {
        expect(err).to.equal('a');
        expect(resolved).to.be.true;
      });
  });

  it("allows all non-promises", () => {
    return fulfilled(['a', undefined, null, 5])
      .then((result) => expect(result).to.deep.equal(['a', undefined, null, 5]));
  });

  it("allows non-promises with promises", () => {
    return fulfilled(['a', Promise.resolve('b'), undefined, null, 5])
      .then((result) => expect(result).to.deep.equal(['a', 'b', undefined, null, 5]));
  });

  it("allows empty array", () => {
    return fulfilled([])
      .then((result) => expect(result).to.deep.equal([]));
  });
});
