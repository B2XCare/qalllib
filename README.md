# qalllib
 

*Description*

3 wrapper functions to reduce the qall complexity .

qalllib.qSyncAll(functionName, arrayOfElements) 
qalllib.qAsyncAll(functionName, arrayOfElements) 
qalllib.qASyncWithBatch(functionName, arrayOfElements, batchSize)

# Params:
1.  functionName=function should always return promise.
2.  arrayOfElements: is array for which the qall has to be executed .
3. -batchSize : interger default 10 batch size is to limit the async call to batch. helps to reduce overloading.

# EXAMPLE
pass array to add function with batch size 3

```javascript

let add = function(num, ...args) {
    let defer = q.defer()
    setTimeout(function() {
        (num % 2 === 0) ? defer.resolve(num + num): defer.reject({
            'lol': num
        })
    }, 1000)

    return defer.promise
}



    qalllib.qASyncWithBatch(add, [1,2,3,4,5], 3) 
    	.then(function(data) {
            console.log((new Date()).toTimeString().slice(0, 8), 'end executing:');
            console.log(data);
        })
        .catch(function(error) {
            console.log('error in catch', error)
        })
        .done(console.log('promise done'))
```

