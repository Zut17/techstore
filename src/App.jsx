import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";

function App() {
  return (
    <BrowserRouter>
      {/* La Navbar est en dehors de <Routes> : elle s'affiche sur toutes les pages */}
      <Navbar />

      {/* Routes affiche UNE seule page selon l'URL */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/produits" element={<Products />} />
        <Route path="/produits/:id" element={<ProductDetail />} />
        <Route path="/panier" element={<Cart />} />
        <Route path="/commande" element={<Checkout />} />
        <Route path="/connexion" element={<Login />} />
      </Routes>

      {/* Le Footer aussi s'affiche partout */}
      <Footer />
    </BrowserRouter>
  );
}

export default App;