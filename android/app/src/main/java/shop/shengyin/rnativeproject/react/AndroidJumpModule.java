package shop.shengyin.rnativeproject.react;

import android.content.Context;
import android.content.Intent;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.google.gson.Gson;

import java.io.Serializable;

import shop.shengyin.rnativeproject.android.JumpPageActivity;

/**
 * Created by xiaolv on 18/3/19.
 */

public class AndroidJumpModule extends ReactContextBaseJavaModule {

    public static final String REACTCLASSNAME = "AndroidJumpModule";
    private Context context;

    public AndroidJumpModule(ReactApplicationContext reactContext) {
        super(reactContext);
        context = reactContext;
    }

    @Override
    public String getName() {
        return REACTCLASSNAME;
    }

    @ReactMethod
    public void jumpByUrl(String jumpJson){
        JumpBean jumpBean = new Gson().fromJson(jumpJson,JumpBean.class);
        Intent intent = new Intent(context, JumpPageActivity.class);
        intent.putExtra("jumpBean",jumpBean);
        intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        context.startActivity(intent);
    }

    public class JumpBean implements Serializable{
        String desc;
        String jumptoType;

        public String getDesc() {
            return desc;
        }

        public void setDesc(String desc) {
            this.desc = desc;
        }

        public String getJumptoType() {
            return jumptoType;
        }

        public void setJumptoType(String jumptoType) {
            this.jumptoType = jumptoType;
        }
    }
}
