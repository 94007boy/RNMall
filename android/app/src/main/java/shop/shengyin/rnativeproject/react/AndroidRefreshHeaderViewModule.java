package shop.shengyin.rnativeproject.react;

import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.ViewGroupManager;

/**
 * Created by xiaolv on 18/4/20.
 */

public class AndroidRefreshHeaderViewModule extends ViewGroupManager<AndroidRefreshHeaderView> {

    @Override
    public String getName() {
        return "RefreshHeaderView";
    }

    @Override
    protected AndroidRefreshHeaderView createViewInstance(ThemedReactContext reactContext) {
        return new AndroidRefreshHeaderView(reactContext);
    }
}
