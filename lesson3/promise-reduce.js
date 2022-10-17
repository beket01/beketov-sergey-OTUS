async function promiseReduce(asyncFunctions, reduce, initialValue) {
    for (const af of asyncFunctions) {
        let result = await af()
        initialValue = reduce(result, initialValue)
    }

    return initialValue
}

// Тесты
let fn1 = () => {
    console.log('fn1')
    return Promise.resolve(1)
}
let fn2 = () => new Promise(resolve => {
    console.log('fn2')
    setTimeout(() => resolve(2), 1000)
})

promiseReduce(
    [fn1, fn2],
    function (memo, value) {
        console.log('reduce')
        return memo * value
    },
    1
)
    .then(console.log)