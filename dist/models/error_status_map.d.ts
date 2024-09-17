import { ApiResponse } from './api_response';
import { PurchaseError, QueryError, ReconcileError, RefundError, ReverseError, SessionError } from './errors';
export declare function PurchaseErrorMap(response: ApiResponse): PurchaseError;
export declare function RefundErrorMap(response: ApiResponse): RefundError;
export declare function ReverseErrorMap(response: ApiResponse): ReverseError;
export declare function ReconcileErrorMap(response: ApiResponse): ReconcileError;
export declare function SessionErrorMap(response: ApiResponse): SessionError;
export declare function QueryErrorMap(response: ApiResponse): QueryError;
//# sourceMappingURL=error_status_map.d.ts.map