import * as types from '../constants/ActionTypes';
import { FETCH_SUC,FETCH_ING,FETCH_BAD } from '../constants/ApiConstants';
const initialState = {
    fetchStates: {},//保存每个tab页面自己的加载状态值 用tabId作为属性名记录,如果是获取tab列表，则tabId='tabList'
    tabData: {},
    tabs:[]
};

const mall = (state = initialState, action) => {
    switch (action.type){

        case types.DATA_REQUEST:
            let reqFetch = Object.assign({},state.fetchStates,{
                [action.tabId]:FETCH_ING
            });
            return Object.assign({},state,{
                fetchStates: reqFetch,
            });

        case types.FETCH_MALL_INDEX_SUCCESS:
            let tabData = Object.assign({},state.tabData,{
                [action.tabId]:action.indexDatas
            });
            let resFetch = Object.assign({},state.fetchStates,{
                [action.tabId]:FETCH_SUC
            });
            return Object.assign({},state,{
                tabData:tabData||{},
                fetchStates: resFetch,
            });

        case types.FETCH_MALL_INDEX_FAIL:
            let failFetch = Object.assign({},state.fetchStates,{
                [action.tabId]:FETCH_BAD
            });
            return Object.assign({},state,{
                fetchStates: failFetch,
            });

        case types.FETCH_MALL_TABLIST_SUCCESS:
            let tabsFetch = Object.assign({},state.fetchStates,{
                tabList:FETCH_SUC
            });
            return Object.assign({},state,{
                tabs: action.tabList||[],
                fetchStates: tabsFetch,
            });

        default://这里必写！
            return state;
    }

}

export default mall;