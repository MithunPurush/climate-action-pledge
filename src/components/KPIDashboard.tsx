import { useEffect, useState } from 'react';
import { Target, Users, Briefcase, Award } from 'lucide-react';
import { supabase, KPIStats } from '../lib/supabase';

export default function KPIDashboard() {
  const [stats, setStats] = useState<KPIStats>({
    total: 0,
    students: 0,
    professionals: 0,
    workshops: 0
  });

  const TARGET = 1000000;

  useEffect(() => {
    fetchStats();

    const channel = supabase
      .channel('pledges-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'pledges' }, () => {
        fetchStats();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchStats = async () => {
    const { data, error } = await supabase
      .from('pledges')
      .select('profile_type');

    if (error) {
      console.error('Error fetching stats:', error);
      return;
    }

    const total = data?.length || 0;
    const students = data?.filter(p => p.profile_type === 'Student').length || 0;
    const professionals = data?.filter(p => p.profile_type === 'Working Professional').length || 0;
    const workshops = data?.filter(p => p.profile_type === 'Other').length || 0;

    setStats({ total, students, professionals, workshops });
  };

  const percentage = ((stats.total / TARGET) * 100).toFixed(2);

  const statCards = [
    {
      icon: Target,
      label: 'Target Pledges',
      value: TARGET.toLocaleString(),
      color: 'from-slate-500 to-slate-600',
      bgColor: 'bg-slate-50'
    },
    {
      icon: Users,
      label: 'Achieved Pledges',
      value: stats.total.toLocaleString(),
      color: 'from-blue-500 to-cyan-600',
      bgColor: 'bg-blue-50'
    },
    {
      icon: Award,
      label: 'Students',
      value: stats.students.toLocaleString(),
      color: 'from-amber-500 to-orange-600',
      bgColor: 'bg-amber-50'
    },
    {
      icon: Briefcase,
      label: 'Working Professionals',
      value: stats.professionals.toLocaleString(),
      color: 'from-violet-500 to-purple-600',
      bgColor: 'bg-violet-50'
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Live Impact Dashboard</h2>
            <div className="max-w-2xl mx-auto">
              <div className="bg-gray-100 rounded-full h-4 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-blue-500 to-cyan-600 h-full rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${Math.min(parseFloat(percentage), 100)}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-600 mt-2">{percentage}% towards our goal</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {statCards.map((stat, index) => (
              <div
                key={index}
                className={`${stat.bgColor} rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105`}
              >
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${stat.color} text-white mb-4`}>
                  <stat.icon className="w-6 h-6" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-sm font-medium text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
