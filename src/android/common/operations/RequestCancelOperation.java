package com.nearpay.sdk.common.operations;

import androidx.annotation.NonNull;

import java.util.Map;

import com.nearpay.sdk.common.NearpayLib;
import com.nearpay.sdk.common.PluginProvider;
import com.nearpay.sdk.common.filter.ArgsFilter;
import com.nearpay.sdk.common.sender.NearpaySender;
import com.nearpay.sdk.common.status.ErrorStatus;
import io.nearpay.sdk.utils.enums.CancelFailure;
import io.nearpay.sdk.utils.listeners.CancelListener;

public class RequestCancelOperation extends BaseOperation {

    public RequestCancelOperation(PluginProvider provider) {
        super(provider);
    }

    @Override
    public void run(ArgsFilter filter, NearpaySender sender) {
        if (provider.getNearpayLib().nearpay == null) {
            sender.send(NearpayLib.ApiResponse(ErrorStatus.invalid_argument_code, "NearPay is not initialized"));
            return;
        }

        Boolean cancelWithReverse = filter.getCancelWithReverse();
        String requestId = filter.getCancelRequestId();

        provider.getNearpayLib().nearpay.requestCancel(cancelWithReverse, requestId, new CancelListener() {
            @Override
            public void onCancel(boolean isCancelled) {
                Map<String, Object> responseDict = NearpayLib.ApiResponse(ErrorStatus.success_code, "Cancel Success",
                        isCancelled);
                sender.send(responseDict);
            }

            @Override
            public void onCancelWithReverse(boolean isCancelledWithReverse) {
                Map<String, Object> responseDict = NearpayLib.ApiResponse(ErrorStatus.success_code,
                        "Cancel With Reverse Success", isCancelledWithReverse);
                sender.send(responseDict);
            }

            @Override
            public void onCancelFailure(@NonNull CancelFailure cancelFailure) {
                Map<String, Object> paramMap = NearpayLib.ApiResponse(ErrorStatus.general_failure_code,
                        ErrorStatus.general_messsage);
                sender.send(paramMap);
            }
        });
    }
}
