import { useState } from 'react';
import { Shield, Check } from 'lucide-react';
import { supabase, PledgeFormData } from '../lib/supabase';

interface PledgeFormProps {
  onSuccess: (data: PledgeFormData) => void;
}

export default function PledgeForm({ onSuccess }: PledgeFormProps) {
  const [formData, setFormData] = useState<PledgeFormData>({
    name: '',
    email: '',
    mobile: '',
    state: '',
    profile_type: 'Student',
    commitments: []
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const commitmentThemes = {
    'Energy Conservation': [
      'Switch to renewable energy sources',
      'Reduce electricity consumption by 30%',
      'Use energy-efficient appliances'
    ],
    'Sustainable Transportation': [
      'Use public transport or carpool weekly',
      'Cycle or walk for short distances',
      'Switch to electric or hybrid vehicles'
    ],
    'Waste Reduction': [
      'Eliminate single-use plastics',
      'Compost organic waste regularly',
      'Practice recycling and upcycling'
    ]
  };

  const handleCheckboxChange = (commitment: string) => {
    setFormData(prev => ({
      ...prev,
      commitments: prev.commitments.includes(commitment)
        ? prev.commitments.filter(c => c !== commitment)
        : [...prev.commitments, commitment]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.commitments.length === 0) {
      setError('Please select at least one commitment');
      return;
    }

    setLoading(true);

    try {
      const { error: insertError } = await supabase
        .from('pledges')
        .insert({
          name: formData.name,
          email: formData.email,
          mobile: formData.mobile,
          state: formData.state,
          profile_type: formData.profile_type,
          commitments: formData.commitments,
          commitment_count: formData.commitments.length
        });

      if (insertError) throw insertError;

      onSuccess(formData);
    } catch (err) {
      setError('Failed to submit pledge. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="pledge-form" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Make Your Pledge</h2>
            <p className="text-xl text-gray-700">Join the movement for a sustainable future</p>
          </div>

          <form onSubmit={handleSubmit} className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-3xl p-8 md:p-12 shadow-xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">
                  Mobile Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  value={formData.mobile}
                  onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="+91 XXXXX XXXXX"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">
                  State / Region
                </label>
                <input
                  type="text"
                  value={formData.state}
                  onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Enter your state"
                />
              </div>
            </div>

            <div className="mb-8">
              <label className="block text-sm font-semibold text-gray-800 mb-3">
                Profile Type <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {(['Student', 'Working Professional', 'Other'] as const).map((type) => (
                  <label
                    key={type}
                    className={`flex items-center justify-center p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      formData.profile_type === type
                        ? 'border-blue-500 bg-blue-100'
                        : 'border-gray-300 bg-white hover:border-blue-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="profile_type"
                      value={type}
                      checked={formData.profile_type === type}
                      onChange={(e) => setFormData({ ...formData, profile_type: e.target.value as any })}
                      className="sr-only"
                    />
                    <span className="font-medium text-gray-800">{type}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Choose Your Commitments</h3>
              <p className="text-gray-700 mb-6">Select the climate-positive actions you pledge to take</p>

              {Object.entries(commitmentThemes).map(([theme, commitments]) => (
                <div key={theme} className="mb-6 bg-white rounded-2xl p-6 shadow-md">
                  <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    {theme}
                  </h4>
                  <div className="space-y-3">
                    {commitments.map((commitment) => (
                      <label
                        key={commitment}
                        className="flex items-start gap-3 cursor-pointer group"
                      >
                        <div className="relative flex items-center justify-center w-6 h-6 mt-0.5">
                          <input
                            type="checkbox"
                            checked={formData.commitments.includes(commitment)}
                            onChange={() => handleCheckboxChange(commitment)}
                            className="sr-only"
                          />
                          <div className={`w-6 h-6 rounded-md border-2 transition-all ${
                            formData.commitments.includes(commitment)
                              ? 'bg-blue-500 border-blue-500'
                              : 'border-gray-300 group-hover:border-blue-400'
                          }`}>
                            {formData.commitments.includes(commitment) && (
                              <Check className="w-5 h-5 text-white" />
                            )}
                          </div>
                        </div>
                        <span className="text-gray-700 group-hover:text-gray-900 transition-colors">
                          {commitment}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-8 flex items-start gap-3">
              <Shield className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-blue-900">
                <strong>Privacy Notice:</strong> Your mobile number and email are required for validation but will never be shown publicly. Your data is used only for verification and engagement purposes.
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 text-red-700">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-4 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Submitting...' : 'Submit My Pledge'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
