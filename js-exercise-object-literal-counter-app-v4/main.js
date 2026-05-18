function counterApp(arr) {
    let result = {};
    if(arr === undefined){
        return "Invalid input"
    }else if(arr.length === 0){
        return "Data not found"
    }

    for (let i = 0; i < arr.length; i++){
        if (result[arr[i]] === undefined){
            result[arr[i]] = 1
        } else {
            result[arr[i]] ++
        }
    }
    return result;
}

console.log(counterApp(['Hikman', 'Naufal', 'Kanda', 'Arya', 'Kanda', 'Hikman', 'Naufal', 'Hikman', 'Kanda', 'Kanda']));
console.log(counterApp([5, 6, 7, 5, 5, 7, 6, 7, 7, 7, 5, 6]));
console.log(counterApp([]));
console.log(counterApp());

module.exports = counterApp
