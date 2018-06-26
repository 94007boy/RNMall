import React, { Component } from 'react';
import {
    TouchableWithoutFeedback,
    NativeModules,
    AppRegistry,
    StyleSheet,
    StatusBar,
    Dimensions,
    Text,
    View,
    Image,
    Alert
} from 'react-native';
import ScrollableTabView, {
    ScrollableTabBar
} from 'react-native-scrollable-tab-view';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchTabList,fetchMallIndexDatas } from '../redux/actions/MallActions.js';

import MallIndexListView from '../components/MallIndexListView';
import FullScreenLoading from '../components/FullScreenLoading';
import FullScreenErr from '../components/FullScreenErr';
import MallIndexSearch from '../components/MallIndexSearch';
import { FETCH_SUC,FETCH_ING,FETCH_BAD } from '../redux/constants/ApiConstants';

const { width, height } = Dimensions.get('window');
const msgIcon = require('../static/images/sns_message.png');
const scanIcon = require('../static/images/sns_scan.png');

class MallIndex extends React.Component {

    static navigationOptions = () => {
        const headerStyle = {
            backgroundColor: '#E94715',
            height: 40,
        };
        const headerLeft = (
            <TouchableWithoutFeedback onPress={() => Alert.alert('版本标示', '1013')}>
                <Image style={[{width: 20, height: 20, marginLeft:15}]} source={scanIcon} />
            </TouchableWithoutFeedback>
        );
        const headerRight = (<Image style={[{width: 20, height: 20, marginRight:15}]} source={msgIcon} />);
        const headerTitle = (<MallIndexSearch hintSearchTxt={"让嘴巴去旅行"} />);
        return {headerTitle,headerLeft,headerRight,headerStyle};
    };

    constructor(props) {
        super(props);
    }

    componentWillMount(){
        const { tabs,fetchTabList } = this.props;
        if(!tabs.length){
            fetchTabList();
        }
    }

    //组件将被卸载
    componentWillUnmount(){
        //重写组件的setState方法，直接返回空
        this.setState = (state,callback)=>{
            return;
        };
    }

    onPressReLoad(){
        const { fetchTabList } = this.props;
        fetchTabList();
    }

    getViewByTabId(tab){
        const { tabData,fetchStates,fetchMallIndexDatas } = this.props;
        let fetchState = fetchStates[tab.id];//当前tab页面的请求状态
        let indexDatas = tabData[tab.id];//当前页的页面数据
        return (
            <MallIndexListView
                tabLabel={tab.name}
                key={tab.id}
                tab={tab}
                fetchState={fetchState}
                indexDatas={indexDatas}
                fetchMallIndexDatas={fetchMallIndexDatas}
            />
        )
    }

    render() {
        const {
            tabs,
            fetchStates,
        } = this.props;

        //全覆盖的页面
        if (!tabs.length || !fetchStates || fetchStates.tabList == FETCH_ING){//正在获取tab列表
            return (<FullScreenLoading style={{width:width,height:height}} />);
        }else if(!!fetchStates && fetchStates.tabList == FETCH_BAD){//获取tab列表失败
            return (<FullScreenErr style={{width:width,height:height}} onPressReLoad={this.onPressReLoad}/>);
        }
        return (
            <View style={styles.container}>
                <StatusBar backgroundColor={'#E94715'} hidden={false} />
                <ScrollableTabView
                    renderTabBar={() =>
                        <ScrollableTabBar
                            tabStyle={styles.tab}
                            textStyle={styles.tabText}
                        />
                    }
                    tabBarBackgroundColor='#fff'
                    tabBarActiveTextColor='#E94715'
                    tabBarInactiveTextColor='#333'
                    tabBarUnderlineStyle={styles.tabBarUnderline}
                >
                    {
                        tabs.map((tab, index) => {
                            return this.getViewByTabId(tab)
                        })
                    }
                </ScrollableTabView>
            </View>
        )
    }
}

let styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    hello: {
        fontSize: 50,
        textAlign: 'center',
        margin: 10,
    },
    tab: {
        paddingLeft: 12,
        paddingRight: 12,
    },
    tabText: {
        paddingLeft:0,
        fontSize: 12,
        fontFamily: 'Roboto'
    },
    tabBarUnderline: {
        backgroundColor: '#E94715',
        height: 2,
        width:width/14,
        marginLeft:10
    }
});


const mapStateToProps = (state) => {
    return {
        tabs:state.mall.tabs||[],
        tabData:state.mall.tabData||{},
        fetchStates:state.mall.fetchStates||null
    };
};


export default connect(mapStateToProps, {
    fetchTabList,
    fetchMallIndexDatas,
})(MallIndex);