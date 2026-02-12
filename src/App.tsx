import { Routes, Route } from "react-router-dom"
import { lazy, Suspense } from "react"
import Footer from "./components/Footer"
import Navbar from "./components/Navbar"
import BottomNotification from "./components/BottomNotification"
import Creater from "./components/Creater"

const Header = lazy(() => import("./components/Header"))
const CheckoutScreen = lazy(() => import("./components/CheckoutScreen"))

function App() {
  return (
    <div className="bg-sprout-bg2 min-h-screen px-3 py-1">
      <Navbar />
      <BottomNotification />
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-teal-600 font-semibold">Loading...</div>}>
        <Routes>
          <Route path="/" element={<Header />} />
          <Route path="/checkout" element={<CheckoutScreen />} />
        </Routes>
      </Suspense>
      <Footer />
      <Creater />
    </div>
  )
}

export default App
