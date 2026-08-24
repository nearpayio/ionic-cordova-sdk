package com.nearpay.sdk.common.operations;

import androidx.annotation.NonNull;

import java.util.ArrayList;
import java.util.Map;

import com.nearpay.sdk.common.NearpayLib;
import com.nearpay.sdk.common.PluginProvider;
import com.nearpay.sdk.common.filter.ArgsFilter;
import com.nearpay.sdk.common.sender.NearpaySender;
import com.nearpay.sdk.common.status.ErrorStatus;
import io.nearpay.sdk.data.models.SessionInfo;
import io.nearpay.sdk.utils.enums.SessionFailure;
import io.nearpay.sdk.utils.listeners.CheckSessionListener;

public class GetUserSessionOperation extends BaseOperation {
    public GetUserSessionOperation(PluginProvider provider) {
        super(provider);
    }

    @Override
    public void run(ArgsFilter filter, NearpaySender sender) {
        if (provider.getNearpayLib().nearpay == null) {
            sender.send(NearpayLib.ApiResponse(ErrorStatus.invalid_argument_code, "NearPay is not initialized"));
            return;
        }

        provider.getNearpayLib().nearpay.getUserSession(new CheckSessionListener() {
            @Override
            public void onSessionFree() {
                Map<String, Object> toSend = NearpayLib.ApiResponse(ErrorStatus.user_session_free, null,
                        new ArrayList());
                sender.send(toSend);
            }

            @Override
            public void onSessionFailed(@NonNull SessionFailure sessionFailure) {
                int status = ErrorStatus.general_failure_code;
                String message = null;

                if (sessionFailure instanceof SessionFailure.FailureMessage) {
                    status = ErrorStatus.failure_code;
                    message = ((SessionFailure.FailureMessage) sessionFailure).getMessage();
                } else if (sessionFailure instanceof SessionFailure.AuthenticationFailed) {
                    status = ErrorStatus.auth_failed_code;
                    message = ((SessionFailure.AuthenticationFailed) sessionFailure).getMessage();
                } else if (sessionFailure instanceof SessionFailure.InvalidStatus) {
                    status = ErrorStatus.invalid_code;
                }
                Map response = NearpayLib.ApiResponse(status, message, new ArrayList());
                sender.send(response);
            }

            @Override
            public void onSessionBusy(@NonNull String s) {
                Map<String, Object> toSend = NearpayLib.ApiResponse(ErrorStatus.user_session_busy, s,
                        new ArrayList<>());
                sender.send(toSend);
            }

            @Override
            public void getSessionInfo(@NonNull SessionInfo sessionInfo) {
                Map<String, Object> toSend = NearpayLib.ApiResponse(ErrorStatus.user_session_info, null, sessionInfo);
                sender.send(toSend);
            }
        });
    }
}
