
/*
 applyMiddleware 方法：将所有中间件组成一个数组，依次执行
 createStore函数用来生成 Store，
 */
import { createStore, applyMiddleware } from 'redux';

/*
 redux-thunk中间件，改造store.dispatch，使得后者可以接受函数作为参数,以便处理异步操作
 */
import thunkMiddleware from 'redux-thunk';

/*
 Store 收到 Action 以后，必须给出一个新的 State，这样 View 才会发生变化。
 这种 State 的计算过程就叫做 Reducer。Reducer 函数负责生成新的 State
 */
import rootReducer from '../reducers/index';

/*
 applyMiddleware会依次调用传入的各个中间件，最后再调用createStore方法来生成 Store，完成整个store的创建
 这里相当于封装createStore方法，在这个方法被调用前，先执行中间件，返回的还是createStore方法
 */
const createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(createStore);

export default function configureStore(initialState) {

    /*
     用返回的createStore方法生成 Store
     第一个参数是 Reducer函数
     第二个参数是初始state，作为 State 的默认值。如果不为空，需要和reducer中处理的state结构一致
     以后每当store.dispatch发送过来一个新的 Action，就会自动调用 Reducer，得到新的 State。
     */
    const store = createStoreWithMiddleware(rootReducer, initialState);

    return store;
}
