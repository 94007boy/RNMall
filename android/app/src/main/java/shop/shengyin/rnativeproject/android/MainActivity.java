package shop.shengyin.rnativeproject.android;

import android.Manifest;
import android.content.pm.PackageManager;
import android.os.Build;
import android.os.Bundle;
import android.support.annotation.NonNull;
import android.support.annotation.Nullable;
import android.support.v4.app.Fragment;
import android.support.v4.app.FragmentManager;
import android.support.v4.app.FragmentTransaction;
import android.widget.Toast;

import com.facebook.react.ReactFragmentActivity;

import shop.shengyin.rnativeproject.R;

public class MainActivity extends ReactFragmentActivity {

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        if (!checkPermissionAvailable()) {
            checkPermissions();
        }else{
            initView();
        }

    }

    private void initView() {
        SplashFragment splashFragment = (SplashFragment) getSupportFragmentManager().findFragmentById(R.id.splash_fragment);
        if (splashFragment == null){
            splashFragment = SplashFragment.newInstance();
            addFragmentToActivity(getSupportFragmentManager(),splashFragment,R.id.splash_fragment);
        }
        IndexFragment indexFragment = (IndexFragment) getSupportFragmentManager().findFragmentById(R.id.index_fragment);
        if (indexFragment == null){
            indexFragment = IndexFragment.newInstance();
            addFragmentToActivity(getSupportFragmentManager(),indexFragment,R.id.index_fragment);
        }
    }

    private static void addFragmentToActivity (@NonNull FragmentManager fragmentManager,
                                              @NonNull Fragment fragment, int frameId) {
        FragmentTransaction transaction = fragmentManager.beginTransaction();
        transaction.add(frameId, fragment);
        transaction.commit();
    }

    private boolean checkPermissionAvailable() {
        PackageManager pm = getPackageManager();
        return PackageManager.PERMISSION_GRANTED == pm.checkPermission("android.permission.READ_PHONE_STATE", "shop.shengyin.rnativeproject")
                && PackageManager.PERMISSION_GRANTED == pm.checkPermission("android.permission.WRITE_EXTERNAL_STORAGE", "shop.shengyin.rnativeproject");
    }

    //检查权限
    public void checkPermissions() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            int result = checkSelfPermission(Manifest.permission.READ_PHONE_STATE);
            int result2 = checkSelfPermission(Manifest.permission.WRITE_EXTERNAL_STORAGE);
            if (result == PackageManager.PERMISSION_DENIED || result2== PackageManager.PERMISSION_DENIED) {
                requestPermissions(new String[]{Manifest.permission.READ_PHONE_STATE,Manifest.permission.WRITE_EXTERNAL_STORAGE}, 1);
            }
        }
    }

    @Override
    public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions, @NonNull int[] grantResults) {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            if (requestCode == 1) {
                if (grantResults.length > 1 && grantResults[0] == PackageManager.PERMISSION_GRANTED && grantResults[1] == PackageManager.PERMISSION_GRANTED) {
                    initView();
                } else {
                    Toast.makeText(this,"缺少必须的手机权限！",Toast.LENGTH_LONG).show();
                    this.finish();
                }
            }
        }
    }
}
