
const Browser = {

    isIE : function(): boolean{
        const userAgent = navigator.userAgent.toLowerCase();
        return !(userAgent.indexOf('msie') < 0 && userAgent.indexOf('trident') < 0);
    }

};



export default Browser;