
export default class Cookie {
    
    static getVal(key:string): string | null{
        const cookies = window.document.cookie.split('; ');
        let val = null;
        for(var i=0,len=cookies.length;i<len;i++){
            var cookie = cookies[i].split('=');
            if(cookie[0] === key){
                val = cookie[1];
                break;
            }
        }
        return val;
    }

    static setVal(key: string, val: string, hour: number|null = null): void{
        var cookieString = key + "=" + val + `;path=/;SameSite=None;secure;domain=${location.hostname}`;
        if(typeof hour === "number"){
            cookieString += ";max-age=" + hour * 60 * 60;
        }
        window.document.cookie = cookieString;
    }

}