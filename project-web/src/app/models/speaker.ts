import { iSocialNetwork } from './social-network';
import { iEvent } from './event';

export interface iSpeaker {
  Id: number;
  Name: string;
  SummaryCurriculum: string;
  ImageUrl: string;
  Email: string;
  SocialNetworks: iSocialNetwork[];
  SpeakerEvents: iEvent[];
}
