// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import { FirebaseAppProvider } from 'reactfire';
import { Toaster } from 'react-hot-toast';
import AnimatedCursor from 'react-animated-cursor';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Collections from './pages/Collections';
import Journal from './pages/Journey';
import Auth from './pages/Auth';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Cart from './pages/Cart';
import Signup from './pages/Signup';
import ProductDetails from './pages/ProductDetails';
import './styles/main.css';

// Firebase config (replace with your actual config)
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "your-app.firebaseapp.com",
  projectId: "your-app",
  storageBucket: "your-app.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

function App() {
  return (
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
      <AuthProvider>
        <CartProvider>
          <Router>
            <div className="cursor-none">
              {/* Custom animated cursor - Updated with better visibility */}
              <AnimatedCursor
                innerSize={12}
                outerSize={32}
                innerScale={1}
                outerScale={1.7}
                outerAlpha={0.2}
                innerStyle={{ 
                  backgroundColor: 'var(--cursor-color)',
                  mixBlendMode: 'exclusion'
                }}
                outerStyle={{ 
                  border: '2px solid var(--cursor-color)',
                  mixBlendMode: 'exclusion'
                }}
                clickables={[
                  'a',
                  'input[type="text"]',
                  'input[type="email"]',
                  'input[type="number"]',
                  'input[type="submit"]',
                  'input[type="image"]',
                  'label[for]',
                  'select',
                  'textarea',
                  'button',
                  '.link',
                  '.cursor-pointer',
                  {
                    target: '.clickable',
                    options: {
                      innerSize: 12,
                      outerSize: 32,
                      color: '255, 255, 255',
                      outerAlpha: 0.3,
                      innerScale: 0.7,
                      outerScale: 3
                    }
                  }
                ]}
              />
              
              <Navbar />
              
              <Toaster position="top-right" />
              
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/auth/*" element={<Auth />} />
                <Route path="/about" element={<About />} />
                <Route path="/collections" element={<Collections />} />
                <Route path="/journal" element={<Journal />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/product/:id" element={<ProductDetails />} />
              </Routes>
            </div>
          </Router>
        </CartProvider>
      </AuthProvider>
    </FirebaseAppProvider>
  );
}

export default App;