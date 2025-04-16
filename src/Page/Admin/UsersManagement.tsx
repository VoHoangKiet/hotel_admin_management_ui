import { Card, Table, Tag, Avatar, Button, Space, Tooltip, Modal } from 'antd'
import { useUsers } from '../../hooks/admin/useUsers'
import { UserOutlined, CloseCircleOutlined, CheckCircleOutlined } from '@ant-design/icons'
import { format } from 'date-fns'
import { vi } from 'date-fns/locale'

const UsersManagement = () => {
  const { users, isLoading, blockUsers, unblockUsers } = useUsers()

  const handleBlockUser = (user: any) => {
    Modal.confirm({
      title: 'Xác nhận khóa tài khoản',
      content: `Bạn có chắc chắn muốn khóa tài khoản của ${user.fullName}?`,
      okText: 'Khóa',
      cancelText: 'Hủy',
      onOk: () => {
        blockUsers([user._id])
      }
    })
  }

  const handleUnblockUser = (user: any) => {
    Modal.confirm({
      title: 'Xác nhận mở khóa tài khoản',
      content: `Bạn có chắc chắn muốn mở khóa tài khoản của ${user.fullName}?`,
      okText: 'Mở khóa',
      cancelText: 'Hủy',
      onOk: () => {
        unblockUsers([user._id])
      }
    })
  }

  const columns = [
    {
      title: 'Thông tin',
      dataIndex: 'fullName',
      key: 'info',
      render: (_: any, record: any) => (
        <div className='flex items-center gap-3'>
          <Avatar src={record.avatarUrl} icon={<UserOutlined />} size='large' />
          <div>
            <div className='font-medium'>{record.fullName}</div>
            <div className='text-gray-500 text-sm'>{record.email}</div>
          </div>
        </div>
      )
    },
    {
      title: 'Vai trò',
      dataIndex: 'role',
      key: 'role',
      render: (role: string) => {
        const color = role === 'admin' ? 'red' : role === 'owner' ? 'blue' : role === 'blocker' ? 'gray' : 'green'
        const text =
          role === 'admin'
            ? 'Quản trị viên'
            : role === 'owner'
              ? 'Chủ khách sạn'
              : role === 'blocker'
                ? 'Đã khóa'
                : 'Người dùng'
        return <Tag color={color}>{text}</Tag>
      }
    },
    {
      title: 'Trạng thái',
      dataIndex: 'role',
      key: 'role',
      render: (role: string, record: any) => (
        <Space>
          <Tag color={role !== 'blocker' ? 'green' : 'red'}>{role !== 'blocker' ? 'Đang hoạt động' : 'Đã khóa'}</Tag>
          {record.role !== 'admin' && (
            <Tooltip title={role === 'blocker' ? 'Mở khóa tài khoản' : 'Khóa tài khoản'}>
              <Button
                type='text'
                icon={role === 'blocker' ? <CheckCircleOutlined /> : <CloseCircleOutlined />}
                onClick={() => (role === 'blocker' ? handleUnblockUser(record) : handleBlockUser(record))}
              />
            </Tooltip>
          )}
        </Space>
      )
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date: string) => format(new Date(date), 'dd/MM/yyyy HH:mm', { locale: vi })
    },
    {
      title: 'Cập nhật',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      render: (date: string) => format(new Date(date), 'dd/MM/yyyy HH:mm', { locale: vi })
    }
  ]

  return (
    <div className='p-4'>
      <div className='flex items-center justify-between mb-4'>
        <h1 className='text-2xl font-bold text-gray-800'>Quản lý người dùng</h1>
      </div>

      <Card className='hover:shadow-lg transition-shadow'>
        <Table
          columns={columns}
          dataSource={users}
          loading={isLoading}
          rowKey='_id'
          pagination={{
            pageSize: 5,
            showSizeChanger: true,
            showTotal: (total) => `Tổng số ${total} người dùng`
          }}
        />
      </Card>
    </div>
  )
}

export default UsersManagement
