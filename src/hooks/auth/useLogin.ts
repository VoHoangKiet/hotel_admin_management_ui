import { useMutation } from '@tanstack/react-query'
import { schemaType } from '../../utils/Rule'
import api from '../../api/api'
import { useNavigate } from 'react-router-dom'
import { baseURL } from '../../api/constant'
import { notification } from 'antd'

export const useLogin = () => {
  const navigate = useNavigate()

  const loginMutation = useMutation({
    mutationFn: async (data: schemaType) => {
      const response = await api.post(`${baseURL}/admin/login`, data)
      return response.data
    },
    onSuccess: (data) => {
      notification.success({
        message: 'Đăng nhập thành công',
        description: 'Bạn đã đăng nhập thành công'
      })
      localStorage.setItem('token', data.data.accessToken)
      localStorage.setItem('user', JSON.stringify(data.data.user))
      navigate('/')
    },
    onError: (error: any) => {
      const errorMessage = error.response?.data?.errors[0].errorMessage || 'Có lỗi xảy ra. Vui lòng thử lại sau.'
      notification.error({
        message: 'Đăng nhập thất bại',
        description: errorMessage
      })
    }
  })

  return loginMutation
}
