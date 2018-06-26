package shop.shengyin.rnativeproject.react;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.JavaScriptModule;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

/**
 * Created by xiaolv on 18/3/19.
 */

public class AndroidNativePackage implements ReactPackage {

    //原生的UI无关的方法调用的注册必须写在这里否则就会注册不上去！
    @Override
    public List<NativeModule> createNativeModules(ReactApplicationContext reactApplicationContext) {
        List<NativeModule> modules = new ArrayList<>();
        modules.add(new AndroidHttpModule(reactApplicationContext));
        modules.add(new AndroidJumpModule(reactApplicationContext));
        modules.add(new MyFrescoModule(reactApplicationContext));
        return modules;
    }

    @Override
    public List<Class<? extends JavaScriptModule>> createJSModules() {
        return Collections.emptyList();
    }

    //原生的UI组件的注册必须写在这里否则就会注册不上去！
    @Override
    public List<ViewManager> createViewManagers(ReactApplicationContext reactApplicationContext) {
        List<ViewManager> modules = new ArrayList<>();
        modules.add(new AndroidFullScreenLoadingModule());
        modules.add(new AndroidRefreshLayoutModule());
        return modules;
    }
}
