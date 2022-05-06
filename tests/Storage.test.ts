import Storage from "../lib/Storage";


Object.defineProperty(document, 'cookie', {
    writable: true,
    value: 'status=active;_ga=testesttest',
});

const key = '_adpop';
const val = 'sdfsdfadfasfsafadsfa';
const additional = `;path=/;SameSite=None;secure;domain=${location.hostname}`;

describe('Storage.ts', () => {

    test('setItem → getItem', () => {
        Storage.setItem(key, val);
        const returnVal = Storage.getItem(key);
        expect(returnVal).toBe(val);
    });

});
