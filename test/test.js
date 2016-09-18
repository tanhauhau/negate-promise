var assert = require('assert');
var negate = require('..');

describe('Negate Promise', function () {
    it('returns a promise', function () {
        assert(negate(Promise.reject()) instanceof Promise, 'did not return a promise');
        assert(negate(Promise.resolve()) instanceof Promise, 'did not return a promise');
    });
    it('resolves rejected promise', function () {
        var rejectedPromise = Promise.reject('a');
        var promise = negate(rejectedPromise);
        return promise.then(function(data){
            assert.equal(data, 'a', 'promise did not resolved with rejected data');
        }, function(){
            assert(false, 'promise rejected');
        });
    });
    it('reject resolved promise', function () {
        var resolvedPromise = Promise.resolve('a');
        var promise = negate(resolvedPromise);
        return promise.then(function(){
            assert(false, 'promise resolved');
        }, function(data){
            assert.equal(data, 'a', 'promise did not rejected with resolved data');
        });
    });
});
describe('Negate Callback Function', function () {
    var testFunction = function(a, b, cb){
        if(a + b > 10) {
            cb(a+b);
        }else{
            cb(null, a+b);
        }
    };
    it('returns a function', function () {
        assert(negate(testFunction) instanceof Function, 'did not return a function');
    });
    it('returns a promise when called the returned function', function () {
        assert(negate(testFunction)(1, 2) instanceof Promise, 'did not return a promise');
        assert(negate(testFunction)(10, 20) instanceof Promise, 'did not return a promise');
    });
    it('resolves error callback', function () {
        var fn = negate(testFunction);
        return fn(10, 20).then(function(data){
            assert.equal(data, 30, 'promise did not resolved with rejected data');
        }, function(){
            assert(false, 'promise rejected');
        });
    });
    it('reject resolved promise', function () {
        var fn = negate(testFunction);
        return fn(1, 2).then(function(){
            assert(false, 'promise resolved');
        }, function(data){
            assert.equal(data, 3, 'promise did not rejected with resolved data');
        });
    });
});
describe('Negate others', function () {
    it('returns a rejected promise', function () {
        assert(negate('a string') instanceof Promise, 'did not return a function');
        return negate('a string').then(function(){
            assert(false, 'promise resolved');
        }, function(data){
            assert(data, 'Wrong argument type. Must be either \'Promise\' or \'Function\'');
        });
    });
});
