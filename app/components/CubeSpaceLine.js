import React ,{PureComponent} from 'react';
import { Image,Dimensions,TouchableWithoutFeedback } from 'react-native';
import { resizeImgByWidth } from '../utils/ImageUtil';
// 取得屏幕的宽高Dimensions
const { width, height } = Dimensions.get('window');
const defaultIcon = require('../static/images/default_image.png');
let AndroidJumpModule = require('../utils/AndroidJumpModule');

class CubeSpaceLine extends PureComponent {

   constructor(props) {
        super(props);
        this.state = { isOk: false };
   }

   componentWillMount(){
      const{
            item
      } = this.props;
      Image.prefetch(item.contents[0].image).then((result) => {
        //当预下载成功时，返回值result是true
        this.setState({ isOk: result });
      }).catch((error) => {
        //预下载图片失败
        this.setState({ isOk: false });
      });
   }

    render() {
        const{
            item
        } = this.props;

        return(
            <TouchableWithoutFeedback onPress={() => AndroidJumpModule.jumpByUrl(JSON.stringify(item.contents[0].jump))}>
                <Image
                    style={{height:width*item.height/item.width,paddingTop:-1,marginTop:-1}}
                    source={this.state.isOk?{uri:resizeImgByWidth(item.contents[0].image,width),cache:'force-cache'}:defaultIcon}
                    resizeMode={Image.resizeMode.cover}
                    resizeMethod={'resize'} />
            </TouchableWithoutFeedback>
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

export default CubeSpaceLine;