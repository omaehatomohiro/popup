
export default class CountDown{

    private static instance: CountDown;

    private timerId: any;

    start(targetDomID: string, countDonwTime: number){

        const targetDom = document.getElementById(targetDomID);
        if(targetDom === null) {
            console.log('countDown dom is not found.');
            return false;
        }

        let time = countDonwTime;
        this.timerId = setInterval(function(banner){
            time -=1000;
            const hr:number = Math.floor(time / (60 * 60 * 1000));
            const mt:number = Math.floor((time - ( hr * 60 * 60 * 1000))/ (60 * 1000) );
            const sc:number = Math.floor((time - ( hr * 60 * 60 * 1000) - ( mt * 60 * 1000 ) ) / 1000 );
            console.log(banner.zeroFill(hr)+'時'+ banner.zeroFill(mt) +'分'+ banner.zeroFill(sc) +'秒');
            targetDom.textContent = banner.zeroFill(hr)+'時'+ banner.zeroFill(mt) +'分'+ banner.zeroFill(sc) +'秒';
        },1000,this);

        const hr:number = Math.floor(time / (60 * 60 * 1000));
        const mt:number = Math.floor((time - ( hr * 60 * 60 * 1000))/ (60 * 1000) );
        const sc:number = Math.floor((time - ( hr * 60 * 60 * 1000) - ( mt * 60 * 1000 ) ) / 1000 );
        targetDom.textContent = this.zeroFill(hr)+'時'+ this.zeroFill(mt) +'分'+ this.zeroFill(sc) +'秒';
    }

    stop(){
        clearInterval(this.timerId);
        console.log(this.timerId);
    }

    zeroFill(num:number):string{
        if(num < 10){
            return '0' + num.toString();
        }else{
            return num.toString();
        }
    }

    public static getInstance(){
        if(!CountDown.instance){
            CountDown.instance = new CountDown();
        }
        return CountDown.instance;
    }

}
