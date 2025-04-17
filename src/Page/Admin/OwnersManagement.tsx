import { Card, Table, Avatar, Button, Space, Modal, Image, Rate, Empty } from 'antd'
import { useOwners } from '../../hooks/admin/useOwners'
import { format } from 'date-fns'
import { vi } from 'date-fns/locale'
import { useState } from 'react'
import { HomeOutlined, StarOutlined } from '@ant-design/icons'

const OwnersManagement = () => {
  const { owners, isLoading } = useOwners()
  const [selectedOwner, setSelectedOwner] = useState<any>(null)
  const [isModalVisible, setIsModalVisible] = useState(false)

  if(owners?.length === 0) {
    return <div className='flex justify-center items-center h-screen'>
      <Empty description='Không có dữ liệu' />
    </div>
  }
  const handleViewDetails = (owner: any) => {
    setSelectedOwner(owner)
    setIsModalVisible(true)
  }

  const columns = [
    {
      title: 'Thông tin',
      dataIndex: 'fullName',
      key: 'info',
      render: (_: any, record: any) => (
        <div className="flex items-center gap-3">
          <Avatar src={record.avatarUrl} size="large" />
          <div>
            <div className="font-medium">{record.fullName}</div>
            <div className="text-gray-500 text-sm">{record.email}</div>
            <div className="text-gray-500 text-sm">{record.phone}</div>
          </div>
        </div>
      ),
    },
    {
      title: 'Số khách sạn',
      dataIndex: 'hotels',
      key: 'hotels',
      render: (hotels: any[]) => (
        <div className="flex items-center gap-2">
          <HomeOutlined className="text-blue-500" />
          <span>{hotels?.length}</span>
        </div>
      ),
    },
    {
      title: 'Đánh giá trung bình',
      dataIndex: 'hotels',
      key: 'rating',
      render: (hotels: any[]) => {
        const totalRating = hotels?.reduce((sum: number, hotel: any) => sum + hotel.rating, 0)
        const avgRating = hotels?.length > 0 ? totalRating / hotels?.length : 0
        return (
          <div className="flex items-center gap-2">
            <StarOutlined className="text-yellow-500" />
            <span>{avgRating ? avgRating.toFixed(1) : 0.0}</span>
          </div>
        )
      },
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
          <Button type="text" onClick={() => handleViewDetails(record)}>
            Xem chi tiết
          </Button>
        </Space>
      ),
    },
  ]

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Quản lý chủ khách sạn</h1>
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
          dataSource={owners}
          loading={isLoading}
          rowKey="_id"
          pagination={{
            pageSize: 5,
            showSizeChanger: true,
            showTotal: (total) => `Tổng số ${total} chủ khách sạn`,
            className: 'px-6 py-4'
          }}
          className="[&_.ant-table-thead>tr>th]:bg-gray-50 [&_.ant-table-thead>tr>th]:text-gray-600 [&_.ant-table-thead>tr>th]:font-semibold [&_.ant-table-tbody>tr:hover]:bg-gray-50"
        />
      </Card>

      <Modal
        title="Chi tiết chủ khách sạn"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        width={800}
      >
        {selectedOwner && (
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <Avatar src={selectedOwner.avatarUrl} size={64} />
              <div>
                <div className="font-medium text-xl">{selectedOwner.fullName}</div>
                <div className="text-gray-500">{selectedOwner.email}</div>
                <div className="text-gray-500">{selectedOwner.phone}</div>
              </div>
            </div>

            <div>
              <h3 className="font-medium text-lg mb-4">Danh sách khách sạn</h3>
              <div className="space-y-4">
                {selectedOwner.hotels.map((hotel: any) => (
                  <Card key={hotel._id} className="hover:shadow-md transition-shadow">
                    <div className="flex gap-4">
                      <Image
                        src={hotel.images[0]}
                        alt={hotel.name}
                        width={120}
                        height={90}
                        className="rounded-lg object-cover"
                        fallback="https://via.placeholder.com/120x90"
                      />
                      <div className="flex-1">
                        <div className="font-medium">{hotel.name}</div>
                        <div className="text-gray-500 text-sm mb-2">{hotel.address}</div>
                        <div className="flex items-center gap-2">
                          <Rate disabled defaultValue={hotel.rating} allowHalf />
                          <span className="text-gray-500">({hotel.totalReviews} đánh giá)</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}

export default OwnersManagement 