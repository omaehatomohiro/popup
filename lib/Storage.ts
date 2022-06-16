import Cookie from './Cookie';

/**
 * Cookie  5KB
 * localstorage 1オリジン当たり約5MB
 */
export default class Storage {

    static setItem(key: string, value: string, hour = null): void{
        localStorage.setItem(key, value);
        Cookie.setVal(key, value, hour);
        let cookieString: string = key + "=" + value + ";path=/;SameSite=None;secure;";
        if(typeof hour === "number"){
            cookieString += ";max-age=" + hour * 60 * 60;
        }
        document.cookie = cookieString;
    }
 
    static getItem(key:string): string | null{
        
        let val:string | null = null;

        val = localStorage.getItem(key);
        if(Storage.checkValue(val)) return val;

        const cookies = document.cookie.split('; ');
        for(let i=0,len=cookies.length;i<len;i++){
            const cookieArr = cookies[i].split('=');
            if(cookieArr[0] === key){
                val = cookieArr[1];
                break;
            }
        }
        val = Cookie.getVal(key);
        if(Storage.checkValue(val)) return val;
        
        return null;
    }

    static checkValue(value: any){
        return value !== null && value !== '';
    }


};


