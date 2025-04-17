import { Route, Routes } from 'react-router-dom'
import MainLayout from '../Layout/MainLayout'
import AdminLayout from '../Layout/AdminLayout'
import ProtectedRoute from './ProtectedRoute'
import AuthRoute from './AuthRoute'

import Home from '../Page/Home'
import Auth from '../Page/Auth'
import Login from '../Page/Auth/Login'
import Dashboard from '../Page/Admin'
import UsersManagement from '../Page/Admin/UsersManagement'
import HotelsManagement from '../Page/Admin/HotelsManagement'
import OwnerRequestsManagement from '../Page/Admin/OwnerRequestsManagement'
import OwnersManagement from '../Page/Admin/OwnersManagement'
import BookingStatistics from '../Page/Admin/BookingStatisticsManagement'

const RouterElement = () => {
  return (
    <Routes>
      <Route path='/' element={<MainLayout />}>
        <Route path='/' element={<Home />} />
        <Route path='' element={<Auth />}>
          <Route
            path='/login'
            element={
              <AuthRoute>
                <Login />
              </AuthRoute>
            }
          />
        </Route>
      </Route>

      <Route
        path=''
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route path='dashboard' element={<Dashboard />} />
        <Route path='users' element={<UsersManagement />} />
        <Route path='hotels' element={<HotelsManagement />} />
        <Route path='revenue' element={<BookingStatistics/>} />
        <Route path='owner-requests' element={<OwnerRequestsManagement />} />
        <Route path='owners' element={<OwnersManagement />} />
      </Route>
    </Routes>
  )
}

export default RouterElement
