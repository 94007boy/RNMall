import React ,{PureComponent} from 'react';
import { Text,View,Image,Dimensions,TouchableWithoutFeedback } from 'react-native';
import { resizeImgByWidth } from '../utils/ImageUtil';
let AndroidJumpModule = require('../utils/AndroidJumpModule');

// 取得屏幕的宽高Dimensions
const { width, height } = Dimensions.get('window');

class CubeColumnFour extends PureComponent {

    render() {

        const{
            contents,
            cHeight,
            cWidth,
        } = this.props;

        return(
            <View style={{marginTop:-1,flexDirection:'row',alignItems:'center',justifyContent:'space-between',width:width,height:width*cHeight/cWidth}}>
                <TouchableWithoutFeedback onPress={() => AndroidJumpModule.jumpByUrl(JSON.stringify(contents[0].jump))}>
                    <Image source={{uri:resizeImgByWidth(contents[0].image,width/4)}} style={{width:width/4,height:width*cHeight/cWidth}} resizeMode={Image.resizeMode.cover} resizeMethod={'resize'}/>
                </TouchableWithoutFeedback>

                <TouchableWithoutFeedback onPress={() => AndroidJumpModule.jumpByUrl(JSON.stringify(contents[1].jump))}>
                    <Image source={{uri:resizeImgByWidth(contents[1].image,width/4)}} style={{width:width/4,height:width*cHeight/cWidth}} resizeMode={Image.resizeMode.cover} resizeMethod={'resize'}/>
                </TouchableWithoutFeedback>

                <TouchableWithoutFeedback onPress={() => AndroidJumpModule.jumpByUrl(JSON.stringify(contents[2].jump))}>
                    <Image source={{uri:resizeImgByWidth(contents[2].image,width/4)}} style={{width:width/4,height:width*cHeight/cWidth}} resizeMode={Image.resizeMode.cover} resizeMethod={'resize'}/>
                </TouchableWithoutFeedback>

                <TouchableWithoutFeedback onPress={() => AndroidJumpModule.jumpByUrl(JSON.stringify(contents[3].jump))}>
                    <Image source={{uri:resizeImgByWidth(contents[3].image,width/4)}} style={{width:width/4,height:width*cHeight/cWidth}} resizeMode={Image.resizeMode.cover} resizeMethod={'resize'}/>
                </TouchableWithoutFeedback>
            </View>
        );

    }
    //组件将被卸载
    componentWillUnmount(){
        //重写组件的setState方法，直接返回空
        this.setState = (state,callback)=>{
            return;
        };
    }

}

export default CubeColumnFour;