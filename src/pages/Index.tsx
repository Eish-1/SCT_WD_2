import { Stopwatch } from '@/components/Stopwatch';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-card relative overflow-hidden">
      {/* Retro grid background */}
      <div className="absolute inset-0 retro-grid opacity-10"></div>
      
      {/* Scanlines effect */}
      <div className="absolute inset-0 scanlines"></div>
      
      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-black mb-4 bg-gradient-neon bg-clip-text text-transparent neon-glow animate-neon-pulse tracking-wider">
            HOTLINE TIMER
          </h1>
          <p className="text-accent font-bold tracking-widest text-lg animate-retro-flicker">
            {'>>>'} PRECISION TIMING SYSTEM {'<<<'}
          </p>
          <div className="mt-4 text-xs text-muted-foreground font-mono tracking-wider opacity-70">
            MIAMI • 1989 • NEON NIGHTS
          </div>
        </div>
        <Stopwatch />
      </div>
      
      {/* Ambient neon glow effects */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-40 h-40 bg-accent/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-secondary/10 rounded-full blur-3xl animate-pulse delay-500"></div>
    </div>
  );
};

export default Index;
