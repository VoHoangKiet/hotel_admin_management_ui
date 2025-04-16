import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import api from '../../api/api'
import { notification } from 'antd'

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

export const useUsers = () => {
  const queryClient = useQueryClient()

  const { data: users, isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const response = await api.get('/admin/users')
      return response.data.data as User[]
    }
  })

  const blockUsersMutation = useMutation({
    mutationFn: async (userIds: string[]) => {
      const response = await api.post('/admin/users/block', { uids: userIds })
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
    },
    onError: (error: any) => {
      const errorMessage = error.response?.data?.errors[0].errorMessage || 'Có lỗi xảy ra. Vui lòng thử lại sau.'
      notification.error({
        message: 'Khóa tài khoản thất bại',
        description: errorMessage
      })
    }
  })

  const unblockUsersMutation = useMutation({
    mutationFn: async (userIds: string[]) => {
      const response = await api.post('/admin/users/un-block', { uids: userIds })
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
    },
    onError: (error: any) => {
      const errorMessage = error.response?.data?.errors[0].errorMessage || 'Có lỗi xảy ra. Vui lòng thử lại sau.'
      notification.error({
        message: 'Mở khóa tài khoản thất bại',
        description: errorMessage
      })
    }
  })

  return {
    users,
    isLoading,
    isBlocking: blockUsersMutation.isPending,
    isUnblocking: unblockUsersMutation.isPending,
    blockUsers: blockUsersMutation.mutate,
    unblockUsers: unblockUsersMutation.mutate
  }
}
