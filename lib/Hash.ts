

export default class Hash {
    static create(num: number): string {
        const str = `abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-_~:${new Date().getTime()}`;
        const N = num;
        return Array.from(Array(N)).map(() => str[Math.floor(Math.random() * str.length)]).join('');
    }
}

