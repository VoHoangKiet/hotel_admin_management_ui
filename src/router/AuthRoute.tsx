import { Navigate, useLocation } from 'react-router-dom'

interface AuthRouteProps {
  children: React.ReactNode
}

const AuthRoute = ({ children }: AuthRouteProps) => {
  const location = useLocation()
  const token = localStorage.getItem('token')

  if (token) {
    return <Navigate to="/" state={{ from: location }} replace />
  }

  return <>{children}</>
}

export default AuthRoute 