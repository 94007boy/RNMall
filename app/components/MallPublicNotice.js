import React ,{PureComponent} from 'react';
var ReactNative = require('react-native');
var {
    StyleSheet,
    Image,
    View
} = ReactNative;
var Marquee = require('@remobile/react-native-marquee');
const radioIcon = require('../static/images/mall_radio.jpg');

class MallPublicNotice extends PureComponent{

    render() {
        const {
            labelTxt
        } = this.props;
        return(
            <View style={styles.radioRoot}>
                <Image source={radioIcon} style={styles.radioImg} resizeMode={Image.resizeMode.contain} />

                <Marquee
                    style={styles.marqueeLabel}
                >
                    {labelTxt}
                </Marquee>
                <View style={styles.radioSpace}/>
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

    radioRoot:{
        justifyContent:'flex-start',
        alignItems:'center',
        flexDirection:'row',
        position: 'relative',
    },

    radioSpace:{
         height:35,
         width:10,
         position:'absolute',
         backgroundColor: '#fff',
         left:90,
         opacity:0.9,
    },

    radioImg:{
        height:35,
        width:80,
        left:10,
    },

    marqueeLabel:{
        color: 'red',
        fontSize: 14,
        letterSpacing: 20,
        lineHeight: 25,
        paddingHorizontal: 20,
        overflow: 'hidden',
        flex:1,
        left:10,
    },
});

export default MallPublicNotice;