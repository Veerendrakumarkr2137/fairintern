import React, { useEffect, useState } from 'react';
import { InternshipCard, InternshipCardProps } from '@/src/components/ui/InternshipCard';
import { Search, Filter } from 'lucide-react';
import { Canvas } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere } from '@react-three/drei';

function Hero3D() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
          <Sphere args={[1, 64, 64]} position={[-2, 0, -2]} scale={1.5}>
            <MeshDistortMaterial color="#5eead4" attach="material" distort={0.4} speed={2} opacity={0.3} transparent />
          </Sphere>
        </Float>
        <Float speed={1.5} rotationIntensity={1} floatIntensity={2}>
          <Sphere args={[1, 64, 64]} position={[2, 1, -3]} scale={1}>
            <MeshDistortMaterial color="#6366f1" attach="material" distort={0.3} speed={1.5} opacity={0.2} transparent />
          </Sphere>
        </Float>
      </Canvas>
    </div>
  );
}

export function Home() {
  const [internships, setInternships] = useState<InternshipCardProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/internships')
      .then(res => res.json())
      .then(data => {
        setInternships(data);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="relative pt-24 pb-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full flex flex-col items-center text-center">
        <Hero3D />
        <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight mb-6">
          Find <span className="text-primary-600">Fair</span> Internships. <br/>
          Avoid the Exploitation.
        </h1>
        <p className="text-xl text-slate-600 max-w-2xl mb-10">
          We use AI to analyze internship descriptions, highlighting skill-building opportunities and flagging unpaid, production-heavy roles.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md justify-center">
          <a href="#browse" className="px-8 py-3.5 bg-slate-900 text-white font-medium rounded-full hover:bg-slate-800 transition-colors shadow-lg shadow-slate-900/20">
            Browse Internships
          </a>
          <a href="/auth" className="px-8 py-3.5 bg-white text-slate-900 border border-slate-200 font-medium rounded-full hover:bg-slate-50 transition-colors">
            Post an Internship
          </a>
        </div>
      </section>

      {/* Search & Filter */}
      <section id="browse" className="bg-white border-y border-slate-200 py-6 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input 
              type="text" 
              placeholder="Search roles, companies..." 
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-full focus:outline-none focus:ring-2 focus:ring-primary-500 focus:bg-white transition-colors"
            />
          </div>
          <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-full text-sm font-medium text-slate-700 hover:bg-slate-50 whitespace-nowrap">
              <Filter className="w-4 h-4" /> Filters
            </button>
            <button className="px-4 py-2 bg-fair-50 border border-fair-200 rounded-full text-sm font-medium text-fair-800 hover:bg-fair-100 whitespace-nowrap">
              Fair Only
            </button>
            <button className="px-4 py-2 bg-white border border-slate-200 rounded-full text-sm font-medium text-slate-700 hover:bg-slate-50 whitespace-nowrap">
              Paid Only
            </button>
          </div>
        </div>
      </section>

      {/* Listings */}
      <section className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="h-64 bg-slate-100 rounded-2xl animate-pulse"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {internships.map(internship => (
              <InternshipCard key={internship.id} {...internship} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
