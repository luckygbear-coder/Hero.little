import { useRef } from "react";
import { Link } from "wouter";
import { Heart, Users, Star, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import LittleHeroGame from "@/components/LittleHeroGame";
import GameMenu from "@/components/GameMenu";

export default function Home() {
  const gameSectionRef = useRef<HTMLDivElement>(null);

  const scrollToGame = () => {
    gameSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background font-sans">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-border/50">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#ff8b4a] rounded-lg flex items-center justify-center text-white font-bold shadow-sm">
              LH
            </div>
            <span className="font-display font-bold text-xl text-[#8b4a24]">Little Hero</span>
          </div>
          
          <div className="hidden md:flex items-center gap-6 text-sm font-bold text-muted-foreground">
            <a href="#" className="hover:text-[#ff8b4a] transition-colors">Community</a>
            <a href="#" className="hover:text-[#ff8b4a] transition-colors">Matches</a>
            <a href="#" className="hover:text-[#ff8b4a] transition-colors">Leaderboard</a>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm">Log In</Button>
            <Button size="sm" className="rounded-full bg-[#ff8b4a] hover:bg-[#e87a3a]">Sign Up</Button>
          </div>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-4 py-8 space-y-16">
        
        {/* Game Menu / Guide Section */}
        <GameMenu onStartGame={scrollToGame} />

        {/* Game Section */}
        <section className="relative" ref={gameSectionRef}>
          <div className="absolute inset-0 bg-gradient-to-b from-[#ff8b4a]/5 to-transparent rounded-3xl -z-10 transform scale-105" />
          <LittleHeroGame />
          <div className="text-center mt-4 text-sm text-muted-foreground font-hand text-lg transform rotate-1">
            Try the demo above! 👆
          </div>
        </section>

        {/* Community / Features */}
        <section className="grid md:grid-cols-3 gap-6">
          <FeatureCard 
            icon={Users} 
            title="Find Your Party" 
            desc="Match with others based on playstyle and interests." 
          />
          <FeatureCard 
            icon={Heart} 
            title="Heal Together" 
            desc="Cooperative gameplay that focuses on empathy and support." 
          />
          <FeatureCard 
            icon={MessageCircle} 
            title="Cozy Chat" 
            desc="Connect with your matches in a safe, friendly environment." 
          />
        </section>

        {/* Recent Activity (Mock) */}
        <section className="bg-white rounded-2xl p-6 border border-border shadow-sm">
          <h2 className="text-xl mb-6 flex items-center gap-2 text-[#8b4a24] font-bold">
            <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
            Recent Heroes
          </h2>
          <div className="space-y-4">
             {[1, 2, 3].map((i) => (
               <div key={i} className="flex items-center justify-between p-3 hover:bg-secondary/10 rounded-lg transition-colors cursor-pointer group">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-100 overflow-hidden border-2 border-white shadow-sm">
                       <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i*123}`} alt="Avatar" />
                    </div>
                    <div>
                      <div className="font-bold text-sm group-hover:text-[#ff8b4a] transition-colors text-[#5a3218]">AdventureUser_{900+i}</div>
                      <div className="text-xs text-muted-foreground">Healed a Grumpy Dragon</div>
                    </div>
                  </div>
                  <Badge variant="secondary" className="opacity-50 group-hover:opacity-100">2m ago</Badge>
               </div>
             ))}
          </div>
        </section>

      </main>
      
      {/* Footer */}
      <footer className="border-t border-border/50 py-8 bg-white/50 mt-12">
        <div className="max-w-5xl mx-auto px-4 text-center text-sm text-muted-foreground">
           <p>© 2024 Little Hero Connect. Made with ❤️ and ✊✌️🖐.</p>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon: Icon, title, desc }: { icon: any, title: string, desc: string }) {
  return (
    <div className="bg-white p-6 rounded-xl border border-border shadow-sm hover:shadow-md transition-shadow text-center">
      <div className="w-12 h-12 bg-[#fff7e6] rounded-full flex items-center justify-center mx-auto mb-4 text-[#ff8b4a]">
        <Icon className="w-6 h-6" />
      </div>
      <h3 className="font-bold text-lg mb-2 text-[#8b4a24]">{title}</h3>
      <p className="text-muted-foreground text-sm leading-relaxed">{desc}</p>
    </div>
  )
}
