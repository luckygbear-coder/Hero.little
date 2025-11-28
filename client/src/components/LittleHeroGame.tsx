import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Zap, Hand, Scissors, Square, RefreshCw, Trophy, Frown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import heroImg from '@assets/generated_images/cute_vector_hero_avatar.png';
import monsterImg from '@assets/generated_images/cute_vector_monster_avatar.png';

type Move = 'rock' | 'scissors' | 'paper';
type GameState = 'idle' | 'playing' | 'won' | 'lost';

const MOVES: { id: Move; label: string; icon: React.ElementType }[] = [
  { id: 'rock', label: 'Rock', icon: Square },
  { id: 'scissors', label: 'Scissors', icon: Scissors },
  { id: 'paper', label: 'Paper', icon: Hand },
];

const MAX_HP = 3;
const MAX_MOOD = 3;

// =============================
// Monster Weakness Setting (Forbidden Move)
// =============================
// The monster will NEVER use this move.
// Options: "rock" | "scissors" | "paper"
const monsterWeakness: Move = "rock";

export default function LittleHeroGame() {
  const [heroHp, setHeroHp] = useState(MAX_HP);
  const [monsterMood, setMonsterMood] = useState(MAX_MOOD);
  const [gameState, setGameState] = useState<GameState>('idle');
  const [lastHeroMove, setLastHeroMove] = useState<Move | null>(null);
  const [lastMonsterMove, setLastMonsterMove] = useState<Move | null>(null);
  const [battleLog, setBattleLog] = useState<string[]>([]);
  const [selectedHero, setSelectedHero] = useState<string>('Villager');

  const startGame = () => {
    setHeroHp(MAX_HP);
    setMonsterMood(MAX_MOOD);
    setGameState('playing');
    setLastHeroMove(null);
    setLastMonsterMove(null);
    setBattleLog([`You chose ${selectedHero}! A grumpy monster appears!`]);
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

  const handleMove = (move: Move) => {
    if (gameState !== 'playing') return;

    const enemyMove = getRandomMove();
    const result = judge(move, enemyMove);

    setLastHeroMove(move);
    setLastMonsterMove(enemyMove);

    let newLog = `You: ${move}, Monster: ${enemyMove}. `;

    if (result === 'win') {
      setMonsterMood((prev) => {
        const next = Math.max(0, prev - 1);
        if (next === 0) setTimeout(() => setGameState('won'), 500);
        return next;
      });
      newLog += "You transmitted good vibes! Monster's bad mood -1!";
    } else if (result === 'lose') {
      setHeroHp((prev) => {
        const next = Math.max(0, prev - 1);
        if (next === 0) setTimeout(() => setGameState('lost'), 500);
        return next;
      });
      newLog += "Monster's bad vibes are too strong! Your mood -1.";
    } else {
      newLog += "It's a tie! Try again.";
    }

    setBattleLog((prev) => [newLog, ...prev].slice(0, 5));
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card className="border-4 border-primary/30 bg-white/80 backdrop-blur-sm shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-primary/10 p-4 text-center border-b border-primary/20">
          <h2 className="text-2xl text-primary-foreground font-bold flex items-center justify-center gap-2">
             Little Hero Battle
          </h2>
          <p className="text-sm text-muted-foreground font-medium">
            Rock Paper Scissors • Heal the Monster!
          </p>
        </div>

        <div className="p-6 space-y-8">
          {gameState === 'idle' ? (
            <div className="text-center space-y-6 py-8">
              <div className="flex justify-center gap-8 mb-8">
                 <motion.div 
                    initial={{ y: 0 }} 
                    animate={{ y: [0, -10, 0] }} 
                    transition={{ repeat: Infinity, duration: 2 }}
                  >
                    <img src={heroImg} alt="Hero" className="w-24 h-24 rounded-full border-4 border-secondary shadow-lg" />
                 </motion.div>
                 <motion.div 
                    initial={{ y: 0 }} 
                    animate={{ y: [0, -10, 0] }} 
                    transition={{ repeat: Infinity, duration: 2.5, delay: 0.5 }}
                  >
                    <img src={monsterImg} alt="Monster" className="w-24 h-24 rounded-full border-4 border-destructive/50 shadow-lg grayscale-[50%]" />
                 </motion.div>
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-bold text-muted-foreground">Choose your Hero:</label>
                <select 
                  className="p-2 rounded-lg border-2 border-primary/30 bg-background font-bold text-foreground focus:outline-none focus:border-primary"
                  value={selectedHero}
                  onChange={(e) => setSelectedHero(e.target.value)}
                >
                  <option value="Warrior">Warrior (Rock Bonus)</option>
                  <option value="Mage">Mage (Scissors Bonus)</option>
                  <option value="Healer">Healer (Paper Bonus)</option>
                  <option value="Villager">Brave Villager (Balanced)</option>
                </select>
              </div>

              <Button size="lg" onClick={startGame} className="w-full max-w-xs text-lg shadow-lg hover:scale-105 transition-transform">
                Start Adventure
              </Button>
            </div>
          ) : (
            <>
              {/* Battle Area */}
              <div className="flex justify-between items-start gap-4">
                {/* Hero Stats */}
                <motion.div 
                  className="flex-1 bg-secondary/20 rounded-xl p-4 border-2 border-secondary/40 text-center"
                  animate={gameState === 'lost' ? { opacity: 0.5, scale: 0.9 } : {}}
                >
                  <div className="relative w-20 h-20 mx-auto mb-3">
                    <img src={heroImg} alt="Hero" className="w-full h-full rounded-full border-2 border-secondary" />
                    <Badge className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-secondary text-secondary-foreground whitespace-nowrap">
                      {selectedHero}
                    </Badge>
                  </div>
                  <div className="flex justify-center gap-1 mb-2">
                    {Array.from({ length: MAX_HP }).map((_, i) => (
                      <Heart
                        key={i}
                        className={`w-5 h-5 ${i < heroHp ? 'fill-red-500 text-red-500' : 'text-gray-300'}`}
                      />
                    ))}
                  </div>
                  <div className="h-8 flex items-center justify-center text-2xl">
                     {lastHeroMove && (
                        <motion.div 
                           key={lastHeroMove}
                           initial={{ scale: 0, rotate: -45 }}
                           animate={{ scale: 1, rotate: 0 }}
                           className="bg-white p-2 rounded-full shadow-sm"
                        >
                           {lastHeroMove === 'rock' ? '✊' : lastHeroMove === 'scissors' ? '✌️' : '🖐'}
                        </motion.div>
                     )}
                  </div>
                </motion.div>

                {/* VS Badge */}
                <div className="self-center font-display text-2xl text-muted-foreground/50 font-black italic">
                  VS
                </div>

                {/* Monster Stats */}
                <motion.div 
                  className="flex-1 bg-destructive/10 rounded-xl p-4 border-2 border-destructive/30 text-center"
                   animate={gameState === 'won' ? { opacity: 0.5, filter: 'grayscale(100%)' } : {}}
                >
                  <div className="relative w-20 h-20 mx-auto mb-3">
                    <img src={monsterImg} alt="Monster" className="w-full h-full rounded-full border-2 border-destructive/40" />
                    <Badge variant="outline" className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-white whitespace-nowrap">
                      Grumpy Monster
                    </Badge>
                  </div>
                  <div className="text-xs text-muted-foreground mb-1 italic">
                    Seems afraid of {monsterWeakness}...
                  </div>
                  <div className="flex justify-center gap-1 mb-2">
                    {Array.from({ length: MAX_MOOD }).map((_, i) => (
                      <Frown
                        key={i}
                        className={`w-5 h-5 ${i < monsterMood ? 'fill-orange-500 text-orange-600' : 'text-gray-300'}`}
                      />
                    ))}
                  </div>
                  <div className="h-8 flex items-center justify-center text-2xl">
                     {lastMonsterMove && (
                        <motion.div 
                           key={lastMonsterMove}
                           initial={{ scale: 0, rotate: 45 }}
                           animate={{ scale: 1, rotate: 0 }}
                           className="bg-white p-2 rounded-full shadow-sm"
                        >
                           {lastMonsterMove === 'rock' ? '✊' : lastMonsterMove === 'scissors' ? '✌️' : '🖐'}
                        </motion.div>
                     )}
                  </div>
                </motion.div>
              </div>

              {/* Actions */}
              <div className="space-y-6">
                 {gameState === 'playing' ? (
                    <div className="flex justify-center gap-4">
                    {MOVES.map((move) => (
                      <Button
                        key={move.id}
                        variant="outline"
                        className="h-20 w-20 rounded-full border-4 border-primary/20 hover:border-primary hover:bg-primary/10 flex flex-col gap-1"
                        onClick={() => handleMove(move.id)}
                      >
                        <move.icon className="w-8 h-8" />
                        <span className="text-xs font-bold uppercase">{move.label}</span>
                      </Button>
                    ))}
                  </div>
                 ) : (
                    <div className="text-center animate-in zoom-in duration-300">
                       {gameState === 'won' ? (
                          <div className="p-6 bg-yellow-50 rounded-xl border-2 border-yellow-200 mb-4">
                             <Trophy className="w-12 h-12 text-yellow-500 mx-auto mb-2" />
                             <h3 className="text-xl font-bold text-yellow-700">Victory!</h3>
                             <p className="text-yellow-600">You healed the monster's bad mood!</p>
                          </div>
                       ) : (
                          <div className="p-6 bg-red-50 rounded-xl border-2 border-red-200 mb-4">
                             <Frown className="w-12 h-12 text-red-500 mx-auto mb-2" />
                             <h3 className="text-xl font-bold text-red-700">Defeat...</h3>
                             <p className="text-red-600">Your good vibes ran out. Rest and try again!</p>
                          </div>
                       )}
                       <Button onClick={startGame} size="lg" className="gap-2">
                          <RefreshCw className="w-4 h-4" /> Play Again
                       </Button>
                    </div>
                 )}

                {/* Log */}
                <div className="bg-muted/30 rounded-lg p-3 h-24 overflow-y-auto text-sm font-mono space-y-1 border border-border/50">
                  {battleLog.map((log, i) => (
                    <div key={i} className="opacity-80 border-b border-dashed border-border/50 pb-1 last:border-0">
                      {i === 0 ? <span className="font-bold text-primary">➤ {log}</span> : log}
                    </div>
                  ))}
                  {battleLog.length === 0 && <span className="text-muted-foreground italic">Battle log...</span>}
                </div>
              </div>
            </>
          )}
        </div>
      </Card>
    </div>
  );
}
