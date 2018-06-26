import { combineReducers } from 'redux';
import mall from './mall';

/*
 产生一个整体的 Reducer 函数。该函数根据 State 的 key 去执行相应的子 Reducer，
 并将返回结果合并成一个大的 State 对象。
 */
const rootReducer = combineReducers({
    mall,
});

export default rootReducer;