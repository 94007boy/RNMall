import React ,{PureComponent} from 'react';
import { View,Text,Image,FlatList,StyleSheet,Dimensions,TouchableWithoutFeedback } from 'react-native';
// 取得屏幕的宽高Dimensions
const { width, height } = Dimensions.get('window');
import { resizeImgByWidth } from '../utils/ImageUtil';
let AndroidJumpModule = require('../utils/AndroidJumpModule');

class MallIndexRowList extends PureComponent{

    renderRowItem = ({ item }) => {
        return (
         <TouchableWithoutFeedback onPress={() => AndroidJumpModule.jumpByUrl(JSON.stringify(item.jump))}>
            <View style={styles.rowItemRoot}>
                <View style={styles.imageRoot}>
                    <Image style={styles.icon} source={{uri:item.waterMark}} resizeMode={Image.resizeMode.contain} resizeMethod={'resize'}/>
                    <Image style={styles.itemImage} source={{uri:resizeImgByWidth(item.image,(width - 20)*2/7)}} resizeMode={Image.resizeMode.contain} resizeMethod={'resize'}/>
                </View>
                <Text style={styles.itemName} numberOfLines={2}>{item.title}</Text>
                <View style={styles.priceRoot}>
                    <Text style={styles.newPrice}>{item.price}</Text>
                    <Text style={styles.oldPrice}>{item.subtitle}</Text>
                </View>
            </View>
         </TouchableWithoutFeedback>
        )
    }

    render(){
        const {
            contents
        } = this.props;

        return(
          <FlatList
            data={contents}
            keyExtractor={(item, index) => index}
            renderItem={this.renderRowItem}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          />
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

const styles = StyleSheet.create({

    rowItemRoot:{
        alignItems:'center',
        justifyContent:'flex-start',
        width: (width - 20)*2/7,
        paddingTop:5,
        paddingBottom:10
    },
    imageRoot:{
        position: 'relative',
    },
    itemImage:{
        top:0,
        left:0,
        width: (width - 20)*2/7,
        height:(width - 20)*2/7,
    },
    itemName:{
        textAlign:'left',
        fontSize: 12,
        width: (width - 20)*3/14,
        height:30
    },
    priceRoot:{
        alignItems:'center',
        flexDirection:'row',
        justifyContent:'space-around',
        paddingTop:5,
        width: (width - 20)*3/14,
    },
    newPrice:{
        fontSize: 12,
        color:'red'
    },
    oldPrice:{
        fontSize: 12,
        textDecorationLine:'line-through'
    },
    icon:{
        top:0,
        left:0,
    },

});

export default MallIndexRowList;