package shop.shengyin.rnativeproject.react;

import android.content.Context;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.google.gson.Gson;

import shop.shengyin.rnativeproject.android.WebGetReqParamUtil;

/**
 * Created by xiaolv on 18/3/19.
 */

public class AndroidHttpModule extends ReactContextBaseJavaModule {

    public static final String REACTCLASSNAME = "AndroidHttpModule";
    private Context context;

    public AndroidHttpModule(ReactApplicationContext reactContext) {
        super(reactContext);
        context = reactContext;
    }

    @Override
    public String getName() {
        return REACTCLASSNAME;
    }

    @ReactMethod
    public void getHttpCommReq(Promise promise){
        //获取一些加密的网络请求公共参数
        WebGetReqParamUtil.ReqParam reqParam = WebGetReqParamUtil.getInstance(context).getReqParam();
        if (reqParam != null){
            promise.resolve(new Gson().toJson(reqParam));
        }else {
            promise.reject(null,new Throwable("reqParam is null"));
        }
    }
}
