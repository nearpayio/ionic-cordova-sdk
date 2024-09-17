import {
    ConnectionInfo,
    NearPay,
    ProfileType,
  } from '@nearpaydev/nearpay-ts-sdk';
  import { ConnectionProfile } from './profile';
  import { dbAddUser, dbGetLastUser } from '../db/db';
  
  export class RemoteNearpay extends NearPay {
     override async getProfile(): Promise<ProfileType | undefined> {
      return ConnectionProfile.get();
    }
    override async saveProfile(profile: ProfileType): Promise<void> {
      ConnectionProfile.save(profile);
    }
    override async getLastConnection(): Promise<ConnectionInfo | undefined> {
      return dbGetLastUser();
    }
    override async saveConnection(connection: ConnectionInfo): Promise<void> {
      dbAddUser(connection);
    }
  }
  