import { deduplicate } from './deduplicate';
import { isEqual } from "lodash";

const notUniqueList: string[] = ['unique ', 'notunique', 'notunique', 'notunique', 'onemoreunique'];
const uniqueList: string[] = ['unique ', 'notunique', 'onemoreunique'];

describe('deduplicate', (): void => {

	test('should return array with unique strings', () => {
		expect(deduplicate(notUniqueList))
			.toEqual(uniqueList);
	});

	test('should create new array and not change the original array', (): void => {
		const copyOfOriginalList: string[] = [...notUniqueList];

		const deduplicatedList: string[] = deduplicate(notUniqueList);

		expect(isEqual(notUniqueList, copyOfOriginalList))
			.toBeTruthy();

		expect(deduplicatedList === notUniqueList)
			.toBeFalsy();
	});

})


