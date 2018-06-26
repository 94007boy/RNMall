import React ,{PureComponent} from 'react';
import { Text,View,Image,Dimensions,StyleSheet,TouchableWithoutFeedback } from 'react-native';
import { resizeImgByWidth } from '../utils/ImageUtil';
let AndroidJumpModule = require('../utils/AndroidJumpModule');

// 取得屏幕的宽高Dimensions
const { width, height } = Dimensions.get('window');


class MallFlashSale extends PureComponent {


    constructor(props) {
        super(props);
        this.state = {
            leftHour:0,//倒计时剩余小时
            leftMin:0,//倒计时剩余分钟
            leftSec:0,//倒计时剩余秒
        };
    }

    componentDidMount() {
        const{
            contents
        } = this.props;
        if(contents[0].extendField){
            let leftTime = parseInt(contents[0].extendField.thisTime/1000) - parseInt(Date.now()/1000);//剩余秒
            this.timer = setInterval(() => {
                let isTimeOver = true;
                if(leftTime <= 0){
                    isTimeOver = true;
                }else{
                    leftTime -= 1;
                    isTimeOver = false;
                    this.setState({
                        leftHour: parseInt(leftTime/3600) > 9 ? parseInt(leftTime/3600):'0'+parseInt(leftTime/3600),
                        leftMin: parseInt(leftTime%3600/60) > 9 ? parseInt(leftTime%3600/60) : '0'+parseInt(leftTime%3600/60),
                        leftSec: leftTime%60 > 9 ? leftTime%60 : '0'+leftTime%60,
                        isTimeOver:isTimeOver
                    })
                }

            },1000);
        }
    }

    componentWillUnmount() {
        clearInterval(this.timer);
        //重写组件的setState方法，直接返回空
        this.setState = (state,callback)=>{
            return;
        };
    }

    render() {

        const{
            contents
        } = this.props;

        let nextTimeTips;

        if(this.state.isTimeOver){
            clearInterval(this.timer);
            let nextTime = contents[0].extendField.nextTime;
            nextTimeTips = "下一场" + parseInt(nextTime/3600)+ ":" + parseInt(nextTime%3600/60) > 9 ? parseInt(nextTime%3600/60) : '0'+parseInt(leftTime%3600/60)+ "开始";
        }

        return(
            <View style={styles.root}>
                <TouchableWithoutFeedback onPress={() => AndroidJumpModule.jumpByUrl(JSON.stringify(contents[0].jump))}>
                    <Image style={styles.timerRoot} source={{uri:resizeImgByWidth(contents[0].image,width*2/5)}} resizeMethod={'resize'}>
                        <Text style={styles.timerTips}>限时抢购</Text>
                        {this.state.isTimeOver?
                            <View style={styles.timerNoRoot}>{nextTimeTips}</View>
                        :
                            <View style={styles.timerNoRoot}>
                                <Text style={styles.timerNo}>{this.state.leftHour}</Text>
                                    <View style={styles.timerDotRoot}>
                                        <View style={styles.timerDot}/>
                                        <View style={styles.timerDot}/>
                                    </View>
                                    <Text style={styles.timerNo}>{this.state.leftMin}</Text>
                                    <View style={styles.timerDotRoot}>
                                        <View style={styles.timerDot}/>
                                        <View style={styles.timerDot}/>
                                    </View>
                                    <Text style={styles.timerNo}>{this.state.leftSec}</Text>
                            </View>
                        }
                    </Image>
                </TouchableWithoutFeedback>
                <View style={styles.saleRoot}>
                    <TouchableWithoutFeedback onPress={() => AndroidJumpModule.jumpByUrl(JSON.stringify(contents[1].jump))}>
                        <Image source={{uri:resizeImgByWidth(contents[1].image,width*3/10)}} style={styles.saleBG} resizeMethod={'resize'}/>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => AndroidJumpModule.jumpByUrl(JSON.stringify(contents[2].jump))}>
                        <Image source={{uri:resizeImgByWidth(contents[3].image,width*3/10)}} style={styles.saleBG} resizeMethod={'resize'}/>
                    </TouchableWithoutFeedback>
                </View>
                <View style={styles.spaceLine}/>
                <View style={styles.saleRoot}>
                    <TouchableWithoutFeedback onPress={() => AndroidJumpModule.jumpByUrl(JSON.stringify(contents[3].jump))}>
                        <Image source={{uri:resizeImgByWidth(contents[2].image,width*3/10)}} style={styles.saleBG} resizeMethod={'resize'}/>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => AndroidJumpModule.jumpByUrl(JSON.stringify(contents[4].jump))}>
                       <Image source={{uri:resizeImgByWidth(contents[4].image,width*3/10)}} style={styles.saleBG} resizeMethod={'resize'}/>
                    </TouchableWithoutFeedback>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({

    root:{
        height: width * 9 / 16,
        flexDirection: 'row',
    },

    timerRoot:{
        flex: 4,
        height: width * 9 / 16,
    },

    timerNoRoot:{
        marginLeft:10,
        alignItems:'center',
        flexDirection:'row',
        justifyContent:'flex-start',
    },

    timerNo:{
        width:20,
        height:20,
        fontSize: 12,
        borderRadius: 3,
        backgroundColor: '#555',
        marginRight:5,
        paddingTop:1,
        textAlign:'center',
        color:'#fff'
    },

    timerDotRoot:{
        height:20,
        alignItems:'center',
        justifyContent:'space-around',
        marginRight:5,
    },

    timerDot:{
        width:3,
        height:3,
        borderRadius: 10,
        backgroundColor: '#000',
    },

    timerTips:{
        color: '#fff',
        fontSize: 16,
        margin:10
    },

    saleRoot:{
        flex: 3,
        height: width * 9 / 16,
    },

    saleBG:{
        flex: 1,
    },

    spaceLine:{
        width:1,
        height: width * 9 / 16,
        backgroundColor: '#eee',
    }

});

export default MallFlashSale;