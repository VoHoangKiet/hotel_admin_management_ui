import { Card, Empty, Spin, Table, Tag } from 'antd'
import { useBookingsStats } from '../../hooks/admin/useBookingsStats'
import { Bar, Pie } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js'
import { format } from 'date-fns'
import { vi } from 'date-fns/locale'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement)

const COLORS = ['#1890ff', '#52c41a', '#f5222d']

const BookingStatistics = () => {
  const { data: bookings, isLoading } = useBookingsStats()

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin />
      </div>
    )

  if (!bookings || bookings.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Empty description="Không có dữ liệu booking" />
      </div>
    )
  }

  // Nhóm dữ liệu theo ngày tạo
  const groupedByDate = bookings.reduce((acc: any, booking: any) => {
    const date = format(new Date(booking.createdAt), 'dd/MM/yyyy', { locale: vi })
    acc[date] = acc[date] || { count: 0, total: 0 }
    acc[date].count++
    acc[date].total += booking.totalPrice
    return acc
  }, {})

  const labels = Object.keys(groupedByDate)
  const countData = labels.map(label => groupedByDate[label].count)
  const totalData = labels.map(label => groupedByDate[label].total)

  const barChartData = {
    labels,
    datasets: [
      {
        label: 'Số lượt booking',
        data: countData,
        backgroundColor: '#1890ff',
      },
      {
        label: 'Tổng tiền',
        data: totalData,
        backgroundColor: '#ffc107',
      },
    ],
  }

  const barChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: false,
      },
    },
  }

  const statusCounts = ['confirmed', 'pending', 'cancelled'].map(status => {
    return bookings.filter(b => b.status === status).length
  })

  const pieChartData = {
    labels: ['Confirmed', 'Pending', 'Cancelled'],
    datasets: [
      {
        label: 'Số lượng',
        data: statusCounts,
        backgroundColor: COLORS,
        borderWidth: 1,
      },
    ],
  }

  const columns = [
    {
      title: 'Người đặt',
      dataIndex: ['user', 'fullName'],
      key: 'user',
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date: string) => format(new Date(date), 'dd/MM/yyyy', { locale: vi }),
    },
    {
      title: 'Tổng tiền',
      dataIndex: 'totalPrice',
      key: 'totalPrice',
      render: (price: number) =>
        price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }),
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const colorMap: any = {
          confirmed: 'green',
          pending: 'orange',
          cancelled: 'red',
        }
        return <Tag color={colorMap[status]}>{status.toUpperCase()}</Tag>
      },
    },
  ]

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Thống kê booking</h1>

      <div className="grid gap-6 grid-cols-1 xl:grid-cols-2">
        <Card title="Số lượng & tổng tiền booking theo ngày" className="min-h-[400px]">
          <div className="h-[300px]">
            <Bar data={barChartData} options={barChartOptions} />
          </div>
        </Card>

        <Card title="Tỉ lệ trạng thái booking" className="min-h-[400px]">
          <div className="flex justify-center items-center h-[300px]">
            <Pie data={pieChartData} />
          </div>
        </Card>
      </div>

      <Card title="Danh sách booking chi tiết" className="mt-6">
        <Table
          dataSource={bookings}
          columns={columns}
          rowKey="_id"
          scroll={{ x: '100%' }}
          pagination={{ pageSize: 10 }}
        />
      </Card>
    </div>
  )
}

export default BookingStatistics
