import React from 'react';
import { FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className='bg-black text-white lg:px-48 px-4 py-4 absolute bottom-0 w-full'>
      <div className='container mx-auto grid grid-cols-1 md:grid-cols-4 gap-4'>
        <div className='mb-4 md:mb-0'>
          <span className='text-[22px] font-semibold text-color-hover py-2 uppercase'>Logo</span>
          <p className='text-[16px] my-4'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Accusantium blan</p>
        </div>
        <div>
          <h2 className='text-[22px] font-semibold text-color-hover py-2 uppercase'>Servicios</h2>
          <ul className='text-[16px] my-4'>
            <li className='my-2'>Web design</li>
            <li className='my-2'>Web development</li>
          </ul>
        </div>
        <div className='mb-4 md:mb-0'>
          <h2 className='text-[22px] font-semibold text-color-hover py-2 uppercase'>Contacto</h2>
          <p className='text-[16px] my-4'>Email: "email"</p>
          <p className='text-[16px] my-4'>Telefono: +58...</p>
        </div>
        <div>
          <h2 className='text-[22px] font-semibold text-color-hover py-2 uppercase'>Siguenos</h2>
          <div className='flex space-x-4'>
            <a className='text-white hover:text-fuchsia-600 transition-all duration-150 ease-in-out' href=''>
              <FaInstagram/>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;