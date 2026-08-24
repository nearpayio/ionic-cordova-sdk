package com.nearpay.sdk.common.filter;

import android.annotation.SuppressLint;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.OffsetDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.Locale;
import java.util.Map;
import java.util.UUID;

import com.nearpay.sdk.common.PluginProvider;
import io.nearpay.sdk.Environments;
import io.nearpay.sdk.utils.SecondDisplayConfiguration;
import io.nearpay.sdk.utils.enums.NetworkConfiguration;
import io.nearpay.sdk.utils.enums.PinPosition;
import io.nearpay.sdk.utils.enums.SupportSecondDisplay;
import io.nearpay.sdk.utils.enums.UIPosition;

public class ArgsFilter {
    private PluginProvider provider;
    private Map savedArgs;

    public ArgsFilter(Map args) {
        savedArgs = args;
    }

    public String getTransactionUuid() {
        return savedArgs.get("transaction_uuid").toString();
    }

    public String getReconciliationUuid() {
        return savedArgs.get("reconciliation_uuid").toString();
    }

    public String getAdminPin() {
        return savedArgs.get("adminPin") == null ? null : savedArgs.get("adminPin").toString();
    }

    public int getPage() {
        return castToInt(savedArgs.get("page"), 1);
    }

    public int getLimit() {
        return castToInt(savedArgs.get("limit"), 30);
    }

    public String getReceipt() {
        return savedArgs.get("receipt") == null ? "" : (String) savedArgs.get("receipt");
    }

    public int getReceiptWidth() {
        return castToInt(savedArgs.get("receipt_width"), 850);
    }

    public int getReceiptFontSize() {
        return castToInt(savedArgs.get("receipt_font_size"), 1);
    }

    public UUID getJobId() {
        if (savedArgs.get("job_id") == null) {
            return UUID.randomUUID();
        } else {
            // savedArgs.put("job_id", UUID.fromString(args.get("job_id").toString()));
            return UUID.fromString(savedArgs.get("job_id").toString());
        }
    }

    public Long getAmount() {
        return castToLong(savedArgs.get("amount"), 1L);
    }

    public Long getTimeout() {
        Object timeoutValue = savedArgs.get("finishTimeout");
        if (timeoutValue == null) {
            timeoutValue = savedArgs.get("finishTimeOut");
        }
        return castToLong(timeoutValue, 60L);
    }

    public String getCustomerReferenceNumber() {
        Object value = savedArgs.get("customer_reference_number");
        if (value == null) {
            return null;
        }
        String text = value.toString();
        return text.isEmpty() ? null : text;
    }

    public String getAuthType() {
        return savedArgs.get("authtype") == null ? "" : savedArgs.get("authtype").toString();
    }

    public String getAuthValue() {
        return savedArgs.get("authvalue") == null ? "" : savedArgs.get("authvalue").toString();
    }

    public String getAuthTid() {
        return savedArgs.get("tid") == null ? null : savedArgs.get("tid").toString();
    }

    public String getSessionId() {
        return savedArgs.get("sessionID") == null ? "" : savedArgs.get("sessionID").toString();
    }

    public String getOriginalTransactionUuid() {
        return savedArgs.get("original_transaction_uuid").toString();
    }

    public Boolean isReconciled() {
        return castToBoolean(savedArgs.get("isReconciled"));
    }

    public Boolean isApproved() {
        return castToBoolean(savedArgs.get("isApproved"));
    }

    public Locale getLocale() {
        String localeStr = savedArgs.get("locale") != null ? savedArgs.get("locale").toString() : "default";
        Locale locale = localeStr.equals("default") ? Locale.getDefault() : Locale.getDefault();

        return locale;
    }

    public UUID getRequestId() {
        return savedArgs.get("requestId") == null ? null : UUID.fromString((String) savedArgs.get("requestId"));
    }

    public String getCancelRequestId() {
        return savedArgs.get("requestId") == null ? "" : savedArgs.get("requestId").toString();
    }

    public Boolean getCancelWithReverse() {
        Boolean value = castToBoolean(savedArgs.get("cancelWithReverse"));
        return value != null ? value : false;
    }

    public Environments getEnviroment() {
        String environmentStr = savedArgs.get("environment") == null ? "sandbox"
                : savedArgs.get("environment").toString();
        Environments env = environmentStr.equals("sandbox") ? Environments.SANDBOX
                : environmentStr.equals("production") ? Environments.PRODUCTION : Environments.TESTING;

        return env;
    }

    public NetworkConfiguration getNetworkConfiguration() {

        String configStr = savedArgs.get("network_configuration") == null ? "DEFAULT"
                : savedArgs.get("network_configuration").toString();
        String normalized = configStr.toUpperCase(Locale.ROOT);

        if (normalized.equals("SIM_ONLY")) {
            return NetworkConfiguration.SIM_ONLY;
        }
        if (normalized.equals("SIM_PREFERRED")) {
            return NetworkConfiguration.SIM_PREFERRED;
        }
        return NetworkConfiguration.DEFAULT;
    }

    public UIPosition getUiPosition() {
        return getUiPositionFromKey("ui_position");
    }

    public SupportSecondDisplay getSupportSecondDisplay() {
        Object value = savedArgs.get("support_second_display");
        if (value == null) {
            return null;
        }

        String supportStr = value.toString();
        if (supportStr.equals("Enable")) {
            return SupportSecondDisplay.Enable;
        }
        if (supportStr.equals("Disable")) {
            return SupportSecondDisplay.Disable;
        }
        return null;
    }

    public SecondDisplayConfiguration getSecondDisplayConfiguration() {
        UIPosition secondDisplayUiPosition = getUiPositionFromKey("second_display_ui_position");
        PinPosition pinPosition = getPinPosition();
        return new SecondDisplayConfiguration(secondDisplayUiPosition, pinPosition);
    }

    private PinPosition getPinPosition() {
        Object value = savedArgs.get("second_display_pin_position");
        if (value == null) {
            return PinPosition.SECONDARY_SCREEN;
        }

        String pinStr = value.toString();
        if (pinStr.equals("PRIMARY_SCREEN")) {
            return PinPosition.PRIMARY_SCREEN;
        }
        if (pinStr.equals("SECONDARY_SCREEN")) {
            return PinPosition.SECONDARY_SCREEN;
        }
        return PinPosition.SECONDARY_SCREEN;
    }

    private UIPosition getUiPositionFromKey(String key) {
        Map<String, UIPosition> uiPosMap = new HashMap<>();

        uiPosMap.put("TOP_START", UIPosition.TOP_START);
        uiPosMap.put("TOP_END", UIPosition.TOP_END);
        uiPosMap.put("TOP_RIGHT", UIPosition.TOP_RIGHT);
        uiPosMap.put("TOP_LEFT", UIPosition.TOP_LEFT);

        uiPosMap.put("BOTTOM_START", UIPosition.BOTTOM_START);
        uiPosMap.put("BOTTOM_END", UIPosition.BOTTOM_END);
        uiPosMap.put("BOTTOM_RIGHT", UIPosition.BOTTOM_RIGHT);
        uiPosMap.put("BOTTOM_LEFT", UIPosition.BOTTOM_LEFT);

        uiPosMap.put("CENTER_START", UIPosition.CENTER_START);
        uiPosMap.put("CENTER_END", UIPosition.CENTER_END);
        uiPosMap.put("CENTER_RIGHT", UIPosition.CENTER_RIGHT);
        uiPosMap.put("CENTER_LEFT", UIPosition.CENTER_LEFT);
        uiPosMap.put("CENTER_TOP", UIPosition.CENTER_TOP);
        uiPosMap.put("CENTER_BOTTOM", UIPosition.CENTER_BOTTOM);
        uiPosMap.put("CENTER", UIPosition.CENTER);

        uiPosMap.put("DEFAULT", UIPosition.DEFAULT);

        String uiPosStr = savedArgs.get(key) == null ? "DEFAULT"
                : savedArgs.get(key).toString();

        UIPosition uiPos = uiPosMap.get(uiPosStr);

        if (uiPos != null)
            return uiPos;
        return UIPosition.DEFAULT;
    }

    public Boolean getLoadingUi() {
        return savedArgs.get("loading_ui") != null ? (Boolean) savedArgs.get("loading_ui") : true;
    }

    public String getArabicPaymentText() {
        return savedArgs.get("arabic_payment_text") != null ? (String) savedArgs.get("arabic_payment_text")
                : "يرجى تمرير الطاقة";
    }

    public String getEnglishPaymentText() {
        return savedArgs.get("english_payment_text") != null ? (String) savedArgs.get("english_payment_text")
                : "please tap your card";

    }

    @SuppressLint("NewApi")
    public LocalDateTime getStartDate() {
        return getIsoDate("start_date");
    }

    @SuppressLint("NewApi")
    public LocalDateTime getEndDate() {
        return getIsoDate("end_date");
    }

    public Boolean isEnableUiDismiss() {
        return savedArgs.get("enableUiDismiss") == null ? true : (Boolean) savedArgs.get("enableUiDismiss");
    }

    public Boolean isEnableReceiptUi() {
        return savedArgs.get("enableReceiptUi") == null ? true : (Boolean) savedArgs.get("enableReceiptUi");
    }

    public Boolean isEnableReversal() {
        return savedArgs.get("enableReversal") == null ? true : (Boolean) savedArgs.get("enableReversal");
    }

    public Boolean isEnableEditableRefundAmountUi() {
        return savedArgs.get("enableEditableRefundAmountUi") == null ? true
                : (Boolean) savedArgs.get("enableEditableRefundAmountUi");
    }

    @SuppressLint("NewApi")
    private LocalDateTime getIsoDate(String fieldName) {
        Object value = savedArgs.get(fieldName);
        if (value == null) {
            return null;
        }
        Long millis = toLongOrNull(value);
        if (millis != null) {
            return Instant.ofEpochMilli(millis)
                    .atZone(ZoneId.systemDefault())
                    .toLocalDateTime();
        }
        String text = value.toString();
        if (text.isEmpty() || "null".equals(text)) {
            return null;
        }
        try {
            return Instant.parse(text).atZone(ZoneId.systemDefault()).toLocalDateTime();
        } catch (Exception ignored) {
        }
        try {
            return OffsetDateTime.parse(text).toInstant()
                    .atZone(ZoneId.systemDefault())
                    .toLocalDateTime();
        } catch (Exception ignored) {
        }
        try {
            return LocalDateTime.parse(text, DateTimeFormatter.ISO_DATE_TIME);
        } catch (Exception ignored) {
            return null;
        }
    }

    private Long toLongOrNull(Object value) {
        if (value instanceof Number) {
            return ((Number) value).longValue();
        }
        String text = value.toString().trim();
        if (text.isEmpty()) {
            return null;
        }
        try {
            if (text.contains(".") || text.contains("E") || text.contains("e")) {
                return Double.valueOf(text).longValue();
            }
            return Long.parseLong(text);
        } catch (Exception ignored) {
            return null;
        }
    }

    private Boolean castToBoolean(Object value) {
        if (value == null) {
            return null;
        }
        if (value instanceof Boolean) {
            return (Boolean) value;
        }
        String text = value.toString();
        if ("true".equalsIgnoreCase(text)) {
            return true;
        }
        if ("false".equalsIgnoreCase(text)) {
            return false;
        }
        return null;
    }

    private Long castToLong(Object beforeCast, long fallback) {
        Long value = toLongOrNull(beforeCast);
        return value != null ? value : fallback;
    }

    private int castToInt(Object beforeCast, int fallback) {
        Long value = toLongOrNull(beforeCast);
        return value != null ? value.intValue() : fallback;
    }
}
