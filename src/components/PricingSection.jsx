import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const plans = [
  {
    name: 'Basic',
    roi: '25%',
    support: 'Live',
    mining: 'HashCoins SCRYPT',
    instruments: 2,
    price: '$1000',
    duration: '7 days',
  },
  {
    name: 'Standard',
    roi: '50%',
    support: 'Live',
    mining: 'HashCoins SHA-256',
    instruments: 5,
    price: '$5000',
    duration: '7 Days',
  },
  {
    name: 'Premium',
    roi: '95%',
    support: 'Live',
    mining: 'GPU Rigs',
    instruments: 20,
    price: '$10000',
    duration: '14 Days',
  },
  {
    name: 'Unlimited',
    roi: '100%',
    support: 'Live',
    mining: 'Multi-Factor',
    instruments: 'All Available',
    price: '$20000+',
    duration: '30 Days',
  },
];

const PricingSection = () => {
  const navigate = useNavigate();

  const handleChoosePlan = () => {
    navigate('/signup');
  };

  return (
    <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-6xl mx-auto text-center mb-12">
        <motion.h2 
          className="text-4xl font-bold text-gray-900"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Choose Your Plan
        </motion.h2>
        <motion.p 
          className="text-gray-600 mt-2"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Flexible pricing for every level of investor
        </motion.p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {plans.map((plan, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.15 }}
            whileHover={{ scale: 1.05 }}
            className="border border-gray-300 rounded-xl shadow-md bg-white overflow-hidden hover:shadow-xl transition-shadow"
          >
            <div className="p-6 text-center">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">{plan.name}</h3>
              <ul className="text-sm text-gray-600 mb-6 space-y-1">
                <li>ROI: {plan.roi}</li>
                <li>Support: {plan.support}</li>
                <li>Mining: {plan.mining}</li>
                <li>Instruments: {plan.instruments}</li>
              </ul>
              <div className="text-3xl font-bold text-gray-800 mb-1">{plan.price}</div>
              <p className="text-sm text-gray-500 mb-4">for {plan.duration}</p>
              <motion.button
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.02 }}
                onClick={handleChoosePlan}
                className="bg-emerald-600 text-white px-6 py-2 rounded-full font-medium hover:bg-emerald-700 transition-colors"
              >
                CHOOSE PLAN
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default PricingSection;
