/**单行，两列商品大图组件中的单个列商品组件*/
import React ,{PureComponent} from 'react';
import { View,Text,Image,StyleSheet,Dimensions,TouchableWithoutFeedback } from 'react-native';
// 取得屏幕的宽高Dimensions
const { width, height } = Dimensions.get('window');
const addIcon = require('../static/images/cart_add.jpg');
const defaultIcon = require('../static/images/default_image.png');
import { resizeImgByWidth } from '../utils/ImageUtil';
let AndroidJumpModule = require('../utils/AndroidJumpModule');

class MallIndexColumnTwoCell extends PureComponent{

   constructor(props) {
        super(props);
        this.state = { isOk: false };
   }

   componentWillMount(){
      const {
         content
      } = this.props;
      Image.prefetch(content.image).then((result) => {
        //当预下载成功时，返回值result是true
        this.setState({ isOk: result });
      }).catch((error) => {
        //预下载图片失败
        console.log(error);
        this.setState({ isOk: false });
      });
   }

   render(){

        const {
            content
        } = this.props;

        return (
        <TouchableWithoutFeedback onPress={() => AndroidJumpModule.jumpByUrl(JSON.stringify(content.jump))}>
            <View style={styles.listItemRoot}>
                <Image source={this.state.isOk?{uri:resizeImgByWidth(content.image,(width - 20)/2),cache:'force-cache'}:defaultIcon} style={styles.itemImage} resizeMode={this.state.isOk?Image.resizeMode.contain:Image.resizeMode.stretch} resizeMethod={'resize'} />
                <Text style={styles.itemName} numberOfLines={2}>{content.title}</Text>
                <View style={styles.bottomRoot}>
                    <View style={styles.priceRoot}>
                        <Text style={styles.newPrice}>￥{content.price}</Text>
                        {content.subtitle == ''?null:(<Text style={styles.oldPrice}>￥{content.subtitle}</Text>)}
                    </View>
                    <Image style={styles.addIcon} source={addIcon} resizeMode={Image.resizeMode.contain} />
                </View>
            </View>
        </TouchableWithoutFeedback>
        )
   }

    //组件将被卸载
    componentWillUnmount(){
        //重写组件的setState方法，直接返回空
        this.setState = (state,callback)=>{
            return;
        };
    }
}

const styles = StyleSheet.create({

    listItemRoot:{
        flex:1,
        alignItems:'center',
    },
    itemImage:{
        alignItems:'center',
        width: (width - 20)/2,
        height: (width - 20)/2,
    },
    itemName:{
        textAlign:'left',
        fontSize: 15,
        width: (width - 20)/2,
        height:50,
        padding:5,
        color:'#333'
    },
    bottomRoot:{
        width: (width - 20)/2,
        flexDirection:'row',
        justifyContent:'space-between',
        padding:5,
    },
    priceRoot:{
        flexDirection:'row',
        justifyContent:'flex-start',
        alignItems:'center',
        paddingBottom:5,
    },
    newPrice:{
        fontSize: 15,
        color:'red'
    },

    oldPrice:{
        fontSize: 15,
        marginLeft:10,
        textDecorationLine:'line-through'
    },

    addIcon:{
        width:22,
        height:22,
        paddingBottom:10,
    },
});

export default MallIndexColumnTwoCell;