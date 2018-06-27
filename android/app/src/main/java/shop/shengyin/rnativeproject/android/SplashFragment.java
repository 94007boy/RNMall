package shop.shengyin.rnativeproject.android;

import android.app.Activity;
import android.os.Bundle;
import android.support.annotation.NonNull;
import android.support.annotation.Nullable;
import android.support.v4.app.Fragment;
import android.support.v4.app.FragmentTransaction;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.view.WindowManager;
import android.widget.TextView;

import java.util.concurrent.TimeUnit;

import rx.Observable;
import rx.Observer;
import rx.android.schedulers.AndroidSchedulers;
import rx.functions.Func1;
import rx.schedulers.Schedulers;
import rx.subscriptions.CompositeSubscription;
import shop.shengyin.rnativeproject.R;

public class SplashFragment extends Fragment {

    private int count = 5;
    private TextView btn;
    private CompositeSubscription subscription = new CompositeSubscription();

    public static SplashFragment newInstance(){
        return new SplashFragment();
    }

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        View rootView = inflater.inflate(R.layout.fragment_splash,container,false);
        btn = rootView.findViewById(R.id.splash_btn);
        setInterval();
        btn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                //goHome();
            }
        });
        return rootView;
    }

    private void setInterval() {
        subscription.add(
                Observable.interval(0,1, TimeUnit.SECONDS)
                .take(count + 1)
                .map(new Func1<Long, Long>() {
                    @Override
                    public Long call(Long aLong) {
                        return count - aLong;
                    }
                })
                .subscribeOn(Schedulers.io())
                .observeOn(AndroidSchedulers.mainThread())
                .subscribe(new Observer<Long>() {

                    @Override
                    public void onCompleted() {
                        btn.setText("跳过");
                        goHome();
                    }

                    @Override
                    public void onError(Throwable e) {

                    }

                    @Override
                    public void onNext(Long aLong) {
                        btn.setText("等待 "+aLong);
                    }
                })
        );
    }

    private void goHome() {
        if (subscription.hasSubscriptions()){
            subscription.clear();
        }
        FragmentTransaction transaction = getActivity().getSupportFragmentManager().beginTransaction();
        transaction.remove(SplashFragment.this);
        transaction.commit();
        changeToFullScreen(getActivity(),false);
    }

    private void changeToFullScreen(Activity act,boolean isFull) {
        WindowManager.LayoutParams params = act.getWindow().getAttributes();
        if (isFull){
            params.flags |= WindowManager.LayoutParams.FLAG_FULLSCREEN;
            act.getWindow().setAttributes(params);
            act.getWindow().addFlags(WindowManager.LayoutParams.FLAG_LAYOUT_NO_LIMITS);
        }else {
            params.flags &= (~WindowManager.LayoutParams.FLAG_FULLSCREEN);
            act.getWindow().setAttributes(params);
            act.getWindow().clearFlags(WindowManager.LayoutParams.FLAG_LAYOUT_NO_LIMITS);
        }
    }

    //启动页，是全屏的，关闭后，进入首页时要改成非全屏
    @Override
    public void onActivityCreated(@Nullable Bundle savedInstanceState) {
        super.onActivityCreated(savedInstanceState);
        changeToFullScreen(getActivity(),true);
    }
}
