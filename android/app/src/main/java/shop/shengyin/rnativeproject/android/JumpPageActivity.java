package shop.shengyin.rnativeproject.android;

import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.v7.app.AppCompatActivity;
import android.widget.TextView;
import shop.shengyin.rnativeproject.R;
import shop.shengyin.rnativeproject.react.AndroidJumpModule;

public class JumpPageActivity extends AppCompatActivity {

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_other_page);
        TextView title = findViewById(R.id.other_page_title);
        TextView content = findViewById(R.id.other_page_content);
        AndroidJumpModule.JumpBean jumpBean = (AndroidJumpModule.JumpBean) getIntent().getSerializableExtra("jumpBean");
        if (jumpBean != null){
            title.setText("这是一个"+jumpBean.getJumptoType() != null?jumpBean.getJumptoType():"空"+"类型的页面");
            content.setText(jumpBean.getDesc());
        }
    }
}
