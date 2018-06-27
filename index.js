let q = require('q')

let qSyncAll = function (functionName, nos) {
  let p = q.makePromise()
  let thePromises = []

  nos.forEach(function (file) {
    p = p
      .then(function () {
        return functionName(file)
      })

      .catch(function (error) {
        return {
          data: error,
          flag: 'reject'
        }
      })
    thePromises.push(p)
  })

  return q.all(thePromises)
    .then(function (allResponses) {
      let data = {
        resolve: [],
        reject: []
      }
      allResponses.forEach(function (resp) {
        if (resp.flag == 'reject') {
          data.reject.push(resp.data)
        } else {
          data.resolve.push(resp)
        }
      })
      return data
    })
}

let qAsyncAll = function (functionName, nos) {
  let data = {
    resolve: [],
    reject: []
  }

  return q.all(nos.map(function (obj) {
    return functionName(obj).catch(function (error) {
      data.reject.push(error)
    })
  }))
    .then(function (allResponses) {
      allResponses.forEach(function (resp) {
        if (resp != null) {
          data.resolve.push(resp)
        }
      })
      return data
    })

    .catch(function (error) {
      data.reject.push(error)
      console.log(error, error, error)
    })
}

let qASyncWithBatch = function (functionName, nos, batchSize = 10) {
  let p = q.makePromise()
  let thePromises = []

  let arrays = []
  while (nos.length > 0) { arrays.push(nos.splice(0, batchSize))}

  arrays.forEach(function (file) {
    p = p
      .then(function () {
        return qAsyncAll(functionName, file)
      })

      .catch(function (error) {
        return {
          data: error,
          flag: 'reject'
        }
      })
    thePromises.push(p)
  })

  return q.all(thePromises)
    .then(function (allResponses) {
      let data = {
        resolve: [],
        reject: []
      }
      allResponses.forEach(function (resp) {
        if (resp.resolve.length > 0) {
          data.resolve = data.resolve.concat(resp.resolve)
        }
        if (resp.reject.length > 0) {
          data.reject = data.reject.concat(resp.reject)
        }
      })
      return data
    })
}

exports.qSyncAll = qSyncAll
exports.qAsyncAll = qAsyncAll
exports.qASyncWithBatch = qASyncWithBatch
