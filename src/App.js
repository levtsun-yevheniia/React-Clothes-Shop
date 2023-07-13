import './scss/app.scss';
import Header from './components/Header';
import Home from './pages/Home';
import NonFound from './pages/NonFound';
import Cart from './pages/Cart';
import Catalog from './pages/Catalog';

import { Routes, Route } from 'react-router-dom';
import React from 'react';

function App() {
  return (
    <div className="content">
      <Header />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/catalog" element={<Catalog />}></Route>
        <Route path="*" element={<NonFound />}></Route>
        <Route path="/cart" element={<Cart />}></Route>
      </Routes>
    </div>
  );
}

export default App;
