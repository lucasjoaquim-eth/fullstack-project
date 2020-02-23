import { iSpeaker } from "./speaker";

export interface iSocialNetwork {
  id: number;
  name: string;
  url: string;
  eventId?: number;
  speakerId?: number;
}
