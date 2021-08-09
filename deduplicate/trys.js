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



// The \ in 'plucker\'s' is a problem. 
// tried:
// replace
// \x27
// String.fromCharCode(92)