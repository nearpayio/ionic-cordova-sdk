package com.nearpay.sdk.common.operations;

import java.util.Map;

import com.nearpay.sdk.common.NearpayLib;
import com.nearpay.sdk.common.PluginProvider;
import com.nearpay.sdk.common.filter.ArgsFilter;
import com.nearpay.sdk.common.sender.NearpaySender;
import com.nearpay.sdk.common.status.ErrorStatus;

public class CloseOperation extends BaseOperation {
    public CloseOperation(PluginProvider provider) {
        super(provider);
    }

    @Override
    public void run(ArgsFilter filter, NearpaySender sender) {
        if (provider.getNearpayLib().nearpay != null) {
            provider.getNearpayLib().nearpay.close();
            provider.getNearpayLib().nearpay = null;
        }

        Map<String, Object> response = NearpayLib.ApiResponse(ErrorStatus.success_code, "NearPay closed");
        sender.send(response);
    }
}
