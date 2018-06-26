import React ,{PureComponent} from 'react';
import { Text, StyleSheet, View,Image,TouchableWithoutFeedback } from 'react-native';
const searchIcon = require('../static/images/search.png');
const searchJump = {
      url:'store.m.lppz.local/click/functionId=toSearch'
};

class MallIndexSearch extends PureComponent {

    constructor(props) {
        super(props);
    }

    render() {

        const {
            hintSearchTxt
        } = this.props;

        return (
        <TouchableWithoutFeedback onPress={() => AndroidJumpModule.jumpByUrl(JSON.stringify(searchJump))} >
            <View style={styles.search}>
                <Image style={styles.icon} source={searchIcon} />
                <Text style={styles.hintTxt}>{hintSearchTxt}</Text>
            </View>
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

};

const styles = StyleSheet.create({

  search: {
    flex: 1,
    flexDirection: 'row',
    height:30,
    alignItems: 'center',
    borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.5)',
  },

  icon:{
    marginLeft:10,
    marginRight:10,
    width: 16,
    height: 16,
  },

  hintTxt:{
    fontSize: 15,
    color:'#ffffff',
  },

});

export default MallIndexSearch;