package com.mobileetherwallet;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.tradle.react.UdpSocketsModule;
import com.peel.react.TcpSocketsModule;
import com.peel.react.rnos.RNOSModule;
import com.oblador.vectoricons.VectorIconsPackage;
import com.reactlibrary.RNSecureStoragePackage;
import com.lwansbrough.RCTCamera.RCTCameraPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.reactnativenavigation.NavigationApplication;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends NavigationApplication implements ReactApplication {

     @Override
       public void onCreate() {
         super.onCreate();
       }

        @Override
       public boolean isDebug() {
           // Make sure you are using BuildConfig from your own application
           return true;//BuildConfig.DEBUG;
       }


      @Override
      public List<ReactPackage> createAdditionalReactPackages() {
        return Arrays.<ReactPackage>asList(
            new MainReactPackage(),
            new RNDeviceInfo(),
              new UdpSocketsModule(),
              new TcpSocketsModule(),
              new RNOSModule(),
              new VectorIconsPackage(),
              new RNSecureStoragePackage(),
              new RCTCameraPackage()
        );
      }
}
