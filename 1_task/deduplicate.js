/**
 * Deduplicates elements from the passed array.
 * 
 * Set() is used since it has shown the highest performance in creating a list of unique values,
 * comparing to Array.filter() and other loops through array with Array.push(). 
 * 
 * @param {string[]} array of string elements
 * @returns {string[]} deduplicated array
 */
function deduplicate(arr) {
  return [...new Set(arr)];
}

module.exports = deduplicate;