package com.nearpay.sdk;

import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CallbackContext;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import com.nearpay.sdk.common.PluginProvider;
import com.nearpay.sdk.common.filter.ArgsFilter;
import com.nearpay.sdk.common.operations.BaseOperation;
import com.nearpay.sdk.common.operations.OperatorFactory;
import com.nearpay.sdk.common.sender.NearpaySender;

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
      if (args.length() > 0 && args.get(0) instanceof JSONObject) {
        Map<String, Object> result = jsonToMap(args.getJSONObject(0));
        ArgsFilter filter = new ArgsFilter(result);

        BaseOperation operation = operatorFactory.getOperation(opName)
            .orElseThrow(() -> new IllegalArgumentException("Invalid Operation"));

        NearpaySender sender = (Object data) -> {
          try {
            JSONObject responseObject = new JSONObject((Map) data);
            callbackContext.success(responseObject.toString());
          } catch (Exception e) {
            callbackContext.error("Error converting data to JSON: " + e.getMessage());
          }
        };
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

  private Map<String, Object> jsonToMap(JSONObject object) throws JSONException {
    Map<String, Object> map = new HashMap<>();
    Iterator<String> keys = object.keys();
    while (keys.hasNext()) {
      String key = keys.next();
      Object value = object.get(key);
      map.put(key, unwrapJson(value));
    }
    return map;
  }

  private Object unwrapJson(Object value) throws JSONException {
    if (value == null || value == JSONObject.NULL) {
      return null;
    }
    if (value instanceof JSONObject) {
      return jsonToMap((JSONObject) value);
    }
    if (value instanceof JSONArray) {
      JSONArray array = (JSONArray) value;
      List<Object> list = new ArrayList<>();
      for (int i = 0; i < array.length(); i++) {
        list.add(unwrapJson(array.get(i)));
      }
      return list;
    }
    return value;
  }
}
