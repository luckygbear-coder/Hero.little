import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BookOpen, Gamepad2, Skull, Settings, Home as HomeIcon, Rocket } from "lucide-react";

interface GameMenuProps {
  onStartGame: () => void;
}

export default function GameMenu({ onStartGame }: GameMenuProps) {
  return (
    <div className="w-full max-w-4xl mx-auto font-sans">
      <Card className="bg-[#fff7e6] border-2 border-[#e1b676] shadow-md rounded-2xl p-4 md:p-6">
        
        <div className="text-center mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-[#8b4a24] mb-2">小勇者之旅大冒險</h1>
          <div className="text-[#c07a34] text-sm font-medium">情緒與勇氣的奇幻之旅 ✨</div>
        </div>

        <Tabs defaultValue="home" className="w-full">
          <TabsList className="w-full flex flex-wrap justify-start md:justify-center gap-2 bg-transparent h-auto p-0 mb-6">
            <TabsTrigger 
              value="home" 
              className="flex-1 min-w-[100px] rounded-full bg-[#f5d29a] text-[#5a3218] data-[state=active]:bg-[#ffb54a] data-[state=active]:text-[#4a260f] border border-transparent data-[state=active]:border-white/50"
            >
              <HomeIcon className="w-4 h-4 mr-2" /> 主選單
            </TabsTrigger>
            <TabsTrigger 
              value="story" 
              className="flex-1 min-w-[100px] rounded-full bg-[#f5d29a] text-[#5a3218] data-[state=active]:bg-[#ffb54a] data-[state=active]:text-[#4a260f] border border-transparent data-[state=active]:border-white/50"
            >
              <BookOpen className="w-4 h-4 mr-2" /> 故事背景
            </TabsTrigger>
            <TabsTrigger 
              value="howto" 
              className="flex-1 min-w-[100px] rounded-full bg-[#f5d29a] text-[#5a3218] data-[state=active]:bg-[#ffb54a] data-[state=active]:text-[#4a260f] border border-transparent data-[state=active]:border-white/50"
            >
              <Gamepad2 className="w-4 h-4 mr-2" /> 玩法教學
            </TabsTrigger>
            <TabsTrigger 
              value="monsters" 
              className="flex-1 min-w-[100px] rounded-full bg-[#f5d29a] text-[#5a3218] data-[state=active]:bg-[#ffb54a] data-[state=active]:text-[#4a260f] border border-transparent data-[state=active]:border-white/50"
            >
              <Skull className="w-4 h-4 mr-2" /> 魔物圖鑑
            </TabsTrigger>
            <TabsTrigger 
              value="settings" 
              className="flex-1 min-w-[100px] rounded-full bg-[#f5d29a] text-[#5a3218] data-[state=active]:bg-[#ffb54a] data-[state=active]:text-[#4a260f] border border-transparent data-[state=active]:border-white/50"
            >
              <Settings className="w-4 h-4 mr-2" /> 設定/說明
            </TabsTrigger>
          </TabsList>

          <div className="bg-[#fffdf8] rounded-xl p-4 md:p-6 border border-[#f0d2a4] min-h-[300px]">
            
            {/* Home Tab */}
            <TabsContent value="home" className="mt-0 space-y-6 animate-in fade-in slide-in-from-bottom-2">
              <div className="text-center space-y-4 py-4">
                <p className="text-[#5a4637] text-lg leading-relaxed">
                  歡迎來到星星王國！<br/>
                  跟著村長熊熊，一起用剪刀、石頭、布的力量，<br/>
                  幫魔物們找回好心情吧！
                </p>

                <div className="pt-4">
                  <Button 
                    onClick={onStartGame}
                    className="bg-[#ff8b4a] hover:bg-[#e87a3a] text-white rounded-full px-8 py-6 text-lg font-bold shadow-[0_4px_0_#c8662b] active:translate-y-1 active:shadow-[0_1px_0_#c8662b] transition-all"
                  >
                    <Rocket className="w-6 h-6 mr-2" /> 🚀 開始冒險
                  </Button>
                </div>
              </div>

              <div className="bg-[#fff1cf] border border-dashed border-[#e1b676] rounded-xl p-4 text-sm text-[#7a5635]">
                <span className="font-bold block mb-1">🌟 建議給家長／玩家的小提醒：</span>
                這款遊戲會出現哭哭、生氣、害怕等壞情緒魔物，
                透過輕鬆的猜拳對戰，引導孩子認識與表達情緒。
              </div>
            </TabsContent>

            {/* Story Tab */}
            <TabsContent value="story" className="mt-0 space-y-4 text-[#5a4637] animate-in fade-in slide-in-from-bottom-2">
              <h3 className="text-[#8b4a24] font-bold text-lg flex items-center">
                <BookOpen className="w-5 h-5 mr-2" /> 故事背景
              </h3>
              <p className="leading-relaxed">
                在遙遠的「星星王國」裡，所有魔物原本都快快樂樂地生活著。
                直到某一天，一股神秘的「壞情緒黑霧」突然降臨，
                魔物們被影響得哭哭啼啼、暴躁生氣、失去笑容！
              </p>
              <p className="leading-relaxed">
                星星王國的孩子們被選中成為「小勇者」，
                只要用 <strong className="text-[#ff8b4a]">剪刀、石頭、布</strong> 的勇氣之力，
                就能解除魔物的壞情緒，讓牠們再次露出幸福的笑容。
              </p>
              <p className="leading-relaxed">
                村長熊熊會一路陪伴你，提醒魔物的弱點，
                幫助你順利通關！
              </p>

              <h3 className="text-[#8b4a24] font-bold text-lg mt-6 flex items-center">
                <Rocket className="w-5 h-5 mr-2" /> 冒險目標
              </h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>讓 10 隻魔物全部恢復好心情。</li>
                <li>收集勇氣與好心情，守護星星王國。</li>
                <li>學會分辨情緒、說出感受、互相幫助。</li>
              </ul>
            </TabsContent>

            {/* How To Tab */}
            <TabsContent value="howto" className="mt-0 space-y-4 text-[#5a4637] animate-in fade-in slide-in-from-bottom-2">
              <h3 className="text-[#8b4a24] font-bold text-lg flex items-center">
                <Gamepad2 className="w-5 h-5 mr-2" /> 基本玩法
              </h3>
              <ul className="list-disc pl-5 space-y-2 leading-relaxed">
                <li>與魔物進行「剪刀、石頭、布」對決。</li>
                <li>每隻魔物都有「天賦拳」與「不能出的弱點拳」。</li>
                <li>出對拳 → 傳遞好心情，魔物會從哭哭變開心。</li>
                <li>當魔物變成開心版本，就會離開黑霧，回到星星王國。</li>
                <li>全部魔物變開心，即完成本次冒險！</li>
              </ul>

              <h3 className="text-[#8b4a24] font-bold text-lg mt-6">💡 小技巧</h3>
              <ul className="list-disc pl-5 space-y-2 leading-relaxed">
                <li>多觀察魔物卡牌上的圖示（✊ / ✌️ / 🖐）。</li>
                <li>記住「不能出的拳」，就比較不會被壞情緒影響。</li>
                <li>可以請小朋友先猜：這隻魔物現在是什麼心情？</li>
              </ul>
            </TabsContent>

            {/* Monsters Tab */}
            <TabsContent value="monsters" className="mt-0 space-y-4 text-[#5a4637] animate-in fade-in slide-in-from-bottom-2">
              <h3 className="text-[#8b4a24] font-bold text-lg flex items-center">
                <Skull className="w-5 h-5 mr-2" /> 魔物圖鑑（節錄）
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { name: "哭哭史萊姆", talent: "Rock", weak: "布" },
                  { name: "小惡魔", talent: "Rock", weak: "剪刀" },
                  { name: "懶惰樹精", talent: "Paper", weak: "石頭" },
                  { name: "暴躁火球", talent: "Rock", weak: "布" },
                  { name: "哭哭菇菇", talent: "Paper", weak: "剪刀" },
                  { name: "悲傷骷髏", talent: "Rock", weak: "布" },
                ].map((m, i) => (
                  <div key={i} className="bg-[#fff7e6] p-3 rounded-lg border border-[#e1b676]/50 flex justify-between items-center">
                    <span className="font-bold text-[#8b4a24]">{m.name}</span>
                    <span className="text-xs bg-[#f5d29a] px-2 py-1 rounded-full text-[#5a3218]">
                      忌：{m.weak}
                    </span>
                  </div>
                ))}
              </div>

              <div className="bg-[#fff1cf] border border-dashed border-[#e1b676] rounded-xl p-4 text-sm text-[#7a5635] mt-4">
                📌 提示：點擊「開始冒險」後，村長熊熊會在每一關提示你魔物的弱點喔！
              </div>
            </TabsContent>

            {/* Settings Tab */}
            <TabsContent value="settings" className="mt-0 space-y-4 text-[#5a4637] animate-in fade-in slide-in-from-bottom-2">
              <h3 className="text-[#8b4a24] font-bold text-lg flex items-center">
                <Settings className="w-5 h-5 mr-2" /> 設定 / 家長導覽
              </h3>
              <p className="leading-relaxed">
                這是一款結合「情緒教育」與「剪刀石頭布」的輕量遊戲，
                適合親子一起玩，建議年齡約 5 歲以上。
              </p>
              <ul className="list-disc pl-5 space-y-2 leading-relaxed">
                <li>可搭配真實卡牌／桌遊一起使用。</li>
                <li>
                  建議遊戲後和孩子聊聊：<br/>
                  「哪一隻魔物跟你很像？」<br/>
                  「你最近有出現什麼壞情緒嗎？」
                </li>
                <li>讓孩子知道：所有情緒都可以被看見與安撫。</li>
              </ul>

              <div className="mt-6 p-3 bg-gray-50 rounded text-xs text-gray-400 font-mono">
                Version 1.0.0 | Mockup Mode
              </div>
            </TabsContent>

          </div>
        </Tabs>
      </Card>
    </div>
  );
}
