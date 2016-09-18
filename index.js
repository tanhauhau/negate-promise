module.exports = function(promiseOrFn) {
    if(promiseOrFn instanceof Promise) {
        return new Promise(function(resolve, reject) {
            promiseOrFn.then(reject, resolve);
        });
    } else if(promiseOrFn instanceof Function) {
        return function(){
            var args = [].slice.call(arguments);
            return new Promise(function(resolve, reject) {
                args.push(function cb(err, data){
                    if(err){
                        resolve(err);
                    }else{
                        reject(data);
                    }
                });
                promiseOrFn.apply(null, args);
            });
        };
    } else {
        return Promise.reject('Wrong argument type. Must be either \'Promise\' or \'Function\'');
    }
}
