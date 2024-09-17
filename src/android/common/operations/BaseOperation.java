package com.nearpay.sdk.common.operations;

import com.nearpay.sdk.common.PluginProvider;
import com.nearpay.sdk.common.sender.NearpaySender;
import com.nearpay.sdk.common.filter.ArgsFilter;

public class BaseOperation {
    protected PluginProvider provider;

    public BaseOperation(PluginProvider provider) {
        this.provider = provider;
    }

    public void run(ArgsFilter filter, NearpaySender sender) {

    }
}
