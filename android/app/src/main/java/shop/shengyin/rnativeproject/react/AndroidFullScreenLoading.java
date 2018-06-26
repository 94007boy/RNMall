package shop.shengyin.rnativeproject.react;

import android.content.Context;
import android.graphics.drawable.AnimationDrawable;
import android.support.annotation.Nullable;
import android.util.AttributeSet;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.LinearLayout;

import shop.shengyin.rnativeproject.R;


/**
 * Created by xiaolv on 18/3/31.
 */

public class AndroidFullScreenLoading extends LinearLayout {

    private Context context;

    public AndroidFullScreenLoading(Context context) {
        super(context);
        this.context = context;
        initView(context);
    }

    public AndroidFullScreenLoading(Context context, @Nullable AttributeSet attrs) {
        super(context, attrs);
        this.context = context;
        initView(context);
    }

    public AndroidFullScreenLoading(Context context, @Nullable AttributeSet attrs, int defStyleAttr) {
        super(context, attrs, defStyleAttr);
        this.context = context;
        initView(context);
    }

    private void initView(Context context) {
        View loadingView = LayoutInflater.from(context).inflate(R.layout.app_res_loading_view,null);
        ImageView loadingImageView = (ImageView) loadingView.findViewById(R.id.loading_anima);
        AnimationDrawable animationDrawable = (AnimationDrawable) loadingImageView.getDrawable();
        animationDrawable.start();
        addView(loadingView,new LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.MATCH_PARENT));
    }

}
