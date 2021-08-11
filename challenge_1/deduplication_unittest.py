import unittest
from deduplication import deduplicate_list

class TestDeduplication(unittest.TestCase):

    @classmethod
    def setUpClass(cls) -> None:
        cls.word_list = ['the', 'word', 'is', 'the', 'word', 'is', 'not', 'repeated']
        cls.unique_list = ['the', 'word', 'is', 'not', 'repeated']
        return super().setUpClass()

    def test_deduplicate_list(self):
        self.assertEqual(sorted(deduplicate_list(self.word_list)), sorted(self.unique_list))

    def test_deduplicate_list_length(self):
        self.assertIs(len(deduplicate_list(self.word_list)), 5)

if __name__ == '__main__':
    unittest.main()
