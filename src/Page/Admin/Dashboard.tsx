import { Card, Statistic, Table } from 'antd'
import {
  UserOutlined,
  HomeOutlined,
  CalendarOutlined,
  StarOutlined,
  TeamOutlined,
  CheckCircleOutlined
} from '@ant-design/icons'
import { useAdminStats } from '../../hooks/admin/useAdminStats'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions
} from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

const Dashboard = () => {
  const { data: stats, isLoading } = useAdminStats()

  const columns = [
    {
      title: 'Khách sạn',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'address',
      key: 'address'
    },
    {
      title: 'Đánh giá trung bình',
      dataIndex: 'averageRating',
      key: 'averageRating',
      render: (rating: number) => `${rating.toFixed(1)} ⭐`
    },
    {
      title: 'Số đánh giá',
      dataIndex: 'totalReviews',
      key: 'totalReviews'
    }
  ]

  const chartData = {
    labels: stats?.monthlyBookings.map((booking) => booking.month) || [],
    datasets: [
      {
        label: 'Số lượng đặt phòng',
        data: stats?.monthlyBookings.map((booking) => booking.count) || [],
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }
    ]
  }

  const chartOptions: ChartOptions<'line'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const
      },
      title: {
        display: true,
        text: 'Thống kê đặt phòng theo tháng'
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1
        }
      }
    }
  }

  return (
    <div className='p-4'>
      <div className='flex items-center justify-between mb-4'>
        <h1 className='text-2xl font-bold text-gray-800'>Dashboard</h1>
        <div className='text-sm text-gray-500'>Cập nhật lần cuối: {new Date().toLocaleString()}</div>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4'>
        <Card className='hover:shadow-lg transition-shadow' styles={{ body: { padding: '16px' } }}>
          <Statistic
            title='Tổng số người dùng'
            value={stats?.totalUsers || 0}
            prefix={<UserOutlined className='text-green-500' />}
            valueStyle={{ color: '#3f8600' }}
            loading={isLoading}
          />
        </Card>
        <Card className='hover:shadow-lg transition-shadow' styles={{ body: { padding: '16px' } }}>
          <Statistic
            title='Tổng số khách sạn'
            value={stats?.totalHotels || 0}
            prefix={<HomeOutlined className='text-blue-500' />}
            valueStyle={{ color: '#1890ff' }}
            loading={isLoading}
          />
        </Card>
        <Card className='hover:shadow-lg transition-shadow' styles={{ body: { padding: '16px' } }}>
          <Statistic
            title='Tổng số đặt phòng'
            value={stats?.totalBookings || 0}
            prefix={<CalendarOutlined className='text-purple-500' />}
            valueStyle={{ color: '#722ed1' }}
            loading={isLoading}
          />
        </Card>
        <Card className='hover:shadow-lg transition-shadow' styles={{ body: { padding: '16px' } }}>
          <Statistic
            title='Tổng số đánh giá'
            value={stats?.totalReviews || 0}
            prefix={<StarOutlined className='text-yellow-500' />}
            valueStyle={{ color: '#faad14' }}
            loading={isLoading}
          />
        </Card>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-4'>
        <Card className='hover:shadow-lg transition-shadow' styles={{ body: { padding: '16px' } }}>
          <Statistic
            title='Người dùng đang hoạt động'
            value={stats?.activeUsers || 0}
            prefix={<TeamOutlined className='text-green-400' />}
            valueStyle={{ color: '#52c41a' }}
            loading={isLoading}
          />
        </Card>
        <Card className='hover:shadow-lg transition-shadow' styles={{ body: { padding: '16px' } }}>
          <Statistic
            title='Khách sạn đang hoạt động'
            value={stats?.activeHotels || 0}
            prefix={<CheckCircleOutlined className='text-cyan-500' />}
            valueStyle={{ color: '#13c2c2' }}
            loading={isLoading}
          />
        </Card>
        <Card className='hover:shadow-lg transition-shadow' styles={{ body: { padding: '16px' } }}>
          <Statistic
            title='Tổng số phòng'
            value={stats?.totalRooms || 0}
            prefix={<HomeOutlined className='text-pink-500' />}
            valueStyle={{ color: '#eb2f96' }}
            loading={isLoading}
          />
        </Card>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
        <Card
          className='hover:shadow-lg transition-shadow'
          title='Thống kê đặt phòng theo tháng'
          styles={{ body: { padding: '16px' } }}
        >
          <div className='h-[300px]'>
            <Line options={chartOptions} data={chartData} />
          </div>
        </Card>

        <Card
          className='hover:shadow-lg transition-shadow'
          title='Khách sạn được đánh giá cao nhất'
          styles={{ body: { padding: '16px' } }}
        >
          <Table
            dataSource={stats?.topRatedHotels || []}
            columns={columns}
            rowKey='_id'
            loading={isLoading}
            pagination={false}
            size='small'
          />
        </Card>
      </div>
    </div>
  )
}

export default Dashboard
