const assert = require('chai').assert
const {deduplicate} = require('./deduplication');

const data = {
  dirty: ["test", "car", "random", "random2", "car", "test2", "test", "test"],
  clean: ["test", "car", "random", "random2", "test2"],
  nonDuplicated: ["random", "random2", "test2"],
  duplicated: ["test", "car"]
};
  
describe('Deduplication file', () => {
    let cleanWordList;
    before(() => cleanWordList = deduplicate(data.dirty));
    it('duplicate word "test" and "car" should only appear once', () => {
      assert.deepEqual(cleanWordList, data.clean);
    });
    it('non-duplicated words from dirty list should remain in clean list', () => {
      data.nonDuplicated.forEach((word) => assert.include(cleanWordList, word));
    });
    it('duplicated words should still appear in cleaned data list', () => {
      data.duplicated.forEach((word) => assert.include(cleanWordList, word));
    });
    it('each word should not appear more than once in cleaned list', ()  => {
      cleanWordList.forEach((word, i) => {
        cleanWordList.splice(cleanWordList.indexOf(word), 1);
        assert.notInclude(word, cleanWordList);
      });
    });
});
