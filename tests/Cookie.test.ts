import * as util from 'util'

// ref: https://jestjs.io/docs/manual-mocks#mocking-methods-which-are-not-implemented-in-jsdom
// ref: https://github.com/jsdom/jsdom/issues/2524
Object.defineProperty(window, 'TextEncoder', {
  writable: true,
  value: util.TextEncoder
})
Object.defineProperty(window, 'TextDecoder', {
  writable: true,
  value: util.TextDecoder
})

import Cookie from "../lib/Cookie";
import jsdom from 'jsdom';

const dom = new jsdom.JSDOM(``,{ url: "https://example.org/" });
Object.defineProperty(window, 'document', {
    writable: true,
    value: dom.window.document
})


test('Cookie setVal → getVal', () => {
    let key = '_gidsagfisa';
    let val = 'fsdagfsadgadfgsfdsa';

    // const cookieJar = new jsdom.CookieJar(key, val);


    Cookie.setVal(key, val);
    let returnVal = Cookie.getVal(key);
    expect(window).toBe(val);
});



// test('Storage setItem getItem null', () => {
//     let key = '_not_exsit_key';
//     let returnVal = Storage.getItem(key);
//     expect(returnVal).toBe(null);
// });