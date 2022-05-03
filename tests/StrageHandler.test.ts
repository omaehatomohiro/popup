import Storage from "../lib/Storage";

let key = '_gidsagfisa';
let val = 'fsdagfsadgadfgsfdsa';

test('Storage setItem getItem', () => {

    Storage.setItem(key, val);
    expect(Storage.setItem(key, val)).toBe(undefined);

    let returnVal = Storage.getItem(key);
    expect(Storage.getItem(key)).toBe(val);
});



test('Storage setItem getItem null', () => {
    let key = '_not_exsit_key';
    let returnVal = Storage.getItem(key);
    expect(returnVal).toBe(null);
});