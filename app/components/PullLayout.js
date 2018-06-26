import React ,{Component} from 'react';
import { View,UIManager,DeviceEventEmitter,requireNativeComponent } from 'react-native';
const ReactNative = require('ReactNative');



var PullLayout = requireNativeComponent('AndroidRefreshLayout', App);

export default class App extends Component {

    constructor(props){
        super(props);
    }

    //数据获取后回调 刷新结束
    finishRefresh = (key) => {
        //RN向原生代码发送事件通知，表示完成了刷新动作
        UIManager.dispatchViewManagerCommand(ReactNative.findNodeHandle(this),
            UIManager.AndroidRefreshLayout.Commands.FinishRefresh,[key])
    };

    componentWillMount(){
        const {onRefreshReleased} = this.props;
        DeviceEventEmitter.addListener('onRefreshReleased', function() {
            if(parseInt(Date.now()/1000) - this.lastTime < 2){
                this.lastTime = parseInt(Date.now()/1000);
                return;
            }
            this.lastTime = parseInt(Date.now()/1000);
            onRefreshReleased();
        });
    }

    render() {
        return (
            <PullLayout
                style={[{flex: 1,backgroundColor:'white',},this.props.style]}
                {...this.props}
            >
                <View style={{flex: 1}}>
                    {this.props.children}
                </View>
            </PullLayout>
        )
    }

    //组件将被卸载
    componentWillUnmount(){
        //重写组件的setState方法，直接返回空
        this.setState = (state,callback)=>{
            return;
        };
    }

}
