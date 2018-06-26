package shop.shengyin.rnativeproject.react;

import android.graphics.drawable.AnimationDrawable;
import android.support.annotation.ColorInt;
import android.support.annotation.NonNull;
import android.util.AttributeSet;
import android.view.LayoutInflater;
import android.view.View;
import android.widget.ImageView;
import android.widget.LinearLayout;

import com.facebook.react.bridge.ReactContext;
import com.scwang.smartrefresh.layout.api.RefreshHeader;
import com.scwang.smartrefresh.layout.api.RefreshKernel;
import com.scwang.smartrefresh.layout.api.RefreshLayout;
import com.scwang.smartrefresh.layout.constant.RefreshState;
import com.scwang.smartrefresh.layout.constant.SpinnerStyle;
import com.scwang.smartrefresh.layout.util.DensityUtil;
import shop.shengyin.rnativeproject.R;

/**
 * Created by xiaolv on 18/4/25.
 */

public class AndroidRefreshHeader extends LinearLayout implements RefreshHeader {
    LinearLayout header;
    private ReactContext reactContext;
    private AnimationDrawable animation;

    public AndroidRefreshHeader(ReactContext context) {
        super(context);
        initView(context);
    }
    public AndroidRefreshHeader(ReactContext context, AttributeSet attrs) {
        super(context, attrs);
        this.initView(context);
    }
    public AndroidRefreshHeader(ReactContext context, AttributeSet attrs, int defStyleAttr) {
        super(context, attrs, defStyleAttr);
        this.initView(context);
    }

    private void initView(ReactContext context) {
        this.reactContext = context;
        header = (LinearLayout) LayoutInflater.from(context).inflate(R.layout.pull_header_view,null);
        ImageView pullAnime = (ImageView) header.findViewById(R.id.pull_anime);
        animation = (AnimationDrawable) pullAnime.getDrawable();
        LayoutParams params = new LayoutParams(LayoutParams.MATCH_PARENT, LayoutParams.WRAP_CONTENT);
        this.addView(header,params);
        setMinimumHeight(DensityUtil.dp2px(60));
    }


    @NonNull
    public View getView() {
        return this;//真实的视图就是自己，不能返回null
    }


    @Override
    public SpinnerStyle getSpinnerStyle() {
        return SpinnerStyle.Translate;//指定为平移，不能null
    }
    @Override
    public void onStartAnimator(RefreshLayout layout, int headHeight, int extendHeight) {
        animation.start();
    }
    @Override
    public int onFinish(RefreshLayout layout, boolean success) {
        animation.stop();//停止动画
        return 500;//延迟500毫秒之后再弹回
    }

    @Override
    public void onStateChanged(RefreshLayout refreshLayout, RefreshState oldState, RefreshState newState) {
        switch (newState) {
            case None:
            case PullDownToRefresh:
                animation.stop();
                break;
            case Refreshing:
                animation.stop();
                break;
            case ReleaseToRefresh:
                animation.start();
                break;
        }
    }
    @Override
    public boolean isSupportHorizontalDrag() {
        return false;
    }
    @Override
    public void onInitialized(RefreshKernel kernel, int height, int extendHeight) {
    }
    @Override
    public void onHorizontalDrag(float percentX, int offsetX, int offsetMax) {
    }
    @Override
    public void onReleasing(float percent, int offset, int headHeight, int extendHeight) {
    }
    @Override
    public void setPrimaryColors(@ColorInt int ... colors){
    }

    @Override
    public void onPullingDown(float percent, int offset, int headerHeight, int extendHeight) {

    }

    @Override
    public void onRefreshReleased(RefreshLayout layout, int headerHeight, int extendHeight) {

    }
}
