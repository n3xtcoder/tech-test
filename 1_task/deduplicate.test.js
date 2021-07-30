const deduplicate = require('./deduplicate');

// If the order of an expected array should not matter, then add .sort() method on deduplicated and expected arrays. 
test('deduplicates elements from an array', () => {
  const wordList = ['not', 'a', 'pheasant', 'plucker', 'but', 'a', 'pheasant', "plucker's", 'son'];

  expect(deduplicate(wordList))
    .toEqual(['not', 'a', 'pheasant', 'plucker', 'but', "plucker's", 'son']);
});
