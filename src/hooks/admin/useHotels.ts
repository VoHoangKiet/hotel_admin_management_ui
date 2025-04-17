import { useQuery } from '@tanstack/react-query'
import api from '../../api/api'
import { Room } from '../room/useSearchRoom'

export interface User {
  _id: string
  fullName: string
  email: string
  role: string
  state: string
  createdAt: string
  updatedAt: string
  dob?: string
  gender?: string
  avatarUrl?: string
  id: string
}

export interface Hotel {
  _id: string
  name: string
  address: string
  city: string
  country: string
  rating: number
  description: string
  longDescription: string
  type: string
  rooms: Room[]
  amenities: string[]
  phoneNumber: string
  email: string
  website: string
  images: string[]
  createdAt: string
  updatedAt: string
  user: User
}

export const useHotels = () => {
  const { data: hotels, isLoading } = useQuery({
    queryKey: ['hotels'],
    queryFn: async () => {
      const response = await api.get('/admin/hotels')
      return response.data.data as Hotel[]
    }
  })

  return {
    hotels,
    isLoading
  }
} 