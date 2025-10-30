import { useEffect, useState } from 'react';
import { Heart, Users } from 'lucide-react';
import { supabase, Pledge } from '../lib/supabase';

export default function PledgeWall() {
  const [pledges, setPledges] = useState<Pledge[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPledges();

    const channel = supabase
      .channel('pledges-wall')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'pledges' }, () => {
        fetchPledges();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchPledges = async () => {
    try {
      const { data, error } = await supabase
        .from('pledges')
        .select('id, name, state, profile_type, commitment_count, created_at')
        .order('created_at', { ascending: false })
        .limit(50);

      if (error) throw error;
      setPledges(data || []);
    } catch (err) {
      console.error('Error fetching pledges:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getHeartRating = (count: number) => {
    return Math.min(count, 5);
  };

  return (
    <section id="pledge-wall" className="py-20 bg-gradient-to-br from-slate-50 to-gray-100">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-blue-100 px-4 py-2 rounded-full mb-4">
              <Users className="w-5 h-5 text-blue-700" />
              <span className="text-sm font-semibold text-blue-800">Public Pledge Wall</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Wall of Climate Champions
            </h2>
            <p className="text-xl text-gray-700">
              Join these incredible individuals making a difference for our planet
            </p>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-gray-600 mt-4">Loading pledges...</p>
            </div>
          ) : pledges.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center shadow-lg">
              <p className="text-xl text-gray-600">Be the first to take the pledge!</p>
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider">
                        Pledge ID
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider">
                        State
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider">
                        Profile
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider">
                        Love for Planet
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {pledges.map((pledge, index) => (
                      <tr
                        key={pledge.id}
                        className={`transition-colors hover:bg-blue-50 ${
                          index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                        }`}
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm font-mono text-gray-600">
                            {pledge.id.slice(0, 8)}...
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="font-semibold text-gray-900">{pledge.name}</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          {formatDate(pledge.created_at)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          {pledge.state || 'N/A'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                            {pledge.profile_type}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-1">
                            {Array.from({ length: getHeartRating(pledge.commitment_count) }).map((_, i) => (
                              <Heart key={i} className="w-5 h-5 fill-orange-500 text-orange-500" />
                            ))}
                            <span className="ml-2 text-sm text-gray-600">
                              ({pledge.commitment_count})
                            </span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {pledges.length >= 50 && (
                <div className="bg-gray-50 px-6 py-4 text-center text-sm text-gray-600">
                  Showing the latest 50 pledges
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
