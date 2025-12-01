const app = document.getElementById('app')

app.innerHTML = `
  <main style="max-width:480px;margin:0 auto;padding:16px;font-family:-apple-system,BlinkMacSystemFont,'Noto Sans TC',sans-serif;background:#ffeec9;min-height:100vh;">
    <h1 style="text-align:center;margin-bottom:8px;">小勇者之旅大冒險</h1>
    <p style="text-align:center;margin-top:0;margin-bottom:16px;">剪刀石頭布，安撫壞心情的魔物！</p>
    <section id="status" style="background:#fff7e6;border-radius:12px;border:2px solid #e1b676;padding:12px;margin-bottom:16px;">
      <p id="message">點下面的按鈕開始猜拳吧～</p>
      <p id="score">勝利：0 次</p>
    </section>
    <section style="display:flex;justify-content:space-between;gap:8px;">
      <button data-choice="剪刀" style="flex:1;padding:12px;border-radius:999px;border:none;background:#ffb3c6;">✌ 剪刀</button>
      <button data-choice="石頭" style="flex:1;padding:12px;border-radius:999px;border:none;background:#ffd166;">✊ 石頭</button>
      <button data-choice="布" style="flex:1;padding:12px;border-radius:999px;border:none;background:#9bf6ff;">🖐 布</button>
    </section>
  </main>
`

const buttons = document.querySelectorAll('button[data-choice]')
const messageEl = document.getElementById('message')
const scoreEl = document.getElementById('score')

let winCount = 0

const choices = ['剪刀', '石頭', '布']

function getResult(player, enemy) {
  if (player === enemy) return 'draw'
  if (
    (player === '剪刀' && enemy === '布') ||
    (player === '石頭' && enemy === '剪刀') ||
    (player === '布' && enemy === '石頭')
  ) {
    return 'win'
  }
  return 'lose'
}

buttons.forEach(btn => {
  btn.addEventListener('click', () => {
    const player = btn.dataset.choice
    const enemy = choices[Math.floor(Math.random() * choices.length)]
    const result = getResult(player, enemy)

    if (result === 'win') {
      winCount++
      messageEl.textContent = `你出了「${player}」，魔物出了「${enemy}」～ 你用好心情安撫了魔物！`
    } else if (result === 'draw') {
      messageEl.textContent = `你出了「${player}」，魔物也出了「${enemy}」～ 平手，再試一次！`
    } else {
      messageEl.textContent = `你出了「${player}」，魔物出了「${enemy}」～ 沒關係，深呼吸再來一次！`
    }

    scoreEl.textContent = `勝利：${winCount} 次`
  })
})
