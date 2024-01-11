import './scss/app.scss';
import Header from './components/Header';
import Home from './pages/Home';
import NonFound from './pages/NonFound';
import Cart from './pages/Cart';
import Catalog from './pages/Catalog';
import AboutItem from './pages/AboutItem';

import { Routes, Route } from 'react-router-dom';
import React from 'react';
import ForClient from './pages/ForClient';

function App() {
  return (
    <div className="content">
      <Header />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/catalog" element={<Catalog />}></Route>
        <Route path="*" element={<NonFound />}></Route>
        <Route path="/item/:id" element={<AboutItem />}></Route>
        <Route path="/cart" element={<Cart />}></Route>
        <Route path="/forclient" element={<ForClient />}></Route>
      </Routes>
    </div>
  );
}

export default App;
