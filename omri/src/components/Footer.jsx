import React from 'react';
import { FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className='bg-black text-white lg:px-48 px-4 py-4'>
      <div className='container mx-auto grid grid-cols-1 md:grid-cols-4 gap-4'>
        {/* Logo Section */}
        <div className='mb-4 md:mb-0'>
          {/* Imagen del logo */}
          <img 
            src='/images/isotipoblanco.png' alt='Logo de la empresa'className='w-32 h-auto' // Ajusta el tamaño de la imagen con Tailwind
          />
        </div>

        {/* Servicios Section */}
        <div>
          <h2 className='text-[22px] font-semibold py-2 text-color-hover uppercase'>Servicios</h2>
          <ul className='text-[16px] my-4'>
            <li className='my-2'>Web design</li>
            <li className='my-2'>Web development</li>
          </ul>
        </div>

        {/* Contacto Section */}
        <div className='mb-4 md:mb-0'>
          <h2 className='text-[22px] font-semibold py-2 text-color-hover uppercase'>Contacto</h2>
          <p className='text-[16px] my-4'>Email: "email"</p>
          <p className='text-[16px] my-4'>Teléfono: +58...</p>
        </div>

        {/* Redes Sociales Section */}
        <div>
          <h2 className='text-[22px] font-semibold py-2 text-color-hover uppercase'>Síguenos</h2>
          <div className='flex space-x-4'>
            <a
              className='text-white hover:text-fuchsia-600 transition-all duration-150 ease-in-out'
              href=''
            >
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;