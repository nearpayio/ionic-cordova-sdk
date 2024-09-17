package com.nearpay.sdk;

import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CallbackContext;
import org.apache.cordova.PluginResult;
import org.apache.cordova.CordovaInterface;
import org.apache.cordova.CordovaWebView;
import android.webkit.WebView;
import android.util.Log;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import com.google.gson.Gson;

import com.nearpay.sdk.common.PluginProvider;
import com.nearpay.sdk.common.filter.ArgsFilter;
import com.nearpay.sdk.common.operations.BaseOperation;
import com.nearpay.sdk.common.operations.OperatorFactory;
import com.nearpay.sdk.common.sender.NearpaySender;
import android.content.Context;

/**
 * This class echoes a string called from JavaScript.
 */
public class NearpayCordovaSDK extends CordovaPlugin {
  PluginProvider provider = new PluginProvider();
  public OperatorFactory operatorFactory = new OperatorFactory(provider);

  @Override
  public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
    provider.getNearpayLib().context = this.cordova.getActivity().getApplicationContext();
    runOperation(action, args, callbackContext);
    return true;
  }

  private void runOperation(String opName, JSONArray args, CallbackContext callbackContext) {
    try {
      // Check if the first argument is a JSONObject, not a JSONArray
      if (args.length() > 0 && args.get(0) instanceof JSONObject) {
        JSONObject jsonObject = args.getJSONObject(0);

        // Convert JSONObject to a Map
        Map<String, Object> result = new Gson().fromJson(jsonObject.toString(), HashMap.class);

        ArgsFilter filter = new ArgsFilter(result);

        // Get the operation
        BaseOperation operation = operatorFactory.getOperation(opName)
            .orElseThrow(() -> new IllegalArgumentException("Invalid Operation"));

        // Define the sender
        NearpaySender sender = (Object data) -> {
          try {
            JSONObject responseObject = new JSONObject((Map) data);
            callbackContext.success(responseObject.toString());
          } catch (Exception e) {
            callbackContext.error("Error converting data to JSON: " + e.getMessage());
          }
        };
        // Run the operation
        operation.run(filter, sender);
      } else {
        callbackContext.error("Expected a JSON object in args[0]");
      }
    } catch (JSONException e) {
      callbackContext.error("JSON error: " + e.getMessage());
    } catch (Exception e) {
      callbackContext.error("Error: " + e.getMessage());
    }
  }

}
