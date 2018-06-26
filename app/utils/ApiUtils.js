import tabs from '../../tabs.json';
import tab40 from '../../tab40.json';
import tab41 from '../../tab41.json';
import tab42 from '../../tab42.json';
import tab43 from '../../tab43.json';

export const callApiPost = (reqParam) => {
    return new Promise((resolve,reject) => {
        setTimeout(() => {
            if(!reqParam){
                return resolve(tabs);
            }else if(reqParam.tabId == '43'){
                return resolve(tab43);
            }else if(reqParam.tabId == '40'){
                return resolve(tab40);
            }else if(reqParam.tabId == '41'){
                return resolve(tab41);
            }else if(reqParam.tabId == '42'){
                return resolve(tab42);
            }else{
                if(parseInt(reqParam.tabId)%3 == 0){
                    return resolve(tab42);
                }else if(parseInt(reqParam.tabId)%3 == 1){
                    return resolve(tab41);
                }else{
                    return resolve(tab40);
                }
            }
        },0);
    })
}
