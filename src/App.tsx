import Footer from "./components/Footer"
import Header from "./components/Header"
import BottomNotification from "./components/BottomNotification"

function App() {
  return (
    <div className="bg-sprout-bg2 min-h-screen px-3 py-1">
      <Header/>
      <BottomNotification />
      <Footer/>
    </div>
  )
}

export default App
