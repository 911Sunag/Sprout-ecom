import { Routes, Route, Navigate } from "react-router-dom"
import { lazy, Suspense } from "react"
import { useSelector } from "react-redux"
import type { RootState } from "./store/store"
import Footer from "./components/Footer"
import Navbar from "./components/Navbar"
import BottomNotification from "./components/BottomNotification"
import Creater from "./components/Creater"

const Header = lazy(() => import("./components/Header"))
const CheckoutScreen = lazy(() => import("./components/CheckoutScreen"))
const Auth = lazy(() => import("./pages/Auth"))

function App() {
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <div className="bg-sprout-bg2 min-h-screen px-3 py-1">
      {user && <Navbar />}
      {user && <BottomNotification />}
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-teal-600 font-semibold">Loading...</div>}>
        <Routes>
          <Route path="/" element={user ? <Header /> : <Navigate to="/auth" replace />} />
          <Route path="/checkout" element={user ? <CheckoutScreen /> : <Navigate to="/auth" replace />} />
          <Route path="/auth" element={!user ? <Auth /> : <Navigate to="/" replace />} />
          <Route path="*" element={<Navigate to={user ? "/" : "/auth"} replace />} />
        </Routes>
      </Suspense>
      {user && <Footer />}
      <Creater />
    </div>
  )
}

export default App
