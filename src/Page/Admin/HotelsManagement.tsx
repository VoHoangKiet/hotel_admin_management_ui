import { Card, Table, Tag, Avatar, Space, Image, Rate } from 'antd'
import { Hotel, useHotels } from '../../hooks/admin/useHotels'
import { format } from 'date-fns'
import { vi } from 'date-fns/locale'
import { useState } from 'react'
import HotelDetailModal from '../../Components/modal/hotelDetailModal'

const HotelsManagement = () => {
  const { hotels, isLoading } = useHotels()
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null)

  const columns = [
    {
      title: 'Thông tin',
      dataIndex: 'name',
      key: 'info',
      render: (_: any, record: any) => (
        <div className="flex items-center gap-3">
          <Image
            src={record.images[0]}
            alt={record.name}
            width={80}
            height={60}
            className="rounded-lg object-cover"
            fallback="https://via.placeholder.com/80x60"
          />
          <div>
            <div className="font-medium">{record.name}</div>
            <div className="text-gray-500 text-sm">{record.address}</div>
          </div>
        </div>
      ),
    },
    {
      title: 'Đánh giá',
      dataIndex: 'rating',
      key: 'rating',
      render: (rating: number) => (
        <Space>
          <Rate disabled defaultValue={rating} allowHalf />
          <span className="text-gray-500">({rating})</span>
        </Space>
      ),
    },
    {
      title: 'Chủ sở hữu',
      dataIndex: 'user',
      key: 'user',
      render: (user: any) => {
        if (!user) return null;
        return (
          <div className="flex items-center gap-2">
            <Avatar src={user.avatarUrl || 'https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?semt=ais_hybrid&w=740'} size="small" />
            <span>{user.fullName}</span>
          </div>
        );
      },
    },
    {
      title: 'Tiện ích',
      dataIndex: 'amenities',
      key: 'amenities',
      render: (amenities: string[]) => (
        <div className="flex flex-wrap gap-1">
          {amenities.slice(0, 3).map((amenity, index) => (
            <Tag key={index} color="blue">{amenity}</Tag>
          ))}
          {amenities.length > 3 && (
            <Tag color="blue">+{amenities.length - 3}</Tag>
          )}
        </div>
      ),
    },
    {
      title: 'Phòng',
      dataIndex: 'rooms',
      key: 'rooms',
      render: (rooms: string[]) => (
        <Tag color="green">{rooms.length} phòng</Tag>
      ),
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date: string) => format(new Date(date), 'dd/MM/yyyy HH:mm', { locale: vi }),
    },
    {
      title: 'Cập nhật',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      render: (date: string) => format(new Date(date), 'dd/MM/yyyy HH:mm', { locale: vi }),
    },
    {
      title: 'Hành động',
      key: 'actions',
      render: (_: any, record: Hotel) => (
        <a onClick={() => setSelectedHotel(record)}>Xem chi tiết</a>
      ),
    },
  ]

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Quản lý khách sạn</h1>
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
          dataSource={hotels}
          loading={isLoading}
          rowKey="_id"
          pagination={{
            pageSize: 5,
            showSizeChanger: true,
            showTotal: (total) => `Tổng số ${total} khách sạn`,
            className: 'px-6 py-4'
          }}
          className="[&_.ant-table-thead>tr>th]:bg-gray-50 [&_.ant-table-thead>tr>th]:text-gray-600 [&_.ant-table-thead>tr>th]:font-semibold [&_.ant-table-tbody>tr:hover]:bg-gray-50"
        />
      </Card>
      <HotelDetailModal
        open={!!selectedHotel}
        hotel={selectedHotel}
        onClose={() => setSelectedHotel(null)}
      />
    </div>
  )
}

export default HotelsManagement 