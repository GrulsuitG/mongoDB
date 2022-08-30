const addSum = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
        if(typeof a !== 'number' || typeof b !== 'number') 
            reject('a, b must be numbers');
        resolve(a+b)
        }, 1000);
    })
}

// addSum(10, 20)
//     .then(sum => addSum(sum, 1))
//     .then(sum => addSum(sum, 1))
//     .then(sum => addSum(sum, 1))
//     .then(sum => addSum(sum, 1))
//     .then(sum => addSum(sum, 1))
//     .then(sum => addSum(sum, 1))
//     .then(sum => console.log({sum}))
//     .catch(error => console.log({error}))

const totalSum = async() => {
    try {
        let sum = await addSum(10, 10)
        let sum2 = await addSum(sum, 'asd');
        console.log({sum, sum2})
    } catch(err) {
        console.log({err})
    }
    
}
    
totalSum()
