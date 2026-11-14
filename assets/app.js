'use strict';

const stems = [
  {kanji:'甲', reading:'きのえ', element:'木', polarity:'陽'}, {kanji:'乙', reading:'きのと', element:'木', polarity:'陰'},
  {kanji:'丙', reading:'ひのえ', element:'火', polarity:'陽'}, {kanji:'丁', reading:'ひのと', element:'火', polarity:'陰'},
  {kanji:'戊', reading:'つちのえ', element:'土', polarity:'陽'}, {kanji:'己', reading:'つちのと', element:'土', polarity:'陰'},
  {kanji:'庚', reading:'かのえ', element:'金', polarity:'陽'}, {kanji:'辛', reading:'かのと', element:'金', polarity:'陰'},
  {kanji:'壬', reading:'みずのえ', element:'水', polarity:'陽'}, {kanji:'癸', reading:'みずのと', element:'水', polarity:'陰'}
];
const branches = [
  {kanji:'子', reading:'ね', element:'水'}, {kanji:'丑', reading:'うし', element:'土'},
  {kanji:'寅', reading:'とら', element:'木'}, {kanji:'卯', reading:'う', element:'木'},
  {kanji:'辰', reading:'たつ', element:'土'}, {kanji:'巳', reading:'み', element:'火'},
  {kanji:'午', reading:'うま', element:'火'}, {kanji:'未', reading:'ひつじ', element:'土'},
  {kanji:'申', reading:'さる', element:'金'}, {kanji:'酉', reading:'とり', element:'金'},
  {kanji:'戌', reading:'いぬ', element:'土'}, {kanji:'亥', reading:'い', element:'水'}
];
const profiles = {
  '甲': {label:'まっすぐ伸びる、始まりの人', summary:'大きな木が空へ向かうように、目標を決めると一歩ずつ伸びていく力を持つタイプ。自分の軸を大切にしながら、周囲にも成長のきっかけを渡しやすい。', strength:'方向を決め、長い目で育てること。最初の一歩をつくる場面で力が出やすい。', caution:'正しさを急ぐと、考えを曲げにくくなることも。別の道筋にも一度目を向ける。'},
  '乙': {label:'しなやかに結ぶ、調和の人', summary:'草花やつるのように、環境をよく見て柔軟に道を見つけるタイプ。人と人の間をつなぎ、小さな変化を丁寧に育てる。', strength:'空気を読み、関係を整えながら成長すること。細やかな工夫を積み重ねられる。', caution:'周囲を優先しすぎると、本音が見えにくくなる。自分の希望を短い言葉にする。'},
  '丙': {label:'明るく照らす、表現の人', summary:'太陽のように、場へ熱と明るさを届けるタイプ。見通しを示したり、わかりやすく伝えたりすると魅力が活きる。', strength:'人を励まし、全体を明るく見せること。表現や発信の場で存在感が出やすい。', caution:'勢いが強いと、細部や疲れを見落とすことも。立ち止まる時間を予定に入れる。'},
  '丁': {label:'静かに灯す、感性の人', summary:'ろうそくの炎のように、目の前の人や物事を深く照らすタイプ。細やかな感性と集中力で、温度のある表現を生み出す。', strength:'一つのテーマを深く見つめ、相手の心に届く形へ整えること。', caution:'気持ちを内側にためると消耗しやすい。安心して話せる相手や場所を持つ。'},
  '戊': {label:'どっしり支える、土台の人', summary:'山のように、簡単には揺らがない安心感を持つタイプ。長期的な視点で人や計画を支え、信頼を積み上げる。', strength:'状況を受け止め、継続できる土台をつくること。責任ある役割で力を発揮する。', caution:'変化を慎重に見すぎると、動き出しが遅くなる。小さな試行から始める。'},
  '己': {label:'細やかに育てる、実りの人', summary:'畑の土のように、必要なものを見極め、時間をかけて育てるタイプ。実務感覚があり、日々を整える力に優れる。', strength:'情報や人を整理し、成果が育つ環境を用意すること。小さな改善を続けられる。', caution:'あれこれ抱えると、自分の余白が減りやすい。役割の境界を言葉にする。'},
  '庚': {label:'道を切りひらく、決断の人', summary:'磨かれる前の鋼のように、困難の中で強さが育つタイプ。要不要を判断し、停滞した状況を前へ進める。', strength:'課題を直視し、決めて動くこと。改善や立て直しの場面で力を発揮する。', caution:'結論を急ぐと、言葉が鋭くなることも。相手の事情を確認してから伝える。'},
  '辛': {label:'美しく磨く、洗練の人', summary:'宝石のように、細部を磨き、価値を高めるタイプ。美意識と基準を持ち、質を守る役割に向く。', strength:'違いを見分け、完成度を上げること。編集・品質管理・表現の分野で光る。', caution:'理想が高いほど、自分にも厳しくなりやすい。途中の進歩も成果として数える。'},
  '壬': {label:'大きく巡る、探究の人', summary:'海や大河のように、広い世界をめぐりながら知識を集めるタイプ。変化への対応力があり、複数の視点をつなげる。', strength:'未知へ進み、情報や人を大きな流れにまとめること。変化の多い場で力が出る。', caution:'選択肢が多いと、方向が散りやすい。今期の目的を一つに絞る。'},
  '癸': {label:'静かに潤す、洞察の人', summary:'雨や露のように、目立たないところまで行き届くタイプ。小さな変化を感じ取り、必要な助けを自然に届ける。', strength:'観察し、言葉になっていない気持ちをすくうこと。研究や支援の場で活きる。', caution:'考え続けるほど不安が増えることも。事実と想像を分けて書き出す。'}
};
const actionByInterest = {
  self: '今日「自然にできたこと」を一つ書き、そのとき使った力を言葉にしてみる。',
  work: '今の仕事で「もっと楽に続けたい作業」を一つ選び、最初の改善案を小さく試す。',
  relation: '大切な人へ、察してほしいことを一つだけ短い言葉で伝えてみる。'
};

const form = document.querySelector('#reading-form');
const yearEl = document.querySelector('#birth-year');
const monthEl = document.querySelector('#birth-month');
const dayEl = document.querySelector('#birth-day');
const hourEl = document.querySelector('#birth-hour');
const minuteEl = document.querySelector('#birth-minute');
const result = document.querySelector('#result');

function mod(n, m) { return ((n % m) + m) % m; }
function option(value, label = value) { return `<option value="${value}">${label}</option>`; }

function initializeInputs() {
  const current = new Date().getFullYear();
  yearEl.innerHTML = '<option value="">選択</option>' + Array.from({length: current - 1919}, (_, i) => current - i).map(y => option(y)).join('');
  monthEl.innerHTML = '<option value="">選択</option>' + Array.from({length:12}, (_, i) => option(i + 1)).join('');
  dayEl.innerHTML = '<option value="">選択</option>';
  hourEl.innerHTML += Array.from({length:24}, (_, i) => option(i, String(i).padStart(2, '0'))).join('');
  minuteEl.innerHTML += [0,10,20,30,40,50].map(i => option(i, String(i).padStart(2, '0'))).join('');
}

function updateDays() {
  const year = Number(yearEl.value);
  const month = Number(monthEl.value);
  const selected = Number(dayEl.value);
  const count = year && month ? new Date(year, month, 0).getDate() : 31;
  dayEl.innerHTML = '<option value="">選択</option>' + Array.from({length:count}, (_, i) => option(i + 1)).join('');
  if (selected && selected <= count) dayEl.value = String(selected);
}

function julianDay(year, month, day) {
  const a = Math.floor((14 - month) / 12);
  const y = year + 4800 - a;
  const m = month + 12 * a - 3;
  return day + Math.floor((153 * m + 2) / 5) + 365 * y + Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400) - 32045;
}

function pillarFromIndex(index) {
  const stem = stems[mod(index, 10)];
  const branch = branches[mod(index, 12)];
  return {stem, branch, text: stem.kanji + branch.kanji, reading: `${stem.reading}・${branch.reading}`};
}

function calculatePillars(year, month, day, hour) {
  const beforeApproxLiChun = month === 1 || (month === 2 && day < 4);
  const adjustedYear = beforeApproxLiChun ? year - 1 : year;
  const yearPillar = pillarFromIndex(adjustedYear - 4);

  const monthOffset = mod(month - 2, 12);
  const yearStemIndex = mod(adjustedYear - 4, 10);
  const monthStemStart = (yearStemIndex % 5) * 2 + 2;
  const monthStem = stems[mod(monthStemStart + monthOffset, 10)];
  const monthBranch = branches[mod(2 + monthOffset, 12)];
  const monthPillar = {stem:monthStem, branch:monthBranch, text:monthStem.kanji + monthBranch.kanji, reading:`${monthStem.reading}・${monthBranch.reading}`};

  const dayIndex = mod(julianDay(year, month, day) + 49, 60);
  const dayPillar = pillarFromIndex(dayIndex);
  let hourPillar = null;
  if (hour !== null) {
    const hourBranchIndex = mod(Math.floor((hour + 1) / 2), 12);
    const hourStemIndex = mod((dayIndex % 10 % 5) * 2 + hourBranchIndex, 10);
    const hourStem = stems[hourStemIndex];
    const hourBranch = branches[hourBranchIndex];
    hourPillar = {stem:hourStem, branch:hourBranch, text:hourStem.kanji + hourBranch.kanji, reading:`${hourStem.reading}・${hourBranch.reading}`};
  }
  return {yearPillar, monthPillar, dayPillar, hourPillar, beforeApproxLiChun};
}

function elementBalance(pillars) {
  const counts = {'木':0, '火':0, '土':0, '金':0, '水':0};
  Object.values(pillars).filter(p => p && p.stem).forEach(p => { counts[p.stem.element]++; counts[p.branch.element]++; });
  return counts;
}

function renderPillars(data) {
  const list = [
    ['年柱', data.yearPillar], ['月柱', data.monthPillar], ['日柱', data.dayPillar], ['時柱', data.hourPillar]
  ];
  document.querySelector('#pillars').innerHTML = list.map(([name, p]) => p
    ? `<div class="pillar"><small>${name}</small><strong>${p.text}</strong><span>${p.reading}</span></div>`
    : `<div class="pillar unknown"><small>${name}</small><strong>—</strong><span>出生時刻が不明</span></div>`
  ).join('');
}

function renderBalance(counts) {
  const max = Math.max(...Object.values(counts), 1);
  document.querySelector('#balance-chart').innerHTML = Object.entries(counts).map(([key, value]) =>
    `<div class="balance-row"><span>${key}</span><div class="bar"><i style="width:${Math.max(value / max * 100, value ? 12 : 0)}%"></i></div><b>${value}</b></div>`
  ).join('');
}

function renderResult(data, interest) {
  const dayStem = data.dayPillar.stem;
  const profile = profiles[dayStem.kanji];
  document.querySelector('#result-kanji').textContent = dayStem.element;
  document.querySelector('#result-reading').textContent = `${dayStem.reading}・${dayStem.polarity}`;
  document.querySelector('#result-label').textContent = profile.label;
  document.querySelector('#result-summary').textContent = profile.summary;
  document.querySelector('#strength-text').textContent = profile.strength;
  document.querySelector('#caution-text').textContent = profile.caution;
  document.querySelector('#action-text').textContent = actionByInterest[interest];
  document.querySelector('#insight-heading').textContent = interest === 'work' ? '仕事の活かし方' : interest === 'relation' ? '人との関わり方' : '本質のヒント';
  renderPillars(data);
  renderBalance(elementBalance({year:data.yearPillar, month:data.monthPillar, day:data.dayPillar, hour:data.hourPillar}));
  document.querySelector('#calculation-note').textContent = `※月柱は節入りを月初ではなく西暦の月で近似。${data.beforeApproxLiChun ? '年柱は2月4日頃を立春として前年扱い。' : '年柱は2月4日頃を立春として簡易処理。'} 正式な鑑定結果とは異なる場合がある。`;
  result.hidden = false;
  result.focus({preventScroll:true});
  result.scrollIntoView({behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'});
}

form.addEventListener('submit', event => {
  event.preventDefault();
  const year = Number(yearEl.value);
  const month = Number(monthEl.value);
  const day = Number(dayEl.value);
  const error = document.querySelector('#form-error');
  if (!year || !month || !day) {
    error.textContent = '生年月日をすべて選んでください。';
    (!year ? yearEl : !month ? monthEl : dayEl).focus();
    return;
  }
  error.textContent = '';
  const hour = hourEl.value === '' ? null : Number(hourEl.value);
  const interest = form.elements.interest.value;
  renderResult(calculatePillars(year, month, day, hour), interest);
});

yearEl.addEventListener('change', updateDays);
monthEl.addEventListener('change', updateDays);
document.querySelector('#close-result').addEventListener('click', () => document.querySelector('#reading').scrollIntoView({behavior:'smooth'}));
document.querySelector('#restart-reading').addEventListener('click', () => { result.hidden = true; form.reset(); updateDays(); document.querySelector('#reading').scrollIntoView({behavior:'smooth'}); });
document.querySelector('#print-result').addEventListener('click', () => window.print());

document.querySelectorAll('details').forEach(detail => detail.addEventListener('toggle', () => {
  if (!detail.open) return;
  document.querySelectorAll('details[open]').forEach(other => { if (other !== detail) other.open = false; });
}));

const observer = new IntersectionObserver(entries => entries.forEach(entry => {
  if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
}), {threshold:.12});
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

initializeInputs();
