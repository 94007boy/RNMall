package shop.shengyin.rnativeproject.android;

import android.content.Context;
import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;
import android.content.res.Resources;
import android.os.Build;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

/**
 * 一些公共请求参数的获取和加密，用于提供给RN进行网络请求时，合并到请求参数中
 */
public class WebGetReqParamUtil {

    private static WebGetReqParamUtil util;
    private final ReqParam reqParam;

    public static WebGetReqParamUtil getInstance(Context context) {
        if (util == null) {
            util = new WebGetReqParamUtil(context);
        }
        return util;
    }

    private WebGetReqParamUtil(Context mcontext) {
        reqParam = new ReqParam();
        try {
            reqParam.uuid = URLEncoder.encode(getUUID(mcontext), "utf-8");
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }
        try {
            reqParam.clientVersion = URLEncoder.encode(getVersionName(mcontext), "utf-8");
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }
        try {
            reqParam.osVersion = URLEncoder.encode(Build.VERSION.RELEASE, "utf-8");
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }
    }

    public ReqParam getReqParam() {
        return reqParam;
    }

    public class ReqParam {
        String clientVersion;
        String osVersion;
        String uuid;
    }

    public static String getUUID(Context context) {
        String uuid = "";
        try {
            String serial = Build.SERIAL;//Serial Number序列号
            String screenInfo = getScreen(context);
            String result = screenInfo + "LPPZ" + serial;
            uuid = stringToMD5(result);//唯一标识uuid
        } catch (Exception e) {

        }
        return uuid;
    }

    public static String getScreen(Context context){
        Resources resources = context.getResources();
        int widthPixels = resources.getDisplayMetrics().widthPixels;
        int heightPixels = resources.getDisplayMetrics().heightPixels;
        String screen = widthPixels+"×"+heightPixels;
        return screen;
    }

    public static String stringToMD5(String string) {
        byte[] hash;

        try {
            hash = MessageDigest.getInstance("MD5").digest(string.getBytes("UTF-8"));
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
            return null;
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
            return null;
        }
        StringBuilder hex = new StringBuilder(hash.length * 2);
        for (byte b : hash) {
            if ((b & 0xFF) < 0x10)
                hex.append("0");
            hex.append(Integer.toHexString(b & 0xFF));
        }
        return hex.toString();
    }

    public static String getVersionName(Context mcontext){
        try {
            PackageManager packageManager = mcontext.getPackageManager();
            PackageInfo packageInfo = packageManager.getPackageInfo(mcontext.getPackageName(), PackageManager.GET_CONFIGURATIONS);
            return packageInfo.versionName;
        }catch (Exception e){

        }
        return null;
    }
}
