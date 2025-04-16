import { ButtonAdnt } from '../../../Components/button'
import { useForm } from 'react-hook-form'
import { schema, schemaType } from '../../../utils/Rule'
import { yupResolver } from '@hookform/resolvers/yup'
import { Input } from '../../../Components/input'
import InputEye from '../../../Components/inputEye'
import { useLogin } from '../../../hooks/auth/useLogin'

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<schemaType>({ resolver: yupResolver(schema) })

  const loginMutation = useLogin()

  const onSubmit = async (data: schemaType) => {
    loginMutation.mutate(data)
  }

  return (
    <form className='space-y-4' onSubmit={handleSubmit(onSubmit)} noValidate>
      <Input type='email' label='email' register={register} errors={errors} required={true} placeholder=' ' />
      <InputEye label='Password' register={register} errors={errors} required={true} placeholder=' ' />
      <ButtonAdnt label='Tiếp tục' style='py-3' />
    </form>
  )
}

export default Login
