import { Layout, Menu } from 'antd'
import { useNavigate, useLocation } from 'react-router-dom'
import {
  DashboardOutlined,
  UserOutlined,
  HomeOutlined,
  DollarOutlined,
  InboxOutlined,
  TeamOutlined
} from '@ant-design/icons'

const { Sider } = Layout

const AdminSider = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const menuItems = [
    {
      key: '/dashboard',
      icon: <DashboardOutlined />,
      label: 'Dashboard'
    },
    {
      key: '/users',
      icon: <UserOutlined />,
      label: 'Quản lý người dùng'
    },
    {
      key: '/hotels',
      icon: <HomeOutlined />,
      label: 'Quản lý khách sạn'
    },
    {
      key: '/rooms',
      icon: <HomeOutlined />,
      label: 'Quản lý phòng'
    },
    {
      key: '/revenue',
      icon: <DollarOutlined />,
      label: 'Quản lý doanh thu'
    },
    {
      key: '/owner-requests',
      icon: <InboxOutlined />,
      label: 'Yêu cầu trở thành chủ khách sạn'
    },
    {
      key: '/owners',
      icon: <TeamOutlined />,
      label: 'Quản lý chủ khách sạn'
    }
  ]

  return (
    <Sider
      width={250}
      className="min-h-screen !bg-white shadow-md"
      breakpoint="lg"
      collapsedWidth="0"
    >
      <div className="h-16 flex items-center justify-center border-b">
        <h1 className="text-xl font-bold text-primary">Admin Panel</h1>
      </div>
      <Menu
        mode="inline"
        selectedKeys={[location.pathname]}
        items={menuItems}
        onClick={({ key }) => navigate(key)}
        className="border-r-0"
      />
    </Sider>
  )
}

export default AdminSider 