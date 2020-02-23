import { iLot } from "./lot";
import { iSocialNetwork } from './social-network';
import { iSpeaker } from './speaker';

export interface iEvent {
  Id: number;
  date: string;
  place: string;
  theme: string;
  amountPeople: number;
  imagemURL: string;
  Phone: string;
  Email: string;
  Lots: iLot[];
  SocialNetworks: iSocialNetwork[];
  SpeakerEvents: iSpeaker[];
}
