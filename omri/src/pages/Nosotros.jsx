import React from 'react';

const Nosotros = () => {
  return (
    <div className="bg-gray-100">
      {/* Sección: Sobre nosotros */}
      <div className="max-w-7xl mx-auto py-16 px-4">
        <div className="flex flex-col md:flex-row items-center gap-8">
          {/* Columna izquierda: Texto */}
          <div className="w-full md:w-3/5 flex flex-col justify-center bg-white p-8 rounded-lg shadow-lg">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Sobre nosotros</h1>
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
              En Omri, ofrecemos productos originales y de alta calidad a nuestros clientes.
            </p>
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed mt-4">
              Nuestra misión es proporcionarte productos y servicios de primer nivel, asegurándonos
              de superar tus expectativas a través de dedicación, responsabilidad y compromiso.
            </p>
          </div>

          {/* Columna derecha: Contenedor para imagen */}
          <div className="w-full md:w-2/5 h-96 bg-gray-200 rounded-lg overflow-hidden shadow-lg flex items-center justify-center">
            <p className="text-gray-500 text-lg text-center">
              Aquí puedes agregar una imagen vinculada
            </p>
          </div>
        </div>
      </div>

      {/* Sección: Ubicación */}
      <div className="max-w-7xl mx-auto py-16 px-4">
        <div className="flex flex-col md:flex-row items-center gap-8">
          {/* Columna izquierda: Mapa */}
          <div className="w-full md:w-2/5 h-96 rounded-lg overflow-hidden shadow-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3948.092352488776!2d-62.740677625204256!3d8.293607900066982!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8dcbf97ca6fd20d7%3A0x327140684f121c8f!2sSanto%20Tome%20IV%20I!5e0!3m2!1ses!2sve!4v1738710176244!5m2!1ses!2sve"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ubicación de la empresa"
            ></iframe>
          </div>

          {/* Columna derecha: Información */}
          <div className="w-full md:w-3/5 flex flex-col justify-center bg-white p-8 rounded-lg shadow-lg">
            <h3 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Ubicación</h3>
            <p className="text-lg md:text-xl text-gray-700 mb-6">
              Santo Tomé IV, Piso I, local 01. <br /> 
              Ciudad Guayana, Venezuela
            </p>
            <p className="text-lg md:text-xl text-gray-700 mb-6">
              Horario de atención: <br />
              Lunes a Sábado de 9:00am a 7:00pm <br />
              Domingo: 10:00am a 5:00pm
            </p>
            <p className="text-lg md:text-xl text-gray-700">
              ¡Visítanos!
            </p>
          </div>
        </div>
      </div>

      {/* Sección: Contacto */}
      <div className="max-w-4xl mx-auto py-16 px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">Contacto</h2>
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
            Para más información, no dudes en contactarnos a través de nuestro correo electrónico:{' '}
            <a href="mailto:info@tudominio.com" className="text-blue-600 hover:underline">
              info@tudominio.com
            </a>
            . También puedes llamarnos al <strong>+58 123 456 7890</strong>. Estamos aquí para
            ayudarte.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Nosotros;