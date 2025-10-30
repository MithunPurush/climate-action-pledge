import { useState } from 'react';
import { Leaf } from 'lucide-react';
import Hero from './components/Hero';
import KPIDashboard from './components/KPIDashboard';
import WhyClimateAction from './components/WhyClimateAction';
import PledgeForm from './components/PledgeForm';
import Certificate from './components/Certificate';
import PledgeWall from './components/PledgeWall';
import { PledgeFormData } from './lib/supabase';

function App() {
  const [showCertificate, setShowCertificate] = useState(false);
  const [pledgeData, setPledgeData] = useState<PledgeFormData | null>(null);

  const handleTakePledge = () => {
    document.getElementById('pledge-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handlePledgeSuccess = (data: PledgeFormData) => {
    setPledgeData(data);
    setShowCertificate(true);
  };

  const handleCloseCertificate = () => {
    setShowCertificate(false);
    document.getElementById('pledge-wall')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white">
      <nav className="bg-white shadow-md sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-lg">
                <Leaf className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">Climate Action Pledge</span>
            </div>
            <button
              onClick={handleTakePledge}
              className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-2 rounded-full font-semibold hover:shadow-lg transition-all duration-300"
            >
              Take Pledge
            </button>
          </div>
        </div>
      </nav>

      <Hero onTakePledge={handleTakePledge} />
      <KPIDashboard />
      <WhyClimateAction />
      <PledgeForm onSuccess={handlePledgeSuccess} />
      <PledgeWall />

      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Leaf className="w-6 h-6 text-cyan-400" />
              <span className="text-xl font-bold">Climate Action Pledge</span>
            </div>
            <p className="text-gray-400 mb-6">
              Together, we can create a sustainable future for generations to come.
            </p>
            <div className="text-sm text-gray-500">
              <p>&copy; {new Date().getFullYear()} Climate Action Pledge. All rights reserved.</p>
              <p className="mt-2">Your data is secure and never shared publicly without consent.</p>
            </div>
          </div>
        </div>
      </footer>

      {showCertificate && pledgeData && (
        <Certificate pledgeData={pledgeData} onClose={handleCloseCertificate} />
      )}
    </div>
  );
}

export default App;
