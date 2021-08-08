const dirtyWordList = ['not', 'a', 'pheasant', 'plucker', 'but', 'a', 'pheasant', "plucker's", 'son'];
console.log(`Dirty: ${dirtyWordList}`);



/**
 * Checks array for duplicate; starts check from given index
 * so as to ignore the index it is testing against
 * @param {*} array dirty list to check for duplicate words
 * @param {*} i current *from* index to start check against
 * @return index number greater than 0 if duplicate
 */
const getDuplicateIndex = (array, i) => {
    return array.indexOf(array[i], i + 1);
};

/**
 * Recursively eliminates repeated words
 * @param {Array<string>} array with strings to eliminate duplicates from
 * @param {number} i current index being examined for duplicates; starts at 0 by default
 */
const deduplicate = (array, i = 0) => {
    // Check to see if there is a duplicate
    // edge case: (use while, in case multiple duplicates)
    while (getDuplicateIndex(array, i) > -1) {
        // remove current duplicate
        array.splice(getDuplicateIndex(array, i), 1);
    }

    // Return cleaned array and stop algorithm if array has fully been checked
    if (array.length == i) {
        // return the cleaned array
        return array;
    }

    // Pass array forward if not last index to continue algorithm
    return deduplicate(array, i + 1);
};

const cleanWordList = deduplicate(dirtyWordList);

console.log(`Clean: ${cleanWordList}`);

module.exports = {
    dirtyWordList, deduplicate
}