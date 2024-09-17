import { ConnectionInfo, NearPay, ProfileType } from '@nearpaydev/nearpay-ts-sdk';
export declare class RemoteNearpay extends NearPay {
    getProfile(): Promise<ProfileType | undefined>;
    saveProfile(profile: ProfileType): Promise<void>;
    getLastConnection(): Promise<ConnectionInfo | undefined>;
    saveConnection(connection: ConnectionInfo): Promise<void>;
}
//# sourceMappingURL=remote_nearpay.d.ts.map