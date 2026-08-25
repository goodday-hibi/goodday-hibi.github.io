(() => {
  "use strict";

  const MIN_YEAR = 1960;
  const MAX_YEAR = 2040;
  const STEMS = ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"];
  const STEM_DATA = {
    甲: { reading: "きのえ", element: "木", description: "大きな木のように、目標へまっすぐ伸びていく力を持つタイプ。" },
    乙: { reading: "きのと", element: "木", description: "草花のように、周囲と調和しながら粘り強く成長するタイプ。" },
    丙: { reading: "ひのえ", element: "火", description: "太陽のような明るさと、周囲を動かす情熱を持つタイプ。" },
    丁: { reading: "ひのと", element: "火", description: "灯火のような繊細さと、内側に静かな情熱を持つタイプ。" },
    戊: { reading: "つちのえ", element: "土", description: "山のような安定感があり、人を受け止めて支えられるタイプ。" },
    己: { reading: "つちのと", element: "土", description: "畑の土のように、人や物事を丁寧に育てるタイプ。" },
    庚: { reading: "かのえ", element: "金", description: "鉄のような強さがあり、決断して道を切り開くタイプ。" },
    辛: { reading: "かのと", element: "金", description: "宝石のような繊細さと、美しく磨き上げる感性を持つタイプ。" },
    壬: { reading: "みずのえ", element: "水", description: "大きな海のように、自由で柔軟な発想を持つタイプ。" },
    癸: { reading: "みずのと", element: "水", description: "雨や雫のように、静かな知性と優しい共感力を持つタイプ。" }
  };
  const ELEMENT_CLASSES = { 木: "element-wood", 火: "element-fire", 土: "element-earth", 金: "element-metal", 水: "element-water" };
  const ELEMENT_READINGS = { 木: "もく", 火: "か", 土: "ど", 金: "ごん", 水: "すい" };

  const form = document.querySelector("#birthdate-form");
  const yearSelect = document.querySelector("#birth-year");
  const monthSelect = document.querySelector("#birth-month");
  const daySelect = document.querySelector("#birth-day");
  const diagnoseButton = document.querySelector("#diagnose-button");
  const errorMessage = document.querySelector("#error-message");
  const resultSection = document.querySelector("#result");
  const resetButton = document.querySelector("#reset-button");

  function appendOptions(selectElement, start, end, suffix) {
    const fragment = document.createDocumentFragment();
    for (let value = start; value <= end; value += 1) {
      const option = document.createElement("option");
      option.value = String(value);
      option.textContent = `${value}${suffix}`;
      fragment.append(option);
    }
    selectElement.append(fragment);
  }

  function isLeapYear(year) {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  }

  function getDaysInMonth(year, month) {
    if (month === 2) return isLeapYear(year) ? 29 : 28;
    return [4, 6, 9, 11].includes(month) ? 30 : 31;
  }

  function updateDayOptions() {
    const previousDay = Number(daySelect.value);
    const year = Number(yearSelect.value);
    const month = Number(monthSelect.value);
    daySelect.replaceChildren(new Option("日", ""));

    if (!year || !month) {
      updateButtonState();
      return;
    }

    const lastDay = getDaysInMonth(year, month);
    appendOptions(daySelect, 1, lastDay, "日");
    if (previousDay) daySelect.value = String(Math.min(previousDay, lastDay));
    updateButtonState();
  }

  function updateButtonState() {
    diagnoseButton.disabled = !(yearSelect.value && monthSelect.value && daySelect.value);
  }

  function gregorianToJdn(year, month, day) {
    const a = Math.floor((14 - month) / 12);
    const y = year + 4800 - a;
    const m = month + 12 * a - 3;
    return day
      + Math.floor((153 * m + 2) / 5)
      + 365 * y
      + Math.floor(y / 4)
      - Math.floor(y / 100)
      + Math.floor(y / 400)
      - 32045;
  }

  function getStemResult(year, month, day) {
    const jdn = gregorianToJdn(year, month, day);
    const sexagenaryIndex = ((jdn + 49) % 60 + 60) % 60;
    const stem = STEMS[sexagenaryIndex % 10];
    return { stem, ...STEM_DATA[stem] };
  }

  function isValidDate(year, month, day) {
    return Number.isInteger(year) && Number.isInteger(month) && Number.isInteger(day)
      && year >= MIN_YEAR && year <= MAX_YEAR
      && month >= 1 && month <= 12
      && day >= 1 && day <= getDaysInMonth(year, month);
  }

  function showError(message) {
    errorMessage.textContent = message;
  }

  function renderResult(year, month, day, result) {
    document.querySelector("#result-date").textContent = `${year}年${month}月${day}日`;
    const symbol = document.querySelector("#stem-symbol");
    symbol.textContent = result.stem;
    symbol.setAttribute("aria-label", `日干は${result.stem}`);
    document.querySelector("#stem-reading").textContent = `読み方：${result.reading}`;
    const elementSymbol = document.querySelector("#element-symbol");
    elementSymbol.textContent = result.element;
    elementSymbol.setAttribute("aria-label", `五行は${result.element}`);
    document.querySelector("#element-reading").textContent = `読み方：${ELEMENT_READINGS[result.element]}`;
    document.querySelector("#element-type").textContent = `五行タイプ：${result.element}`;
    document.querySelector("#element-relation").textContent = `日干「${result.stem}」は、五行では「${result.element}」に分類されます。`;
    document.querySelector("#type-description").textContent = result.description;
    resultSection.className = `card result-card ${ELEMENT_CLASSES[result.element]}`;
    resultSection.hidden = false;
    resultSection.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!(yearSelect.value && monthSelect.value && daySelect.value)) {
      showError("年・月・日をすべて選んでください");
      return;
    }

    const year = Number(yearSelect.value);
    const month = Number(monthSelect.value);
    const day = Number(daySelect.value);
    if (year < MIN_YEAR || year > MAX_YEAR) {
      showError("1960年1月1日から2040年12月31日までの日付を選んでください");
      return;
    }
    if (!isValidDate(year, month, day)) {
      showError("存在する日付を選んでください");
      return;
    }

    showError("");
    renderResult(year, month, day, getStemResult(year, month, day));
  }

  function resetDiagnosis() {
    form.reset();
    daySelect.replaceChildren(new Option("日", ""));
    resultSection.hidden = true;
    showError("");
    updateButtonState();
    yearSelect.focus();
    form.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  function runDeveloperChecks() {
    const checks = [
      ["1970-01-01", getStemResult(1970, 1, 1).stem === "辛" && getStemResult(1970, 1, 1).element === "金"],
      ["1970-01-02", getStemResult(1970, 1, 2).stem === "壬" && getStemResult(1970, 1, 2).element === "水"],
      ["1980-01-01", getStemResult(1980, 1, 1).stem === "癸" && getStemResult(1980, 1, 1).element === "水"],
      ["1999-12-31", getStemResult(1999, 12, 31).stem === "丁" && getStemResult(1999, 12, 31).element === "火"],
      ["1972年2月は29日", getDaysInMonth(1972, 2) === 29],
      ["1971年2月は28日", getDaysInMonth(1971, 2) === 28],
      ["2040-12-31は範囲内", isValidDate(2040, 12, 31)],
      ["2040-12-31の翌日は範囲外", !isValidDate(2041, 1, 1)],
      ["未選択時は診断不可", diagnoseButton.disabled]
    ];
    return checks.map(([name, passed]) => ({ name, passed }));
  }

  appendOptions(yearSelect, MIN_YEAR, MAX_YEAR, "年");
  appendOptions(monthSelect, 1, 12, "月");
  yearSelect.addEventListener("change", updateDayOptions);
  monthSelect.addEventListener("change", updateDayOptions);
  daySelect.addEventListener("change", updateButtonState);
  form.addEventListener("submit", handleSubmit);
  resetButton.addEventListener("click", resetDiagnosis);

  window.runNikkanChecks = runDeveloperChecks;
})();
