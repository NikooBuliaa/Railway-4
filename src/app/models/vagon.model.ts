export interface Vagon {
    id: number;
    type: string;
    seats: Seat[];
  }
  
  export interface Seat {
    seatNumber: number;
    isAvailable: boolean;
  }
  