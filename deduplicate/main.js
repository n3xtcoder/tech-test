const wordList = ['not', 'a', 'pheasant', 'plucker', 'but', 'a', 'pheasant', "plucker's", 'son']
// [ 'not', 'a', 'pheasant', 'plucker', 'but', 'plucker\'s', 'son' ]

// let temp = JSON.stringify(wordList).replace("'", "\\'")
// let temp2 = JSON.parse(temp)
// console.log(temp2)

// const filterArray = (array) => [...new Set(array)].map(ele => JSON.stringify(ele))
const filterArray = (array) => [...new Set(array)].map(ele => ele.replace(/'/g, '"').replace(/"/g, String.fromCharCode(92, 39)))
// with help of spread Operator and new Set we will have an array with unique values

// const filterArray2 = (array) => array.filter((element, index, array) => (array.indexOf(element) === index)).map(ele => ele.replace("'", String.fromCharCode(92)))
// const filterArray3 = (array) => array.filter((element, index, array) => (array.indexOf(element) === index)).map(ele => {
//     if (ele.indexOf("'") !== -1) {
//         let first = ele.slice(0, ele.indexOf("'"))
//         console.log(first)
//         let middle = "\\'"
//         console.log(middle)
//         let rest = ele.slice(ele.indexOf("'") + 1)
//         console.log(rest)
//         console.log(first + middle + rest)
//         let alles = first + middle + rest
//         console.log(alles)
//         return alles
//     } else {
//         return ele
//     }
// })
// we look, where the first apperance of this element is. If it is the index it is the first time it apperce.
// If the number is bigger we dont return the element because it's already there

// console.log(filterArray3(wordList))
console.log(filterArray(wordList))

// The \ is a problem. 
// tried:
// replace
// \x27
// String.fromCharCode(92)
