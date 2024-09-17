import { ProfileType } from '@nearpaydev/nearpay-ts-sdk';
export declare const PROFILE_DB_KEY = "PROFILE_KEY";
export declare class ConnectionProfile {
    static save(profile: ProfileType): Promise<void>;
    static get(): Promise<ProfileType | undefined>;
    static getIdOrGenerate(): Promise<string>;
    static forgetDevice(): Promise<void>;
}
//# sourceMappingURL=profile.d.ts.map