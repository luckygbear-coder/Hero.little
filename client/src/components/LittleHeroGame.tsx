import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Star, Square, Scissors, Hand, MessageCircle, RefreshCw, Trophy, Frown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import heroImg from '@assets/generated_images/cute_vector_hero_avatar.png';
import monsterImg from '@assets/generated_images/cute_vector_monster_avatar.png';

type Move = 'rock' | 'scissors' | 'paper';

interface Monster {
  key: string;
  zhName: string;
  talent: Move;
  weakness: Move;
  cured: boolean;
}

const MOVES: { id: Move; label: string; icon: React.ElementType; emoji: string }[] = [
  { id: 'rock', label: '石頭', icon: Square, emoji: '✊' },
  { id: 'scissors', label: '剪刀', icon: Scissors, emoji: '✌️' },
  { id: 'paper', label: '布', icon: Hand, emoji: '🖐' },
];

const MONSTERS_DATA: Monster[] = [
  { key: "slime", zhName: "史萊姆", talent: "rock", weakness: "paper", cured: false },
  { key: "crying_bat", zhName: "哭哭蝙蝠", talent: "paper", weakness: "scissors", cured: false },
  { key: "little_imp", zhName: "小惡魔", talent: "rock", weakness: "scissors", cured: false },
  { key: "lazy_treant", zhName: "懶懶樹精", talent: "paper", weakness: "rock", cured: false },
  { key: "grumpy_fireball", zhName: "火球怪", talent: "rock", weakness: "paper", cured: false },
  { key: "weeping_ghost", zhName: "哭哭鬼", talent: "scissors", weakness: "rock", cured: false },
  { key: "crying_mushroom", zhName: "哭哭香菇", talent: "paper", weakness: "scissors", cured: false },
  { key: "sad_skeleton", zhName: "哭哭骷髏", talent: "rock", weakness: "paper", cured: false },
  { key: "happy_pumpkin", zhName: "南瓜魔王", talent: "rock", weakness: "paper", cured: false },
  { key: "ferocious_werewolf", zhName: "狼人", talent: "rock", weakness: "paper", cured: false }
];

const MAX_HEARTS = 3;

export default function LittleHeroGame() {
  const [monsters, setMonsters] = useState<Monster[]>(JSON.parse(JSON.stringify(MONSTERS_DATA)));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hearts, setHearts] = useState(MAX_HEARTS);
  const [stars, setStars] = useState(0);
  const [message, setMessage] = useState("點選下面的拳，幫助小勇者安撫魔物吧！");
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Only for animation/visuals
  const [lastHeroMove, setLastHeroMove] = useState<Move | null>(null);
  const [lastMonsterMove, setLastMonsterMove] = useState<Move | null>(null);
  const [resultState, setResultState] = useState<'idle' | 'win' | 'lose' | 'tie'>('idle');

  const currentMonster = monsters[currentIndex];

  const resetGame = () => {
    setMonsters(JSON.parse(JSON.stringify(MONSTERS_DATA)));
    setCurrentIndex(0);
    setHearts(MAX_HEARTS);
    setStars(0);
    setMessage("新的冒險開始！點選拳，幫助小勇者再次出發～");
    setResultState('idle');
    setLastHeroMove(null);
    setLastMonsterMove(null);
    setIsProcessing(false);
  };

  const getMonsterMove = (monster: Monster): Move => {
    const allMoves: Move[] = ["rock", "paper", "scissors"];
    const options = allMoves.filter(m => m !== monster.weakness);
    const idx = Math.floor(Math.random() * options.length);
    return options[idx];
  };

  const judge = (player: Move, enemy: Move) => {
    if (player === enemy) return 'tie';
    if (
      (player === 'rock' && enemy === 'scissors') ||
      (player === 'scissors' && enemy === 'paper') ||
      (player === 'paper' && enemy === 'rock')
    ) return 'win';
    return 'lose';
  };

  const moveBeating = (move: Move): Move => {
    if (move === 'rock') return 'paper';
    if (move === 'paper') return 'scissors';
    return 'rock';
  };

  const getKumaTip = () => {
    if (!currentMonster) return "";
    const talentLabel = MOVES.find(m => m.id === currentMonster.talent)?.label;
    const weaknessLabel = MOVES.find(m => m.id === currentMonster.weakness)?.label;
    const bestMove = moveBeating(currentMonster.talent);
    const bestLabel = MOVES.find(m => m.id === bestMove)?.label;

    return `${currentMonster.zhName} 的天賦是 ${talentLabel}，最拿手那一拳很強喔！但是牠「不能出」 ${weaknessLabel}。你可以多試試 ${bestLabel}，更容易讓牠恢復好心情～`;
  };

  const handleMove = (playerMove: Move) => {
    if (isProcessing || hearts <= 0 || currentIndex >= monsters.length) return;

    const enemyMove = getMonsterMove(currentMonster);
    const result = judge(playerMove, enemyMove);

    setLastHeroMove(playerMove);
    setLastMonsterMove(enemyMove);
    setResultState(result);

    const playerEmoji = MOVES.find(m => m.id === playerMove)?.emoji;
    const enemyEmoji = MOVES.find(m => m.id === enemyMove)?.emoji;
    let msg = `你出 ${playerEmoji}，魔物出 ${enemyEmoji}。`;

    if (result === 'tie') {
      msg += " 平手！再試一次～";
      setMessage(msg);
      setIsProcessing(true);
      setTimeout(() => setIsProcessing(false), 500); // Short delay for tie
      return;
    }

    setIsProcessing(true); // Lock input

    if (result === 'win') {
      let gain = 1;
      if (playerMove === 'rock') {
         gain = 2;
         msg += " 戰士天賦觸發！出 ✊ 石頭獲勝，傳達 2 倍好心情！(+2⭐)";
      } else {
         msg += " 你成功安撫了魔物！(+1⭐)";
      }

      setStars(prev => prev + gain);
      
      // Update monster cured status
      const newMonsters = [...monsters];
      newMonsters[currentIndex].cured = true;
      setMonsters(newMonsters);
      setMessage(msg);

      // Next Level Delay
      setTimeout(() => {
        if (currentIndex < monsters.length - 1) {
           setCurrentIndex(prev => prev + 1);
           setResultState('idle');
           setLastHeroMove(null);
           setLastMonsterMove(null);
           setMessage("下一隻魔物出現了！看看村長熊熊的提示，再出拳吧～");
           setIsProcessing(false);
        } else {
           setMessage("恭喜！所有魔物都恢復好心情，勇者任務大成功！🎉");
           // Game Completed State (can leave isProcessing true to stop inputs)
        }
      }, 1500);

    } else {
      // Lose
      setHearts(prev => {
        const newHearts = prev - 1;
        if (newHearts <= 0) {
           msg += " 這回合被壞情緒影響了，失去一顆心… 心力用盡啦！";
           setMessage(msg);
           // Game Over Reset Delay
           setTimeout(() => {
              setMessage("先深呼吸一下，再重新挑戰全部魔物吧～ (遊戲將重置)");
              setTimeout(resetGame, 2000);
           }, 1500);
           return 0;
        }
        msg += " 這回合被壞情緒影響了，失去一顆心…";
        setMessage(msg);
        setIsProcessing(false); // Allow retry same level
        return newHearts;
      });
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 font-sans">
      <Card className="border-0 bg-[#fffdf8] shadow-xl rounded-2xl overflow-hidden relative flex flex-col min-h-[600px]">
        
        {/* Top Status Bar */}
        <div className="bg-[#fff7e6] p-4 flex justify-between items-center border-b border-[#f2dcc0] text-[#8a5b2c] font-bold text-sm sm:text-lg">
          <div className="flex items-center gap-1">
             {Array.from({ length: MAX_HEARTS }).map((_, i) => (
                <Heart key={i} className={`w-6 h-6 ${i < hearts ? 'fill-red-500 text-red-500' : 'text-gray-300 fill-gray-200'}`} />
             ))}
          </div>
          <div className="bg-[#fffaf0] px-4 py-1 rounded-full border border-[#f2dcc0]">
            第 {currentIndex + 1} / {monsters.length} 關
          </div>
          <div className="flex items-center gap-1 text-yellow-600">
            <Star className="w-6 h-6 fill-yellow-400 text-yellow-500" />
            <span>{stars}</span>
          </div>
        </div>

        <div className="flex-1 p-4 sm:p-6 flex flex-col gap-6">
           
           {/* Main Game Area */}
           <div className="flex flex-col md:flex-row gap-4 sm:gap-8 items-stretch">
              
              {/* Monster Panel */}
              <div className="flex-1 bg-[#fffaf0] border-2 border-[#f2dcc0] rounded-xl p-4 flex flex-col relative transition-colors duration-500">
                 <h2 className="text-lg font-bold text-[#6c4a26] mb-2">魔物</h2>
                 <div className="text-xl font-black text-[#4a3b2a] mb-2 flex items-center gap-2">
                    {currentMonster?.zhName}
                    {currentMonster?.cured && <Badge className="bg-green-500">已淨化</Badge>}
                 </div>
                 <div className="flex flex-wrap gap-2 mb-4 text-xs">
                    <span className="px-2 py-1 rounded-full bg-[#ffe8c6] text-[#8a5b2c]">
                       天賦：{MOVES.find(m => m.id === currentMonster?.talent)?.label}
                    </span>
                    <span className="px-2 py-1 rounded-full bg-[#ffe8c6] text-[#8a5b2c]">
                       弱點：{MOVES.find(m => m.id === currentMonster?.weakness)?.label} (不出)
                    </span>
                 </div>
                 
                 <div className="flex-1 flex items-center justify-center py-4 relative min-h-[200px]">
                    <motion.img 
                       key={currentMonster?.key}
                       src={monsterImg} 
                       alt="Monster" 
                       className={`w-40 h-40 sm:w-48 sm:h-48 rounded-full border-4 border-[#f2dcc0] bg-white object-cover transition-all duration-500 ${currentMonster?.cured ? 'brightness-110 saturate-100' : 'grayscale-[20%] sepia-[30%]'}`}
                       initial={{ scale: 0.8, opacity: 0 }}
                       animate={{ scale: 1, opacity: 1 }}
                       transition={{ type: "spring" }}
                    />
                    {/* Monster Move Overlay */}
                    <AnimatePresence>
                       {lastMonsterMove && (
                          <motion.div 
                             initial={{ scale: 0, rotate: 45 }}
                             animate={{ scale: 1, rotate: 0 }}
                             exit={{ scale: 0 }}
                             className="absolute bottom-0 right-4 bg-white p-3 rounded-full shadow-lg border-2 border-gray-100 text-4xl z-10"
                          >
                             {MOVES.find(m => m.id === lastMonsterMove)?.emoji}
                          </motion.div>
                       )}
                    </AnimatePresence>
                 </div>

                 {/* Kuma Tip */}
                 <div className="mt-4 bg-[#fff7e2] border border-dashed border-[#f0c27b] rounded-lg p-3 text-sm text-[#8a5b2c] leading-relaxed">
                    <span className="font-bold">🐻 村長熊熊：</span>
                    {getKumaTip()}
                 </div>
              </div>

              {/* Hero Panel */}
              <div className="flex-1 bg-[#f4f8ff] border-2 border-[#c7d8ff] rounded-xl p-4 flex flex-col">
                 <h2 className="text-lg font-bold text-[#3056b8] mb-2">小勇者（戰士）</h2>
                 
                 <div className="flex-1 flex items-center justify-center py-4 relative min-h-[200px]">
                    <img 
                       src={heroImg} 
                       alt="Hero" 
                       className="w-40 h-40 sm:w-48 sm:h-48 rounded-full border-4 border-[#c7d8ff] bg-white object-cover" 
                    />
                    {/* Hero Move Overlay */}
                    <AnimatePresence>
                       {lastHeroMove && (
                          <motion.div 
                             initial={{ scale: 0, rotate: -45 }}
                             animate={{ scale: 1, rotate: 0 }}
                             exit={{ scale: 0 }}
                             className="absolute bottom-0 left-4 bg-white p-3 rounded-full shadow-lg border-2 border-gray-100 text-4xl z-10"
                          >
                             {MOVES.find(m => m.id === lastHeroMove)?.emoji}
                          </motion.div>
                       )}
                    </AnimatePresence>
                 </div>

                 <div className="mt-4 bg-white/50 border border-[#c7d8ff] rounded-lg p-3 text-sm text-[#3056b8] leading-relaxed">
                    <div>角色：<strong>戰士 🛡️（天賦：✊ 石頭）</strong></div>
                    <div className="mt-1 opacity-80">
                       天賦效果：<strong>若出 ✊ 石頭並且獲勝 → 傳達 2 倍好心情（+2⭐）</strong><br/>
                       其他拳獲勝則是 +1⭐。
                    </div>
                 </div>
              </div>
           </div>

           {/* Controls & Message */}
           <div className="flex flex-col items-center gap-6 mt-auto">
              {hearts > 0 && currentIndex < monsters.length ? (
                 <div className="flex gap-3 sm:gap-6 w-full justify-center">
                 {MOVES.map((move) => (
                   <Button
                     key={move.id}
                     onClick={() => handleMove(move.id)}
                     disabled={isProcessing}
                     className={`
                       flex-1 max-w-[140px] h-16 sm:h-20 rounded-full text-lg sm:text-xl font-bold transition-all duration-100
                       border-b-4 active:border-b-0 active:translate-y-1
                       ${move.id === 'rock' ? 'bg-[#ffe1a8] hover:bg-[#ffcf79] border-[#d8b07e] text-[#6c4a26]' : ''}
                       ${move.id === 'scissors' ? 'bg-[#ffe1a8] hover:bg-[#ffcf79] border-[#d8b07e] text-[#6c4a26]' : ''}
                       ${move.id === 'paper' ? 'bg-[#ffe1a8] hover:bg-[#ffcf79] border-[#d8b07e] text-[#6c4a26]' : ''}
                     `}
                   >
                     <span className="mr-2">{move.emoji}</span>
                     {move.label}
                   </Button>
                 ))}
               </div>
              ) : (
                 <div className="h-20 flex items-center">
                    {hearts <= 0 ? (
                       <Button onClick={resetGame} size="lg" className="bg-red-500 hover:bg-red-600 text-white rounded-full px-8 shadow-lg">
                          <RefreshCw className="w-5 h-5 mr-2" /> 重新挑戰
                       </Button>
                    ) : (
                       <div className="flex flex-col items-center gap-2 text-yellow-600 font-bold text-xl animate-bounce">
                          <Trophy className="w-8 h-8" />
                          <span>通關大成功！</span>
                       </div>
                    )}
                 </div>
              )}
              
              <div className={`w-full bg-[#fff7eb] border border-[#f0d2a4] rounded-xl p-4 text-center min-h-[60px] flex items-center justify-center text-[#6c4a26] font-medium text-lg transition-colors duration-300 ${resultState === 'win' ? 'bg-yellow-50 border-yellow-300' : resultState === 'lose' ? 'bg-red-50 border-red-300' : ''}`}>
                 {message}
              </div>
           </div>
        </div>
      </Card>
    </div>
  );
}
