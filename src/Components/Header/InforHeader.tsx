import { Popover } from 'antd'
import { Link } from 'react-router-dom'

import { MenuOutlined, UserOutlined } from '@ant-design/icons'
import Logout from '../Logout'

const InforHeader = () => {
  const user = JSON.parse(localStorage.getItem('user') as string)

  // popover
  const content = (
    <div className='w-[200px] bg-white'>
      {!user ? (
        <>
          <h3 className='text-lg font-semibold mb-2'>Chào mừng bạn!</h3>
          <Link to='/login' className='block text-black hover:bg-primary hover:text-white mb-2 p-2 rounded'>
            Đăng nhập
          </Link>
          <Link to='/register' className='block text-black hover:bg-primary hover:text-white p-2 rounded'>
            Đăng ký
          </Link>
        </>
      ) : (
        <div className='w-[200px]'>
          <h3 className='text-lg font-semibold mb-2 '>Xin chào, {user.fullName}!</h3>

          <Link to='/profile' className='block  text-black hover:bg-primary hover:text-white p-2 rounded'>
            Thông tin cá nhân
          </Link>
          {user.role === 'admin' && (
            <Link to='/dashboard' className='block text-black hover:bg-primary hover:text-white p-2 rounded'>
              Quản lý Admin
            </Link>
          )}
          <Logout />
        </div>
      )}
    </div>
  )
  return (
    <div className='flex items-center gap-4 cursor-pointer'>
      <Popover content={content} trigger='click' className='hover:shadow-xl '>
        <div className='flex items-center p-2 border border-gray-300 rounded-full hover:bg-gray-100 transition duration-300 ease-in-out '>
          {user ? (
            <>
              {user.avatarUrl && <img src={user.avatarUrl} className='w-[30px] h-[30px] rounded-full'></img>}
              <span className='text-black px-1'>{user.fullName}</span>
            </>
          ) : (
            <div className='flex items-center w-16 justify-center py-1'>
              <MenuOutlined className='text-black text-[16px] ' />
              <UserOutlined className='text-black ml-2 text-[16px]' />
            </div>
          )}
        </div>
      </Popover>
    </div>
  )
}

export default InforHeader
