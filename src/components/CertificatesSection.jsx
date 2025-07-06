import React from 'react';
import certificate1 from '../assets/image/certificate1.png';
import certificate2 from '../assets/image/certificate2.jpg';

const CertificatesSection = () => {
  return (
    <section className="py-10 sm:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Certificate 1 */}
          <div className="p-4 sm:p-6 flex flex-col items-center">
            <div className="w-full max-w-xs sm:max-w-none h-auto">
              <img
                src={certificate1}
                alt="Certificate of Excellence"
                className="w-full h-auto object-contain rounded"
              />
            </div>
          </div>

          {/* Certificate 2 */}
          <div className="p-4 sm:p-6 flex flex-col items-center">
            <div className="w-full max-w-xs sm:max-w-none h-auto">
              <img
                src={certificate2}
                alt="Regulatory Compliance Certification"
                className="w-full h-auto object-contain rounded"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CertificatesSection;
