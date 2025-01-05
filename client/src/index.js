/* eslint-disable no-unused-vars */
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import Home from './pages-cards-transparent/home-full-bg.js';
import About from './pages-cards-transparent/about-full-bg.js';
import FAQ from './pages-cards-transparent/faq.js';
import Contact from './pages-cards-transparent/contact-full-bg.js';

// import Home from './pages/home-full-bg.js';
// import About from './pages/about-full-bg.js';
// import FAQ from './pages/faq.js';
// import Contact from './pages/contact-full-bg.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
     <Router>
      <Routes>
        <Route exact path='/' element = {<Home />}/>
        <Route exact path='/about' element = {<About />}/>
        <Route exact path='/faq' element = {<FAQ />}/>
        <Route exact path='/contact' element = {<Contact />}/>
      </Routes>
    </Router>
  </React.StrictMode>
);
