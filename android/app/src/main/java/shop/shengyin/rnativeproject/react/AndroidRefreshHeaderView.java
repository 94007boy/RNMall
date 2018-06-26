package shop.shengyin.rnativeproject.react;

import android.content.Context;
import android.graphics.drawable.AnimationDrawable;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.LinearLayout;

import shop.shengyin.rnativeproject.R;


/**
 * Created by xiaolv on 18/4/20.
 */

public class AndroidRefreshHeaderView extends LinearLayout {

    public AndroidRefreshHeaderView(Context context) {
        super(context);
        initView(context);
    }

    private void initView(Context context) {
        View headerView = LayoutInflater.from(context).inflate(R.layout.pull_header_view, null);
        ImageView pullAnime = (ImageView) headerView.findViewById(R.id.pull_anime);
        AnimationDrawable animation = (AnimationDrawable) pullAnime.getDrawable();
        animation.start();
        addView(headerView,new LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.WRAP_CONTENT));
    }
}
