export class BookingData {
    id: number = 0;
    customerName: string = '';
    bookingDate: string = '';
    totalAmount: number = 0;
  }
  export class BookingCombinedData {
  id!: number;
  customerName!: string; // New customerName field
  tripName!: string;
  cabModel!: string;
  bookingDate!: string;
  totalPrice!: number;
}
