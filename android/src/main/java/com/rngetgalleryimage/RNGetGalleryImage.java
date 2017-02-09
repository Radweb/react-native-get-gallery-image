package com.rngetgalleryimage;

import android.content.Context;
import android.net.Uri;
import android.provider.MediaStore;
import android.database.Cursor;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.Arguments;

public class RNGetGalleryImage extends ReactContextBaseJavaModule {

  public RNGetGalleryImage(ReactApplicationContext reactContext) {
    super(reactContext);
  }

  @Override
  public String getName() {
    return "RNGetGalleryImage";
  }

  private WritableMap makeErrorPayload(Exception ex) {
    WritableMap error = Arguments.createMap();
    error.putString("message", ex.getMessage());
    return error;
  }

  @ReactMethod
  public void getRealPathFromURI(String uri, Callback callback) {
    try {
      Context context = getReactApplicationContext();
      String [] proj = {MediaStore.Images.Media.DATA};
      Cursor cursor = context.getContentResolver().query(Uri.parse(uri), proj,  null, null, null);
      int column_index = cursor.getColumnIndexOrThrow(MediaStore.Images.Media.DATA);
      cursor.moveToFirst();
      String path = cursor.getString(column_index); 
      cursor.close();
  
      callback.invoke(null, path);
    } catch (Exception ex) {
      ex.printStackTrace();
      callback.invoke(makeErrorPayload(ex));
    }
  }

}

