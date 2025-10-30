import { Globe, Heart, Users, Sprout } from 'lucide-react';

export default function WhyClimateAction() {
  const reasons = [
    {
      icon: Globe,
      title: 'Global Impact',
      description: 'Climate change affects every corner of our planet. Your actions contribute to a worldwide movement for change.'
    },
    {
      icon: Heart,
      title: 'Individual Responsibility',
      description: 'Every person has the power to make a difference. Small daily choices add up to massive environmental impact.'
    },
    {
      icon: Users,
      title: 'Collective Movement',
      description: 'Join millions taking action together. When we unite for the planet, we create unstoppable momentum for change.'
    },
    {
      icon: Sprout,
      title: 'Future Generations',
      description: 'The choices we make today shape the world our children inherit. Act now to protect their tomorrow.'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-gray-100">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Why Take Climate Action?
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Climate change is the defining challenge of our generation. But together, through individual commitment and collective action, we can create meaningful change and build a sustainable future.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {reasons.map((reason, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="p-4 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl text-white">
                      <reason.icon className="w-8 h-8" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">{reason.title}</h3>
                    <p className="text-gray-700 leading-relaxed">{reason.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl p-8 text-white text-center">
            <h3 className="text-3xl font-bold mb-4">Every Action Counts</h3>
            <p className="text-lg opacity-90 max-w-2xl mx-auto">
              From reducing waste to conserving energy, your commitment to climate-positive habits inspires others and creates ripples of change across communities and continents.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
