import { Heart, Award, Download } from 'lucide-react';
import { PledgeFormData } from '../lib/supabase';

interface CertificateProps {
  pledgeData: PledgeFormData;
  onClose: () => void;
}

export default function Certificate({ pledgeData, onClose }: CertificateProps) {
  const heartRating = Math.min(pledgeData.commitments.length, 5);

  const downloadCertificate = () => {
    const certificateElement = document.getElementById('certificate-content');
    if (!certificateElement) return;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = 1200;
    canvas.height = 800;

    ctx.fillStyle = '#eff6ff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = '#2563eb';
    ctx.lineWidth = 8;
    ctx.strokeRect(40, 40, canvas.width - 80, canvas.height - 80);

    ctx.fillStyle = '#1e40af';
    ctx.font = 'bold 48px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('CLIMATE ACTION PLEDGE', canvas.width / 2, 120);

    ctx.fillStyle = '#0ea5e9';
    ctx.font = '32px Arial';
    ctx.fillText('Certificate of Commitment', canvas.width / 2, 180);

    ctx.fillStyle = '#374151';
    ctx.font = '28px Arial';
    ctx.fillText('This certifies that', canvas.width / 2, 280);

    ctx.fillStyle = '#1e40af';
    ctx.font = 'bold 44px Arial';
    ctx.fillText(pledgeData.name, canvas.width / 2, 350);

    ctx.fillStyle = '#374151';
    ctx.font = '28px Arial';
    ctx.fillText('is Cool Enough to Care!', canvas.width / 2, 420);

    ctx.fillStyle = '#6b7280';
    ctx.font = '24px Arial';
    ctx.fillText(`Has pledged ${pledgeData.commitments.length} climate-positive actions`, canvas.width / 2, 480);

    ctx.fillStyle = '#d97706';
    ctx.font = 'bold 36px Arial';
    const hearts = '♥'.repeat(heartRating);
    ctx.fillText(`Love for Planet: ${hearts}`, canvas.width / 2, 560);

    ctx.fillStyle = '#9ca3af';
    ctx.font = '20px Arial';
    const date = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    ctx.fillText(date, canvas.width / 2, 680);

    const link = document.createElement('a');
    link.download = `climate-pledge-certificate-${pledgeData.name.replace(/\s+/g, '-')}.png`;
    link.href = canvas.toDataURL();
    link.click();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <div id="certificate-content" className="relative bg-gradient-to-br from-blue-50 via-cyan-50 to-sky-50 p-8 md:p-12">
          <div className="border-8 border-blue-600 rounded-2xl p-8 md:p-12 bg-white/80 backdrop-blur-sm">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-full mb-6">
                <Award className="w-10 h-10 text-white" />
              </div>

              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
                Climate Action Pledge
              </h2>
              <p className="text-xl text-blue-700 font-semibold mb-8">Certificate of Commitment</p>

              <div className="my-8">
                <p className="text-lg text-gray-700 mb-4">This certifies that</p>
                <p className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600 mb-4">
                  {pledgeData.name}
                </p>
                <p className="text-2xl font-bold text-gray-800 mb-6">is Cool Enough to Care!</p>
              </div>

              <div className="bg-blue-50 rounded-xl p-6 mb-8">
                <p className="text-gray-700 mb-2">Has pledged to take</p>
                <p className="text-3xl font-bold text-blue-700 mb-4">
                  {pledgeData.commitments.length} Climate-Positive Actions
                </p>
                <div className="flex items-center justify-center gap-2 text-3xl">
                  <span className="font-semibold text-gray-800">Love for Planet:</span>
                  {Array.from({ length: heartRating }).map((_, i) => (
                    <Heart key={i} className="w-8 h-8 fill-orange-500 text-orange-500" />
                  ))}
                </div>
              </div>

              <div className="text-sm text-gray-600">
                {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </div>
            </div>
          </div>
        </div>

        <div className="p-8 flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={downloadCertificate}
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-xl transition-all duration-300"
          >
            <Download className="w-5 h-5" />
            Download Certificate
          </button>
          <button
            onClick={onClose}
            className="px-8 py-3 rounded-xl font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 transition-all duration-300"
          >
            View Pledge Wall
          </button>
        </div>
      </div>
    </div>
  );
}
