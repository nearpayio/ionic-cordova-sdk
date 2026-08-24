package com.nearpay.sdk.common.operations;

import androidx.annotation.NonNull;

import java.util.Map;

import com.nearpay.sdk.common.NearpayLib;
import com.nearpay.sdk.common.PluginProvider;
import com.nearpay.sdk.common.filter.ArgsFilter;
import com.nearpay.sdk.common.sender.NearpaySender;
import com.nearpay.sdk.common.status.ErrorStatus;
import io.nearpay.sdk.utils.enums.DismissFailure;
import io.nearpay.sdk.utils.listeners.DismissListener;

public class DismissOperation extends BaseOperation {
    public DismissOperation(PluginProvider provider) {
        super(provider);
    }

    @Override
    public void run(ArgsFilter filter, NearpaySender sender) {
        if (provider.getNearpayLib().nearpay == null) {
            sender.send(NearpayLib.ApiResponse(ErrorStatus.invalid_argument_code, "NearPay is not initialized"));
            return;
        }

        provider.getNearpayLib().nearpay.dismiss(new DismissListener() {
            @Override
            public void onDismiss(boolean dismissed) {
                Map toSend = NearpayLib.ApiResponse(ErrorStatus.success_code, null, dismissed);
                sender.send(toSend);
            }

            @Override
            public void onDismissFailure(@NonNull DismissFailure dismissFailure) {
                if (dismissFailure instanceof DismissFailure.GeneralFailure) {
                    int status = ErrorStatus.general_failure_code;
                    String message = ((DismissFailure.GeneralFailure) dismissFailure).getMessage();
                    Map response = NearpayLib.ApiResponse(status, message, null);
                    sender.send(response);
                } else {
                    sender.send(NearpayLib.ApiResponse(ErrorStatus.general_failure_code, ErrorStatus.general_messsage));
                }
            }
        });
    }
}
