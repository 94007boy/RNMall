import { createSelector } from 'reselect';

const getMallIndexTabs = state => state.mall.tabs||[];
const getMallIndexTabData = state => state.mall.tabData||{};
const getMallIndexFetchState = state => state.mall.fetchStates||null;


const mallIndexData = (
    tabs,
    tabData,
    fetchStates,
) => {
    return {
        tabs:tabs,
        tabData:tabData,
        fetchStates:fetchStates,
    }
}


const getMallIndexData = createSelector(
    getMallIndexTabs,
    getMallIndexTabData,
    getMallIndexFetchState,
    mallIndexData,
);

export default getMallIndexData;