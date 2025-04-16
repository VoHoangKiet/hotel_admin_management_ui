import { Layout } from 'antd'
import { Outlet } from 'react-router-dom'
import AdminSider from '../Components/sider/AdminSider'

const { Content } = Layout

const AdminLayout = () => {
  return (
    <Layout className="min-h-screen">
      <AdminSider />
      <Layout>
        <Content className="bg-gray-50">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  )
}

export default AdminLayout 