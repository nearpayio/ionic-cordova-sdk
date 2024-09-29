# Nearpay Ionic Cordova Plugin

Nearpay SDK for Embeded and Remote usage

- Embeded Nearpay plugin for Android device payment using NFC. Plugin supported from
  Minimum SDK version 26. This plugin will work based on
  [Nearpay SDK](https://docs.nearpay.io/sdk/)

- Remote Nearpay for all types of devices (Android, iOS, Web), where the RemoteNearpay will
  connect to a proxy that will complete the payment

# Install plugin

```bash
cordova plugins add https://github.com/nearpayio/ionic-cordova-sdk

Plugin will support minimum supported ANDROID SDK version 26 and above only.
```

# EmbededNearpay (Android Only)

```typescript
import { AuthenticationType, Environments, Locale } from 'plugins/nearpay-ionic-cordova-sdk/www/definitions';
import { EmbededNearpay, TransactionData, ReconciliationReceipt, TransactionBannerList, ReconciliationBannerList } from 'plugins/nearpay-ionic-cordova-sdk/www/NearpayCordovaSDK';

const embededNearpay = new EmbededNearpay({
      authtype: AuthenticationType.email,
      authvalue: 'a.khalifa@nearpay.io',
      environment: Environments.sandbox,
      locale: Locale.default,
    });
```

`EmbededNearpay` obeject should be created once and served to the wholl application

### Authentications Types

- Login ( support both Email or Mobile user will chose )
- Email
- Mobile
- JWT

### Purchase

```typescript
embededNearpay.purchase({
  amount: 1000, // Required, maens 10.00
  transactionUUID: uuidv4(), //[Optional] speacify the transaction uuid
  customerReferenceNumber: '', // [Optional] referance number for customer use only
  enableReceiptUi: true, // [Optional] show the reciept in ui
  enableReversalUi: true, //[Optional] enable reversal of transaction from ui
  enableUiDismiss: true, //[Optional] the ui is dimissible
  finishTimeout: 60, //[Optional] finish timeout in seconds
  onPurchaseSuccess: receipts => console.log(receipts), //[Optional] callback on suceess
  onPurchaseFailed: err => console.log(err), //[Optional] callback on error
});
```

### Refund

```typescript
embededNearpay.refund({
  amount: 1000, // [Required], means 10.00
  originalTransactionUUID: 'f5079b9d-b61c-4180-8a4d-9780f7a9cd8f', // [Required] the orginal trnasaction uuid that you want to refund
  transactionUUID: uuidv4(), //[Optional] speacify the transaction uuid
  customerReferenceNumber: '', //[Optional]
  enableReceiptUi: true, // [Optional] show the reciept in ui
  enableReversalUi: true, //[Optional] enable reversal of transaction from ui
  editableReversalAmountUI: true, // [Optional] edit the reversal amount from uid
  enableUiDismiss: true, //[Optional] the ui is dimissible
  finishTimeout: 60, //[Optional] finish timeout in seconds
  adminPin: '0000', // [Optional] when you add the admin pin here , the UI for admin pin won't be shown.
  onRefundSuccess: receipts => console.log(receipts), //[Optional] callback on suceess
  onRefundFailed: err => console.log(err), //[Optional] callback on error
});
```

### Reverse

```typescript
embededNearpay.reverse({
  originalTransactionUUID: '2ddbbd15-a97e-4949-b5c2-fa073ab750eb', // [Required] the orginal trnasaction uuid that you want to reverse
  enableReceiptUi: true, // [Optional] show the reciept in ui
  enableUiDismiss: true, //[Optional] the ui is dimissible
  finishTimeout: 60, //[Optional] finish timeout in seconds
  onReverseSuccess: receipts => console.log(receipts), //[Optional] callback on suceess
  onReverseFailed: err => console.log(err), //[Optional] callback on error
});
```

### Reconcile

```typescript
embededNearpay.reconcile({
  enableReceiptUi: true, // [Optional] show the reciept in ui
  enableUiDismiss: true, //[Optional] the ui is dimissible
  finishTimeout: 60, //[Optional] finish timeout in seconds
  adminPin: '0000', // [optional] when you add the admin pin here , the UI for admin pin won't be shown.
  onReconcileSuccess: receipts => console.log(receipts), //[Optional] callback on suceess
  onReconcileFailed: err => console.log(err), //[Optional] callback on error
});
```

### Session

```typescript
embededNearpay.session({
  sessionID: 'ea5e30d4-54c7-4ad9-8372-f798259ff589', // Required
  enableReceiptUi: true, // [Optional] show the reciept in ui
  enableReversalUi: true, // [Optional] enable reversal of transaction from ui
  enableUiDismiss: true, // [Optional] the ui is dimissible
  finishTimeout: 60, // [Optional] finish timeout in seconds
  onSessionOpen: receipts => console.log(receipts), // [Optional] callback on session open
  onSessionClose: session => console.log(session), // [Optional] callback on session close
  onSessionFailed: err => console.log(err), // [Optional] callback on session error
});
```

### getTransaction

get a transaction by uuid

```typescript
embededNearpay.getTransaction({
  transactionUUID: 'a2fd6519-2b37-4336-be6d-5520bb3b6427', // Required, transaction uuid to fetch
  onResult: receipts => {},
  onFail: error => {},
});
```

### getTransactionsList

get transactions

```typescript
embededNearpay.getTransactionsList({
  page: 1, // [Optional] page number
  limit: 20, // [Optional] number of elements per page
  onResult: banner => {},
  onFail: error => {},
});
```

### getReconciliation

get a reconciliation by uuid

```typescript
embededNearpay.getReconciliation({
  reconciliationUUID: '6d4a48b8-d194-4aad-92c9-a77606758799', // Required, reconciliation uuid to fetch
  onResult: receipt => {},
  onFail: error => {},
});
```

### getReconciliationsList

get reconciliations

```typescript
embededNearpay.getReconciliationsList({
  page: 1, // [Optional] page number
  limit: 20, // [Optional] number of elements per page
  onResult: banner => {},
  onFail: error => {},
});
```

### Logout

```typescript
embededNearpay.logout();
```

### Nearpay plugin response will be be in below formats

[Model Response](https://docs.nearpay.io/sdk/sdk-models)
