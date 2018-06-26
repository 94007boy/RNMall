export const isNullStr = (obj) => {
    if(typeof obj == "undefined" || obj == 'undefined' || obj == null || obj == "" || obj == 'null'){
        return true;
    }else{
        return false;
    }

}