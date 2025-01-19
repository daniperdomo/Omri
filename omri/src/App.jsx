import Nav from "./components/Nav"
import Footer from "./components/Footer"
import Home from "./pages/Home"

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* navbar */}
      <div className="bg-black">
        <Nav />
      </div>

      {/* Main content (grow to fill available space) */}
      <main className="flex-grow">
        <Home />
      </main>

      {/* footer */}
      <Footer />
    </div>
  )
}

export default App;