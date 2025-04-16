import { Card, Table, Tag, Avatar, Button, Space, Modal } from 'antd'
import { useOwnerRequests } from '../../hooks/admin/useOwnerRequests'
import { format } from 'date-fns'
import { vi } from 'date-fns/locale'
import { FilePdfOutlined, CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons'
import { useState } from 'react'

const OwnerRequestsManagement = () => {
  const { requests, isLoading, isAccepting, acceptRequest } = useOwnerRequests()
  const [selectedRequest, setSelectedRequest] = useState<any>(null)
  const [isModalVisible, setIsModalVisible] = useState(false)

  const handleViewDetails = (request: any) => {
    setSelectedRequest(request)
    setIsModalVisible(true)
  }

  const handleAcceptRequest = (requestId: string) => {
    Modal.confirm({
      title: 'Xác nhận chấp nhận yêu cầu',
      content: 'Bạn có chắc chắn muốn chấp nhận yêu cầu này?',
      okText: 'Chấp nhận',
      cancelText: 'Hủy',
      onOk: () => {
        acceptRequest(requestId)
      }
    })
  }

  const columns = [
    {
      title: 'Người dùng',
      dataIndex: 'user',
      key: 'user',
      render: (user: any) => (
        <div className="flex items-center gap-2">
          <Avatar src={user.avatarUrl} size="small" />
          <div>
            <div className="font-medium">{user.fullName}</div>
            <div className="text-gray-500 text-sm">{user.email}</div>
          </div>
        </div>
      ),
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const color = status === 'pending' ? 'orange' : status === 'approved' ? 'green' : 'red'
        const text = status === 'pending' ? 'Đang chờ' : status === 'approved' ? 'Đã chấp nhận' : 'Đã từ chối'
        return <Tag color={color}>{text}</Tag>
      },
    },
    {
      title: 'Tài liệu',
      key: 'document',
      render: (_: any, record: any) => (
        <Button
          type="text"
          icon={<FilePdfOutlined />}
          onClick={() => handleViewDetails(record)}
        >
          Xem tài liệu
        </Button>
      ),
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date: string) => format(new Date(date), 'dd/MM/yyyy HH:mm', { locale: vi }),
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (_: any, record: any) => (
        <Space>
          {record.status === 'pending' && (
            <>
              <Button
                type="text"
                icon={<CheckCircleOutlined />}
                onClick={() => handleAcceptRequest(record._id)}
                loading={isAccepting}
              >
                Chấp nhận
              </Button>
              <Button
                type="text"
                danger
                icon={<CloseCircleOutlined />}
              >
                Từ chối
              </Button>
            </>
          )}
        </Space>
      ),
    },
  ]

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Yêu cầu trở thành chủ khách sạn</h1>
      </div>

      <Card 
        className="hover:shadow-lg transition-shadow"
        styles={{
          body: {
            padding: 0
          }
        }}
      >
        <Table
          columns={columns}
          dataSource={requests}
          loading={isLoading}
          rowKey="_id"
          pagination={{
            pageSize: 5,
            showSizeChanger: true,
            showTotal: (total) => `Tổng số ${total} yêu cầu`,
            className: 'px-6 py-4'
          }}
          className="[&_.ant-table-thead>tr>th]:bg-gray-50 [&_.ant-table-thead>tr>th]:text-gray-600 [&_.ant-table-thead>tr>th]:font-semibold [&_.ant-table-tbody>tr:hover]:bg-gray-50"
        />
      </Card>

      <Modal
        title="Chi tiết yêu cầu"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        width={800}
      >
        {selectedRequest && (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Avatar src={selectedRequest.user.avatarUrl} size="large" />
              <div>
                <div className="font-medium text-lg">{selectedRequest.user.fullName}</div>
                <div className="text-gray-500">{selectedRequest.user.email}</div>
              </div>
            </div>
            
            <div className="mt-4">
              <h3 className="font-medium mb-2">Tài liệu đăng ký</h3>
              <iframe
                src={selectedRequest.hotelInfoFileUrl}
                className="w-full h-[500px] border rounded-lg"
                title="Hotel Info Document"
              />
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}

export default OwnerRequestsManagement 