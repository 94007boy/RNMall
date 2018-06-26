import { requireNativeComponent, View,ViewPropTypes } from 'react-native';

var iface = {
  name: 'NativeFullScreenLoading',
  propTypes: {
    ...ViewPropTypes // 包含默认的View的属性
  },
};

module.exports = requireNativeComponent('NativeFullScreenLoading', iface);
