import Header from './assets/header.jsx'
import Home from './assets/home.jsx'
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import Login from './assets/login.jsx'
import NotFond from './assets/notfond.jsx'
import Footer from './assets/footer.jsx'
import Lives from './assets/lives.jsx'
import Posts from './assets/posts.jsx'
import Tests from './assets/tests.jsx'
import Certificates from './assets/certificates.jsx'
import Register from './assets/register.jsx'
import Groups from './assets/groups.jsx'
import GroupDetails from './assets/GroupDetails.jsx'
import { PostsProvider } from './assets/PostsContext.jsx'
import AuthProvider from './assets/AuthProvider.jsx'
import { useAuth } from './assets/auth-context.js'

function GuestRoute({ children }) {
  const { isAuthenticated } = useAuth()
  const location = useLocation()
  return isAuthenticated
    ? <Navigate to={location.state?.from?.pathname || '/Home'} replace />
    : children
}

function ProtectedApp() {
  const { isAuthenticated } = useAuth()
  const location = useLocation()

  if (!isAuthenticated) {
    return <Navigate to="/Login" replace state={{ from: location }} />
  }

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Posts" element={<Posts />} />
        <Route path="/Lives" element={<Lives />} />
        <Route path="/Tests" element={<Tests />} />
        <Route path="/Certificates" element={<Certificates />} />
        <Route path="/Groups/:stage" element={<Groups />} />
        <Route path="/Groups/:stage/:groupId" element={<GroupDetails />} />
        <Route path="/Groups/:stage/:groupId/:resource" element={<GroupDetails />} />
        <Route path="*" element={<NotFond />} />
      </Routes>
      <Footer />
    </>
  )
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/Login" element={<GuestRoute><Login /></GuestRoute>} />
      <Route path="/Register" element={<GuestRoute><Register /></GuestRoute>} />
      <Route path="*" element={<ProtectedApp />} />
    </Routes>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <PostsProvider>
          <AppRoutes />
        </PostsProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}


