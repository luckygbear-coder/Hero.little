import { Link } from "wouter";
import { Heart, Users, Star, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import LittleHeroGame from "@/components/LittleHeroGame";

export default function Home() {
  return (
    <div className="min-h-screen bg-background font-sans">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-border/50">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold shadow-sm">
              LH
            </div>
            <span className="font-display font-bold text-xl text-primary-foreground">Little Hero</span>
          </div>
          
          <div className="hidden md:flex items-center gap-6 text-sm font-bold text-muted-foreground">
            <a href="#" className="hover:text-primary transition-colors">Community</a>
            <a href="#" className="hover:text-primary transition-colors">Matches</a>
            <a href="#" className="hover:text-primary transition-colors">Leaderboard</a>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm">Log In</Button>
            <Button size="sm" className="rounded-full">Sign Up</Button>
          </div>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-4 py-8 space-y-16">
        
        {/* Story Section */}
        <section id="story" className="bg-[#fff7e6] p-6 md:p-8 rounded-xl border-2 border-[#e7c899] mx-auto max-w-4xl font-sans shadow-sm">
            <h2 className="text-center text-2xl text-[#8b4a24] mb-4 font-bold">🌟 小勇者之旅大冒險</h2>

            <h3 className="text-[#b46a2b] mt-6 font-bold text-lg">📖 故事背景</h3>
            <p className="leading-relaxed text-[#5a4637] mt-2">
                在遙遠的「星星王國」裡，所有魔物原本都快快樂樂地生活著。
                直到某一天，一股神秘的「壞情緒黑霧」突然降臨，
                魔物們被影響得哭哭啼啼、暴躁生氣、失去笑容！
            </p>
            <p className="leading-relaxed text-[#5a4637] mt-2">
                星星王國的孩子們被選中成為「小勇者」，
                只要用 <strong className="text-[#8b4a24]">剪刀、石頭、布</strong> 的勇氣之力，
                就能解除魔物的壞情緒，
                讓牠們再次露出幸福的笑容。
            </p>
            <p className="leading-relaxed text-[#5a4637] mt-2">
                村長熊熊會一路陪伴你，
                提醒魔物的弱點，
                幫助你順利通關！
            </p>

            <h3 className="text-[#b46a2b] mt-6 font-bold text-lg">🎮 遊戲玩法介紹</h3>
            <ul className="leading-relaxed text-[#5a4637] pl-5 list-disc mt-2 space-y-1">
                <li>與魔物進行剪刀石頭布對決。</li>
                <li>每隻魔物都有「天賦拳」與「不能出的弱點拳」。</li>
                <li>出對拳 → 傳遞好心情，讓魔物變得開心！</li>
                <li>擊敗一隻魔物後會進入下一關（關卡模式）。</li>
                <li>全部魔物恢復笑容後，即可完成冒險！</li>
            </ul>

            <h3 className="text-[#b46a2b] mt-6 font-bold text-lg">🧸 村長熊熊的提示</h3>
            <div className="bg-[#fffaf0] p-3 rounded-lg border border-[#e7c899] mt-2">
                <p className="leading-relaxed text-[#5a4637]">
                    「小勇者別擔心！我會告訴你魔物不能出什麼拳，
                    只要記住魔物的弱點，你一定能成功讓牠們開心起來！」  
                </p>
            </div>

            <p className="text-center mt-8 text-xl text-[#8b4a24] font-bold animate-pulse">
                ⭐ 準備好你的勇氣，一起出發吧！ ⭐
            </p>
        </section>

        {/* Game Section */}
        <section className="relative">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent rounded-3xl -z-10 transform scale-105" />
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
          <h2 className="text-xl mb-6 flex items-center gap-2">
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
                      <div className="font-bold text-sm group-hover:text-primary transition-colors">AdventureUser_{900+i}</div>
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
      <div className="w-12 h-12 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-4 text-secondary-foreground">
        <Icon className="w-6 h-6" />
      </div>
      <h3 className="font-bold text-lg mb-2">{title}</h3>
      <p className="text-muted-foreground text-sm leading-relaxed">{desc}</p>
    </div>
  )
}
