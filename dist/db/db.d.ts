import { ConnectionInfo, WsConnectionInfo } from '@nearpaydev/nearpay-ts-sdk';
export declare function ConnectionsAreEqual(user1: ConnectionInfo, user2: ConnectionInfo): boolean;
export declare function dbSaveUsers(users: ConnectionInfo[]): Promise<void>;
export declare function dbGetUsers(): Promise<ConnectionInfo[]>;
export declare function dbGetLastUser(): Promise<ConnectionInfo | undefined>;
export declare function dbAddUser(user: ConnectionInfo): Promise<void>;
export declare function dbDeleteUser(user: ConnectionInfo): Promise<void>;
export declare function dbGetWsUsers(): Promise<WsConnectionInfo[]>;
//# sourceMappingURL=db.d.ts.map