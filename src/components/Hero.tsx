import { Leaf, Heart } from 'lucide-react';

interface HeroProps {
  onTakePledge: () => void;
}

export default function Hero({ onTakePledge }: HeroProps) {
  return (
    <section className="relative bg-gradient-to-br from-blue-50 via-cyan-50 to-sky-50 overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-500 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="container mx-auto px-4 py-20 md:py-32 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg mb-8 animate-fade-in">
            <Leaf className="w-5 h-5 text-blue-600" />
            <span className="text-sm font-semibold text-blue-800">Join the Climate Movement</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 animate-slide-up">
            Take the
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600"> Climate Action </span>
            Pledge
          </h1>

          <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-3xl mx-auto animate-slide-up delay-100">
            Every small action counts. Join thousands making a real difference for our planet's future.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up delay-200">
            <button
              onClick={onTakePledge}
              className="group bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center gap-2"
            >
              <Heart className="w-5 h-5 group-hover:animate-pulse" />
              Take the Pledge Now
            </button>

            <button
              onClick={() => document.getElementById('pledge-wall')?.scrollIntoView({ behavior: 'smooth' })}
              className="text-gray-700 px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/50 transition-all duration-300"
            >
              View Pledge Wall
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
