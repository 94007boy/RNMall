import { PixelRatio,Dimensions } from 'react-native';
import { isNullStr } from './CheckUtils';
// 取得屏幕的宽高Dimensions
const { width, height } = Dimensions.get('window');


export const resizeImgByWidth = (image,targetW) => {
    let targetWidth = parseInt(targetW*PixelRatio.get()*2/3);
    let result = null;
    if (!isNullStr(image) && image.indexOf("?x-oss-process") == -1 && (image.indexOf("aliyuncs.com") != -1 || image.indexOf("img.app.lppz.com") != -1 || image.indexOf("wx2.img.lppz.com") != -1) && image.indexOf(".gif") == -1) {
		result = image + "?x-oss-process=image/resize,m_lfit,w_" + targetWidth;
    } else if (!isNullStr(image)) {
			result = image;
	} else {
			result =  null;
	}
    return result;
}