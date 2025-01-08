/* eslint-disable no-unused-vars */
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './pages-cards-transparent/home-full-bg.js';
import About from './pages-cards-transparent/about-full-bg.js';
import FAQ from './pages-cards-transparent/faq.js';
import Contact from './pages-cards-transparent/contact-full-bg.js';
import Specialities from './pages-cards-transparent/specialities-full-bg.js';
import { PostsProvider } from './components/postsContext.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <PostsProvider>
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/about" element={<About />} />
        <Route exact path="/faq" element={<FAQ />} />
        <Route exact path="/contact" element={<Contact />} />
        <Route exact path="/news" element={<Specialities />} />
      </Routes>
    </Router>
  </PostsProvider>
);
