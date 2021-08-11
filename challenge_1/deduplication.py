
def deduplicate_list(word_list):
    """
    Deduplicates a list of words.

    Explanation of implementation:
    ------------------------------
    We don't have to worry in this case about the order of the elements, so we can just
    use a set data structure in Python (unordered collection). By definition, a set can't
    have duplicated elements, so we get the collection of words cleaned up, 'deduplicated'.

    Parameters:
        word_list (list): Original list of words which duplicates will be removed.

    Returns:
        list: A list of non-repeated words.
    """
    
    return list(set(word_list))
