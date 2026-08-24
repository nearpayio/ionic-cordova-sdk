package com.nearpay.sdk.common.operations;

import java.util.Map;

import com.nearpay.sdk.common.NearpayLib;
import com.nearpay.sdk.common.PluginProvider;
import com.nearpay.sdk.common.filter.ArgsFilter;
import com.nearpay.sdk.common.sender.NearpaySender;
import com.nearpay.sdk.common.status.ErrorStatus;
import io.nearpay.sdk.utils.enums.AuthenticationData;

public class UpdateAuthOperation extends BaseOperation {
    public UpdateAuthOperation(PluginProvider provider) {
        super(provider);
    }

    @Override
    public void run(ArgsFilter filter, NearpaySender sender) {
        if (provider.getNearpayLib().nearpay == null) {
            sender.send(NearpayLib.ApiResponse(ErrorStatus.invalid_argument_code, "NearPay is not initialized"));
            return;
        }

        String authValue = filter.getAuthValue();
        String authType = filter.getAuthType();
        String authTid = filter.getAuthTid();
        boolean isAuthValidated = provider.getNearpayLib().isAuthInputValidation(authType, authValue);
        if (!isAuthValidated) {
            sender.send(NearpayLib.ApiResponse(ErrorStatus.invalid_argument_code, "Authentication parameter missing"));
            return;
        }

        provider.getNearpayLib().authTypeShared = authType;
        provider.getNearpayLib().authValueShared = authValue;
        AuthenticationData authData = NearpayLib.getAuthType(authType, authValue, authTid);
        provider.getNearpayLib().nearpay.updateAuthentication(authData);
        sender.send(NearpayLib.ApiResponse(ErrorStatus.success_code, "Authentication updated"));
    }
}
