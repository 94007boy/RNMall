import React ,{PureComponent} from 'react';
import { Text, View,ScrollView,Image,FlatList,Dimensions } from 'react-native';
import * as types from '../constants/MallIndexViewTypes';
import * as styles from '../constants/CubeStyles';
import MallIndexItemView from './MallIndexItemView';
import FullScreenLoading from './FullScreenLoading';
import FullScreenErr from './FullScreenErr';
import PullLayout from './PullLayout';
import { FETCH_SUC,FETCH_ING,FETCH_BAD } from '../redux/constants/ApiConstants';

// 取得屏幕的宽高Dimensions
const { width, height } = Dimensions.get('window');
let offsetValues = [];

class MallIndexListView extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            openErrPage:true,
        }
    }

    componentWillMount(){
        const { tab,indexDatas,fetchMallIndexDatas } = this.props;
        if(!indexDatas || indexDatas.length == 0){
            let param = {
                tabId:tab.id
            }
            fetchMallIndexDatas(param);
        }
    }

    componentWillReceiveProps(nextProps){
        if(this.pullLayout){
            this.pullLayout.finishRefresh('');
        }
    }

    //组件将被卸载
    componentWillUnmount(){
            //重写组件的setState方法，直接返回空
        this.setState = (state,callback)=>{
            return;
        };
    }

    renderRowItem = ({item}) => (
        <MallIndexItemView
            dataItem={item}
        />
    );

    _getItemLayout = (data, index) => {
        return this.getMyItemLayout(data, index);
    };

    _onRefresh = () => {
        const { tab,indexDatas,fetchMallIndexDatas } = this.props;
        let param = {
            tabId:tab.id
        }
        fetchMallIndexDatas(param,true);
    }

    onPressReLoad = () => {
        console.log('onPressReLoad');
        this.setState({
            openErrPage:false
        });
        const { tab,indexDatas,fetchMallIndexDatas } = this.props;
        let param = {
            tabId:tab.id
        }
        fetchMallIndexDatas(param,false);
    }


    render() {

        const {
            tabLabel,
            indexDatas,
            fetchState,
        } = this.props;
        if(fetchState == FETCH_ING){
            return (<FullScreenLoading style={{width:width,height:height-100}}/>);
        }else if(fetchState == FETCH_BAD){
            return (<FullScreenErr style={{width:width,height:height-100}} onPressReLoad={this.onPressReLoad}/>);
        }else if(this.state.openErrPage && (tabLabel == '水果' || tabLabel == '新品')){//水果，新品频道模拟一次错误，打开错误视图
            return (<FullScreenErr style={{width:width,height:height-100}} onPressReLoad={this.onPressReLoad}/>);
        }

        const itemViews = [];

        if(!indexDatas || indexDatas.length == 0){
            return null;
        }

        offsetValues = new Array(indexDatas.length);

        return(
            <PullLayout
                ref = {(pull)=>{this.pullLayout = pull}}
                onRefreshReleased={this._onRefresh}
            >
                <FlatList
                    style={{backgroundColor: '#fff'}}
                    data={indexDatas}
                    keyExtractor={(item, index) => index}
                    renderItem={this.renderRowItem}
                />
            </PullLayout>
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

export default MallIndexListView;