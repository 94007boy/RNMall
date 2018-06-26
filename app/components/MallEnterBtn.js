import React ,{PureComponent} from 'react';
import { Text,View,Image,StyleSheet,Dimensions,TouchableWithoutFeedback } from 'react-native';
import { resizeImgByWidth } from '../utils/ImageUtil';
let AndroidJumpModule = require('../utils/AndroidJumpModule');


class MallEnterBtn extends PureComponent{

    render() {
        const {
            contents
        } = this.props;
        return(
            <View style={styles.btnImgRoot}>
                {contents.map((content,index) => {
                    return(
                        <TouchableWithoutFeedback key={index} onPress={() => AndroidJumpModule.jumpByUrl(JSON.stringify(content.jump))}>
                            <View>
                                <Image source={{uri:resizeImgByWidth(content.image,80)}} style={styles.btnImg} key={index} resizeMode={Image.resizeMode.contain} resizeMethod={'resize'}/>
                                <Text style={styles.btnTxt}>{content.title}</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    )
                })}
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

const styles = StyleSheet.create({

    btnImgRoot:{
        flex:1,
        justifyContent:'space-around',
        alignItems:'center',
        flexDirection:'row',
        marginTop:10,
    },

    btnImg:{
        height:40,
        width:40,
    },

    btnTxt:{
        fontSize:12,
        marginTop:5,
        textAlign:'center'
    }
});

export default MallEnterBtn;