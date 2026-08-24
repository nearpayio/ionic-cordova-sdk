package com.nearpay.sdk.common.operations;

import androidx.annotation.NonNull;

import java.util.Map;

import com.nearpay.sdk.common.NearpayLib;
import com.nearpay.sdk.common.PluginProvider;
import com.nearpay.sdk.common.filter.ArgsFilter;
import com.nearpay.sdk.common.sender.NearpaySender;
import com.nearpay.sdk.common.status.ErrorStatus;
import io.nearpay.sdk.utils.enums.CompatibilityFailure;
import io.nearpay.sdk.utils.listeners.CompatibilityListener;

public class DeviceCompatibilityOperation extends BaseOperation {
    public DeviceCompatibilityOperation(PluginProvider provider) {
        super(provider);
    }

    @Override
    public void run(ArgsFilter filter, NearpaySender sender) {
        if (provider.getNearpayLib().nearpay == null) {
            sender.send(NearpayLib.ApiResponse(ErrorStatus.invalid_argument_code, "NearPay is not initialized"));
            return;
        }

        provider.getNearpayLib().nearpay.deviceCompatibility(new CompatibilityListener() {
            @Override
            public void onDeviceCompatible() {
                sender.send(NearpayLib.ApiResponse(ErrorStatus.success_code, "Device compatible", true));
            }

            @Override
            public void onDeviceIncompatible(@NonNull CompatibilityFailure compatibilityFailure) {
                if (compatibilityFailure instanceof CompatibilityFailure.Incompatible) {
                    String message = ((CompatibilityFailure.Incompatible) compatibilityFailure).getList().toString();
                    sender.send(NearpayLib.ApiResponse(ErrorStatus.device_incompatible_code, message, false));
                } else {
                    sender.send(NearpayLib.ApiResponse(ErrorStatus.general_failure_code, ErrorStatus.general_messsage,
                            false));
                }
            }
        });
    }
}
