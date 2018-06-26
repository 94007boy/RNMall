import { callApiPost } from '../../utils/ApiUtils';
import { MALL_INDEX_URL } from '../constants/ApiConstants';
import { isNullStr } from '../../utils/CheckUtils';
import * as types from '../constants/ActionTypes';
import tab from '../../../tab43.json';
import tab40 from '../../../tab40.json';
import tab41 from '../../../tab41.json';
import tab42 from '../../../tab42.json';
const fetchMallIndexDatasRequest = (tabId) => ({
    type: types.DATA_REQUEST,
    tabId,
});

const fetchMallIndexSuccess = (indexDatas,tabId) => ({
    type: types.FETCH_MALL_INDEX_SUCCESS,
    indexDatas,
    tabId,
});

const fetchMallIndexFail = (tabId) => ({
    type: types.FETCH_MALL_INDEX_FAIL,
    tabId,
});

const fetchMallTabsSuccess = (tabList) => ({
    type: types.FETCH_MALL_TABLIST_SUCCESS,
    tabList,
});

export const fetchTabList = () => async (dispatch) => {
    dispatch(fetchMallIndexDatasRequest("tabList"));
    await callApiPost()
        .then(result => {
            if(!result){
                dispatch(fetchMallIndexFail("tabList"));
            }else{
                dispatch(fetchMallTabsSuccess(result.tabList))
            }
        })
        .catch(err => {
            console.log(err);
            dispatch(fetchMallIndexFail("tabList"));
        })
}

export const fetchMallIndexDatas = (reqObj,isRefresh) => async (dispatch) => {
    console.log('fetchMallIndexDatas ... ');
    //此时不知道第一个tab的ID，只能写死
    if(!isRefresh)dispatch(fetchMallIndexDatasRequest(reqObj.tabId));
    await callApiPost(reqObj)
        .then(result => {
            dispatch(fetchMallIndexSuccess(result.floorList,reqObj.tabId));
        })
        .catch(err => {
            console.log(err);
            dispatch(fetchMallIndexFail(reqObj.tabId));
        })
}
