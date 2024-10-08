package com.nearpay.sdk.common.operations;

import androidx.annotation.NonNull;

import java.util.Map;

import com.nearpay.sdk.common.status.ErrorStatus;
import com.nearpay.sdk.common.NearpayLib;
import com.nearpay.sdk.common.PluginProvider;
import com.nearpay.sdk.common.sender.NearpaySender;
import com.nearpay.sdk.common.filter.ArgsFilter;
import io.nearpay.sdk.utils.enums.SetupFailure;
import io.nearpay.sdk.utils.listeners.SetupListener;

public class SetupOperation extends BaseOperation {
    public SetupOperation(PluginProvider provider) {
        super(provider);

    }

    @Override
    public void run(ArgsFilter filter, NearpaySender sender) {
        String authvalue = provider.getNearpayLib().authValueShared;
        String authType = provider.getNearpayLib().authTypeShared;
        boolean isAuthValidated = provider.getNearpayLib().isAuthInputValidation(authType, authvalue);
        if (!isAuthValidated) {
            Map<String, Object> paramMap = NearpayLib.ApiResponse(ErrorStatus.invalid_argument_code,
                    "Authentication parameter missing");
            sender.send(paramMap);
            return;
        }

        provider.getNearpayLib().nearpay.setup(new SetupListener() {
            @Override
            public void onSetupCompleted() {
                // when the setup is done successfully
                Map<String, Object> paramMap = NearpayLib.ApiResponse(ErrorStatus.success_code,
                        "Application setup completed successfully");
                sender.send(paramMap);
            }

            @Override
            public void onSetupFailed(@NonNull SetupFailure setupFailure) {
                if (setupFailure instanceof SetupFailure.AlreadyInstalled) {
                    // when the payment plugin is already installed .
                    Map<String, Object> paramMap = NearpayLib.ApiResponse(ErrorStatus.already_installed_code,
                            "Plugin Application Already Installed");
                    sender.send(paramMap);
                } else if (setupFailure instanceof SetupFailure.NotInstalled) {
                    // when the installtion failed .
                    Map<String, Object> paramMap = NearpayLib.ApiResponse(ErrorStatus.not_installed_code,
                            "Plugin Application Installation Failed");
                    sender.send(paramMap);
                } else if (setupFailure instanceof SetupFailure.AuthenticationFailed) {
                    // when the Authentication Failed.
                    String messageResp = ((SetupFailure.AuthenticationFailed) setupFailure).toString();
                    String message = messageResp != "" && messageResp.length() > 0 ? messageResp
                            : ErrorStatus.authentication_failed_message;

                    if (authType.equalsIgnoreCase("jwt")) {
                        provider.getNearpayLib().nearpay
                                .updateAuthentication(provider.getNearpayLib().getAuthType(authType, authvalue));
                        Map<String, Object> paramMap = NearpayLib.ApiResponse(ErrorStatus.auth_failed_code, message);
                        sender.send(paramMap);
                    } else {
                        Map<String, Object> paramMap = NearpayLib.ApiResponse(ErrorStatus.auth_failed_code, message);
                        sender.send(paramMap);
                    }

                } else if (setupFailure instanceof SetupFailure.InvalidStatus) {
                    // you can get the status using the following code
                    String messageResp = ((SetupFailure.InvalidStatus) setupFailure).toString();
                    String message = messageResp != "" && messageResp.length() > 0 ? messageResp
                            : ErrorStatus.invalid_status_messsage;
                    Map<String, Object> paramMap = NearpayLib.ApiResponse(ErrorStatus.invalid_code, message);
                    sender.send(paramMap);
                }
            }
        });
    }
}
