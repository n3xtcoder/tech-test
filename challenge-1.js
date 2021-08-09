
let exampleArray = ['not','funny','but','not','correct','but','correct']

let uniqueArray = [...new Set(exampleArray)]

module.exports = uniqueArray




/* 
 Explanation:
 I chose this method ("Set" + Spread Operator) as it's the simplest and cleanest I've found: using the "Set" object appears to be the most concise way to return unique values in the new array "uniqueArray". In this situation using "Set" + "Array.from" would be my next choice, which yields similar performace to using "Set" + Spread Operator.
*/