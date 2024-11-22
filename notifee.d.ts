declare module '@notifee/react-native' {
    export enum AndroidImportance {
      NONE = 'none',
      MIN = 'min',
      LOW = 'low',
      DEFAULT = 'default',
      HIGH = 'high',
      MAX = 'max',
    }
    export enum AuthorizationStatus {
      AUTHORIZED = 'authorized',
      DENIED = 'denied',
      UNDETERMINED = 'undetermined',
    }
    export interface Channel {
      id: string;
      name: string;
      importance?: AndroidImportance;
      // Add other channel properties as needed
    }
    export function createChannel(channel: Channel): Promise<void>;
    export function requestPermission(): Promise<{
      authorizationStatus: AuthorizationStatus;
    }>;
    export function displayNotification(notification: any): Promise<void>;
  }