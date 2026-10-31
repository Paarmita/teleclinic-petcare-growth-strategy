import React from 'react';
import { createRoot } from 'react-dom/client';
import PetDocCaseStudy from './PetDocCaseStudy.jsx';
import './case-study.css';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <PetDocCaseStudy />
  </React.StrictMode>
);
