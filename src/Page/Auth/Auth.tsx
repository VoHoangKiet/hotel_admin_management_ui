import { motion } from 'framer-motion'
import { Outlet } from 'react-router-dom'

const Auth = () => {
  return (
    <div className='flex h-fit items-center justify-center p-20'>
      <motion.div
        initial={{ x: '-300%' }}
        animate={{ x: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className='flex items-center'
      >
        <div className='w-full max-w-md p-8 rounded-lg shadow-xl'>
          <p className='text-2xl font-bold text-center mb-6'>Chào mừng bạn đến với Airbnb</p>
          <div className='space-y-6'>
            <Outlet />
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default Auth
