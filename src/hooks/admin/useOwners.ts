import { useQuery } from '@tanstack/react-query'
import api from '../../api/api'

interface Hotel {
  _id: string
  name: string
  address: string
  images: string[]
  rating: number
  totalReviews: number
  createdAt: string
  updatedAt: string
}

interface Owner {
  _id: string
  fullName: string
  email: string
  phone: string
  avatarUrl?: string
  hotels: Hotel[]
  createdAt: string
  updatedAt: string
}

export const useOwners = () => {
  const { data: owners, isLoading } = useQuery({
    queryKey: ['owners'],
    queryFn: async () => {
      const response = await api.get('/admin/owners', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      return response.data.data as Owner[]
    }
  })

  return {
    owners,
    isLoading
  }
} 