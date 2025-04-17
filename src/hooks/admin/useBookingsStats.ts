import { useQuery } from '@tanstack/react-query'
import api from '../../api/api'
import { Room } from '../room/useSearchRoom';
import { User } from './useHotels';

export interface Booking {
    user: User;
    room: Room[];
    checkInDate: Date;
    checkOutDate: Date;
    totalGuests: number;
    totalPrice: number;
    transactionID: string;
    status: 'pending' | 'confirmed' | 'cancelled';
    paymentMethod: 'credit_card' | 'cash';
    createdAt: Date;
    updatedAt: Date;
    isReview: boolean
  }

export const useBookingsStats = () => {
  return useQuery({
    queryKey: ['admin-bookings'],
    queryFn: async () => {
      const res = await api.get('/admin/bookings', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      return res.data.data as Booking[]
    },
  })
}
