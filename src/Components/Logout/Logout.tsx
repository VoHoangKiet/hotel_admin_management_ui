const Logout = () => {
  const handleLogout = async () => {
    try {
      window.location.href = '/login'
      localStorage.removeItem('user')
      localStorage.removeItem('token')
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <button
      onClick={handleLogout}
      className='text-left w-full  text-black hover:bg-primary hover:text-white p-2 rounded'
    >
      Đăng xuất
    </button>
  )
}

export default Logout
