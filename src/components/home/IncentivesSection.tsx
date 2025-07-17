import { Truck, Headphones, ShoppingCart } from 'lucide-react';

const IncentivesSection = () => {
  const incentives = [
    {
      icon: <Truck className="w-12 h-12 text-blue-600" />,
      title: 'Envío Gratis',
      description: 'Envío gratuito en compras superiores a $50.000. Rápido y seguro a todo el país.'
    },
    {
      icon: <Headphones className="w-12 h-12 text-blue-600" />,
      title: 'Soporte 24/7',
      description: 'Atención al cliente las 24 horas. Resolvemos tus dudas al instante.'
    },
    {
      icon: <ShoppingCart className="w-12 h-12 text-blue-600" />,
      title: 'Compra Rápida',
      description: 'Proceso de compra simplificado. Menos clics, más satisfacción.'
    }
  ];

  return (
    <section className="py-10 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {incentives.map((incentive, index) => (
            <div 
              key={index}
              className="flex items-center space-x-4 p-6 bg-white rounded-lg hover:bg-gray-50 transition-colors duration-300"
            >
              <div className="flex-shrink-0">
                <div className="bg-blue-50 p-3 rounded-full">
                  {incentive.icon}
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  {incentive.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {incentive.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IncentivesSection;