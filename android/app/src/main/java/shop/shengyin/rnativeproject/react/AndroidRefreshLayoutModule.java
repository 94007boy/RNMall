package shop.shengyin.rnativeproject.react;

import android.view.LayoutInflater;
import android.view.View;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.common.MapBuilder;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.ViewGroupManager;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.scwang.smartrefresh.layout.SmartRefreshLayout;
import com.scwang.smartrefresh.layout.api.RefreshLayout;
import com.scwang.smartrefresh.layout.footer.ClassicsFooter;
import com.scwang.smartrefresh.layout.listener.OnRefreshListener;

import java.util.Map;

import javax.annotation.Nullable;

import shop.shengyin.rnativeproject.R;

/**
 * Created by xiaolv on 18/4/23.
 */

public class AndroidRefreshLayoutModule extends ViewGroupManager<AndroidRefreshLayoutView> {

    static final int FinishRefresh = 1;
    private boolean CanRefresh = true;
    private String Key = "";
    AndroidRefreshHeader header;

    @Override
    public String getName() {
        return "AndroidRefreshLayout";
    }

    @Override
    protected AndroidRefreshLayoutView createViewInstance(ThemedReactContext reactContext) {
        AndroidRefreshLayoutView refreshLayout = (AndroidRefreshLayoutView) LayoutInflater.from(reactContext).inflate(R.layout.react_android_refresh_layout,null);
        header = new AndroidRefreshHeader(reactContext);
        refreshLayout.setTag("PullLayout");
        refreshLayout.setRefreshHeader(header);
        refreshLayout.setEnableLoadmore(false);//是否启用上拉加载功能
        refreshLayout.setEnableLoadmoreWhenContentNotFull(false);
        refreshLayout.setRefreshFooter(new ClassicsFooter(reactContext));
        refreshLayout.setReboundDuration(400);//回弹动画时长（毫秒）
        refreshLayout.setHeaderTriggerRate(1.2f);//触发刷新距离 与 HeaderHieght 的比率1.0.4
        return refreshLayout;
    }

    @Override
    public void addView(AndroidRefreshLayoutView parent, View child, int index) {
        super.addView(parent, child, index);
        parent.onFinishInflate();//在这个方法里面添加子布局 这里要主动调用否则无法显示下拉刷新内容
    }

    @Override
    protected void addEventEmitters(final ThemedReactContext reactContext, final AndroidRefreshLayoutView view) {
        super.addEventEmitters(reactContext, view);
        view.setOnRefreshListener(new OnRefreshListener() {
            @Override
            public void onRefresh(RefreshLayout refreshlayout) {
                refresh(reactContext,view);
            }
        });
    }

    //发送给RN刷新事件 加载数据
    public void refresh(ThemedReactContext reactContext, AndroidRefreshLayoutView refreshlayout){
        if(reactContext!=null){
            WritableMap params = Arguments.createMap();
            params.putString("from","native");
            if(CanRefresh){
                CanRefresh = false;
                this.dispatchEvent(reactContext,refreshlayout,"onRefreshReleased",params);
            }
        }
    }

    public void dispatchEvent(final ReactContext reactContext,
                              final AndroidRefreshLayoutView refreshlayout,
                              final String eventName,
                              @android.support.annotation.Nullable final WritableMap params) {
        if (reactContext == null) {
            refreshlayout.finishRefresh();
        }else{
            reactContext
                    .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                    .emit(this.Key+eventName, params);
        }
    }

    @Override
    public void receiveCommand(AndroidRefreshLayoutView root, int commandId, @Nullable ReadableArray args) {
        super.receiveCommand(root, commandId, args);
        String key = args.getString(0);
        switch (commandId){
            case FinishRefresh:
                if(this.Key.equals(key)){
                    root.finishRefresh();
                    CanRefresh = true;
                }
                return;
        }
    }

    @ReactProp(name = "Key")
    public void setKey(final SmartRefreshLayout refreshLayout, final String Key) {
        this.Key = Key;
    }

    @Nullable
    @Override
    public Map<String, Integer> getCommandsMap() {
        return MapBuilder.of("FinishRefresh",FinishRefresh);
    }

    @Nullable
    @Override
    public Map<String, Object> getExportedCustomDirectEventTypeConstants() {
        return MapBuilder.<String, Object>builder()
                .put("onRefreshReleased", MapBuilder.of("registrationName", "onRefreshReleased"))
                .build();
    }

    @Override
    public void onDropViewInstance(AndroidRefreshLayoutView view) {
        view.finishRefresh();
        super.onDropViewInstance(view);
    }
}
