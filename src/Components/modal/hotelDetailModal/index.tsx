import { Modal, Descriptions, Image, Tag } from 'antd'
import { Hotel } from '../../../hooks/admin/useHotels'

type Props = {
  hotel: Hotel | null
  open: boolean
  onClose: () => void
}

const HotelDetailModal = ({ hotel, open, onClose }: Props) => {
  if (!hotel) return null

  return (
    <Modal
      open={open}
      title={`Chi tiết khách sạn: ${hotel.name}`}
      onCancel={onClose}
      footer={null}
      width={800}
    >
      <Descriptions column={1} bordered>
        <Descriptions.Item label="Tên">{hotel.name}</Descriptions.Item>
        <Descriptions.Item label="Địa chỉ">{hotel.address}, {hotel.city}, {hotel.country}</Descriptions.Item>
        <Descriptions.Item label="Rating">{hotel.rating} ⭐</Descriptions.Item>
        <Descriptions.Item label="Mô tả">{hotel.description}</Descriptions.Item>
        <Descriptions.Item label="Chi tiết">{hotel.longDescription}</Descriptions.Item>
        <Descriptions.Item label="Loại">{hotel.type}</Descriptions.Item>
        <Descriptions.Item label="Tiện ích">
          {hotel.amenities.map((item, idx) => (
            <Tag color="blue" key={idx}>{item}</Tag>
          ))}
        </Descriptions.Item>
        <Descriptions.Item label="Số phòng">{hotel.rooms.length}</Descriptions.Item>
        <Descriptions.Item label="Liên hệ">
          📞 {hotel.phoneNumber} | ✉️ {hotel.email} <br />
          🔗 {hotel.website}
        </Descriptions.Item>
        <Descriptions.Item label="Hình ảnh">
          <div className="flex flex-wrap gap-2 mt-2">
            {hotel.images.map((url, idx) => (
              <Image key={idx} width={100} src={url} />
            ))}
          </div>
        </Descriptions.Item>
      </Descriptions>
    </Modal>
  )
}

export default HotelDetailModal
