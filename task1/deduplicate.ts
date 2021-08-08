/**
 * There are many ways to deduplicate array.
 * The most suitable ways are to use Set collection, use filter + indexOf methods of an array,
 * and use an Object with unique strings as keys.
 *
 * 1. Set is the default JS collection, which puts to an array only unique items. It has the best performance
 * 		The complexity of such an operation is O(1)
 * 2. Filter + indexOf is a readable and simple variant, but the worst performance, because uses filter(O(n)) and indexOf(O(n)) methods.
 * 		As a result there are two nested loops.
 * 		The complexity of such an operation is O(n^2)
 * 3. Using strings as object keys, has better performance than the second variant, but it's still slow.
 * 		It uses loop and object, checks all strings, and puts a string to an object as key if an object has no already the same key.
 * 		The complexity of such an operation is O(n)
 *
 * 	There is a small research https://drive.google.com/file/d/1ACdopQ8KsvZ2qe3--AO4UmeTRJ3uWm7z/view
 */

/**
 * Creates new array with unique strings
 * @param wordList list of not unique strings
 *
 * @returns list with unique strings
 */
export const deduplicate = (wordList: string[]): string[] => {
	return [...new Set<string>(wordList) as any];
}

const duplicatedWordList: string[] = ['unique ', 'notunique', 'notunique', 'notunique', 'notunique', 'onemoreunique'];

const deduplicatedWordList: string[] = deduplicate(duplicatedWordList);
