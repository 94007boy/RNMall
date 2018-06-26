package shop.shengyin.rnativeproject.react;

import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.ViewGroupManager;

/**
 * Created by xiaolv on 18/3/31.
 */

public class AndroidFullScreenLoadingModule extends ViewGroupManager<AndroidFullScreenLoading> {

    @Override
    public String getName() {
        return "NativeFullScreenLoading";
    }

    @Override
    protected AndroidFullScreenLoading createViewInstance(ThemedReactContext reactContext) {
        return new AndroidFullScreenLoading(reactContext);
    }
}
