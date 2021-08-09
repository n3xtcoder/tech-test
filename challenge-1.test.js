const uniqueArray = require('./challenge1')

test('remove all duplicates from array', () => {
  expect(uniqueArray).toStrictEqual(['not','funny','but','correct'])
})