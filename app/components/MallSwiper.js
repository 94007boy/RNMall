import React ,{ PureComponent } from 'react';
import Swiper from 'react-native-swiper';
import { View,Image,StyleSheet,Dimensions,PanResponder,TouchableWithoutFeedback } from 'react-native';
import { resizeImgByWidth } from '../utils/ImageUtil';
let AndroidJumpModule = require('../utils/AndroidJumpModule');

// 取得屏幕的宽高Dimensions
const { width, height } = Dimensions.get('window');

//轮播图在Android上是有bug，会不显示图片，根据https://blog.csdn.net/ciel_yu/article/details/72850371解决了这个问题

class  MallSwiper extends PureComponent{

    constructor(props) {
        super(props);
        this.pressStatus = false;
        this.state = {
            swiperH:width * 8 / 25,
        };
    }

    componentDidMount(){
        setTimeout(()=>{
            this.setState({swiperH:width * 2 / 5});
        },0)
    }

    render() {
        const {
            contents
        } = this.props;

            return(
                    <Swiper
                        key={contents.length}
                        width={width}
                        height={this.state.swiperH}
                        showsButtons={false}
                        autoplay={true}
                        autoplayTimeout={1}
                        paginationStyle={styles.paginationStyle}
                        dotStyle={styles.dotStyle}
                        activeDotStyle={styles.activeDotStyle}
                    >
                        {contents.map((content,index) => {
                            return(
                            <TouchableWithoutFeedback onPress={() => AndroidJumpModule.jumpByUrl(JSON.stringify(content.jump))} key={index}>
                                <Image source={{uri:resizeImgByWidth(content.image,width)}} style={styles.bannerImg} resizeMode={Image.resizeMode.contain} resizeMethod={'resize'}/>
                            </TouchableWithoutFeedback>
                            )
                        })}
                    </Swiper>
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
    bannerImg: {
        height: width * 2 / 5,
        width: width,
    },

    wrapper: {
        width: width,
    },

    paginationStyle: {
        bottom: 6,
    },

    dotStyle: {
        width: 15,
        height: 3,
        backgroundColor: '#fff',
        opacity: 0.8,
        borderRadius: 5,
    },

    activeDotStyle: {
        width: 15,
        height: 3,
        backgroundColor: '#000',
        borderRadius: 5,
    },
});

export default MallSwiper;