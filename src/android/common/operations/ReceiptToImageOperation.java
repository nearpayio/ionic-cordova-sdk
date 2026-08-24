package com.nearpay.sdk.common.operations;

import android.graphics.Bitmap;

import com.google.gson.Gson;

import java.io.ByteArrayOutputStream;
import java.util.ArrayList;
import java.util.List;

import com.nearpay.sdk.common.NearpayLib;
import com.nearpay.sdk.common.PluginProvider;
import com.nearpay.sdk.common.sender.NearpaySender;
import com.nearpay.sdk.common.filter.ArgsFilter;
import com.nearpay.sdk.common.status.ErrorStatus;
import io.nearpay.sdk.data.models.TransactionReceipt;
import io.nearpay.sdk.utils.ReceiptUtilsKt;

public class ReceiptToImageOperation extends BaseOperation {

    public ReceiptToImageOperation(PluginProvider provider) {
        super(provider);
    }

    @Override
    public void run(ArgsFilter filter, NearpaySender sender) {
        // get args
        String stringfiedReceipt = filter.getReceipt();
        int receiptWidth = filter.getReceiptWidth();
        int receiptFontSize = filter.getReceiptFontSize();

        if (stringfiedReceipt == null || stringfiedReceipt.isEmpty()) {
            sender.send(NearpayLib.ApiResponse(ErrorStatus.invalid_argument_code, "Receipt is required"));
            return;
        }

        TransactionReceipt receipt = new Gson().fromJson(stringfiedReceipt, TransactionReceipt.class);
        if (receipt == null) {
            sender.send(NearpayLib.ApiResponse(ErrorStatus.invalid_argument_code, "Invalid receipt"));
            return;
        }

        ReceiptUtilsKt.toImage(receipt, provider.getNearpayLib().context, receiptWidth, receiptFontSize, bitmap -> {
            ByteArrayOutputStream stream = new ByteArrayOutputStream();
            bitmap.compress(Bitmap.CompressFormat.PNG, 100, stream);
            byte[] byteArray = stream.toByteArray();
            bitmap.recycle();
            List<Integer> byteList = new ArrayList<>();
            for (byte b : byteArray) {
                byteList.add(b & 0xFF);
            }
            sender.send(NearpayLib.ApiResponse(ErrorStatus.success_code, "", byteList));
        });

    }
}
