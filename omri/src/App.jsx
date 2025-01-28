import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Accesorios from "./pages/Accesorios";
import Cubitt from './pages/cubitt';
import Nosotros from './pages/Nosotros';
import Admin from './pages/Admin';
import AdminForm from './pages/AdminForm';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        {/* navbar */}
        <div className="bg-black">
          <Nav />
        </div> 

        {/* Main content (grow to fill available space) */}
        <main className="flex-grow">
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/cubitt' element={<Cubitt />} />
            <Route path='/accesorios' element={<Accesorios />} />
            <Route path='/nosotros' element={<Nosotros />} />
            <Route path='/admin' element={<Admin />}/>
            <Route path='/admin/:type' element={<AdminForm/>} />
          </Routes>
        </main>

        {/* footer */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;