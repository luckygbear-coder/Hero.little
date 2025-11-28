import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Star, Square, Scissors, Hand, MessageCircle, RefreshCw, Trophy, Frown, Map as MapIcon, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import heroImg from '@assets/generated_images/cute_vector_hero_avatar.png';
import monsterImg from '@assets/generated_images/cute_vector_monster_avatar.png';

type Move = 'rock' | 'scissors' | 'paper';

interface MonsterConfig {
  name: string;
  talent: Move;
  forbidden: Move | null;
  description: string;
  location: string;
}

interface LittleHeroGameProps {
  selectedHeroName?: string;
}

const MOVES: { id: Move; label: string; icon: React.ElementType; emoji: string }[] = [
  { id: 'rock', label: '石頭', icon: Square, emoji: '✊' },
  { id: 'scissors', label: '剪刀', icon: Scissors, emoji: '✌️' },
  { id: 'paper', label: '布', icon: Hand, emoji: '🖐' },
];

const STAGES: Record<number, MonsterConfig> = {
  1: { name: "哭哭史萊姆", talent: "rock", forbidden: "paper", location: "新手草原", description: "住著愛哭又迷惘的「哭哭史萊姆」。" },
  2: { name: "暴躁火球", talent: "rock", forbidden: "paper", location: "熾熱丘陵", description: "一不小心就會爆炸的「暴躁火球」。" },
  3: { name: "壞心情南瓜", talent: "rock", forbidden: "paper", location: "南瓜農場", description: "嘴巴很兇、其實很寂寞的「壞心情南瓜」。" },
  4: { name: "哭哭菇菇", talent: "paper", forbidden: "scissors", location: "蘑菇森林", description: "常常覺得自己不夠好的「哭哭菇菇」。" },
  5: { name: "悲傷骷髏", talent: "rock", forbidden: "paper", location: "墓園小丘", description: "以為自己沒人愛的「悲傷骷髏」。" },
  6: { name: "黏黏史萊姆", talent: "rock", forbidden: "paper", location: "黏黏沼澤", description: "總是黏住不想放手的「黏黏史萊姆」。" },
  7: { name: "兇暴狼人", talent: "rock", forbidden: "paper", location: "魔狼森林", description: "看起來超兇，其實怕孤單的「兇暴狼人」。" },
  8: { name: "小惡魔", talent: "rock", forbidden: "scissors", location: "惡作劇山丘", description: "愛捉弄人的「小惡魔」。" },
  9: { name: "？？？", talent: "scissors", forbidden: "rock", location: "祕密關卡", description: "神祕的魔物正在等你，完成其他關卡後再來吧！" },
};

const LOVE_SENTENCES = [
  "你不需要完美，也值得被好好愛著。", "哭一哭也沒關係，我會在這裡陪你。", "當你說出心裡話的時候，你就很勇敢。",
  "生氣的你、難過的你，我都一樣喜歡。", "你願意再試一次，已經超棒了。", "你不是一個人，我們一起想辦法。",
  "每一種情緒都在提醒你：你很重要。", "今天的你，已經很努力照顧自己了。", "需要休息的時候，停下來也可以喔。",
  "你可以慢慢來，世界不會把你丟下。", "就算事情沒照計畫走，你的價值不會變。", "你願意求助，就是很大的勇氣。",
  "當你溫柔對待自己時，世界也會變溫柔。", "你心裡的小小聲音，我都有在聽。", "有時候迷路，才會發現新的風景。",
  "你的眼淚不是麻煩，而是需要被看見的訊號。", "你現在的樣子，就足夠可愛了。", "不開心的時候也可以被喜歡，真的可以。",
  "你願意在這裡，就是一件值得被擁抱的事。", "你已經做得很好，不用跟別人比。", "不用裝作沒事，有事我們一起面對。",
  "你可以說「我需要抱抱」，這很勇敢。", "當你照顧自己時，也是對世界的一種溫柔。", "小小的你，也有大大的影響力。",
  "你每一次努力，愛都會默默記得。", "就算被誤解，也不代表你是不好的孩子。", "你可以慢慢長大，不用急著變厲害。",
  "你值得被好好傾聽，不只是被教訓。", "當你願意原諒自己時，心會變得比較輕。", "你是獨一無二的禮物，世界因你而不同。"
];

const COURAGE_SENTENCES = [
  "勇氣不是不害怕，而是害怕還是願意試試看。", "你今天跨出的小小一步，都是大大的進步。", "失敗一次不代表結束，只代表在練習。",
  "每當你說「我想再試一次」，勇氣星星就亮起來。", "願意承認「我不懂」，本身就是一種超級勇敢。", "當你保護自己和別人的界線，你就是小小守護者。",
  "說出「我不喜歡這樣」，也是勇氣的超能力。", "每當你選擇溫柔而不是傷害，你就在發光。", "害怕時願意求救，是勇者才會做的事。",
  "你願意為重要的人多走一步，就是愛的勇氣。", "面對自己的情緒，比面對怪物還要厲害。", "每一次鼓起勇氣說「可以幫幫我嗎」，星星就會為你拍手。",
  "當你替別人說句公道話，你就是正義的小勇者。", "不放棄的你，遠比自己想像中更強大。", "道歉並不丟臉，而是心變得更柔軟的證明。",
  "當你願意原諒自己，就有能力擁抱別人。", "勇氣星星說：「慢慢來也沒關係，只要你還在路上。」", "今天努力活著的你，本身就是超級任務完成。",
  "你學會向前，也學會後退一步看更清楚。", "不管結果如何，你願意參與，就已經很值得被稱讚。"
];

const BINGO_LINES = [
  [1, 2, 3], [4, 5, 6], [7, 8, 9], // Rows
  [1, 4, 7], [2, 5, 8], [3, 6, 9], // Cols
  [1, 5, 9], [3, 5, 7]             // Diagonals
];

export default function LittleHeroGame({ selectedHeroName = "戰士" }: LittleHeroGameProps) {
  const [view, setView] = useState<'map' | 'battle'>('map');
  const [clearedStages, setClearedStages] = useState<number[]>([]);
  const [selectedStage, setSelectedStage] = useState<number | null>(null);
  const [loveMsg, setLoveMsg] = useState<string | null>(null);
  const [courageMsg, setCourageMsg] = useState<string | null>(null);
  
  // Battle State
  const [battleLog, setBattleLog] = useState<string[]>([]);
  const [monsterMood, setMonsterMood] = useState(3); // Mock mood HP
  const [heroHp, setHeroHp] = useState(3);
  const [isBattleOver, setIsBattleOver] = useState<'win' | 'lose' | null>(null);
  const [completedLines, setCompletedLines] = useState<number[]>([]);

  // Hero Info
  const heroId = selectedHeroName.includes("戰士") ? "戰士" : 
                 selectedHeroName.includes("法師") ? "法師" : 
                 selectedHeroName.includes("牧師") ? "牧師" : "村民";
  
  const getHeroTalent = () => {
    if (heroId === "戰士") return 'rock';
    if (heroId === "法師") return 'scissors';
    if (heroId === "牧師") return 'paper';
    return 'any';
  };

  const heroTalent = getHeroTalent();

  const checkBingo = (newCleared: number[]) => {
    let newLines: number[] = [];
    BINGO_LINES.forEach((line, idx) => {
      if (line.every(cell => newCleared.includes(cell))) {
        newLines.push(idx);
      }
    });
    
    // Check if we found NEW lines that weren't completed before
    const newlyCompleted = newLines.filter(x => !completedLines.includes(x));
    if (newlyCompleted.length > 0) {
      setCompletedLines(newLines);
      setCourageMsg(COURAGE_SENTENCES[Math.floor(Math.random() * COURAGE_SENTENCES.length)]);
    }
  };

  const handleStageSelect = (stageId: number) => {
    setSelectedStage(stageId);
    setLoveMsg(null);
    setCourageMsg(null);
  };

  const startBattle = () => {
    if (selectedStage) {
      setView('battle');
      setMonsterMood(3);
      setHeroHp(3);
      setBattleLog([]);
      setIsBattleOver(null);
    }
  };

  const handleBattleMove = (playerMove: Move) => {
    if (isBattleOver || !selectedStage) return;

    const monsterConfig = STAGES[selectedStage];
    const allowedMoves: Move[] = ['rock', 'paper', 'scissors'].filter(m => m !== monsterConfig.forbidden) as Move[];
    // Add talent to pool to increase its chance (simple weighted random)
    const movePool = [...allowedMoves, monsterConfig.talent]; 
    const monsterMove = movePool[Math.floor(Math.random() * movePool.length)] as Move;

    let result = 'draw';
    if (
      (playerMove === 'rock' && monsterMove === 'scissors') ||
      (playerMove === 'scissors' && monsterMove === 'paper') ||
      (playerMove === 'paper' && monsterMove === 'rock')
    ) {
      result = 'win';
    } else if (playerMove !== monsterMove) {
      result = 'lose';
    }

    const playerEmoji = MOVES.find(m => m.id === playerMove)?.emoji;
    const monsterEmoji = MOVES.find(m => m.id === monsterMove)?.emoji;
    let logMsg = `你: ${playerEmoji} vs 魔物: ${monsterEmoji}。`;

    if (result === 'win') {
      let damage = 1;
      if (heroTalent === playerMove) {
        damage = 2;
        logMsg += " ✨ 天賦發動！好心情加倍！";
      } else {
        logMsg += " 成功安撫！";
      }
      
      const newMood = Math.max(0, monsterMood - damage);
      setMonsterMood(newMood);
      setBattleLog(prev => [logMsg, ...prev]);

      if (newMood === 0) {
        setIsBattleOver('win');
        if (!clearedStages.includes(selectedStage)) {
          const newCleared = [...clearedStages, selectedStage];
          setClearedStages(newCleared);
          checkBingo(newCleared);
          setLoveMsg(LOVE_SENTENCES[Math.floor(Math.random() * LOVE_SENTENCES.length)]);
        }
      }
    } else if (result === 'lose') {
      setHeroHp(prev => prev - 1);
      logMsg += " 被壞情緒影響了...";
      setBattleLog(prev => [logMsg, ...prev]);
      if (heroHp - 1 <= 0) {
        setIsBattleOver('lose');
      }
    } else {
      logMsg += " 平手！再試一次。";
      setBattleLog(prev => [logMsg, ...prev]);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 font-sans">
      <Card className="border-0 bg-[#fffdf8] shadow-xl rounded-2xl overflow-hidden relative flex flex-col min-h-[600px]">
        
        {/* Top Bar */}
        <div className="bg-[#fff7e6] p-4 flex justify-between items-center border-b border-[#f2dcc0] text-[#8a5b2c] font-bold text-sm sm:text-lg">
          <div className="flex items-center gap-2">
             <div className="flex gap-1">
               {Array.from({ length: 3 }).map((_, i) => (
                  <Heart key={i} className={`w-5 h-5 ${i < heroHp ? 'fill-red-500 text-red-500' : 'text-gray-300'}`} />
               ))}
             </div>
             <span className="text-xs bg-[#fff1cf] px-2 py-1 rounded-full border border-[#e1b676]">
               {selectedHeroName}
             </span>
          </div>
          <div className="flex items-center gap-1 text-yellow-600">
            <Star className="w-5 h-5 fill-yellow-400 text-yellow-500" />
            <span>{clearedStages.length} / 9</span>
          </div>
        </div>

        <div className="flex-1 p-4 sm:p-6 overflow-y-auto">
          {view === 'map' ? (
            <div className="space-y-6 animate-in fade-in">
              <div className="text-center mb-4">
                <h3 className="text-xl font-bold text-[#8b4a24] flex items-center justify-center gap-2">
                  <MapIcon className="w-6 h-6" /> 冒險地圖
                </h3>
                <p className="text-[#c07a34] text-sm mt-1">選擇一個地點，安撫那裡的壞情緒魔物吧！</p>
              </div>

              {/* 9-Grid Map */}
              <div className="grid grid-cols-3 gap-3 max-w-md mx-auto">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(id => {
                  const stage = STAGES[id];
                  const isCleared = clearedStages.includes(id);
                  const isSelected = selectedStage === id;
                  
                  return (
                    <motion.div
                      key={id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleStageSelect(id)}
                      className={`
                        relative aspect-square rounded-xl border-2 p-2 flex flex-col items-center justify-center text-center cursor-pointer transition-all
                        ${isSelected 
                          ? 'border-[#ff8b4a] bg-[#fff0d4] shadow-[0_0_0_2px_#ffe5c5] z-10' 
                          : 'border-[#d4b073] bg-gradient-to-br from-[#ffeec9] to-[#fffaf0]'
                        }
                      `}
                    >
                      <div className="text-xs text-[#9a6a3a] font-bold mb-1">{stage.location}</div>
                      {isCleared ? (
                        <Star className="w-8 h-8 text-yellow-400 fill-yellow-400" />
                      ) : (
                        <div className="w-8 h-8 bg-[#ffcf73] rounded-full flex items-center justify-center text-lg">
                           {id === 9 ? '👑' : '👾'}
                        </div>
                      )}
                      <div className="absolute top-1 right-2 text-[10px] text-[#9a6a3a] opacity-50">{id}</div>
                      {isCleared && <div className="absolute bottom-1 left-1/2 -translate-x-1/2 bg-[#ffeb8a] text-[#4a260f] text-[9px] px-2 rounded-full whitespace-nowrap">已通關</div>}
                    </motion.div>
                  );
                })}
              </div>

              {/* Info Panel */}
              <div className="bg-[#fff1cf] rounded-xl p-4 border border-[#e1b676] min-h-[120px] relative">
                {selectedStage ? (
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-bold text-[#8b4a24] text-lg flex items-center gap-2">
                        {STAGES[selectedStage].location} - {STAGES[selectedStage].name}
                        {clearedStages.includes(selectedStage) && <Badge className="bg-green-500 hover:bg-green-600">已淨化</Badge>}
                      </h4>
                      <p className="text-[#5a4637] text-sm mt-1">{STAGES[selectedStage].description}</p>
                    </div>
                    
                    <div className="flex gap-2 text-xs">
                      <span className="bg-[#ffe8c6] text-[#8a5b2c] px-2 py-1 rounded-full">
                        天賦: {MOVES.find(m => m.id === STAGES[selectedStage].talent)?.label}
                      </span>
                      <span className="bg-[#ffe8c6] text-[#8a5b2c] px-2 py-1 rounded-full">
                        忌: {MOVES.find(m => m.id === STAGES[selectedStage].forbidden)?.label}
                      </span>
                    </div>

                    {/* Rewards Display */}
                    {(loveMsg || courageMsg) && (
                      <div className="space-y-2 mt-2 pt-2 border-t border-[#e1b676]/30">
                        {loveMsg && (
                          <div className="bg-[#ffeef2] text-[#6d3b3b] p-2 rounded-lg text-sm border border-[#f1a7b3] animate-in zoom-in">
                            💗 <b>愛的力量：</b>{loveMsg}
                          </div>
                        )}
                        {courageMsg && (
                          <div className="bg-[#f4ffdd] text-[#4a4a24] p-2 rounded-lg text-sm border border-[#c6e484] animate-in zoom-in delay-150">
                            ⭐ <b>勇氣星星：</b>{courageMsg}
                          </div>
                        )}
                      </div>
                    )}

                    <div className="flex justify-center pt-2">
                      <Button 
                        onClick={startBattle} 
                        className="bg-[#ff8b4a] hover:bg-[#e87a3a] text-white rounded-full px-8 font-bold shadow-md"
                      >
                        ⚔️ 進入戰鬥
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-full text-[#7a5635] text-sm">
                    請點擊上方地圖選擇一個關卡...
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="space-y-6 animate-in slide-in-from-right">
              {/* Battle Header */}
              <div className="flex justify-between items-start bg-[#fffaf0] p-4 rounded-xl border border-[#e1b676]">
                <div className="text-center w-1/3">
                  <img src={heroImg} alt="Hero" className="w-16 h-16 mx-auto rounded-full border-2 border-[#ff8b4a] bg-white mb-2" />
                  <div className="font-bold text-[#8b4a24] text-sm">{selectedHeroName}</div>
                  <div className="text-xs text-[#c07a34]">{heroTalent === 'any' ? '自由拳' : MOVES.find(m=>m.id===heroTalent)?.label}</div>
                </div>
                <div className="text-center pt-4">
                  <div className="text-2xl font-black text-[#d4b073] italic">VS</div>
                </div>
                <div className="text-center w-1/3">
                  <img 
                    src={monsterImg} 
                    alt="Monster" 
                    className={`w-16 h-16 mx-auto rounded-full border-2 border-[#d4b073] bg-white mb-2 ${isBattleOver === 'win' ? 'filter brightness-110' : 'filter grayscale-[30%]'}`} 
                  />
                  <div className="font-bold text-[#8b4a24] text-sm">{selectedStage && STAGES[selectedStage].name}</div>
                  <div className="text-xs text-[#c07a34]">
                    忌: {selectedStage && MOVES.find(m => m.id === STAGES[selectedStage].forbidden)?.label}
                  </div>
                </div>
              </div>

              {/* Monster HP / Mood */}
              <div className="text-center">
                <div className="text-xs text-[#5a4637] mb-1">魔物壞情緒指數</div>
                <div className="flex justify-center gap-1">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <Frown key={i} className={`w-6 h-6 ${i < monsterMood ? 'fill-orange-500 text-orange-600' : 'text-gray-200'}`} />
                  ))}
                </div>
              </div>

              {/* Bear Tip */}
              <div className="bg-[#e9f5ff] p-3 rounded-lg border border-dashed border-[#7aa7d9] text-[#34516f] text-sm flex gap-2 items-start">
                <MessageCircle className="w-5 h-5 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold">村長熊熊：</span>
                  {selectedStage && `這隻魔物不能出「${MOVES.find(m => m.id === STAGES[selectedStage].forbidden)?.label}」，試著抓住這個弱點吧！`}
                </div>
              </div>

              {/* Battle Actions */}
              {!isBattleOver ? (
                <div className="flex justify-center gap-4 py-4">
                  {MOVES.map((move) => (
                    <Button
                      key={move.id}
                      onClick={() => handleBattleMove(move.id)}
                      className={`
                        flex-col h-20 w-20 rounded-full border-4 
                        ${heroTalent === move.id ? 'border-[#ffc25e] bg-[#fff4cf]' : 'border-[#ffd38a] bg-[#fffbf0]'}
                        hover:bg-[#ffeec9] text-[#4a260f]
                      `}
                      variant="outline"
                    >
                      <span className="text-2xl mb-1">{move.emoji}</span>
                      <span className="text-xs font-bold">{move.label}</span>
                    </Button>
                  ))}
                </div>
              ) : (
                <div className="text-center space-y-4 py-4 animate-in zoom-in">
                  {isBattleOver === 'win' ? (
                    <div className="p-4 bg-[#f4ffdd] border border-[#c6e484] rounded-xl text-[#4a4a24]">
                      <Trophy className="w-10 h-10 mx-auto mb-2 text-yellow-500" />
                      <h3 className="font-bold text-lg">安撫成功！</h3>
                      <p className="text-sm">魔物恢復了笑容，你也獲得了愛的力量！</p>
                    </div>
                  ) : (
                    <div className="p-4 bg-[#ffeef2] border border-[#f1a7b3] rounded-xl text-[#6d3b3b]">
                      <Frown className="w-10 h-10 mx-auto mb-2 text-red-400" />
                      <h3 className="font-bold text-lg">挑戰失敗...</h3>
                      <p className="text-sm">沒關係，深呼吸調整心情，再試一次！</p>
                    </div>
                  )}
                  
                  <div className="flex justify-center gap-3">
                    {isBattleOver === 'lose' && (
                      <Button onClick={startBattle} variant="outline" className="border-[#ff8b4a] text-[#ff8b4a]">
                        <RefreshCw className="w-4 h-4 mr-2" /> 再試一次
                      </Button>
                    )}
                    <Button onClick={() => setView('map')} className="bg-[#ff8b4a] hover:bg-[#e87a3a] text-white">
                      <ArrowLeft className="w-4 h-4 mr-2" /> 回到地圖
                    </Button>
                  </div>
                </div>
              )}

              {/* Log */}
              <div className="bg-white/50 rounded-xl p-3 h-32 overflow-y-auto text-sm border border-[#e1b676]/30 space-y-1">
                {battleLog.map((log, i) => (
                  <div key={i} className="pb-1 border-b border-dashed border-gray-200 last:border-0 text-[#5a4637]">
                    {i === 0 ? <b>➤ {log}</b> : <span className="opacity-70">{log}</span>}
                  </div>
                ))}
                {battleLog.length === 0 && <div className="text-center text-gray-400 italic pt-4">戰鬥即將開始...</div>}
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
