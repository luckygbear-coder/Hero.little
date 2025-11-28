import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Zap, Hand, Scissors, Square, RefreshCw, Trophy, Frown, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import heroImg from '@assets/generated_images/cute_vector_hero_avatar.png';
import monsterImg from '@assets/generated_images/cute_vector_monster_avatar.png';

type Move = 'rock' | 'scissors' | 'paper';
type GameState = 'idle' | 'playing' | 'won' | 'lost';

const MOVES: { id: Move; label: string; icon: React.ElementType; emoji: string }[] = [
  { id: 'rock', label: '石頭', icon: Square, emoji: '✊' },
  { id: 'scissors', label: '剪刀', icon: Scissors, emoji: '✌️' },
  { id: 'paper', label: '布', icon: Hand, emoji: '🖐' },
];

const MAX_HP = 3;
const MAX_MOOD = 3;

// =============================
// 魔物弱點設定 (禁出拳)
// =============================
// 魔物絕對不會出這個拳
const monsterWeakness: Move = "rock";

export default function LittleHeroGame() {
  const [heroHp, setHeroHp] = useState(MAX_HP);
  const [monsterMood, setMonsterMood] = useState(MAX_MOOD);
  const [gameState, setGameState] = useState<GameState>('idle');
  const [lastHeroMove, setLastHeroMove] = useState<Move | null>(null);
  const [lastMonsterMove, setLastMonsterMove] = useState<Move | null>(null);
  const [battleLog, setBattleLog] = useState<string[]>([]);
  const [selectedHero, setSelectedHero] = useState<string>('戰士');

  const startGame = () => {
    setHeroHp(MAX_HP);
    setMonsterMood(MAX_MOOD);
    setGameState('playing');
    setLastHeroMove(null);
    setLastMonsterMove(null);
    setBattleLog([`你選擇了 ${selectedHero}！一隻氣噗噗的魔物出現了！`]);
  };

  const getRandomMove = (): Move => {
    const moves: Move[] = ['rock', 'scissors', 'paper'];
    // Monster cannot use its "weakness" move (forbidden move)
    const availableMoves = moves.filter(move => move !== monsterWeakness);
    return availableMoves[Math.floor(Math.random() * availableMoves.length)];
  };

  const judge = (player: Move, enemy: Move) => {
    if (player === enemy) return 'draw';
    if (
      (player === 'rock' && enemy === 'scissors') ||
      (player === 'scissors' && enemy === 'paper') ||
      (player === 'paper' && enemy === 'rock')
    )
      return 'win';
    return 'lose';
  };

  const getBearHint = () => {
    if (monsterWeakness === "rock") return "🐻 村長熊熊：小勇者注意！這隻魔物不能出 ✊ 石頭喔！";
    if (monsterWeakness === "scissors") return "🐻 村長熊熊：嘿嘿～這隻魔物不能出 ✌️ 剪刀！";
    return "🐻 村長熊熊：太好了！這隻魔物不能出 🖐 布！";
  };

  const handleMove = (move: Move) => {
    if (gameState !== 'playing') return;

    const enemyMove = getRandomMove();
    const result = judge(move, enemyMove);

    setLastHeroMove(move);
    setLastMonsterMove(enemyMove);

    const moveEmoji = MOVES.find(m => m.id === move)?.emoji;
    const enemyEmoji = MOVES.find(m => m.id === enemyMove)?.emoji;

    let newLog = `你出了 ${moveEmoji}，魔物出了 ${enemyEmoji}。`;

    if (result === 'win') {
      // Special Talent Logic
      if (selectedHero === '戰士' && move === 'rock') {
        setMonsterMood((prev) => {
          const next = Math.max(0, prev - 2); // Damage -2
          if (next === 0) setTimeout(() => setGameState('won'), 500);
          return next;
        });
        newLog += "\n🔥 天賦發動！戰士的石頭威力加倍，魔物壞情緒 -2！";
      } else {
        setMonsterMood((prev) => {
          const next = Math.max(0, prev - 1);
          if (next === 0) setTimeout(() => setGameState('won'), 500);
          return next;
        });
        newLog += "\n你成功傳遞好心情，魔物壞情緒 -1！";
      }
    } else if (result === 'lose') {
      setHeroHp((prev) => {
        const next = Math.max(0, prev - 1);
        if (next === 0) setTimeout(() => setGameState('lost'), 500);
        return next;
      });
      newLog += "\n魔物的壞情緒太強烈，你的好心情 -1。";
    } else {
      newLog += "\n勢均力敵！再試一次！";
    }

    setBattleLog((prev) => [newLog, ...prev].slice(0, 5));
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card className="border-4 border-[#f3c58a] bg-[#fffdf7] shadow-xl overflow-hidden relative">
        
        {/* Header */}
        <div className="bg-[#fff7e6] p-4 text-center border-b border-[#f0d2a4]">
          <h2 className="text-2xl text-[#d27b2f] font-bold flex items-center justify-center gap-2">
             🌟 小勇者單場戰鬥
          </h2>
          <p className="text-sm text-[#666] font-medium mt-1">
            剪刀 ✌️・石頭 ✊・布 🖐
          </p>
        </div>

        <div className="p-6 space-y-6">
          
          {/* Bear Hint */}
          <AnimatePresence>
            {gameState === 'playing' && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-[#fff3c8] border-2 border-[#e8b04c] p-3 rounded-lg text-sm text-[#a56a23] flex items-center gap-2"
              >
                <MessageCircle className="w-5 h-5 fill-[#e8b04c] text-white" />
                {getBearHint()}
              </motion.div>
            )}
          </AnimatePresence>

          {gameState === 'idle' ? (
            <div className="text-center space-y-6 py-4">
              <div className="flex justify-center gap-8 mb-4">
                 <motion.div 
                    initial={{ y: 0 }} 
                    animate={{ y: [0, -10, 0] }} 
                    transition={{ repeat: Infinity, duration: 2 }}
                  >
                    <img src={heroImg} alt="Hero" className="w-24 h-24 rounded-full border-4 border-[#f3c58a] shadow-lg bg-white" />
                 </motion.div>
                 <motion.div 
                    initial={{ y: 0 }} 
                    animate={{ y: [0, -10, 0] }} 
                    transition={{ repeat: Infinity, duration: 2.5, delay: 0.5 }}
                  >
                    <img src={monsterImg} alt="Monster" className="w-24 h-24 rounded-full border-4 border-destructive/30 shadow-lg grayscale-[20%] bg-white" />
                 </motion.div>
              </div>
              
              <div className="space-y-2 max-w-xs mx-auto">
                <label className="block text-sm font-bold text-[#d27b2f]">選擇勇者：</label>
                <select 
                  className="w-full p-2 rounded-lg border-2 border-[#d0b48a] bg-[#fff8e8] font-bold text-[#555] focus:outline-none focus:border-[#d27b2f]"
                  value={selectedHero}
                  onChange={(e) => setSelectedHero(e.target.value)}
                >
                  <option value="戰士">戰士（✊ 石頭天賦）</option>
                  <option value="法師">法師（✌️ 剪刀天賦）</option>
                  <option value="牧師">牧師（🖐 布天賦）</option>
                  <option value="勇敢的村民">勇敢的村民（無限制）</option>
                </select>
              </div>

              <Button size="lg" onClick={startGame} className="w-full max-w-xs text-lg shadow-md bg-[#d27b2f] hover:bg-[#b56622] text-white border-none">
                開始戰鬥
              </Button>
            </div>
          ) : (
            <>
              {/* Battle Area */}
              <div className="flex justify-between items-start gap-2 sm:gap-4">
                {/* Hero Stats */}
                <motion.div 
                  className="flex-1 bg-[#fffaf0] rounded-xl p-3 border-2 border-[#f0d2a4] text-center relative"
                  animate={gameState === 'lost' ? { opacity: 0.5, scale: 0.95 } : {}}
                >
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-2">
                    <img src={heroImg} alt="Hero" className="w-full h-full rounded-full border-2 border-[#f3c58a] bg-white" />
                    <Badge className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-[#d27b2f] text-white whitespace-nowrap text-[10px] sm:text-xs">
                      {selectedHero}
                    </Badge>
                  </div>
                  <div className="text-[10px] text-[#999] mb-1">好心情 (HP)</div>
                  <div className="flex justify-center gap-0.5 mb-2">
                    {Array.from({ length: MAX_HP }).map((_, i) => (
                      <Heart
                        key={i}
                        className={`w-4 h-4 sm:w-5 sm:h-5 ${i < heroHp ? 'fill-red-500 text-red-500' : 'fill-gray-200 text-gray-300'}`}
                      />
                    ))}
                  </div>
                  <div className="h-8 flex items-center justify-center text-2xl">
                     {lastHeroMove && (
                        <motion.div 
                           key={lastHeroMove}
                           initial={{ scale: 0, rotate: -45 }}
                           animate={{ scale: 1, rotate: 0 }}
                           className="bg-white p-1.5 rounded-full shadow-sm border border-gray-100"
                        >
                           {MOVES.find(m => m.id === lastHeroMove)?.emoji}
                        </motion.div>
                     )}
                  </div>
                </motion.div>

                {/* VS Badge */}
                <div className="self-center font-display text-xl sm:text-2xl text-[#d0b48a] font-black italic">
                  VS
                </div>

                {/* Monster Stats */}
                <motion.div 
                  className="flex-1 bg-[#fffaf0] rounded-xl p-3 border-2 border-[#f0d2a4] text-center relative"
                   animate={gameState === 'won' ? { opacity: 0.5, filter: 'grayscale(100%)' } : {}}
                >
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-2">
                    <img src={monsterImg} alt="Monster" className="w-full h-full rounded-full border-2 border-[#f0d2a4] bg-white" />
                    <Badge variant="outline" className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-white text-[#555] whitespace-nowrap text-[10px] sm:text-xs border-[#d0b48a]">
                      魔物
                    </Badge>
                  </div>
                  <div className="text-[10px] text-[#999] mb-1">壞情緒</div>
                  <div className="flex justify-center gap-0.5 mb-2">
                    {Array.from({ length: MAX_MOOD }).map((_, i) => (
                      <Frown
                        key={i}
                        className={`w-4 h-4 sm:w-5 sm:h-5 ${i < monsterMood ? 'fill-[#d27b2f] text-[#d27b2f]' : 'fill-gray-200 text-gray-300'}`}
                      />
                    ))}
                  </div>
                  <div className="h-8 flex items-center justify-center text-2xl">
                     {lastMonsterMove && (
                        <motion.div 
                           key={lastMonsterMove}
                           initial={{ scale: 0, rotate: 45 }}
                           animate={{ scale: 1, rotate: 0 }}
                           className="bg-white p-1.5 rounded-full shadow-sm border border-gray-100"
                        >
                           {MOVES.find(m => m.id === lastMonsterMove)?.emoji}
                        </motion.div>
                     )}
                  </div>
                </motion.div>
              </div>

              {/* Actions */}
              <div className="space-y-4">
                 {gameState === 'playing' ? (
                    <div className="flex justify-center gap-3 sm:gap-6">
                    {MOVES.map((move) => (
                      <Button
                        key={move.id}
                        variant="outline"
                        className="h-16 w-16 sm:h-20 sm:w-20 rounded-full border-4 border-[#f3c58a] bg-[#ffeec4] hover:bg-[#ffd78a] hover:border-[#d27b2f] flex flex-col gap-0 sm:gap-1 shadow-sm transition-transform active:scale-95"
                        onClick={() => handleMove(move.id)}
                      >
                        <span className="text-xl sm:text-2xl">{move.emoji}</span>
                        <span className="text-[10px] sm:text-xs font-bold text-[#8a5a23]">{move.label}</span>
                      </Button>
                    ))}
                  </div>
                 ) : (
                    <div className="text-center animate-in zoom-in duration-300">
                       {gameState === 'won' ? (
                          <div className="p-4 bg-yellow-50 rounded-xl border-2 border-yellow-200 mb-4">
                             <Trophy className="w-10 h-10 text-yellow-500 mx-auto mb-2" />
                             <h3 className="text-lg font-bold text-yellow-700">戰鬥勝利！</h3>
                             <p className="text-sm text-yellow-600">🎉 你成功讓魔物恢復好心情！<br/>獲得一顆勇氣星星 ✨</p>
                          </div>
                       ) : (
                          <div className="p-4 bg-red-50 rounded-xl border-2 border-red-200 mb-4">
                             <Frown className="w-10 h-10 text-red-500 mx-auto mb-2" />
                             <h3 className="text-lg font-bold text-red-700">挑戰失敗...</h3>
                             <p className="text-sm text-red-600">😢 你的好心情用完了…<br/>下次再挑戰吧！</p>
                          </div>
                       )}
                       <Button onClick={startGame} size="lg" className="gap-2 bg-[#d27b2f] hover:bg-[#b56622] text-white border-none">
                          <RefreshCw className="w-4 h-4" /> 再玩一次
                       </Button>
                    </div>
                 )}

                {/* Log */}
                <div className="bg-[#fffaf0] rounded-lg p-3 h-32 overflow-y-auto text-xs sm:text-sm space-y-2 border border-dashed border-[#f0cda0]">
                  {battleLog.map((log, i) => (
                    <div key={i} className="pb-1 border-b border-dashed border-[#f0cda0]/50 last:border-0 whitespace-pre-line">
                      {i === 0 ? <span className="font-bold text-[#a56a23]">➤ {log}</span> : <span className="text-gray-500">{log}</span>}
                    </div>
                  ))}
                  {battleLog.length === 0 && <span className="text-[#ccc] italic">戰鬥記錄...</span>}
                </div>
              </div>
            </>
          )}
        </div>
      </Card>
    </div>
  );
}
