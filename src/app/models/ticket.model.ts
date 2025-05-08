export interface Ticket {
    id: number;
    trainId: number;
    vagonId: number;
    seatNumber: number;
    passengerName: string;
    status: 'active' | 'cancelled' | 'used';
  }
  