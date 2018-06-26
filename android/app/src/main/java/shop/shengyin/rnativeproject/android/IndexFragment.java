package shop.shengyin.rnativeproject.android;

import shop.shengyin.rnativeproject.react.ReactFragment;

public class IndexFragment extends ReactFragment {

    public static IndexFragment newInstance(){
        return new IndexFragment();
    }

    @Override
    public String getMainComponentName() {
        return "Index";
    }
}
