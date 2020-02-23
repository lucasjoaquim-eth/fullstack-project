import { iSpeaker } from './speaker';

export interface iSocialNetwork {
  Id: number;
  Name:string;
  url: string;
  EventId: number;
  Event: Event;
  SpeakerId: number;
  Speaker: iSpeaker;
}
