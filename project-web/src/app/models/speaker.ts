import { iSocialNetwork } from './social-network';
import { iEvent } from './event';

export interface iSpeaker {
  id: number;
  name: string;
  summaryCurriculum: string;
  imageUrl: string;
  email: string;
  socialNetworks: iSocialNetwork[];
  speakerEvents: iEvent[];
}
