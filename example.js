let _ = require('underscore')
let q = require('q')
var qalllib = require('./index')

let add = function (num) {
  console.log((new Date()).toTimeString().slice(0, 8), 'start executing:' + num)

  let defer = q.defer()

  setTimeout(function () {
    (num % 2 === 0) ? defer.resolve(num + num) : defer.reject({'lol': num})
  }, _.random(1000, 2000))

  return defer.promise
}

let nos = [2, 1, 2]

for (let i = 0; i < 3; i++) { nos.push(_.random(1, 99)) }

// qalllib.qSyncAll(add, nos)
//qalllib.qAsyncAll(add, nos)
qalllib.qASyncWithBatch(add, nos, 5)
  .then(function (data) {
    console.log((new Date()).toTimeString().slice(0, 8), 'end executing:')
    console.log(data)
  })
  .catch(function (error) {
    console.log(error, error, error)
  })
  .done(console.log('dowAne'))
