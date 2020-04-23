import { iLot } from "./lot";
import { iSocialNetwork } from "./social-network";
import { iSpeaker } from "./speaker";

export class iEvent {
  constructor() {}
  id: number;
  date: string;
  place: string;
  theme: string;
  amountPeople: number;
  imagemUrl: string;
  phone: string;
  email: string;
  lots: iLot[];
  socialNetworks: iSocialNetwork[];
  speakerEvents: iSpeaker[];
}
