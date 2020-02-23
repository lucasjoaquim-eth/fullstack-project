export interface iLot {
  id: number;
  name: string;
  price: number;
  amount: number;
  dateBegin?: Date;
  dateEnd?: Date;
  eventId: number;
  event: Event;
}
