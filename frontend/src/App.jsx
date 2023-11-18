import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Singup from './pages/Signup';
import Login from './pages/Login';

function App() {
    return (
        <div className='App'>
            <BrowserRouter>
                <Navbar />
                <div className='pages'>
                    <Routes>
                        <Route path='/' element={<Home />} />
                    </Routes>
                    <Routes>
                        <Route
                            path='/login'
                            element={<Login />}
                        />
                    </Routes>
                    <Routes>
                        <Route
                            path='/signup'
                            element={<Singup />}
                        />
                    </Routes>
                </div>
            </BrowserRouter>
        </div>
    );
}

export default App;
