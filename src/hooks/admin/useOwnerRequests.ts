import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import api from '../../api/api'
import { message } from 'antd'

interface User {
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

interface OwnerRequest {
  _id: string
  user: User
  hotelInfoFileUrl: string
  status: 'pending' | 'approved' | 'rejected'
  createdAt: string
  updatedAt: string
}

export const useOwnerRequests = () => {
  const queryClient = useQueryClient()

  const { data: requests, isLoading } = useQuery({
    queryKey: ['ownerRequests'],
    queryFn: async () => {
      const response = await api.get('/admin/owner-requests')
      return response.data.data as OwnerRequest[]
    }
  })

  const acceptRequestMutation = useMutation({
    mutationFn: async (requestId: string) => {
      const response = await api.put(`/admin/owner-requests/accept/${requestId}`)
      return response.data
    },
    onSuccess: () => {
      message.success('Đã chấp nhận yêu cầu thành công')
      queryClient.invalidateQueries({ queryKey: ['ownerRequests'] })
    },
    onError: () => {
      queryClient.invalidateQueries({ queryKey: ['ownerRequests'] })
      message.error('Có lỗi xảy ra. Vui lòng thử lại sau.')
    }
  })

  return {
    requests,
    isLoading,
    acceptRequest: acceptRequestMutation.mutate,
    isAccepting: acceptRequestMutation.isPending
  }
}
