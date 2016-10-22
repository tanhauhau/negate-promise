module.exports = function(promiseOrFn) {
    if(promiseOrFn instanceof Promise) {
        return new Promise(function(resolve, reject) {
            promiseOrFn.then(reject, resolve);
        });
    } else if(promiseOrFn instanceof Function) {
        return (...args) => {
            return new Promise(function(resolve, reject) {
                promiseOrFn(...args, (err, data) => {
                    if(err){
                        resolve(err);
                    }else{
                        reject(data);
                    }
                });
            });
        };
    }
    return Promise.reject('Wrong argument type. Must be either \'Promise\' or \'Function\'');
}
