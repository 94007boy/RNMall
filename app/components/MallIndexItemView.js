import React , { PureComponent } from 'react';
import { Text, View,Image,Dimensions } from 'react-native';
import * as types from '../constants/MallIndexViewTypes';
import * as styles from '../constants/CubeStyles';
import MallSwiper from './MallSwiper';
import MallEnterBtn from './MallEnterBtn';
import CubeSpaceLine from './CubeSpaceLine';
import MallPublicNotice from './MallPublicNotice';
import MallFlashSale from './MallFlashSale';
import MallIndexRowList from './MallIndexRowList';
import MallIndexColumnTwo from './MallIndexColumnTwo';
import CubeColumnThree from './CubeColumnThree';
import CubeColumnTwo from './CubeColumnTwo';
import CubeColumnFour from './CubeColumnFour';

class MallIndexItemView extends PureComponent {

    constructor(props) {
        super(props);
    }

    getViewByContent = (dataItem) => {
        let index = dataItem.id;
        if(dataItem.type == types.BANNER){
            return(
                <MallSwiper contents={dataItem.contents} key={index}/>
            );
        }else if(dataItem.type == types.IMAGE_3_PRODUCT){
//            console.log('活动大图＋三商品');
            return(<Text key={index}>活动大图＋三商品</Text>);
        }else if(dataItem.type == types.SECKILL){
//                        console.log('秒杀广告位布局');
                        return(<Text key={index}>秒杀广告位布局</Text>);
        }else if(dataItem.type == types.FUNCTION_BUTTON){
//                        console.log('功能按钮，一排四个');
                        return(<MallEnterBtn contents={dataItem.contents} key={index}/>);
        }else if(dataItem.type == types.ACTIVITY_BIG_IMG){
//                        console.log('大图活动布局');
                        return(<Text key={index}>大图活动布局</Text>);
        }else if(dataItem.type == types.IMAGE_5_ACTIVITY){
//                        console.log('5个图，左侧大图，右侧4个按2x2显示');
                        return(<Text key={index}>5个图，左侧大图，右侧4个按2x2显示</Text>);
        }else if(dataItem.type == types.FOOD_BIG_IMG){
//                        console.log('珍品页面中的大图列表展示');
                        return(<Text key={index}>珍品页面中的大图列表展示</Text>);
        }else if(dataItem.type == types.FLASH_SALE){
            return(
                <MallFlashSale contents={dataItem.contents} key={index} />
            );
        }else if(dataItem.type == types.NOTICE){
            return(
                 <MallPublicNotice labelTxt={dataItem.title} key={index} />
            );
        }else if(dataItem.type == types.ROW_LIST){
            return (<MallIndexRowList key={index} contents={dataItem.contents} />);
        }else if(dataItem.type == types.PRODUCT_LIST){
             return(<MallIndexColumnTwo contents={dataItem.contents} key={index} />);
//            return(<Text key={index}>{dataItem.type}</Text>);
        }else if(dataItem.type == types.CUBE){
            if(dataItem.style == styles.COLUMN1){
                return (<CubeSpaceLine key={index} item={dataItem} />);
            }else if(dataItem.style == styles.COLUMN2){
                return(<CubeColumnTwo key={index} contents={dataItem.contents} cWidth={dataItem.width} cHeight={dataItem.height} />);
            }else if(dataItem.style == styles.COLUMN3){
                return(<CubeColumnThree key={index} contents={dataItem.contents} cWidth={dataItem.width} cHeight={dataItem.height} />);
            }else if(dataItem.style == styles.COLUMN4){
                return(<CubeColumnFour key={index} contents={dataItem.contents} cWidth={dataItem.width} cHeight={dataItem.height} />);
            }else{
                // return(<Text key={index}>' 魔方 样式 = '{dataItem.style}</Text>);
                return null;
            }
        }else{
            return null;
        }
    }


    render(){

        const {
            dataItem,
        } = this.props;
        return this.getViewByContent(dataItem);

    };

    //组件将被卸载
    componentWillUnmount(){
        //重写组件的setState方法，直接返回空
        this.setState = (state,callback)=>{
            return;
        };
    }

}

export default MallIndexItemView;