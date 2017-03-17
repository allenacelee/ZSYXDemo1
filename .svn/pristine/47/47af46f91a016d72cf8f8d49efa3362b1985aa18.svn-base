package com.zsyxdemo;

import com.facebook.react.ReactActivity;

//OrientationPackage插件: Implement onConfigurationChanged method
import android.content.Intent;
import android.content.res.Configuration;

public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "ZSYXDemo";
    }

    /**
     * OrientationPackage插件: Implement onConfigurationChanged method
     */
    @Override
          public void onConfigurationChanged(Configuration newConfig) {
            super.onConfigurationChanged(newConfig);
            Intent intent = new Intent("onConfigurationChanged");
            intent.putExtra("newConfig", newConfig);
            this.sendBroadcast(intent);
    }
}
