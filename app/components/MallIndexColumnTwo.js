/**单行，两列商品大图组件*/
import React ,{PureComponent} from 'react';
import { View,Text,Image,FlatList,StyleSheet,Dimensions } from 'react-native';
import MallIndexColumnTwoCell from './MallIndexColumnTwoCell';
// 取得屏幕的宽高Dimensions
const { width, height } = Dimensions.get('window');

class MallIndexColumnTwo extends PureComponent{


    renderRowItem = ({item}) => (
        <MallIndexColumnTwoCell
            content={item}
        />
    )

    render(){
        const {
            contents
        } = this.props;

        if(!contents || contents.length == 0){
            return null;
        }

        return(
            <FlatList
                data={contents}
                keyExtractor={(item, index) => index}
                renderItem={this.renderRowItem}
                horizontal={false}
                numColumns={2}
                columnWrapperStyle={{paddingLeft: 0,paddingRight:0,flexDirection:'row',justifyContent:'space-between'}}
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

    rowRoot:{
        width:width,
        paddingLeft:10,
        paddingRight:10,
    },

    row:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'flex-start',
    },

    rowCellSplite:{
        width:10,
        height:(width - 30)/2,
    }
});

export default MallIndexColumnTwo;

