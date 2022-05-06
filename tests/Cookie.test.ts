import Cookie from "../lib/Cookie";

Object.defineProperty(document, 'cookie', {
    writable: true,
    value: 'status=active;_ga=testesttest',
});

const key = '_adpop';
const val = 'sdfsdfadfasfsafadsfa';
const additional = `;path=/;SameSite=None;secure;domain=${location.hostname}`;

describe('Cookie.ts', () => {

    test('getVal', () => {
      document.cookie += `; ${key}=${val}`;
      const returnVal = Cookie.getVal(key);
      expect(returnVal).toBe(val);
    });

    test('Cookie setVal', () => {
        const expectVal = `${key}=${val}${additional}`;
        Cookie.setVal(key, val);
        expect(document.cookie).toBe(expectVal);
    });
});
