import { useQuery } from '@tanstack/react-query'
import api from '../../api/api'

interface MonthlyBooking {
  month: string
  count: number
}

interface TopRatedHotel {
  averageRating: number
  totalReviews: number
  _id: string
  name: string
  address: string
}

interface AdminStats {
  totalUsers: number
  totalHotels: number
  totalBookings: number
  totalReviews: number
  totalRooms: number
  activeUsers: number
  activeHotels: number
  monthlyBookings: MonthlyBooking[]
  topRatedHotels: TopRatedHotel[]
}

export const useAdminStats = () => {
  return useQuery({
    queryKey: ['adminStats'],
    queryFn: async () => {
      const response = await api.get('/admin/stats', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      return response.data.data as AdminStats
    }
  })
} 