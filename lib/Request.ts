
import axios,{AxiosRequestConfig} from 'axios';

interface RequestInterface {
    
}

export default class Request implements RequestInterface{

    static async implession (params: any) {
        console.log(params);
        const options: AxiosRequestConfig = {
            url: 'http://localhost:8080/',
            method:'GET',
            params: params
        }
        return axios(options);
    }

}

