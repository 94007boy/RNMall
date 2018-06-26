/**
 * Created by xiaolv on 18/6/25.
 */
import React ,{PureComponent} from 'react';
import { View,Text,Image,Button,StyleSheet } from 'react-native';
const icon = require('../static/images/no_network.png');

class FullScreenErr extends PureComponent {


    render() {

        const {
            onPressReLoad
        } = this.props;

        return (
            <View style={styles.root}>
                <View style={styles.centerView}>
                    <Image style={styles.img} source={icon}/>
                    <Text style={styles.text}>网络异常，请检查网络</Text>
                    <View style={styles.btn}>
                        <Button
                            onPress={onPressReLoad}
                            title="重新加载"
                            color="#e94715"
                        />
                    </View>
                </View>
            </View>
        );
    };

    //组件将被卸载
    componentWillUnmount(){
        //重写组件的setState方法，直接返回空
        this.setState = (state,callback)=>{
            return;
        };
    }

}

const styles = StyleSheet.create({
    root:{
        flex:1,
        alignItems:'center',
    },
    centerView:{
        marginTop:100,
        alignItems:'center',
        justifyContent:'center'
    },
    img:{
        width:200,
        height:200,
    },
    text:{
        textAlign:'center',
        fontSize: 15,
        marginTop:20
    },
    btn:{
        marginTop:20
    }
});

export default FullScreenErr;
