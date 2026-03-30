import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-8">
          <div className="col-span-1">
            <h5 className="text-lg font-semibold">Social</h5>
            {/* Existing Social Links */}
          </div>
          <div className="col-span-1">
            <h5 className="text-lg font-semibold">Plus</h5>
            <ul>
              <li><Link to="/training-center" className="text-white hover:underline">Training Center</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;