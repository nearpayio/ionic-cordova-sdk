package com.nearpay.sdk.common.operations;

import java.util.HashMap;

import com.nearpay.sdk.common.NearpayLib;
import com.nearpay.sdk.common.PluginProvider;
import com.nearpay.sdk.common.sender.NearpaySender;
import com.nearpay.sdk.common.filter.ArgsFilter;
import io.nearpay.sdk.utils.enums.AuthenticationData;

public class UpdateAuthOperation extends BaseOperation {
  public UpdateAuthOperation(PluginProvider provider) {
    super(provider);
  }

  @Override
  public void run(ArgsFilter filter, NearpaySender sender) {
    String authValue = filter.getAuthValue();
    String authType = filter.getAuthType();
    AuthenticationData authData = NearpayLib.getAuthType(authType, authValue);
    provider.getNearpayLib().nearpay.updateAuthentication(authData);
    sender.send(new HashMap<>());
  }
}
