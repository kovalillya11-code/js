function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pickRandom(list) {
  return list[getRandomInt(0, list.length - 1)];
}

function pickWeighted(list) {
  const total = list.reduce((sum, entry) => sum + (entry.weight || 3), 0);
  let roll = getRandomInt(1, total);
  for (const entry of list) {
    roll -= entry.weight || 3;
    if (roll <= 0) return entry;
  }
  return list[list.length - 1];
}

// 1 Базові класи
const BASE_CLASSES = [
    { name: "Асасін", hp: 30, attack: 6, defense: 0, speed: 5 },
    { name: "Воїн",   hp: 45, attack: 4, defense: 4, speed: 3 },
    { name: "Танк",   hp: 55, attack: 2, defense: 7, speed: 2 },
    { name: "Маг",    hp: 25, attack: 7, defense: 1, speed: 3 },
    { name: "Лучник", hp: 35, attack: 4, defense: 2, speed: 5 }
];

// Професії
const ADVANCED_PROFESSIONS = {
    "Асасін": [
        { profName: "Ніндзя",     hp: +15, attack: +4, defense: +0, speed: +4, perk: "shadowStep" },
        { profName: "Найомник з двома мечами",     hp: +15, attack: +4, defense: +0, speed: +2 },
        { profName: "Темний Асасін",     hp: +10, attack: +6, defense: +8, speed: +10, weight: 1 },
        { profName: "Светлий Асасін",     hp: +20, attack: +2, defense: +2, speed: +3, weight: 2 },
        { profName: "Троглодит",  hp: +25, attack: +2, defense: +3, speed: +1 },
        { profName: "Тіньовий Клинок", hp: +12, attack: +5, defense: +1, speed: +5, perk: "sharpEye", weight: 2 }
    ],
    "Воїн": [
        { profName: "Берсерк",    hp: +15, attack: +5, defense: -1, speed: +2, perk: "bloodthirst" },
        { profName: "Лицар",      hp: +20, attack: +2, defense: +3, speed: +1 },
        { profName: "Дуелянт",    hp: +12, attack: +4, defense: +1, speed: +3 },
        { profName: "Командир",   hp: +25, attack: +2, defense: +4, speed: +1, perk: "toughness", weight: 2 }
    ],
    "Танк": [
        { profName: "Паладін",    hp: +20, attack: +3, defense: +3, speed: +0, perk: "regeneration" },
        { profName: "Гладіатор",  hp: +15, attack: +2, defense: +2, speed: +2 },
        { profName: "Хранитель Щита", hp: +25, attack: +1, defense: +5, speed: -1, perk: "ironSkin", weight: 2 },
        { profName: "Титан",      hp: +30, attack: +3, defense: +2, speed: -1, weight: 1 }
    ],
    "Маг": [
        { profName: "Некромант",  hp: +20, attack: +3, defense: +2, speed: +1, perk: "shadowExtraction" },
        { profName: "Архімаг",    hp: +10, attack: +5, defense: +0, speed: +1, perk: "arcaneFlow" },
        { profName: "Чаклун Вогню", hp: +12, attack: +7, defense: -1, speed: +1 },
        { profName: "Ілюзіоніст", hp: +10, attack: +4, defense: +1, speed: +4, perk: "shadowStep" },
        { profName: "Целитель",   hp: +25, attack: +1, defense: +3, speed: +2, perk: "regeneration", weight: 2 }
    ],
    "Лучник": [
        { profName: "Снайпер",    hp: +10, attack: +5, defense: +0, speed: +1, perk: "sharpEye" },
        { profName: "Слідопит",   hp: +15, attack: +2, defense: +2, speed: +2 },
        { profName: "Мисливець на демонів", hp: +15, attack: +4, defense: +1, speed: +2, perk: "bladeMaster" },
        { profName: "Вартовий Лісу", hp: +20, attack: +2, defense: +3, speed: +1, perk: "toughness", weight: 2 }
    ]
};

const ENEMIES = [
  { name: "Дрібний злодій", hp: 30, attack: 6, defense: 0, xp: 40, gold: 15, location: "safe" },
  { name: "Хуліган з причудою", hp: 40, attack: 8, defense: 1, xp: 50, gold: 20, location: "safe" },
  { name: "Робот (1 очко)", hp: 45, attack: 9, defense: 2, xp: 55, gold: 20, location: "safe" },
  { name: "Слизовий лиходій", hp: 70, attack: 14, defense: 2, xp: 120, gold: 50, location: "danger" },
  { name: "Робот (3 очки)", hp: 80, attack: 16, defense: 4, xp: 140, gold: 60, location: "danger" },
  { name: "Лиходій з Ліги", hp: 90, attack: 18, defense: 3, xp: 160, gold: 70, location: "danger" }
];

const name_monarch = ["Зверів", "Драконов", "Криги", "Насикомих", "Ядов", "Земля"];
const GATE_RANGS = ["E", "D", "C", "B", "A", "S"];
const DUNGEON_BIOMES = [
  { name: "Печера з гоблінами", type: "goblin" },
  { name: "Цвинтар скелетів", type: "undead" },
  { name: "Лігво мурах", type: "ant" },
  { name: "Секретна лабораторія", type: "lab" }
];

// Ранги
const HUNTER_RANKS = [
  { rank: "E", minLevel: 1,  title: "Найслабший мисливець" },
  { rank: "D", minLevel: 5,  title: "Новачок Асоціації" },
  { rank: "C", minLevel: 10, title: "Досвідчений мисливець" },
  { rank: "B", minLevel: 18, title: "Елітний мисливець" },
  { rank: "A", minLevel: 28, title: "Мисливець A-рангу" },
  { rank: "S", minLevel: 40, title: "Мисливець національного рівня" }
];


const SHOP_ITEMS = [
  { name: "Аптечка", price: 30, effect: "heal", value: 40, shop: "association", cat: "potion" },
  { name: "Енергетик", price: 45, effect: "buff", value: 4, shop: "association", cat: "potion" },
  { name: "Ядовиті Гланди Касаки", price: 100, effect: "kasaka", value: 1, shop: "system", cat: "special" },
  { name: "Адреналін", price: 45, effect: "buff", value: 4, shop: "association", cat: "potion" },
  { name: "Сувій з магією Відновлення", price: 120, effect: "heal++", value: 80, shop: "system", cat: "special" },

  // Магазин Асоціації
  { name: "Велика аптечка", price: 70, effect: "heal", value: 100, shop: "association", cat: "potion", minRank: 1 },
  { name: "Протиотрута", price: 25, effect: "antidote", value: 0, shop: "association", cat: "potion" },
  { name: "Зілля Захисту", price: 55, effect: "defbuff", value: 4, shop: "association", cat: "potion" },
  { name: "Свиток Телепорту", price: 80, effect: "teleport", value: 0, shop: "association", cat: "potion" },
  { name: "Кристал Мани", price: 40, effect: "mana", value: 40, shop: "association", cat: "potion" },

  // Магазин Системи
  { name: "Еліксир Відновлення", price: 150, effect: "fullheal", value: 0, shop: "system", cat: "potion" },
  { name: "Зілля Сили", price: 90, effect: "buff", value: 8, shop: "system", cat: "potion" },
  { name: "Книга Досвіду", price: 200, effect: "xpbook", value: 150, shop: "system", cat: "special" },

  // Нагороди 
  { name: "Руна Монарха", price: 0, effect: "rune", value: 3 },
  { name: "Ікло Касаки", price: 0, effect: "equip", slot: "weapon", attack: 13, lifesteal: 10, crit: 5 },
  { name: "Меч Демонічного Короля", price: 0, effect: "equip", slot: "weapon", attack: 26, lifesteal: 8, crit: 8 },
  { name: "Прокляте Лезо Безодні", price: 0, effect: "equip", slot: "weapon", attack: 18, crit: 10, curse: true },
  { name: "Ампула Повного Відновлення", price: 0, effect: "fullrestore" },
  { name: "Лотерейний квиток", price: 10, effect: "lottery" },
  { name: "Пластир", price: 5, effect: "heal", value: 20 },
  { name: "Точильний Камінь", price: 25, effect: "whetstone", value: 1 },
  { name: "Ключ Підземелля Касаки", price: 0, effect: "key", dungeon: "kasaka" },
  { name: "Ключ Демонічного Замку", price: 0, effect: "key", dungeon: "demon" },
  { name: "Пелюстка Місячного Лотоса", price: 0, effect: "ingredient" },
  { name: "Серце Демона", price: 0, effect: "ingredient" },
  { name: "Крапля Безодні", price: 0, effect: "ingredient" },
  { name: "Еліксир Життя", price: 0, effect: "lifeelixir" }
];


const TWO_HANDED_CLASSES = ["Танк", "Маг", "Лучник"];

const WEAPON_NAMES = {
  "Асасін": ["Ржавий кинджал", "Мисливський кинджал", "Кинджал Охоронця", "Клинок Елітного Мисливця"],
  "Воїн": ["Іржавий меч", "Сталевий меч", "Бойовий меч", "Меч Елітного Мисливця"],
  "Танк": ["Дерев'яна булава", "Залізний молот", "Бойовий молот", "Молот Хранителя"],
  "Маг": ["Палиця Учня", "Посох Учня", "Посох Волхва", "Посох Елітного Мага"],
  "Лучник": ["Саморобний лук", "Мисливський лук", "Складний лук Асоціації", "Лук Елітного Мисливця"]
};
const SYSTEM_WEAPON_NAMES = {
  "Асасін": ["Убивця Лицарів", "Клинок Морозної Смерті", "Ікло Безодні", "Кинджал Короля Тіней"],
  "Воїн": ["Меч Драконоборця", "Клинок Світанку", "Меч Заходу Сонця", "Меч Душ Воїнів"],
  "Танк": ["Молот Титана", "Молот Гірського Короля", "Молот Світотрясіння", "Молот Богів"],
  "Маг": ["Посох Мудреця", "Жезл Архімага", "Посох Вічності", "Скіпетр Монарха"],
  "Лучник": ["Лук Сліпучого Світла", "Лук Вітрів", "Лук Небесного Мисливця", "Лук Падаючих Зірок"]
};
const WEAPON_STATS = { attack: [2, 5, 9, 14], price: [60, 140, 340, 800], minRank: [0, 0, 1, 2] };
const SYSTEM_WEAPON_STATS = {
  attack: [12, 14, 24, 36], crit: [5, 9, 13, 15], lifesteal: [0, 0, 5, 8],
  price: [220, 520, 1200, 2800], minRank: [0, 1, 3, 4]
};

const ARMOR_LIST = [
  ["Шкіряна броня", 2, 80, 0, "association", 0, 0],
  ["Кольчуга", 4, 200, 1, "association", 0, 0],
  ["Лати Асоціації", 7, 450, 2, "association", 0, 0],
  ["Броня Елітного Мисливця", 11, 1000, 3, "association", 0, 0],
  ["Плащ Тіней", 5, 420, 1, "system", 4, 10],
  ["Обладунок Драконячої Луски", 12, 1500, 3, "system", 0, 0],
  ["Мантія Монарха", 16, 3500, 4, "system", 6, 5],
  ["Броня Короля Тіней", 22, 8000, 5, "system", 8, 10]
];

function buildWeaponItems() {
  const items = [];
  Object.keys(WEAPON_NAMES).forEach(className => {
    WEAPON_NAMES[className].forEach((name, t) => items.push({
      name: name, price: WEAPON_STATS.price[t], effect: "equip", slot: "weapon",
      attack: WEAPON_STATS.attack[t], classes: [className], shop: "association", dual: className === "Асасін",
      hand: TWO_HANDED_CLASSES.includes(className) ? "two" : "one",
      cat: "weapon", minRank: WEAPON_STATS.minRank[t]
    }));
    SYSTEM_WEAPON_NAMES[className].forEach((name, t) => items.push({
      name: name, price: SYSTEM_WEAPON_STATS.price[t], effect: "equip", slot: "weapon",
      attack: SYSTEM_WEAPON_STATS.attack[t], crit: SYSTEM_WEAPON_STATS.crit[t],
      lifesteal: SYSTEM_WEAPON_STATS.lifesteal[t], classes: [className], shop: "system", dual: className === "Асасін",
      hand: TWO_HANDED_CLASSES.includes(className) ? "two" : "one",
      cat: "weapon", minRank: SYSTEM_WEAPON_STATS.minRank[t]
    }));
  });
  return items;
}

function buildArmorItems() {
  return ARMOR_LIST.map(row => ({
    name: row[0], price: row[2], effect: "equip", slot: "armor", defense: row[1],
    shop: row[4], cat: "armor", minRank: row[3], crit: row[5], escape: row[6]
  }));
}

SHOP_ITEMS.push(...buildWeaponItems(), ...buildArmorItems());

const ABILITY_DESCRIPTIONS = {
  systemPlayer: {
    title: "СТАТУС: Гравець Системи",
    desc: "Ви отримали доступ до Системи. Приховані пасивки стають доступними."
  },
  healthyLife: {
    title: " ПАСИВКА: Здорове Життя",
    desc: "Повний постійний імунітет до отрути, а втрачені кінцівки миттєво відростають."
  },
  kasakaCurse: {
    title: "ЕФЕКТ: Поглинання Гланд Касаки",
    desc: "Побічна дія отрути гланд, куплених у магазині або здобутих у підземеллі. До кінця бою ви більше НЕ МОЖЕТЕ лікуватися, але ваша атака зросла на 20%!"
  }
};

const PASSIVES = {
  healthyLife: { name: "Здорове Життя", desc: "імунітет до отрути, кінцівки відростають" },
  toughness: { name: "Загартоване Тіло", desc: "+15% до максимального HP", hpPercent: 15 },
  sharpEye: { name: "Гострий Погляд", desc: "+8% шанс критичного удару", crit: 8 },
  shadowStep: { name: "Тіньова Хода", desc: "+20% шанс втечі", escape: 20 },
  regeneration: { name: "Регенерація", desc: "+3 HP наприкінці кожного ходу", regen: 3 },
  ironSkin: { name: "Шкіра Заліза", desc: "-3 урону від кожного удару", reduction: 3 },
  bloodthirst: { name: "Жага Крові", desc: "повертає 15% завданого урону як HP", lifesteal: 15 },
  quickLearner: { name: "Швидкий Учень", desc: "+15% досвіду", xpBonus: 15 },
  luckyHunter: { name: "Щасливий Мисливець", desc: "+25% золота, +10% шанс предмета", goldBonus: 25, dropBonus: 10 },
  shadowExtraction: { name: "Витяг Тіней", desc: "після перемоги можна витягти тінь ворога, вона б'ється за тебе" },
  demonBlood: { name: "Демонічна Кров", desc: "+10% до атаки", attackPercent: 10 },
  arcaneFlow: { name: "Потік Мани", desc: "+30 макс. MP, +2 MP за раунд", mpBonus: 30, mpRegen: 2 },
  bladeMaster: { name: "Майстер Клинка", desc: "+10% до шансу влучання здібностей", abilityHit: 10 },
  willToLive: { name: "Воля до Життя", desc: "тіло відновлюється (+2 HP за раунд), раз за бій переживаєш смертельний удар з 1 HP", survive: 1, regen: 2 },
  longevity: { name: "Довголіття", desc: "імунітет до отрути, хвороб і проклять", immune: 1 },
  detox: { name: "Детоксикація", desc: "отрута не шкодить, а дає +атаку до кінця бою", detox: 1 },
  tenacity: { name: "Завзятість", desc: "-50% урону, коли HP нижче 30%", lowHpReduction: 50 },
  daggerMaster: { name: "Майстер Кинджалів", desc: "+33% атаки з кинджалами", daggerPercent: 33 },
  unyielding: { name: "Непереможний Дух", desc: "+50% захисту, коли HP нижче 20%", lowHpDefense: 50 },
  shadowStorage: { name: "Збереження Тіні", desc: "+3 місця для тіней", shadowSlots: 3 },
  motherBlessing: { name: "Благословення Матері", desc: "+10% макс. HP, -2 урону від ударів", hpPercent: 10, reduction: 2 }
};

const PASSIVE_SOURCES = {
  healthyLife: "Червоні Ворота (вперше)", willToLive: "старт: виживання в Подвійному підземеллі",
  longevity: "секретний квест «Мужність слабких»", detox: "виживання в Зоні Штрафу",
  shadowExtraction: "професія Некромант або перемога над Ігрісом", shadowStorage: "перемога над Ігрісом",
  motherBlessing: "пробудження матері", demonBlood: "Король Демонів на 100 поверсі Замку"
};

const LEVEL_PASSIVES = [
  { level: 6, key: "sharpEye" }, { level: 9, key: "toughness" },
  { level: 12, key: "arcaneFlow" }, { level: 13, key: "quickLearner" },
  { level: 15, key: "bladeMaster" }, { level: 17, key: "shadowStep" },
  { level: 22, key: "regeneration" }, { level: 25, key: "tenacity" },
  { level: 27, key: "ironSkin" }, { level: 33, key: "bloodthirst" }, { level: 35, key: "unyielding" },
  { level: 10, key: "daggerMaster", classes: ["Асасін"] },
  { level: 40, key: "luckyHunter" }
];


const ABILITIES = [
  { id: "dagger", name: "Удар Кинджалом", minLevel: 1, classes: ["Асасін"], kind: "attack", cost: 0, hitBase: 100, hitPerLevel: 0, hitMax: 100, power: 1.5, counter: 60, desc: "завжди влучає, але ти впритул: 60% контратаки" },
  { id: "powerhit", name: "Потужний Удар", minLevel: 1, classes: null, kind: "attack", cost: 6, hitBase: 30, hitPerLevel: 2.5, power: 2.5, desc: "сильний, але на старті влучає рідко" },
  { id: "slash", name: "Різаний Удар", minLevel: 5, classes: ["Асасін", "Воїн", "Лучник"], kind: "attack", cost: 8, hitBase: 50, hitPerLevel: 1.5, power: 1.8, effect: "bleed", desc: "викликає кровотечу на 3 ходи" },
  { id: "shadowstab", name: "Тіньовий Укол", minLevel: 10, classes: ["Асасін"], kind: "attack", cost: 14, hitBase: 40, hitPerLevel: 2, power: 3.5, counter: 30, desc: "смертельний укол, 30% контратаки" },
  { id: "shieldbash", name: "Щитовий Таран", minLevel: 1, classes: ["Воїн", "Танк"], kind: "attack", cost: 6, hitBase: 60, hitPerLevel: 1.5, power: 1.2, effect: "stun", desc: "оглушує ворога на хід" },
  { id: "rage", name: "Лють Берсерка", minLevel: 8, classes: ["Воїн", "Танк"], kind: "buff", cost: 8, power: 0.4, desc: "+40% атаки до кінця бою" },
  { id: "fireball", name: "Вогняна Куля", minLevel: 1, classes: ["Маг"], kind: "attack", cost: 8, hitBase: 55, hitPerLevel: 1.5, power: 2.3, desc: "магічний удар здалеку" },
  { id: "frostspear", name: "Крижаний Спис", minLevel: 10, classes: ["Маг"], kind: "attack", cost: 14, hitBase: 45, hitPerLevel: 2, power: 3.2, effect: "stun", desc: "пошкоджує й оглушує" },
  { id: "aimedshot", name: "Влучний Постріл", minLevel: 1, classes: ["Лучник"], kind: "attack", cost: 6, hitBase: 50, hitPerLevel: 2, power: 2.4, desc: "точний постріл здалеку" },
  { id: "arrowrain", name: "Град Стріл", minLevel: 10, classes: ["Лучник"], kind: "attack", cost: 14, hitBase: 40, hitPerLevel: 2, power: 4, desc: "потужний залп" },
  { id: "healinglight", name: "Лікувальне Світло", minLevel: 12, classes: null, kind: "heal", cost: 18, power: 0.35, desc: "лікує 35% макс. HP" },
  { id: "stealth", name: "Скритність", minLevel: 1, classes: null, needsFlag: "stealthRune", kind: "stealth", cost: 10, desc: "2 ходи ворог часто промахується (нагорода Епізоду 9)" },
  { id: "sprint", name: "Спринт (Ртуть)", minLevel: 1, classes: null, needsFlag: "sprintRune", kind: "sprint", cost: 8, desc: "3 ходи: 30% ударів повз тебе (після 15 застосувань це Ртуть, 40%)" },
  { id: "vital", name: "Удар по життєвих точках", minLevel: 1, classes: null, needsFlag: "vitalRune", kind: "attack", cost: 14, hitBase: 70, hitPerLevel: 0.5, power: 1.5, alwaysCrit: true, desc: "завжди критичний удар" },
  { id: "bloodlust", name: "Жага крові (Аура Страху)", minLevel: 1, classes: null, needsFlag: "bloodRune", kind: "fear", cost: 12, desc: "слабкі вороги цепеніють 2 ходи, боси втрачають 15% атаки" },
  { id: "dagger_rush", name: "Танець кинжалів", minLevel: 20, classes: ["Асасін"], kind: "rush", cost: 18, desc: "4 блискавичні удари по 50% сили, кожен може обезглавити" },
  { id: "ruler", name: "Влада Правителя", minLevel: 1, classes: null, needsFlag: "rulerRune", kind: "attack", cost: 20, hitBase: 90, hitPerLevel: 0, hitMax: 90, power: 1.6, ignoreDef: true, effect: "stun", desc: "удар волі: ігнорує захист, оглушує слабких" },
  { id: "shadowswap", name: "Тіньовий обмін", minLevel: 1, classes: null, needsFlag: "monarch", kind: "swap", cost: 15, desc: "миттєва втеча до своєї тіні (потрібна тінь, не діє проти босів)" },
  { id: "domain", name: "Територія Монарха", minLevel: 1, classes: null, needsFlag: "monarch", kind: "domain", cost: 25, desc: "4 ходи тіні б'ють на 50% сильніше" },
  { id: "astral", name: "Тіньове Тіло", minLevel: 1, classes: null, needsFlag: "monarch", kind: "astral", cost: 40, desc: "раз за бій: +80% атаки і +50% захисту" },
  { id: "monarchblade", name: "Клинок Монарха", minLevel: 40, classes: null, kind: "attack", cost: 30, hitBase: 55, hitPerLevel: 1, power: 6, desc: "удар, гідний Монарха" }
];

const ABILITY_COOLDOWNS = {
  powerhit: 2, slash: 2, shadowstab: 3, shieldbash: 3, rage: 99, fireball: 2,
  stealth: 4, sprint: 4, vital: 3, bloodlust: 4, dagger_rush: 4, ruler: 3, domain: 6, astral: 99, frostspear: 3, aimedshot: 2, arrowrain: 4, healinglight: 4, monarchblade: 5
};

const DOUBLE_DUNGEON = {
  guard: { name: "Кам'яний вартовий", hp: 24, attack: 6, defense: 0, xp: 60, gold: 20, noEscape: true, noExtract: true },
  boss: { name: "Статуя Бога Картенон", hp: 150, attack: 20, defense: 5, doubleEvery: 3, xp: 200, gold: 100, noEscape: true, noExtract: true }
};

const KASAKA_DUNGEON = {
  id: "kasaka", name: "Підземелля Касаки", icon: "🐍", minLevel: 8, floors: 3,
  intro: "У глибині печер сичить Касака, Володар Отрути. Повітря просякло смертельним смородом.",
  mobs: [
    { name: "Отруйна змія", hp: 60, attack: 16, defense: 4, xp: 90, gold: 35, effect: "poison" },
    { name: "Змієподібний воїн", hp: 75, attack: 18, defense: 5, xp: 110, gold: 45 }
  ],
  boss: { name: "Касака, Володар Отрути", hp: 230, attack: 28, defense: 9, doubleEvery: 3, xp: 600, gold: 300, effect: "poison", noEscape: true },
  rewards: ["Ікло Касаки", "Ядовиті Гланди Касаки", "Ядовиті Гланди Касаки"]
};


const DEMON_CASTLE = {
  floors: 100,
  mobs: [
    { name: "Демон-слуга", hp: 100, attack: 26, defense: 8, xp: 90, gold: 40 },
    { name: "Демон-лучник", hp: 90, attack: 30, defense: 6, xp: 100, gold: 45 },
    { name: "Демонічний лицар", hp: 140, attack: 30, defense: 12, xp: 120, gold: 55 }
  ],
  guardian: { name: "Страж Поверху", hp: 220, attack: 38, defense: 16, doubleEvery: 3, xp: 300, gold: 150 },
  boss: { name: "Король Демонів", hp: 1500, attack: 120, defense: 40, doubleEvery: 3, xp: 6000, gold: 3000, noEscape: true, noExtract: true }
};

// Павук бос
const SPIDER_BOSS = { name: "Павук-Ткач", hp: 240, attack: 27, defense: 9, doubleEvery: 3, xp: 300, gold: 150, effect: "poison", noEscape: true, noExtract: true };


const GANG_MEMBER = { name: "Нападник", hp: 70, attack: 17, defense: 4, xp: 40, gold: 20, noEscape: true, noExtract: true };
const GANG_LEADER = { name: "Ватажок банди", hp: 170, attack: 25, defense: 8, xp: 220, gold: 150, noEscape: true, noExtract: true };

// Злочинці з рейду й асасин Канг Теші 
const CRIMINAL = { name: "Злочинець", hp: 95, attack: 20, defense: 6, xp: 70, gold: 40, noEscape: true, noExtract: true };
const KANG_TAESHIK = { name: "Канг Теші, асасин", hp: 320, attack: 36, defense: 12, doubleEvery: 3, xp: 500, gold: 300, noEscape: true };

// Церб
const CERBERUS = { name: "Цербер", hp: 300, attack: 34, defense: 12, doubleEvery: 3, xp: 400, gold: 200, noEscape: true };

const GATE_GUARD = { name: "Страж Активованих Воріт", hp: 260, attack: 30, defense: 14, xp: 350, gold: 180, noEscape: true };

const RECIPE_INGREDIENTS = [
  { name: "Пелюстка Місячного Лотоса", floor: 30 },
  { name: "Серце Демона", floor: 60 },
  { name: "Крапля Безодні", floor: 90 }
];

const QUEST_TASKS = [
  { name: "Віджимання", unit: "віджимань", amount: 100 },
  { name: "Присідання", unit: "присідань", amount: 100 },
  { name: "Підйоми корпусу", unit: "підйомів", amount: 100 },
  { name: "Біг", unit: "км", amount: 10 }
];

const BOX_LOOT = [
  { name: "Лотерейний квиток", weight: 30 },
  { name: "Пластир", weight: 25 },
  { name: "Кристал Мани", weight: 18 }, 
  { name: "Точильний Камінь", weight: 15 },
  { name: "RARE", weight: 4 }
];


let monarchBonusChance = 0;
let isInRedGate = false;
let currentDungeon = null;
const CRIT_CHANCE = 15;
const ESCAPE_CHANCE = 50;
const HEAL_COST = 40;
const BOSS_LEVEL = 50;
const PROFESSION_LEVEL = 3;
const CLASS_CHANGE_LEVEL = 50;
const CLASS_CHANGE_COST = 500;
const RED_GATE_MIN_LEVEL = 15;
const DROP_CHANCE = 25;
const MONARCH_CHANCE_STEP = 0.5;
const ACTIONS_PER_DAY = 3;
const MAX_SHADOWS = 5;
const PENALTY_ROUNDS = 5;
const EP_GATE_LEVEL = 20;
const EP_SPIDER_LEVEL = 10;
const EP_KANG_LEVEL = 15;  
const STEALTH_DODGE = 60;
const EP_WAVE_REGEN = 12;
const EP_SCALE_FROM = 8;
// Характеристики героя 
const STAT_KEYS = ["str", "agi", "vit", "int", "per"];
const STAT_NAMES = { str: "💪 Сила", agi: "💨 Спритність", vit: "🛡 Витривалість", int: "🧠 Інтелект", per: "👁 Сприйняття" };
const START_STAT = 10;
const FREE_POINTS_PER_LEVEL = 5;
const HP_PER_VIT = 100;
const HP_PER_LEVEL = 5;
const ATTACK_PER_STR = 2;
const DEFENSE_PER_VIT = 1;
const CRIT_PER_PER = 0.25;
const HIT_PER_PER = 0.2;
const ESCAPE_PER_AGI = 0.3;
const AUTO_ALLOC = ["str", "str", "vit", "agi", "per"];
const EXECUTE_BASE = 5; 
const EXECUTE_PER_LEVEL = 1;
const EXECUTE_DAGGERS = 15;
const EXECUTE_ASSASSIN = 10;
const EXECUTE_WEAK = 30;
const EXECUTE_MAX = 85;
const DUAL_HIT_POWER = 0.6;
const OFFHAND_POWER = 0.6;
const LOW_HP_TENACITY = 0.3;     
const LOW_HP_SPIRIT = 0.2;
const SPRINT_DODGE = 30;
const QUICKSILVER_DODGE = 40;
const SPRINT_EVOLVE_USES = 15;
const SPRINT_TURNS = 3;
const DOMAIN_TURNS = 4;
const DOMAIN_BONUS = 50;
const RUSH_HITS = 4;
const RUSH_POWER = 0.5;
const FEAR_BOSS_DEBUFF = 15;
const ENEMY_EXTRA_GROWTH = 0.05;
const DEBUG_START_LEVEL = 1;
const DEBUG_START_GOLD = 0;

// фінальний бос
const FINAL_BOSS = {
  name: "Igris", hp: 1800, attack: 95, defense: 30,
  doubleEvery: 3, xp: 5000, gold: 2000, noExtract: true
};

const SEPARATOR = "━".repeat(28);
const LOG_STYLES = {
  info: "color:#cccccc",
  good: "color:#4caf50;font-weight:bold",
  bad: "color:#ff5252;font-weight:bold",
  system: "color:#4fc3f7;font-weight:bold",
  gold: "color:#ffc107;font-weight:bold"
};

let player = null;
let isGameRunning = true;
let eventLog = [];
let currentEnemy = null;
let gameDay = 1;
let actionsToday = 0;
let dailyQuest = null;
let emergencyQuest = null;

function say(message, kind = "info") {
  console.log("%c%s", LOG_STYLES[kind] || LOG_STYLES.info, message);
  eventLog.push(message);
  const logBox = document.getElementById("log");
  if (logBox) logBox.textContent += message + "\n";
}

function flushEvents() {
  const text = eventLog.join("\n");
  eventLog = [];
  return text;
}

function showPendingEvents() {
  const text = flushEvents();
  if (text !== "") alert(text);
}

function askNumber(message, min, max) {
  let text = message;
  while (true) {
    const input = prompt(text);
    const value = Number(input);
    if (input !== null && input.trim() !== "" && Number.isInteger(value) && value >= min && value <= max) return value;
    console.log(` Введи ціле число від ${min} до ${max}.`);
    text = `⚠ Введи ціле число від ${min} до ${max}.\n\n${message}`;
  }
}

function askMenu(title, options, header = "") {
  const parts = [flushEvents(), header].filter(part => part !== "");
  const top = parts.length > 0 ? `${parts.join("\n")}\n${SEPARATOR}\n` : "";
  const list = options.map((option, i) => ` ${i + 1} ▸ ${option}`).join("\n");
  return askNumber(`${top}◆ ${title}\n${SEPARATOR}\n${list}\n${SEPARATOR}\nВведи номер:`, 1, options.length);
}

function panel(title, lines) {
  const body = lines.map(line => `║ ${line}`).join("\n");
  return `╔═══ ${title} ═══\n${body}\n╚${"═".repeat(22)}`;
}

function showScene(title, lines) {
  const scene = panel(title, lines);
  console.log("%c%s", LOG_STYLES.system, scene);
  const logBox = document.getElementById("log");
  if (logBox) logBox.textContent += scene + "\n";
  const pending = flushEvents();
  alert(pending !== "" ? `${pending}\n\n${scene}` : scene);
}


function drawHealthBar(current, max) {
  const hp = Math.max(0, current);
  const filled = max > 0 ? Math.round((hp / max) * 10) : 0;
  let bar = "";
  for (let i = 0; i < 10; i++) {
    bar += i < filled ? "█" : "░";
  }
  return `[${bar}] ${hp}/${max}`;
}


function isAlive(character) { return character.hp > 0; }
function printTitle(text) { console.log(`\n${"=".repeat(45)}\n  ${text}\n${"=".repeat(45)}`); }
function signed(n) { return n >= 0 ? `+${n}` : `${n}`; }
function loseHp(hero, percent) {
  hero.hp = Math.max(1, hero.hp - Math.ceil(hero.maxHp * percent / 100));
}
function healHp(hero, amount) {
  hero.hp = Math.min(hero.maxHp, hero.hp + amount);
}

function showAbilityInfo(abilityKey) {
  const abi = ABILITY_DESCRIPTIONS[abilityKey];
  if (abi) {
    say(`========================================\n${abi.title}\nОпис: ${abi.desc}\n========================================`, "system");
  }
}

function upgradeRang(currentRang, levelsUp) {
  let currentIndex = GATE_RANGS.indexOf(currentRang);
  let newIndex = Math.min(GATE_RANGS.length - 1, currentIndex + levelsUp);
  return GATE_RANGS[newIndex];
}

function generateNextGate(playerLevel, locationType) {
  const hunterIndex = player ? player.rankIndex : 0;
  const shift = locationType === "danger" ? 1 : 0;
  const baseIndex = hunterIndex + shift - 1;
  const rangIndex = Math.max(0, Math.min(GATE_RANGS.length - 1, baseIndex + getRandomInt(0, 2)));
  const rang = GATE_RANGS[rangIndex];
  const biome = DUNGEON_BIOMES[getRandomInt(0, DUNGEON_BIOMES.length - 1)];

  currentDungeon = { name: biome.name, type: biome.type, rang: rang, isRed: false };
  say(`🔍 Сканер воріт виявив нове підземелля:\nВорота: ${currentDungeon.name} | Ранг: [${currentDungeon.rang}]`);
  return currentDungeon;
}

function createEnemy(template) {
  return Object.assign({}, template, { maxHp: template.hp });
}

function scaleEnemy(template, multiplier) {
  const enemy = createEnemy(template);
  enemy.hp = Math.max(1, Math.round(template.hp * multiplier));
  enemy.maxHp = enemy.hp;
  enemy.attack = Math.round(template.attack * multiplier);
  enemy.defense = Math.round(template.defense * multiplier);
  return enemy;
}

function activateSystem() {
  if (!player) return;
  player.isSystemPlayer = true;
  player.hasHealthyLife = true;
  if (!player.passives.includes("healthyLife")) player.passives.push("healthyLife");
  say(`========================================\nВІТАЄМО! Ви здолали Червоні Ворота!\n[Система: Ви отримали постійну пасивку.]\n========================================`, "good");
  showAbilityInfo("systemPlayer");
  showAbilityInfo("healthyLife");
}

function shouldOpenRedGate(pLevel) {
  const monarchChanceLimit = 4 + monarchBonusChance;
  const redGateRoll = getRandomInt(1, 23);
  return pLevel >= RED_GATE_MIN_LEVEL && (redGateRoll === 1 || getRandomInt(1, 100) <= monarchChanceLimit);
}

function scaleByLevel(enemy, levelMultiplier) {
  enemy.hp = Math.round(enemy.hp * levelMultiplier); enemy.maxHp = enemy.hp;
  enemy.attack = Math.round(enemy.attack * levelMultiplier);
  enemy.defense = Math.round(enemy.defense * levelMultiplier);
  return enemy;
}

function openRedGate(levelMultiplier) {
  if (!confirm("🔴 ВОРОТА МУТУВАЛИ! Це Червоні Ворота: вихід закриється, поки не переможеш.\nУвійти?")) {
    say("Ти відступив від Червоних воріт.");
    monarchBonusChance = 0;
    return null;
  }
  currentDungeon.isRed = true;
  isInRedGate = true;
  currentDungeon.rang = upgradeRang(currentDungeon.rang, getRandomInt(1, 2));
  const boss = getRandomInt(1, 100) <= 50
    ? { name: `Монарх ${name_monarch[getRandomInt(0, name_monarch.length - 1)]}`, hp: 1200, attack: 70, defense: 55, doubleEvery: 2, xp: 600, gold: 400 }
    : { name: "Верховне божество світла", hp: 800, attack: 55, defense: 45, doubleEvery: 2, xp: 450, gold: 300 };
  const rangMultiplier = currentDungeon.rang === "S" ? 1.4 : 1.2;
  boss.hp = Math.round(boss.hp * rangMultiplier * levelMultiplier);
  boss.maxHp = boss.hp;
  boss.attack = Math.round(boss.attack * rangMultiplier * levelMultiplier);
  boss.defense = Math.round(boss.defense * levelMultiplier);
  say(`МУТАЦІЯ ВОРІТ! Звичайні ворота перетворилися на ЧЕРВОНІ ВОРОТА! Вихід заблоковано!\n📈 Новий Ранг підземелля: [${currentDungeon.rang}]!\n🔥 На вас чекає: ${boss.name}!`, "bad");
  monarchBonusChance = 0;
  return boss;
}

function pickNormalEnemy(locationType, levelMultiplier) {
  if (ENEMIES.length === 0) {
    say(`Світ навколо пустий... Але з уламків воріт збирається прихована загроза!`);
    return scaleByLevel({ name: "Нульовий робот", hp: 200, attack: 18, defense: 5, doubleEvery: 3, xp: 250, gold: 150 }, levelMultiplier);
  }
  if (currentDungeon.type === "ant" && getRandomInt(1, 100) <= 25) {
    say(`🕷 З глибини Лігва мурах спускається хазяїн гнізда!`, "bad");
    return scaleByLevel({ name: "Гігантський Павук-Вбивця (ЯД)", hp: 150, attack: 22, defense: 8, doubleEvery: 3, xp: 180, gold: 90, effect: "poison" }, levelMultiplier);
  }
  const pool = ENEMIES.filter(enemy => enemy.location === locationType);
  const template = pool.length > 0 ? pool[getRandomInt(0, pool.length - 1)] : ENEMIES[0];
  const enemy = createEnemy(template);
  enemy.name = `[${currentDungeon.name}] ${enemy.name}`;
  return applyRangScaling(enemy, levelMultiplier);
}

function applyRangScaling(enemy, levelMultiplier) {
  const rangPercent = { "D": 13, "C": 30, "B": 53, "A": 87, "S": 132 }[currentDungeon.rang] || 0;
  const rangMultiplier = 1 + ((rangPercent + getRandomInt(-3, 3)) / 100);
  const pLevel = player ? player.level : 1;
  enemy.hp = Math.round(enemy.hp * rangMultiplier * levelMultiplier);
  enemy.maxHp = enemy.hp;
  enemy.attack = Math.round(enemy.attack * rangMultiplier * levelMultiplier);
  enemy.defense = Math.round(enemy.defense * rangMultiplier * levelMultiplier);
  enemy.xp = Math.round(enemy.xp * (1 + rangPercent / 150) * (1 + pLevel * 0.1));
  enemy.gold = Math.round(enemy.gold * (1 + rangPercent / 120) * (1 + pLevel * 0.08));
  return enemy;
}

function pickRandomEnemy(locationType) {
  if (!currentDungeon) generateNextGate(player ? player.level : 1, locationType);
  const pLevel = player ? player.level : 1;
  const levelMultiplier = (1 + ((pLevel * getRandomInt(5, 7)) / 100)) * (1 + pLevel * ENEMY_EXTRA_GROWTH);
  monarchBonusChance += MONARCH_CHANCE_STEP;

  if (shouldOpenRedGate(pLevel)) {
    const boss = openRedGate(levelMultiplier);
    if (boss) return boss;
  }
  isInRedGate = false;
  return pickNormalEnemy(locationType, levelMultiplier);
}

// бонуси пасівки ранги

function getStatMp(intel) {
  const extra = intel - START_STAT;
  return Math.round(intel * 5 + 0.25 * extra * extra + 3 * extra);
}

function canonStat(level) { return START_STAT + 1.3 * (level - 1); }

function getHpScale(hero) {
  const canon = HP_PER_VIT * canonStat(hero.level) + HP_PER_LEVEL * (hero.level - 1);
  return canon / (40 + 18 * (hero.level - 1));
}

function getMpScale(hero) {
  return getStatMp(canonStat(hero.level)) / (25 + 5 * hero.level);
}

function toHeroHp(hero, amount) { return Math.max(1, Math.round(amount * getHpScale(hero))); }
function toHeroMp(hero, amount) { return Math.max(1, Math.round(amount * getMpScale(hero))); }

function addStat(hero, key, n) {
  hero.stats[key] += n;
  if (key !== "vit") return;
  hero.maxHp = Math.max(1, hero.maxHp + n * HP_PER_VIT);
  hero.hp = Math.min(hero.maxHp, Math.max(1, hero.hp + (n > 0 ? n * HP_PER_VIT : 0)));
}

function spendPoint(hero, key, n) {
  addStat(hero, key, n);
  say(`🎯 ${STAT_NAMES[key]} +${n} (тепер ${hero.stats[key]})`, "good");
}

function statsLine(hero) {
  return STAT_KEYS.map(k => `${STAT_NAMES[k]} ${hero.stats[k]}`).join(" · ");
}

function getPassiveTotal(hero, field) {
  return hero.passives.reduce((sum, key) => sum + (PASSIVES[key][field] || 0), 0);
}

function getGearTotal(hero, field) {
  return [hero.weapon, hero.weapon2, hero.armor].reduce((sum, item) => {
    if (!item || !item[field]) return sum;
    const factor = item === hero.weapon2 && field === "attack" ? OFFHAND_POWER : 1; // ліва рука слабша
    return sum + Math.round(item[field] * factor);
  }, 0);
}

function hasDaggers(hero) { return [hero.weapon, hero.weapon2].some(w => w && w.dual); }

function canPairWeapons(a, b) { return a.hand !== "two" && b.hand !== "two"; }

function isPoisonImmune(hero) { return hero.hasHealthyLife || hero.passives.includes("longevity"); }

function getStatBonus(hero, field) {
  return getPassiveTotal(hero, field) + getGearTotal(hero, field);
}

function getTotalAttack(hero) {
  const daggerBonus = hasDaggers(hero) ? getPassiveTotal(hero, "daggerPercent") : 0;
  const base = hero.attack + (hero.stats.str - START_STAT) * ATTACK_PER_STR + hero.bonusAttack + getGearTotal(hero, "attack");
  return Math.round(base * (1 + (getPassiveTotal(hero, "attackPercent") + daggerBonus) / 100));
}

function getTotalDefense(hero) {
  const base = hero.defense + Math.floor((hero.stats.vit - START_STAT) * DEFENSE_PER_VIT) + hero.bonusDefense + getGearTotal(hero, "defense");
  const spirit = hero.hp < hero.maxHp * LOW_HP_SPIRIT ? getPassiveTotal(hero, "lowHpDefense") : 0; // Непереможний Дух
  return Math.round(base * (1 + spirit / 100));
}

function applyLowHpReduction(hero, damage) {
  if (hero.hp >= hero.maxHp * LOW_HP_TENACITY) return damage;
  return Math.max(1, Math.round(damage * (1 - getPassiveTotal(hero, "lowHpReduction") / 100)));
}

function getCritChance(hero) {
  return CRIT_CHANCE + Math.floor((hero.stats.per - START_STAT) * CRIT_PER_PER) + getStatBonus(hero, "crit");
}

function getEscapeChance(hero) {
  return Math.min(90, ESCAPE_CHANCE + Math.floor((hero.stats.agi - START_STAT) * ESCAPE_PER_AGI) + getStatBonus(hero, "escape"));
}

function getMaxMp(hero) {
  const classBonus = hero.className === "Маг" ? 20 : 0;
  const extra = classBonus + getPassiveTotal(hero, "mpBonus") + hero.bonusMp;
  return getStatMp(hero.stats.int) + Math.round(extra * getMpScale(hero));
}

function getAbilityCost(hero, ability) {
  return ability.cost === 0 ? 0 : toHeroMp(hero, ability.cost);
}

function getAbilityHitChance(hero, ability) {
  const perBonus = Math.floor((hero.stats.per - START_STAT) * HIT_PER_PER);
  const chance = ability.hitBase + ability.hitPerLevel * hero.level + perBonus + getPassiveTotal(hero, "abilityHit");
  return Math.round(Math.min(ability.hitMax || 95, chance));
}

function grantPassive(hero, key) {
  const passive = PASSIVES[key];
  if (!passive || hero.passives.includes(key)) return false;
  hero.passives.push(key);
  if (passive.hpPercent) {
    const bonus = Math.round(hero.maxHp * passive.hpPercent / 100);
    hero.maxHp += bonus;
    hero.hp += bonus;
  }
  say(`✨ НОВА ПАСИВКА: ${passive.name}\n   ${passive.desc}`, "system");
  return true;
}

function maxRankIndexByLevel(level) {
  return HUNTER_RANKS.reduce((best, r, i) => (level >= r.minLevel ? i : best), 0);
}

function canTakeExam(hero) {
  return hero.rankIndex < maxRankIndexByLevel(hero.level);
}

function getRankLabel(hero) {
  const info = HUNTER_RANKS[hero.rankIndex];
  return `${info.rank}-ранг · ${info.title}`;
}

function takeRankExam(hero) {
  if (hero.rankIndex >= HUNTER_RANKS.length - 1) {
    say("🎖 У тебе вже найвищий ранг!");
    return false;
  }
  const target = HUNTER_RANKS[hero.rankIndex + 1];
  if (!canTakeExam(hero)) {
    say(`📜 Іспит на ${target.rank}-ранг відкривається з ${target.minLevel} рівня.`);
    return false;
  }
  const t = hero.rankIndex + 1;
  const template = { name: `Екзаменатор (${target.rank}-ранг)`, hp: 40 + t * 35, attack: 8 + t * 5, defense: 2 + t * 3, xp: 80 * t, gold: 60 * t, noExtract: true };
  const enemy = scaleEnemy(template, 1 + Math.max(0, hero.level - target.minLevel) * 0.05);
  say(`📜 Іспит на ${target.rank}-ранг починається!`, "system");
  const result = battle(hero, enemy);
  if (result === "dead") {
    hero.hp = 1;
    say("Екзаменатор зупинив бій. Іспит провалено, спробуй ще.", "bad");
  } else if (result === "win") {
    hero.rankIndex++;
    hero.gold += 100 * t;
    say(panel("🎖 НОВИЙ РАНГ", [`Ти тепер ${getRankLabel(hero)}`, `Премія Асоціації: +${100 * t} золота`]), "good");
  }
  return true;
}

// професії та класи

function applyProfession(hero, prof) {
  hero.profession = prof.profName;
  const hp = toHeroHp(hero, prof.hp);
  hero.profBonus = { hp: hp, attack: prof.attack, defense: prof.defense, speed: prof.speed };
  hero.maxHp += hp; hero.hp += hp;
  hero.attack += prof.attack; hero.defense += prof.defense; hero.speed += prof.speed;
  say(`🎲 Система випадково обрала професію: ${prof.profName}!\nHP ${signed(hp)} | атака ${signed(prof.attack)} | захист ${signed(prof.defense)} | швидкість ${signed(prof.speed)}`, "system");
  if (prof.perk) grantPassive(hero, prof.perk);
}

function removeProfessionBonuses(hero) {
  if (!hero.profBonus) return;
  hero.maxHp = Math.max(1, hero.maxHp - hero.profBonus.hp);
  hero.attack -= hero.profBonus.attack;
  hero.defense -= hero.profBonus.defense;
  hero.speed -= hero.profBonus.speed;
  hero.profession = null;
  hero.profBonus = null;
}

function assignRandomProfession(hero) {
  const options = ADVANCED_PROFESSIONS[hero.className];
  if (!options) return;
  applyProfession(hero, pickWeighted(options));
}

function isClassAllowed(hero, item) {
  return !item.classes || item.classes.includes(hero.className);
}

function unequipInvalidGear(hero) {
  ["weapon", "weapon2", "armor"].forEach(slot => {
    const item = hero[slot];
    if (item && !isClassAllowed(hero, item)) {
      hero.inventory.push(item);
      hero[slot] = null;
      say(`🎒 ${item.name} не підходить новому класу і повернуто в інвентар.`);
    }
  });
}

function describeClass(c) {
  return `${c.name} | ⚔${c.attack} 🛡${c.defense} 💨${c.speed}`; 
}

function changeClass(hero, free = false) {
  if (!free && hero.level < CLASS_CHANGE_LEVEL) {
    say(`🔄 Змінити клас можна з ${CLASS_CHANGE_LEVEL} рівня.`);
    return;
  }
  if (!free && hero.gold < CLASS_CHANGE_COST) {
    say(`Потрібно ${CLASS_CHANGE_COST} золота.`);
    return;
  }
  const options = BASE_CLASSES.filter(c => c.name !== hero.className);
  const lines = options.map(describeClass);
  lines.push("Назад");
  const choice = askMenu("🔄 ЗМІНА КЛАСУ", lines, `Поточний клас: ${hero.className}. Ціна: ${free ? 0 : CLASS_CHANGE_COST} золота.`);
  if (choice === options.length + 1) return;
  const oldClass = BASE_CLASSES.find(c => c.name === hero.className);
  applyNewClass(hero, oldClass, options[choice - 1], free);
}

// нова професія
function applyNewClass(hero, oldClass, newClass, free = false) {
  removeProfessionBonuses(hero);
  hero.attack += newClass.attack - oldClass.attack;
  hero.defense += newClass.defense - oldClass.defense;
  hero.speed += newClass.speed - oldClass.speed;
  hero.className = newClass.name;
  hero.gold -= free ? 0 : CLASS_CHANGE_COST;
  hero.hp = hero.maxHp;
  hero.mp = getMaxMp(hero);
  say(`🔄 Тепер ти ${newClass.name}!`, "good");
  unequipInvalidGear(hero);
  assignRandomProfession(hero);
}

function createHero() {
  let heroName = "";
  while (heroName === "") heroName = (prompt("Введи ім'я героя:") || "").trim();
  const classLines = BASE_CLASSES.map(describeClass);
  const heroClass = BASE_CLASSES[askMenu("ОБЕРИ КЛАС", classLines, `Ласкаво просимо, ${heroName}!`) - 1];

  player = {
    name: heroName, className: heroClass.name, level: 1, xp: 0, gold: 20,
    hp: HP_PER_VIT * START_STAT, maxHp: HP_PER_VIT * START_STAT, mp: 0, bonusMp: 0, // HP = Витривалість × 100
    stats: { str: START_STAT, agi: START_STAT, vit: START_STAT, int: START_STAT, per: START_STAT },
    attack: heroClass.attack, defense: heroClass.defense, speed: heroClass.speed, profession: null, profBonus: null, rankIndex: 0,
    bonusAttack: 0, bonusDefense: 0, weapon: null, armor: null, passives: [], shadows: [],
    inventory: [Object.assign({}, SHOP_ITEMS[0]), Object.assign({}, SHOP_ITEMS[0])],
    isSystemPlayer: false, hasHealthyLife: false, weapon2: null, cooldowns: {}, // перезарядка здібностей
    effects: { cannotHeal: false, isPoisoned: false, poisonDuration: 0, kasakaBonusAttack: 0, teleported: false, willUsed: false, stealthTurns: 0, sprintTurns: 0, domainTurns: 0 },
    story: {
      questCount: 0, kasakaKeyGiven: false, secretFound: false, secretBox: null,
      hasRecipe: false, motherSeen: false, motherHealed: false, castleFloor: 0, castleUnlocked: false,
      episodes: [], jobQuest: false, stealthRune: false, sprintRune: false, vitalRune: false, bloodRune: false, rulerRune: false, monarch: false, finalDone: false, sprintUses: 0, quicksilver: false // пройдені епізоди та прийнятий квест на зміну професії
    }
  };
  player.mp = getMaxMp(player);
  return player;
}

// Короткий статус героя шап
function getStatusHeader(hero) {
  const title = hero.profession ? `${hero.className}/${hero.profession}` : hero.className;
  const lines = [
    `👤 ${hero.name} · ${title} · 🎖 ${HUNTER_RANKS[hero.rankIndex].rank}-ранг`,
    `❤ ${drawHealthBar(hero.hp, hero.maxHp)}   🔷 MP ${hero.mp}/${getMaxMp(hero)}`,
    `⭐ Рів. ${hero.level} (${hero.xp}/${hero.level * 100})  ⚔ ${getTotalAttack(hero)}  🛡 ${getTotalDefense(hero)}  💰 ${hero.gold}`,
    `📅 День ${gameDay} · дія ${actionsToday}/${ACTIONS_PER_DAY}`
  ];
  if (hero.isSystemPlayer && dailyQuest) {
    lines.push(`📋 Квест: ${dailyQuest.tasks.filter(t => t.done).length}/${QUEST_TASKS.length}${dailyQuest.completed ? " ✔" : ""}`);
  }
  if (emergencyQuest) lines.push(`🚨 Невідкладний квест: ${emergencyQuest.kills}/${emergencyQuest.target} (ще ${emergencyQuest.daysLeft} дн.)`);
  return lines.join("\n");
}

function getHeroStatsText(hero) {
  const title = hero.profession ? `${hero.className} / ${hero.profession}` : hero.className;
  const lines = [
    `${hero.name} · ${title}`,
    `🎖 ${getRankLabel(hero)}`,
    `⭐ Рівень ${hero.level} (${hero.xp}/${hero.level * 100} XP)`,
    `❤ ${drawHealthBar(hero.hp, hero.maxHp)}   🔷 MP ${hero.mp}/${getMaxMp(hero)}`,
    `⚔ ${getTotalAttack(hero)}  🛡 ${getTotalDefense(hero)}  💰 ${hero.gold}`,
    `${STAT_NAMES.str} ${hero.stats.str} · ${STAT_NAMES.agi} ${hero.stats.agi} · ${STAT_NAMES.vit} ${hero.stats.vit}`,
    `${STAT_NAMES.int} ${hero.stats.int} · ${STAT_NAMES.per} ${hero.stats.per}`,
    `🗡 Обезглавлення звичайних ворогів: ${getExecuteChance(hero, null)}%`,
    `🗡 Права рука: ${hero.weapon ? hero.weapon.name : "—"}`,
    `🗡 Ліва рука: ${hero.weapon2 ? hero.weapon2.name : "—"}`,
    `🥋 Броня: ${hero.armor ? hero.armor.name : "—"}`
  ];
  if (hero.isSystemPlayer) lines.push("🔷 Статус: Гравець Системи");
  if (hero.story.hasRecipe) lines.push("📜 Знаєш рецепт Еліксиру Життя");
  if (hero.story.motherHealed) lines.push("💚 Матір прокинулась");
  hero.passives.forEach(key => lines.push(`✨ ${PASSIVES[key].name}: ${PASSIVES[key].desc}`));
  if (hero.shadows.length > 0) lines.push(`👥 Тіні: ${hero.shadows.map(s => s.name).join(", ")}`);
  return panel("ГЕРОЙ", lines);
}

function showHeroStats(hero) {
  say(getHeroStatsText(hero));
}

function checkLevelUp(hero) {
  while (hero.xp >= hero.level * 100) {
    hero.xp -= hero.level * 100; hero.level++;
    STAT_KEYS.forEach(key => addStat(hero, key, 1));
    hero.maxHp += HP_PER_LEVEL;
    hero.hp = hero.maxHp;
    hero.mp = getMaxMp(hero);
    hero.effects.isPoisoned = false; hero.effects.poisonDuration = 0;
    say(`⬆ РІВЕНЬ ПІДВИЩЕНО! Тепер у тебе ${hero.level} рівень. 💚 HP і MP відновлено повністю.`, "good");
    announceLevelMilestones(hero);
    distributePoints(hero, FREE_POINTS_PER_LEVEL);
  }
  if (hero.level >= PROFESSION_LEVEL && !hero.profession) assignRandomProfession(hero);
}

function announceLevelMilestones(hero) {
  LEVEL_PASSIVES.filter(p => p.level === hero.level && (!p.classes || p.classes.includes(hero.className))).forEach(p => grantPassive(hero, p.key));
  ABILITIES.filter(a => a.minLevel === hero.level && a.minLevel > 1 && (!a.classes || a.classes.includes(hero.className)))
    .forEach(a => say(`✨ НОВА ЗДІБНІСТЬ: ${a.name}`, "system"));
  if (HUNTER_RANKS.some(r => r.minLevel === hero.level && r.minLevel > 1)) {
    say("📜 Ти можеш скласти іспит на новий ранг в Асоціації!", "system");
  }
  if (hero.level === CLASS_CHANGE_LEVEL) {
    say("🔄 Тепер можна змінити клас в Асоціації Мисливців!", "system");
  }
}

function resetBattleEffects(hero) {
  hero.attack -= hero.effects.kasakaBonusAttack;
  hero.effects.kasakaBonusAttack = 0;
  hero.bonusAttack = 0;
  hero.bonusDefense = 0;
  hero.effects.cannotHeal = false;
  hero.effects.isPoisoned = false;
  hero.effects.poisonDuration = 0;
  hero.effects.teleported = false;
  hero.effects.willUsed = false;
  hero.effects.stealthTurns = 0;
  hero.effects.sprintTurns = 0;
  hero.effects.domainTurns = 0;
  hero.cooldowns = {};
}

// інвентарь

function scaledForHero(value, kind) {
  if (typeof player === "undefined" || !player) return value;
  return kind === "hp" ? toHeroHp(player, value) : toHeroMp(player, value);
}

const EFFECT_TEXT = {
  heal: value => `+${scaledForHero(value, "hp")} HP`,
  fullheal: () => "повністю лікує HP",
  "heal++": value => `+${scaledForHero(value, "hp")} HP і знімає отруту`,
  fullrestore: () => "повністю відновлює HP і MP, знімає отруту (будь-коли)",
  mana: value => `+${scaledForHero(value, "mp")} MP`,
  buff: value => `+${value} атаки до кінця бою`,
  defbuff: value => `+${value} захисту до кінця бою`,
  kasaka: () => "+20% атаки, але блокує лікування до кінця бою",
  antidote: () => "знімає отруту",
  teleport: () => "гарантована втеча з бою",
  xpbook: value => `+${value} досвіду`,
  rune: value => `назавжди +${value} атаки, +${value} захисту, +${value * 3} HP`,
  lottery: () => "випадковий приз",
  whetstone: () => "назавжди +1 атаки",
  key: () => "ключ до особливого підземелля",
  ingredient: () => "інгредієнт Еліксиру Життя",
  lifeelixir: () => "може пробудити матір"
};

function describeItem(item) {
  const info = [];
  if (EFFECT_TEXT[item.effect]) info.push(EFFECT_TEXT[item.effect](item.value));
  if (item.attack) info.push(`+${item.attack} атаки`);
  if (item.defense) info.push(`+${item.defense} захисту`);
  if (item.crit) info.push(`+${item.crit}% крит`);
  if (item.lifesteal) info.push(`${item.lifesteal}% вампіризм`);
  if (item.escape) info.push(`+${item.escape}% втеча`);
  if (item.slot === "weapon") info.push(item.hand === "two" ? "дворучна" : "одноручна");
  if (item.dual) info.push("парні кинджали: 2 удари за хід, легше обезглавити");
  if (item.curse) info.push("☠ прокляття: -8% HP після кожного бою");
  if (item.classes) info.push(`для: ${item.classes.join("/")}`);
  return info.join(", ");
}

function hasHealingItem(hero) {
  return hero.inventory.some(item => item.effect === "heal" || item.effect === "fullheal" || item.effect === "heal++" || item.effect === "fullrestore");
}

function findShopItem(name) {
  return SHOP_ITEMS.find(item => item.name === name);
}

function giveItem(hero, name) {
  const item = Object.assign({}, findShopItem(name));
  hero.inventory.push(item);
  return item;
}

function hasItem(hero, name) {
  return hero.inventory.some(item => item.name === name);
}

function removeItemByName(hero, name) {
  const index = hero.inventory.findIndex(item => item.name === name);
  if (index === -1) return false;
  hero.inventory.splice(index, 1);
  return true;
}

function consumeKey(hero, dungeonId) {
  const index = hero.inventory.findIndex(item => item.effect === "key" && item.dungeon === dungeonId);
  if (index === -1) return false;
  hero.inventory.splice(index, 1);
  return true;
}

function getGroupedInventoryLines(hero) {
  const counts = hero.inventory.reduce((acc, item) => {
    acc[item.name] = (acc[item.name] || 0) + 1;
    return acc;
  }, {});
  return Object.keys(counts).map(name => `  ${name} x ${counts[name]}`);
}

function getInventoryText(hero) {
  const lines = [];
  hero.inventory.forEach((item, i) => lines.push(`${i + 1}. ${item.name} — ${describeItem(item)}`));
  lines.push("Згруповано:");
  getGroupedInventoryLines(hero).forEach(line => lines.push(line));
  const totalValue = hero.inventory.reduce((sum, item) => sum + item.price, 0);
  lines.push(`💰 Загальна вартість: ${totalValue} золота`);
  lines.push(`🗡 ${hero.weapon ? hero.weapon.name : "—"} / ${hero.weapon2 ? hero.weapon2.name : "—"}   🥋 ${hero.armor ? hero.armor.name : "—"}`);
  if (!hasHealingItem(hero)) lines.push("⚠ У тебе немає предметів для лікування!");
  return panel("ІНВЕНТАР", lines);
}

function equipItem(hero, item) {
  if (!isClassAllowed(hero, item)) {
    say(`🚫 ${item.name} не підходить класу ${hero.className}.`);
    return false;
  }
  if (item.slot === "weapon") return equipWeapon(hero, item);
  const old = hero.armor;
  hero.armor = item;
  if (old) hero.inventory.push(old);
  say(`🥋 Екіпіровано: ${item.name} (${describeItem(item)})`, "good");
  return true;
}

function equipWeapon(hero, item) {
  const main = hero.weapon;
  if (main && canPairWeapons(main, item)) {
    if (!hero.weapon2) { hero.weapon2 = item; say(`🗡 Ліва рука: ${item.name} (${describeItem(item)})`, "good"); return true; }
    const choice = askMenu("🗡 ЯКУ РУКУ ЗАМІНИТИ?", [`Праву (${main.name})`, `Ліву (${hero.weapon2.name})`, "Скасувати"]);
    if (choice === 3) return false;
    const slot = choice === 1 ? "weapon" : "weapon2";
    hero.inventory.push(hero[slot]);
    hero[slot] = item;
    say(`🗡 Екіпіровано: ${item.name} (${describeItem(item)})`, "good");
    return true;
  }
  [main, hero.weapon2].filter(w => w).forEach(w => hero.inventory.push(w));
  hero.weapon = item;
  hero.weapon2 = null;
  say(`🗡 Екіпіровано: ${item.name} (${describeItem(item)})`, "good");
  return true;
}

function applyKasaka(hero) {
  if (hero.hasHealthyLife) {
    say(" Пасивка 'Здорове Життя' нейтралізувала побічний ефект Гланд!");
  } else {
    hero.effects.cannotHeal = true;
    hero.effects.isPoisoned = false;
    showAbilityInfo("kasakaCurse");
  }
  const bonus = Math.round(hero.attack * 0.20);
  hero.effects.kasakaBonusAttack += bonus;
  hero.attack += bonus;
  say(`Атака зросла на +${bonus} до кінця бою!`);
}

function healWithItem(hero, amount) {
  if (hero.effects.cannotHeal) {
    say("🚨 Лікування заблоковано Ядом Касаки!");
    return false;
  }
  healHp(hero, amount);
  say(` Відновлено ${amount} HP.`, "good");
  return true;
}

function restoreMp(hero, value) {
  const gain = toHeroMp(hero, value);
  hero.mp = Math.min(getMaxMp(hero), hero.mp + gain);
  say(`🔷 Відновлено ${gain} MP.`, "good");
  return true;
}

function healScroll(hero, amount) {
  if (!healWithItem(hero, toHeroHp(hero, amount))) return false;
  hero.effects.isPoisoned = false;
  hero.effects.poisonDuration = 0;
  return true;
}

function applyItemEffect(hero, item) {
  switch (item.effect) {
    case "heal":
      return healWithItem(hero, toHeroHp(hero, item.value));
    case "fullheal":
      return healWithItem(hero, hero.maxHp);
    case "fullrestore":
      return useFullRestore(hero);
    case "mana":
      return restoreMp(hero, item.value);
    case "buff":
      hero.bonusAttack += item.value;
      say(` Атака збільшена на +${item.value} до кінця бою.`);
      return true;
    case "defbuff":
      hero.bonusDefense += item.value;
      say(` Захист збільшено на +${item.value} до кінця бою.`);
      return true;
    case "kasaka":
      applyKasaka(hero);
      return true;
    default:
      return applySpecialItem(hero, item);
  }
}

function useFullRestore(hero) {
  if (hero.effects.cannotHeal) {
    say("🚨 Лікування заблоковано Ядом Касаки!");
    return false;
  }
  hero.hp = hero.maxHp;
  hero.mp = getMaxMp(hero);
  hero.effects.isPoisoned = false;
  hero.effects.poisonDuration = 0;
  say("💉 Ампула спрацювала: HP і MP повністю відновлено!", "good");
  return true;
}

function applyLottery(hero) {
  const roll = getRandomInt(1, 100);
  if (roll <= 30) {
    say("🎟 Квиток порожній. Пощастить наступного разу.");
  } else if (roll <= 70) {
    const gold = getRandomInt(20, 80);
    hero.gold += gold;
    say(`🎟 Виграш: ${gold} золота!`, "gold");
  } else if (roll <= 85) {
    giveItem(hero, "Кристал Мани");
    say("🎟 Виграш: Кристал Мани!", "gold");
  } else if (roll <= 95) {
    giveItem(hero, "Точильний Камінь");
    say("🎟 Виграш: Точильний Камінь!", "gold");
  } else {
    hero.xp += 100;
    say("🎟 ДЖЕКПОТ: +100 досвіду!", "gold");
    checkLevelUp(hero);
  }
  return true;
}

function applySpecialItem(hero, item) {
  if (item.effect === "heal++") return healScroll(hero, item.value);
  if (item.effect === "antidote") {
    if (!hero.effects.isPoisoned) { say("Ти не отруєний."); return false; }
    hero.effects.isPoisoned = false;
    hero.effects.poisonDuration = 0;
    say("💊 Отруту знято.", "good");
    return true;
  }
  if (item.effect === "teleport") {
    if (isInRedGate || (currentEnemy && currentEnemy.noEscape)) { say(" Звідси неможливо телепортуватися!"); return false; }
    hero.effects.teleported = true;
    say("🌀 Свиток спалахнув, і ти зник з бою!");
    return true;
  }
  return applyRewardItem(hero, item);
}

function applyRewardItem(hero, item) {
  if (item.effect === "xpbook") {
    hero.xp += item.value;
    say(`📖 +${item.value} досвіду!`, "good");
    checkLevelUp(hero);
    return true;
  }
  if (item.effect === "rune") {
    const hp = toHeroHp(hero, item.value * 3);
    hero.attack += item.value; hero.defense += item.value; hero.maxHp += hp; hero.hp += hp;
    say(`💠 Руна поглинута: назавжди +${item.value} атаки, +${item.value} захисту, +${hp} HP.`, "good");
    return true;
  }
  if (item.effect === "lottery") return applyLottery(hero);
  if (item.effect === "whetstone") {
    hero.attack += item.value;
    say("🪨 Зброя заточена: назавжди +1 атаки.", "good");
    return true;
  }
  return item.effect === "equip" ? equipItem(hero, item) : false;
}

const BATTLE_ONLY_EFFECTS = ["buff", "defbuff", "kasaka", "teleport", "antidote"];
const OUTSIDE_ONLY_EFFECTS = ["xpbook", "equip", "lottery", "whetstone"];
const KEY_EFFECTS = ["key", "ingredient", "lifeelixir"];

function getItemBlockReason(item, inBattle) {
  if (KEY_EFFECTS.includes(item.effect)) return "Цей предмет використовується в підземеллях, алхімії чи лікарні.";
  if (BATTLE_ONLY_EFFECTS.includes(item.effect) && !inBattle) return "Цей предмет можна використати лише в бою.";
  if (OUTSIDE_ONLY_EFFECTS.includes(item.effect) && inBattle) return "Цей предмет не можна використати в бою.";
  return "";
}

function useItem(hero, inBattle = false) {
  if (hero.inventory.length === 0) {
    say(" Твій інвентар порожній!");
    return false;
  }
  const names = hero.inventory.map(item => `${item.name} — ${describeItem(item)}`);
  names.push("Назад");
  const choice = askMenu("ОБЕРИ ПРЕДМЕТ", names);
  if (choice === hero.inventory.length + 1) return false;
  return useInventoryItem(hero, hero.inventory[choice - 1], inBattle);
}

function useInventoryItem(hero, item, inBattle) {
  const reason = getItemBlockReason(item, inBattle);
  if (reason !== "") { say(` ${reason}`); return false; }
  if (!applyItemEffect(hero, item)) return false;
  hero.inventory.splice(hero.inventory.indexOf(item), 1);
  return true;
}

const ITEM_CATEGORIES = [
  { id: "weapon", label: "⚔ Зброя" },
  { id: "armor", label: "🥋 Броня" },
  { id: "consumable", label: "🧪 Зілля та розхідне" },
  { id: "key", label: "🗝 Ключі й інгредієнти" }
];

function getItemCategory(item) {
  if (item.effect === "equip") return item.slot === "armor" ? "armor" : "weapon";
  return KEY_EFFECTS.includes(item.effect) ? "key" : "consumable";
}

function getItemsByCategory(hero, categoryId) {
  return hero.inventory.filter(item => getItemCategory(item) === categoryId);
}

function categoryMenu(hero, category) {
  while (true) {
    const items = getItemsByCategory(hero, category.id);
    if (items.length === 0) { say("У цій категорії порожньо."); return; }
    const lines = items.map(item => `${item.name} — ${describeItem(item)}`);
    lines.push("Назад");
    const header = `🗡 ${hero.weapon ? hero.weapon.name : "—"} / ${hero.weapon2 ? hero.weapon2.name : "—"}   🥋 ${hero.armor ? hero.armor.name : "—"}`;
    const choice = askMenu(category.label, lines, header);
    if (choice === lines.length) return;
    useInventoryItem(hero, items[choice - 1], false);
  }
}

function inventoryMenu(hero) {
  while (isAlive(hero)) {
    const options = ITEM_CATEGORIES.map(c => `${c.label} (${getItemsByCategory(hero, c.id).length})`);
    options.push("📋 Огляд усього", "Назад");
    const choice = askMenu("🎒 ІНВЕНТАР", options, `💰 ${hero.gold} золота · предметів: ${hero.inventory.length}`);
    if (choice === options.length) return;
    if (choice === options.length - 1) alert(getInventoryText(hero));
    else categoryMenu(hero, ITEM_CATEGORIES[choice - 1]);
  }
}



const SHOP_NAMES = {
  association: "🏛 МАГАЗИН АСОЦІАЦІЇ МИСЛИВЦІВ",
  system: "🔷 МАГАЗИН СИСТЕМИ"
};
const SHOP_CATEGORIES = [
  { key: "potion", label: "🧪 Зілля" },
  { key: "weapon", label: "⚔ Зброя" },
  { key: "armor", label: "🛡 Броня" },
  { key: "special", label: "✨ Особливе" }
];

function shopLine(hero, item) {
  let lock = "";
  if (hero.rankIndex < (item.minRank || 0)) lock = `🔒[${HUNTER_RANKS[item.minRank].rank}-ранг] `;
  else if (!isClassAllowed(hero, item)) lock = "🚫 ";
  return `${lock}${item.name} — ${describeItem(item)} | ${item.price}💰`;
}

// Купівля товару: перевірка рангу, класу та золота.
function buyItem(hero, item) {
  if (hero.rankIndex < (item.minRank || 0)) {
    say(`🔒 Потрібен ${HUNTER_RANKS[item.minRank].rank}-ранг мисливця.`);
    return;
  }
  if (!isClassAllowed(hero, item)) {
    say(`🚫 ${item.name} не підходить класу ${hero.className}.`);
    return;
  }
  if (hero.gold < item.price) {
    say("Недостатньо золота!");
    return;
  }
  hero.gold -= item.price;
  hero.inventory.push(Object.assign({}, item));
  say(`✅ Куплено: ${item.name}. Залишилось золота: ${hero.gold}`, "good");
}

function browseCategory(hero, shopId, category) {
  const items = SHOP_ITEMS.filter(item => item.shop === shopId && item.cat === category.key && isClassAllowed(hero, item));
  if (items.length === 0) {
    say("Тут поки порожньо.");
    return;
  }
  const lines = items.map(item => shopLine(hero, item));
  lines.push("Назад");
  const choice = askMenu(category.label, lines, `💰 Золото: ${hero.gold}`);
  if (choice === items.length + 1) return;
  buyItem(hero, findShopItem(items[choice - 1].name));
}

function openShop(hero, shopId) {
  if (shopId === "system" && !hero.isSystemPlayer) {
    say("🔒 Магазин Системи доступний лише Гравцям Системи.");
    return;
  }
  const labels = SHOP_CATEGORIES.map(c => c.label);
  labels.push("Назад");
  while (true) {
    const choice = askMenu(SHOP_NAMES[shopId], labels, `💰 Золото: ${hero.gold}`);
    if (choice === SHOP_CATEGORIES.length + 1) return;
    browseCategory(hero, shopId, SHOP_CATEGORIES[choice - 1]);
  }
}

function associationMenu(hero) {
  while (isAlive(hero)) {
    const options = [
      "🛒 Магазин Асоціації",
      canTakeExam(hero) ? "📜 Іспит на новий ранг (ДОСТУПНО!)" : "📜 Іспит на новий ранг",
      `🔄 Зміна класу (з ${CLASS_CHANGE_LEVEL} рівня, ${CLASS_CHANGE_COST} золота)`,
      "Назад"
    ];
    const choice = askMenu("🏛 АСОЦІАЦІЯ МИСЛИВЦІВ", options, `🎖 ${getRankLabel(hero)}   💰 ${hero.gold}`);
    if (choice === 1) openShop(hero, "association");
    else if (choice === 2) { if (takeRankExam(hero)) spendAction(hero); }
    else if (choice === 3) changeClass(hero);
    else return;
  }
}


function createDailyQuest(hero) {
  hero.story.questCount++;
  const eligible = !hero.story.secretFound && hero.story.questCount >= 2;
  const tasks = QUEST_TASKS.map(t => ({ name: t.name, unit: t.unit, amount: t.amount, shown: t.amount, done: false, doubled: false }));
  if (eligible) pickRandom(tasks).shown += 1;
  return { tasks: tasks, completed: false, secretEligible: eligible };
}

function getTaskCost(hero) {
  return Math.max(1, Math.ceil(hero.maxHp * 0.06));
}

function distributePoints(hero, points) {
  if (hero.autoPoints) { // тестовий старт: очки розподіляються самі
    for (let i = 0; i < points; i++) addStat(hero, AUTO_ALLOC[i % AUTO_ALLOC.length], 1);
    return;
  }
  const lines = STAT_KEYS.map(k => `${STAT_NAMES[k]}: усі ${points} очок (зараз ${hero.stats[k]})`);
  lines.push("Розподілити по одному");
  const choice = askMenu(`🎯 ${points} ВІЛЬНИХ ОЧОК ХАРАКТЕРИСТИК`, lines, statsLine(hero));
  if (choice <= STAT_KEYS.length) { spendPoint(hero, STAT_KEYS[choice - 1], points); return; }
  for (let i = 1; i <= points; i++) {
    const names = STAT_KEYS.map(k => `${STAT_NAMES[k]} (${hero.stats[k]})`);
    spendPoint(hero, STAT_KEYS[askMenu(`🎯 ОЧКО ХАРАКТЕРИСТИКИ ${i}/${points}`, names) - 1], 1);
  }
}

function openQuestBox(hero) {
  if (!hero.story.kasakaKeyGiven) {
    hero.story.kasakaKeyGiven = true;
    return giveItem(hero, "Ключ Підземелля Касаки");
  }
  const roll = pickWeighted(BOX_LOOT);
  const name = roll.name === "RARE" ? SYSTEM_WEAPON_NAMES[hero.className][0] : roll.name;
  return giveItem(hero, name);
}

function completeQuest(hero) {
  dailyQuest.completed = true;
  const xp = Math.round((20 + hero.level * 5) * (1 + getPassiveTotal(hero, "xpBonus") / 100));
  hero.xp += xp;
  const box = openQuestBox(hero);
  giveItem(hero, "Ампула Повного Відновлення");
  say(panel("🏆 ЩОДЕННИЙ КВЕСТ ВИКОНАНО", [`+${xp} XP`, `📦 Скринька: ${box.name}`, "💉 Ампула Повного Відновлення", "🎯 5 очок характеристик"]), "good");
  distributePoints(hero, 5);
  checkLevelUp(hero);
}

function learnRecipe(hero) {
  hero.story.hasRecipe = true;
  const lines = ["Усередині лежить рецепт ЕЛІКСИРУ ЖИТТЯ.", "Інгредієнти (усі лише в Демонічному Замку):"];
  RECIPE_INGREDIENTS.forEach(i => lines.push(`  • ${i.name} — ${i.floor} поверх`));
  lines.push("Зварити еліксир можна на Базі (🧪 Алхімія).");
  showScene("🎁 БЛАГОСЛОВЕННА СКРИНЬКА", lines);
}

function takeCurse(hero) {
  giveItem(hero, "Прокляте Лезо Безодні");
  showScene("💀 ПРОКЛЯТА СКРИНЬКА", ["З темряви висувається чорне лезо.", "+18 атаки, +10% криту, але після кожного бою воно п'є -8% твого HP.", "Надягти його можна в Інвентарі."]);
}

function openSecretBox(hero, type) {
  if (type === "blessed") learnRecipe(hero);
  else takeCurse(hero);
}

function chooseSecretBox(hero) {
  const options = ["🎁 Благословенна скринька", "💀 Проклята скринька"];
  const header = "Система: «Обери одну. Іншу отримаєш лише на дні Демонічного Замку.»";
  const type = askMenu("📦 ДВІ СКРИНЬКИ", options, header) === 1 ? "blessed" : "cursed";
  hero.story.secretBox = type;
  openSecretBox(hero, type);
}

function completeSecretQuest(hero) {
  dailyQuest.completed = true;
  hero.story.secretFound = true;
  showScene("🔷 СЕКРЕТНИЙ КВЕСТ", ["Лічильники спалахують червоним.", "[Подвійне навантаження визнано. Квест змінено.]", "Ти зрозумів: Система винагороджує тих, хто виходить за межі."]);
  grantPassive(hero, "longevity");
  giveItem(hero, "Ключ Демонічного Замку");
  giveItem(hero, "Ампула Повного Відновлення");
  say("🗝 Ключ Демонічного Замку\n💉 Ампула Повного Відновлення\n🎯 10 очок характеристик", "good");
  distributePoints(hero, 10);
  chooseSecretBox(hero);
}

function finishQuest(hero) {
  const allDoubled = dailyQuest.tasks.every(t => t.doubled);
  if (dailyQuest.secretEligible && allDoubled) completeSecretQuest(hero);
  else completeQuest(hero);
}

function performTask(hero, task, doubled) {
  const cost = getTaskCost(hero) * (doubled ? 2 : 1);
  if (hero.hp <= cost) { say("😵 Ти надто втомлений. Відпочинь або вилікуйся."); return; }
  hero.hp -= cost;
  task.done = true;
  task.doubled = doubled;
  const reps = doubled ? task.amount * 2 : task.shown;
  say(`💪 ${task.name}: ${reps} ${task.unit} — виконано! (-${cost} HP)`, "good");
  if (doubled) say("🔷 [Лічильник: навантаження ×2 зараховано]", "system");
  if (dailyQuest.tasks.every(t => t.done)) finishQuest(hero);
}

function doQuestTask(hero, task) {
  if (task.done) { say("Це завдання вже виконано."); return; }
  const options = [`Виконати норму (${task.shown} ${task.unit})`];
  if (dailyQuest.secretEligible) options.push(`Спробувати рівно вдвічі від норми (${task.amount * 2} ${task.unit})`);
  options.push("Назад");
  const choice = askMenu(`💪 ${task.name}`, options, `Лічильник Системи: ${task.shown} ${task.unit}`);
  if (choice === options.length) return;
  performTask(hero, task, choice === 2);
}

// Меню щоденного квесту.
function showQuestMenu(hero) {
  if (!dailyQuest) { say("Щоденного квесту ще немає."); return; }
  while (!dailyQuest.completed && isAlive(hero)) {
    const labels = dailyQuest.tasks.map(t => `${t.done ? "☑" : "☐"} ${t.name}: ${t.shown} ${t.unit}${t.doubled ? " (×2)" : ""}`);
    labels.push("Назад");
    let header = `Кожне завдання коштує ${getTaskCost(hero)} HP (втома)\n❤ ${drawHealthBar(hero.hp, hero.maxHp)}`;
    if (dailyQuest.secretEligible) header += "\n⚠ Лічильники Системи показують дивні числа...";
    const choice = askMenu(`📋 ЩОДЕННИЙ КВЕСТ · День ${gameDay}`, labels, header);
    if (choice === labels.length) return;
    doQuestTask(hero, dailyQuest.tasks[choice - 1]);
  }
  if (dailyQuest.completed) say("✔ Квест на сьогодні виконано. Нагороду вже отримано.");
}

function enterPenaltyZone(hero) {
  showScene("☠ ЗОНА ШТРАФУ", [
    "Ти не виконав щоденний квест.",
    "Світ згасає, і ти падаєш на гарячий пісок.",
    "З-під землі виповзає Гігантська Багатоніжка.",
    `Протримайся ${PENALTY_ROUNDS} раундів. Підказка: Захист зменшує урон удвічі.`
  ]);
  const level = hero.level;
  const template = { name: "Гігантська Багатоніжка", hp: 40 + level * 20, attack: 6 + level * 2, defense: Math.floor(level * 0.8), xp: 0, gold: 0, noEscape: true, noExtract: true, surviveRounds: PENALTY_ROUNDS };
  const result = battle(hero, scaleEnemy(template, 1));
  if (result === "dead") return;
  say("🌅 Штрафний час минув. Ти виживши повертаєшся до реальності.", "good");
  grantPassive(hero, "detox");
  if (!emergencyQuest) startEmergencyQuest(hero);
}

function startEmergencyQuest(hero) {
  const target = 2 + Math.floor(hero.level / 10);
  emergencyQuest = { kills: 0, target: target, daysLeft: 3 };
  showScene("🚨 НЕВІДКЛАДНИЙ КВЕСТ", [`Переможи ворогів: ${target}.`, "Термін: 3 дні.", "Провал: -25% HP та -15% золота."]);
}

function completeEmergencyQuest(hero) {
  emergencyQuest = null;
  const box = openQuestBox(hero);
  say(panel("🚨 НЕВІДКЛАДНИЙ КВЕСТ ВИКОНАНО", [`📦 Скринька: ${box.name}`, "🎯 2 очки характеристик"]), "good");
  distributePoints(hero, 2);
}

function failEmergencyQuest(hero) {
  emergencyQuest = null;
  const goldLoss = Math.floor(hero.gold * 0.15);
  hero.gold -= goldLoss;
  loseHp(hero, 25);
  say(panel("🚨 НЕВІДКЛАДНИЙ КВЕСТ ПРОВАЛЕНО", [`-${goldLoss} золота, -25% HP`]), "bad");
}

function registerKill(hero) {
  if (!emergencyQuest) return;
  emergencyQuest.kills++;
  if (emergencyQuest.kills >= emergencyQuest.target) completeEmergencyQuest(hero);
}

function restForNight(hero, slept) {
  const heal = Math.round(hero.maxHp * (slept ? 0.5 : 0.25));
  healHp(hero, heal);
  hero.mp = slept ? getMaxMp(hero) : Math.min(getMaxMp(hero), hero.mp + Math.round(getMaxMp(hero) * 0.5));
  say(`🌙 День ${gameDay} завершено. Відпочинок: +${heal} HP.`);
}

function endDay(hero, slept) {
  restForNight(hero, slept);
  if (emergencyQuest) {
    emergencyQuest.daysLeft--;
    if (emergencyQuest.daysLeft <= 0) failEmergencyQuest(hero);
  }
  if (hero.isSystemPlayer && dailyQuest && !dailyQuest.completed) {
    enterPenaltyZone(hero);
    if (!isAlive(hero)) return;
  }
  gameDay++;
  actionsToday = 0;
  if (hero.isSystemPlayer) dailyQuest = createDailyQuest(hero);
  say(`🌅 Починається день ${gameDay}.${hero.isSystemPlayer ? " Новий щоденний квест відкрито." : ""}`);
}

function spendAction(hero) {
  actionsToday++;
  if (actionsToday >= ACTIONS_PER_DAY) endDay(hero, false);
}

function getPassiveSource(key) {
  const byLevel = LEVEL_PASSIVES.find(p => p.key === key);
  if (byLevel) return `з ${byLevel.level} рівня${byLevel.classes ? ` (${byLevel.classes.join("/")})` : ""}`;
  return PASSIVE_SOURCES[key] || "перк професії";
}

function showPassives(hero) {
  const lines = Object.keys(PASSIVES).map(key => hero.passives.includes(key)
    ? `✅ ${PASSIVES[key].name} — ${PASSIVES[key].desc}`
    : `🔒 ${PASSIVES[key].name} — ${PASSIVES[key].desc} [${getPassiveSource(key)}]`);
  showScene(`🌟 ПАСИВКИ: ${hero.passives.length}/${lines.length}`, lines);
}


function systemMenu(hero) {
  if (!hero.isSystemPlayer) {
    say("🔒 Система ще не відкрилась. Пройди Подвійне підземелля.");
    return;
  }
  while (isAlive(hero)) {
    const choice = askMenu("🔷 СИСТЕМА", ["📋 Щоденний квест", "🛒 Магазин Системи", "✨ Здібності (перегляд)", "🌟 Пасивки (перегляд)", "Назад"], getStatusHeader(hero));
    if (choice === 1) showQuestMenu(hero);
    else if (choice === 2) openShop(hero, "system");
    else if (choice === 3) showAbilities(hero);
    else if (choice === 4) showPassives(hero);
    else return;
  }
}

function restAtBase(hero) {
  if (hero.hp === hero.maxHp) {
    say("Ти й так у повній формі.");
    return;
  }
  if (hero.gold < HEAL_COST) {
    say("Недостатньо золота для відновлення.");
    return;
  }
  hero.gold -= HEAL_COST;
  hero.hp = hero.maxHp;
  say("💊 Тебе повністю відновлено.", "good");
}

function alchemyMenu(hero) {
  if (!hero.story.hasRecipe) {
    say("📜 Ти ще не знаєш жодного рецепта. Може, Система колись його подарує...");
    return;
  }
  const lines = RECIPE_INGREDIENTS.map(i => `${hasItem(hero, i.name) ? "☑" : "☐"} ${i.name} (${i.floor} поверх Замку)`);
  const missing = RECIPE_INGREDIENTS.filter(i => !hasItem(hero, i.name));
  if (missing.length > 0 || hasItem(hero, "Еліксир Життя")) {
    say(panel("🧪 ЕЛІКСИР ЖИТТЯ", hasItem(hero, "Еліксир Життя") ? ["Еліксир уже зварено. Віднеси його матері."] : lines));
    return;
  }
  if (!confirm(`${panel("🧪 ЕЛІКСИР ЖИТТЯ", lines)}\n\nУсе зібрано. Зварити еліксир?`)) return;
  RECIPE_INGREDIENTS.forEach(i => removeItemByName(hero, i.name));
  giveItem(hero, "Еліксир Життя");
  say("🧪 Еліксир Життя зварено! Віднеси його в лікарню.", "gold");
}

function hospitalVisit(hero) {
  const options = ["👩 Відвідати матір", "👨‍⚕ Поговорити з лікарем", "Назад"];
  const choice = askMenu("🏥 ЛІКАРНЯ", options);
  if (choice === 1) visitMother(hero);
  else if (choice === 2) say(hero.story.motherHealed ? "👨‍⚕ Лікар: «Це диво. Усі аналізи ідеальні.»" : "👨‍⚕ Лікар: «Без змін. Ми робимо все, що можемо.»");
}

function visitMother(hero) {
  hero.story.motherSeen = true;
  if (hero.story.motherHealed) {
    say("👩 Мати посміхається й тримає тебе за руку.");
    return;
  }
  if (!hasItem(hero, "Еліксир Життя")) {
    say("👩 Мати спить. Лікарі не знають причини. Ти шепочеш: «Я знайду спосіб».");
    return;
  }
  if (!confirm("Дати Еліксир Життя матері?")) return;
  removeItemByName(hero, "Еліксир Життя");
  hero.story.motherHealed = true;
  showScene("💚 ПРОБУДЖЕННЯ", ["Еліксир розтікається теплом по її руках.", "Повіки здригаються. Вона розплющує очі.", "«Синку... ти так виріс.»"]);
  grantPassive(hero, "motherBlessing");
}

function baseMenu(hero) {
  while (isAlive(hero)) {
    const title = `🏕 БАЗА | HP ${hero.hp}/${hero.maxHp} | Золото ${hero.gold}`;
    const options = [`💊 Відновлення HP (${HEAL_COST} золота)`, "😴 Лягти спати (новий день, +50% HP, повні MP)", "🧪 Алхімія", "🏥 Лікарня", "Назад"];
    const choice = askMenu(title, options);
    if (choice === 1) restAtBase(hero);
    else if (choice === 2) endDay(hero, true);
    else if (choice === 3) alchemyMenu(hero);
    else if (choice === 4) hospitalVisit(hero);
    else return;
  }
}


function shadowsAttack(hero, enemy) {
  if (hero.shadows.length === 0 || !isAlive(enemy)) return;
  const base = hero.shadows.reduce((sum, s) => sum + Math.max(1, s.power + getRandomInt(-2, 2) - enemy.defense), 0);
  const total = Math.round(base * (hero.effects.domainTurns > 0 ? 1 + DOMAIN_BONUS / 100 : 1));
  enemy.hp = Math.max(0, enemy.hp - total);
  say(`👥 Тіні завдали ${total} урону.`, "system");
}

function tryExtractShadow(hero, enemy) {
  if (!hero.passives.includes("shadowExtraction") || enemy.noExtract) return;
  const chance = enemy.doubleEvery ? 70 : 30;
  if (getRandomInt(1, 100) > chance) return;
  if (hero.shadows.length >= MAX_SHADOWS + getPassiveTotal(hero, "shadowSlots")) {
    say("👥 У тебе вже максимум тіней.");
    return;
  }
  const name = enemy.name.replace(/^\[.*?\]\s*/, "");
  if (!confirm(`🌑 Тінь «${name}» ще не зникла.\nВитягти її? («ВСТАНЬ»)`)) return;
  hero.shadows.push({ name: name, power: Math.max(2, Math.round(enemy.attack * 0.35)) });
  say(`🌑 «ВСТАНЬ!» Тінь «${name}» тепер служить тобі.`, "system");
}

function getAvailableAbilities(hero) {
  return ABILITIES.filter(a => hero.level >= a.minLevel && (!a.classes || a.classes.includes(hero.className)) && isAbilityOpen(hero, a));
}


function isAbilityOpen(hero, ability) {
  return !ability.needsFlag || hero.story[ability.needsFlag];
}

function getCooldown(ability) { return ABILITY_COOLDOWNS[ability.id] || 0; }

function cooldownLeft(hero, ability) { return hero.cooldowns[ability.id] || 0; }

function cooldownText(hero, ability) {
  if (cooldownLeft(hero, ability) > 0) return ` | ⏳ ще ${cooldownLeft(hero, ability)} х.`;
  return getCooldown(ability) > 0 ? ` | КД ${getCooldown(ability) >= 99 ? "раз за бій" : getCooldown(ability)}` : "";
}

function tickCooldowns(hero) {
  if (hero.effects.domainTurns > 0) hero.effects.domainTurns--; // Територія Монарха спливає
  Object.keys(hero.cooldowns).forEach(id => {
    hero.cooldowns[id] = Math.max(0, hero.cooldowns[id] - 1);
  });
}

function abilityLine(hero, ability) {
  const hit = ability.kind === "attack" ? ` | влучання ${getAbilityHitChance(hero, ability)}%` : "";
  return `${ability.name} | MP ${getAbilityCost(hero, ability)}${hit}${cooldownText(hero, ability)} | ${ability.desc}`;
}

function showAbilities(hero) {
  const mine = ABILITIES.filter(a => !a.classes || a.classes.includes(hero.className));
  const lines = mine.map(a => hero.level >= a.minLevel && isAbilityOpen(hero, a)
    ? `✅ ${abilityLine(hero, a)}`
    : `🔒 ${a.name} (${a.needsFlag ? "відкривається в сюжеті" : `з ${a.minLevel} рівня`}) | ${a.desc}`);
  showScene(`✨ ЗДІБНОСТІ: ${hero.className}, рівень ${hero.level}`, lines);
}

function counterStrike(hero, enemy) {
  const raw = enemy.attack + getRandomInt(-3, 3) - getTotalDefense(hero);
  const damage = applyLowHpReduction(hero, toHeroHp(hero, Math.max(1, Math.round(raw * 0.6) - getPassiveTotal(hero, "reduction"))));
  hero.hp = Math.max(0, hero.hp - damage);
  say(`⚠ ${enemy.name} контратакує впритул: -${damage} HP.`, "bad");
  checkSecondWind(hero);
}

function applyAbilityEffect(hero, enemy, ability) {
  if (ability.effect === "stun") {
    if (enemy.doubleEvery) say("Бос стійкий до оглушення.");
    else { enemy.stunned = 1; say(`💫 ${enemy.name} оглушений!`, "good"); }
  }
  if (ability.effect === "bleed") {
    enemy.bleed = { turns: 3, dmg: Math.max(2, Math.round(getTotalAttack(hero) * 0.2)) };
    say(`🩸 ${enemy.name} стікає кров'ю!`, "good");
  }
}

function abilityHit(hero, enemy, ability, chance) {
  if (tryExecute(hero, enemy)) return;
  const defense = ability.ignoreDef ? 0 : enemy.defense;
  let damage = Math.max(1, Math.round(getTotalAttack(hero) * ability.power) + getRandomInt(-3, 3) - defense);
  if (ability.alwaysCrit || getRandomInt(1, 100) <= getCritChance(hero)) { damage *= 2; say(" КРИТ!", "gold"); }
  enemy.hp = Math.max(0, enemy.hp - damage);
  say(`✨ ${ability.name} влучила! ${damage} урону (шанс ${chance}%).`, "good");
  applyLifesteal(hero, damage);
  applyAbilityEffect(hero, enemy, ability);
}

function abilityStrike(hero, enemy, ability) {
  const chance = getAbilityHitChance(hero, ability);
  if (getRandomInt(1, 100) <= chance) abilityHit(hero, enemy, ability, chance);
  else say(`💨 ${ability.name} не влучила (шанс ${chance}%).`, "bad");
  if (ability.counter && isAlive(enemy) && getRandomInt(1, 100) <= ability.counter) counterStrike(hero, enemy);
}


function executeSpecialAbility(hero, enemy, ability) {
  switch (ability.kind) {
    case "sprint": startSprint(hero); return true;
    case "fear": spreadFear(enemy); return true;
    case "rush":
      for (let i = 0; i < RUSH_HITS && isAlive(enemy); i++) strikeOnce(hero, enemy, RUSH_POWER);
      return true;
    case "swap": hero.effects.teleported = true; say("🌑 Тіньовий обмін: ти опинився поруч зі своєю тінню.", "good"); return true;
    case "domain": hero.effects.domainTurns = DOMAIN_TURNS; say(`👑 Територія Монарха: тіні сильніші ${DOMAIN_TURNS} ходи.`, "good"); return true;
    case "astral":
      hero.bonusAttack += Math.round(getTotalAttack(hero) * 0.8);
      hero.bonusDefense += Math.round(getTotalDefense(hero) * 0.5);
      say("🌌 Тіньове Тіло: ти стаєш колосом із тіні!", "gold");
      return true;
    default: return false;
  }
}

function startSprint(hero) {
  hero.effects.sprintTurns = SPRINT_TURNS;
  hero.story.sprintUses++;
  say(`⚡ Спринт: ${SPRINT_TURNS} ходи ти рухаєшся швидше за ворога.`, "good");
  if (hero.story.sprintUses >= SPRINT_EVOLVE_USES && !hero.story.quicksilver) {
    hero.story.quicksilver = true;
    say(`✨ Спринт еволюціонував у Ртуть: ухилення тепер ${QUICKSILVER_DODGE}%!`, "gold");
  }
}

function spreadFear(enemy) {
  if (!isBossEnemy(enemy)) { enemy.stunned = 2; say(`😨 ${enemy.name} цепеніє від жаху (2 ходи).`, "good"); return; }
  if (!enemy.feared) { enemy.feared = true; enemy.attack = Math.round(enemy.attack * (1 - FEAR_BOSS_DEBUFF / 100)); }
  say(`😨 ${enemy.name} здригається: його атака -${FEAR_BOSS_DEBUFF}%.`, "good");
}

function evadesHit(hero) {
  if (hero.effects.stealthTurns > 0 && stealthDodges(hero)) return true;
  if (hero.effects.sprintTurns <= 0) return false;
  hero.effects.sprintTurns--;
  if (getRandomInt(1, 100) > (hero.story.quicksilver ? QUICKSILVER_DODGE : SPRINT_DODGE)) return false;
  say("⚡ Ти ривком ухиляєшся від удару!", "good");
  return true;
}

function executeAbility(hero, enemy, ability) {
  if (ability.kind === "heal") {
    if (hero.effects.cannotHeal) { say("🚨 Лікування заблоковано Ядом Касаки!"); return; }
    healHp(hero, Math.round(hero.maxHp * ability.power));
    say(`💚 ${ability.name}: HP відновлено.`, "good");
  } else if (ability.kind === "stealth") {
    hero.effects.stealthTurns = 2;
    say(`🌑 ${ability.name}: ворог тебе майже не бачить (2 ходи).`, "good");
  } else if (ability.kind === "buff") {
    const bonus = Math.round(hero.attack * ability.power);
    hero.bonusAttack += bonus;
    say(`🔥 ${ability.name}: +${bonus} атаки до кінця бою.`, "good");
  } else if (!executeSpecialAbility(hero, enemy, ability)) {
    abilityStrike(hero, enemy, ability);
  }
}

function useAbility(hero, enemy) {
  const list = getAvailableAbilities(hero);
  const lines = list.map(a => abilityLine(hero, a));
  lines.push("Назад");
  const choice = askMenu("✨ ЗДІБНОСТІ", lines, `🔷 MP ${hero.mp}/${getMaxMp(hero)}`);
  if (choice === lines.length) return false;
  const ability = list[choice - 1];
  if (cooldownLeft(hero, ability) > 0) { say(`⏳ ${ability.name} ще перезаряджається: ${cooldownLeft(hero, ability)} х.`); return false; }
  if (ability.kind === "swap" && (hero.shadows.length === 0 || enemy.noEscape || isBossEnemy(enemy))) {
    say("🌑 Обмін неможливий: потрібна тінь, а бос або пастка не відпустять тебе.");
    return false;
  }
  const cost = getAbilityCost(hero, ability);
  if (hero.mp < cost) { say("🔷 Недостатньо MP!"); return false; }
  hero.mp -= cost;
  if (getCooldown(ability) > 0) hero.cooldowns[ability.id] = getCooldown(ability) + 1; // запуск перезарядки
  executeAbility(hero, enemy, ability);
  return true;
}

function getBattleStatus(hero) {
  const flags = [];
  if (hero.effects.isPoisoned) flags.push(`☠ отруєний (${hero.effects.poisonDuration})`);
  if (hero.effects.cannotHeal) flags.push("🚫 лікування заблоковано");
  if (hero.shadows.length > 0) flags.push(`👥 тіней: ${hero.shadows.length}`);
  return flags.length > 0 ? `\n${flags.join(" · ")}` : "";
}

function applyLifesteal(hero, damage) {
  const percent = getStatBonus(hero, "lifesteal");
  if (percent <= 0 || hero.effects.cannotHeal) return;
  const heal = toHeroHp(hero, Math.max(1, Math.floor(damage * percent / 100)));
  healHp(hero, heal);
  say(`🩸 Вампіризм: +${heal} HP`);
}

function isBossEnemy(enemy) { return !!enemy.doubleEvery; }

function getExecuteChance(hero, enemy) {
  if (enemy && isBossEnemy(enemy)) return 0;
  let chance = EXECUTE_BASE + hero.level * EXECUTE_PER_LEVEL;
  if (hasDaggers(hero)) chance += EXECUTE_DAGGERS;
  if (hero.className === "Асасін") chance += EXECUTE_ASSASSIN;
  if (enemy && enemy.hp <= enemy.maxHp * 0.25) chance += EXECUTE_WEAK;
  return Math.min(EXECUTE_MAX, chance);
}

function tryExecute(hero, enemy) {
  if (getRandomInt(1, 100) > getExecuteChance(hero, enemy)) return false;
  enemy.hp = 0;
  say(`🗡 ОБЕЗГЛАВЛЕННЯ! ${enemy.name} падає без голови.`, "gold");
  return true;
}

function strikeOnce(hero, enemy, power) {
  if (tryExecute(hero, enemy)) return;
  let dmg = Math.max(1, Math.round(getTotalAttack(hero) * power) + getRandomInt(-3, 3) - enemy.defense);
  if (getRandomInt(1, 100) <= getCritChance(hero)) { dmg *= 2; say(" КРИТ!", "gold"); }
  enemy.hp = Math.max(0, enemy.hp - dmg);
  say(`⚔ Ти завдав ${dmg} урону.`);
  applyLifesteal(hero, dmg);
}

function basicAttack(hero, enemy) {
  strikeOnce(hero, enemy, 1);
  if ((hasDaggers(hero) || hero.weapon2) && isAlive(enemy)) {
    say("🗡 Другий кинджал!");
    strikeOnce(hero, enemy, DUAL_HIT_POWER);
  }
  return "attack";
}

function tryEscape(hero, enemy) {
  if (isInRedGate || enemy.noEscape) { say(" Звідси неможливо втекти!", "bad"); return "blocked"; }
  if (getRandomInt(1, 100) <= getEscapeChance(hero)) return "escape";
  say("Втекти не вдалося!");
  return "failed";
}

function playerTurn(hero, enemy) {
  const actions = ["⚔ Атака", "✨ Здібності", "🛡 Захист", "🎒 Предмет", "🏃 Втекти"];
  let carried = flushEvents();
  while (true) {
    const extra = flushEvents();
    if (extra !== "") carried += (carried !== "" ? "\n" : "") + extra;
    const title = `ТВІЙ ХІД\n🧑 ${hero.name}  ${drawHealthBar(hero.hp, hero.maxHp)}  🔷${hero.mp}\n👹 ${enemy.name}  ${drawHealthBar(enemy.hp, enemy.maxHp)}${getBattleStatus(hero)}`;
    switch (askMenu(title, actions, carried)) {
      case 1:
        return basicAttack(hero, enemy);
      case 2:
        if (useAbility(hero, enemy)) return hero.effects.teleported ? "escape" : "ability";
        break;
      case 3:
        say("🛡 Захист: урон у цьому ходу зменшено вдвічі.");
        return "defend";
      case 4:
        if (useItem(hero, true)) return hero.effects.teleported ? "escape" : "item";
        break;
      default: {
        const result = tryEscape(hero, enemy);
        if (result !== "blocked") return result;
      }
    }
  }
}

function checkSecondWind(hero) {
  if (hero.hp > 0 || hero.effects.willUsed || getPassiveTotal(hero, "survive") <= 0) return;
  hero.hp = 1;
  hero.effects.willUsed = true;
  say("🔥 Воля до Життя: ти вистояв з 1 HP!", "gold");
}

function calcEnemyDamage(hero, enemy, heroDefended, turn) {
  let damage = Math.max(1, enemy.attack + getRandomInt(-3, 3) - getTotalDefense(hero));
  if (enemy.doubleEvery && turn % enemy.doubleEvery === 0) {
    damage *= 2;
    say(`Особливий подвійний урон ворога!`, "bad");
  }
  if (heroDefended) damage = Math.max(1, Math.floor(damage / 2));
  return applyLowHpReduction(hero, toHeroHp(hero, Math.max(1, damage - getPassiveTotal(hero, "reduction"))));
}

function tryPoison(hero, enemy) {
  if (enemy.effect === "poison" && !hero.effects.isPoisoned && !isPoisonImmune(hero)) {
    hero.effects.isPoisoned = true;
    hero.effects.poisonDuration = 3;
    say(` ${enemy.name} отруїв вас!`, "bad");
  }
}

function detoxTick(hero) {
  const buff = Math.max(1, Math.round(hero.attack * 0.05));
  hero.bonusAttack += buff;
  hero.effects.poisonDuration--;
  say(`☣ Детоксикація: отрута дала +${buff} атаки до кінця бою.`, "good");
  if (hero.effects.poisonDuration <= 0) hero.effects.isPoisoned = false;
}

function applyPoisonTick(hero) {
  if (!hero.effects.isPoisoned) return;
  if (isPoisonImmune(hero)) { hero.effects.isPoisoned = false; return; }
  if (hero.passives.includes("detox")) { detoxTick(hero); return; }
  const poison = toHeroHp(hero, 5);
  hero.hp = Math.max(0, hero.hp - poison);
  hero.effects.poisonDuration--;
  say(` Отрута завдає вам ${poison} урону. Залишилось ходів: ${hero.effects.poisonDuration}`, "bad");
  if (hero.effects.poisonDuration <= 0) hero.effects.isPoisoned = false;
}

function stealthDodges(hero) {
  hero.effects.stealthTurns--;
  if (getRandomInt(1, 100) > STEALTH_DODGE) return false;
  say("🌑 Ворог б'є в порожнечу: ти непомітний!", "good");
  return true;
}

function enemyTurn(hero, enemy, heroDefended, turn) {
  if (enemy.stunned > 0) {
    enemy.stunned--;
    say(`💫 ${enemy.name} оглушений і пропускає хід.`);
    return;
  }
  if (evadesHit(hero)) return;
  tryPoison(hero, enemy);
  const damage = calcEnemyDamage(hero, enemy, heroDefended, turn);
  hero.hp = Math.max(0, hero.hp - damage);
  say(`${enemy.name} завдає тобі ${damage} урону.`);
  checkSecondWind(hero);
  applyPoisonTick(hero);
  checkSecondWind(hero);
}

function applyEnemyDot(enemy) {
  if (!enemy.bleed || enemy.bleed.turns <= 0 || !isAlive(enemy)) return;
  enemy.hp = Math.max(0, enemy.hp - enemy.bleed.dmg);
  enemy.bleed.turns--;
  say(`🩸 Кровотеча: ${enemy.name} втрачає ${enemy.bleed.dmg} HP.`, "good");
}

function endRoundRecovery(hero) {
  const regen = getPassiveTotal(hero, "regen");
  if (regen > 0 && isAlive(hero) && !hero.effects.cannotHeal) {
    healHp(hero, toHeroHp(hero, regen));
    say(`💚 Регенерація: +${toHeroHp(hero, regen)} HP`);
  }
  const mpGain = toHeroMp(hero, 2 + Math.floor(hero.level / 10) + getPassiveTotal(hero, "mpRegen"));
  hero.mp = Math.min(getMaxMp(hero), hero.mp + mpGain);
}

function showBattleState(hero, enemy) {
  console.log(`\n${hero.name}: ${drawHealthBar(hero.hp, hero.maxHp)}`);
  console.log(`${enemy.name}: ${drawHealthBar(enemy.hp, enemy.maxHp)}`);
}

function giveRewards(hero, enemy) {
  const xp = Math.round(enemy.xp * (1 + getPassiveTotal(hero, "xpBonus") / 100));
  const gold = Math.round(enemy.gold * (1 + getPassiveTotal(hero, "goldBonus") / 100));
  hero.xp += xp;
  hero.gold += gold;
  say(`🏆 Перемога! +${xp} XP, +${gold} золота.`, "good");
  if (getRandomInt(1, 100) <= DROP_CHANCE + getPassiveTotal(hero, "dropBonus")) {
    const pool = SHOP_ITEMS.filter(item => item.shop === "association" && item.cat === "potion");
    const drop = giveItem(hero, pickRandom(pool).name);
    say(`🎁 Знайдено предмет: ${drop.name}!`, "gold");
  }
  checkLevelUp(hero);
  registerKill(hero);
}

function battleRound(hero, enemy, turn) {
  const action = playerTurn(hero, enemy);
  if (action === "escape") return action;
  shadowsAttack(hero, enemy);
  applyEnemyDot(enemy);
  if (isAlive(enemy)) enemyTurn(hero, enemy, action === "defend", turn);
  endRoundRecovery(hero);
  tickCooldowns(hero);
  showBattleState(hero, enemy);
  return action;
}

function endBattle(hero) {
  currentEnemy = null;
  resetBattleEffects(hero);
  const cursed = [hero.weapon, hero.weapon2].some(w => w && w.curse);
  if (isAlive(hero) && cursed && !hero.passives.includes("longevity")) {
    loseHp(hero, 8);
    say("☠ Прокляте лезо п'є твоє здоров'я (-8% HP).", "bad");
  }
}

function finishBattle(hero, enemy) {
  endBattle(hero);
  if (!isAlive(hero)) return "dead";
  giveRewards(hero, enemy);
  tryExtractShadow(hero, enemy);
  return "win";
}

function battle(hero, enemy) {
  printTitle(`БІЙ: ${enemy.name}`);
  say(`⚔ Бій починається: ${enemy.name}`);
  currentEnemy = enemy;
  let turn = 1;
  showBattleState(hero, enemy);

  while (isAlive(hero) && isAlive(enemy)) {
    if (battleRound(hero, enemy, turn) === "escape") {
      say("Ти втік з бою!");
      endBattle(hero);
      return "escape";
    }
    if (enemy.surviveRounds && turn >= enemy.surviveRounds && isAlive(hero)) {
      endBattle(hero);
      return "survived";
    }
    turn++;
  }
  return finishBattle(hero, enemy);
}


function rewardRedGate(hero) {
  if (!hero.hasHealthyLife) activateSystem();
  giveItem(hero, "Руна Монарха");
  say("🎁 З Монарха випала Руна Монарха!", "gold");
}

function fight(hero, locationType) {
  const enemy = pickRandomEnemy(locationType);
  const result = battle(hero, enemy);
  if (result === "win" && isInRedGate) rewardRedGate(hero);
  isInRedGate = false;
  currentDungeon = null;
  return result;
}

function fightEventFloor(hero, dungeon, floor) {
  const scale = 1 + Math.max(0, hero.level - dungeon.minLevel) * 0.04;
  const isBoss = floor === dungeon.floors;
  const template = isBoss ? dungeon.boss : pickRandom(dungeon.mobs);
  say(`${dungeon.icon} Поверх ${floor}/${dungeon.floors}${isBoss ? " — БОС!" : ""}`, "system");
  return battle(hero, scaleEnemy(template, scale));
}

function finishEventDungeon(hero, dungeon) {
  dungeon.rewards.forEach(name => giveItem(hero, name));
  say(panel(`${dungeon.icon} ${dungeon.name} ПРОЙДЕНО`, dungeon.rewards.map(name => `🎁 ${name}`)), "good");
  if (dungeon.id === "kasaka") grantRune(hero, "sprintRune");
  return "win";
}

function runEventDungeon(hero, dungeon) {
  showScene(`${dungeon.icon} ${dungeon.name}`, [dungeon.intro]);
  for (let floor = 1; floor <= dungeon.floors; floor++) {
    const result = fightEventFloor(hero, dungeon, floor);
    if (result !== "win") return result;
    if (floor < dungeon.floors && !confirm(`Поверх ${floor} пройдено.\n❤ ${hero.hp}/${hero.maxHp}\nСпуститися глибше?`)) {
      say("Ти залишив підземелля з трофеями.");
      return "escape";
    }
  }
  return finishEventDungeon(hero, dungeon);
}

function runKasaka(hero) {
  if (!consumeKey(hero, "kasaka")) {
    say("🔒 Потрібен Ключ Підземелля Касаки (нагорода за щоденний квест).");
    return "none";
  }
  const result = runEventDungeon(hero, KASAKA_DUNGEON);
  if (result === "escape") giveItem(hero, "Ключ Підземелля Касаки");
  return result;
}

function fightCastleFloor(hero, floor) {
  const isBoss = floor === DEMON_CASTLE.floors;
  const isGuardian = floor % 10 === 0 && !isBoss;
  const template = isBoss ? DEMON_CASTLE.boss : (isGuardian ? DEMON_CASTLE.guardian : pickRandom(DEMON_CASTLE.mobs));
  const scale = isBoss ? 1 : 1 + (floor - 1) * 0.05;
  const enemy = scaleEnemy(template, scale);
  enemy.name = `${template.name} [${floor}]`;
  enemy.xp = Math.round(template.xp * scale);
  enemy.gold = Math.round(template.gold * scale);
  say(`🏰 Поверх ${floor}/${DEMON_CASTLE.floors}${isBoss ? " — КОРОЛЬ ДЕМОНІВ!" : isGuardian ? " — Страж" : ""}`, "system");
  return battle(hero, enemy);
}


function finishDemonCastle(hero) {
  grantPassive(hero, "demonBlood");
  giveItem(hero, "Меч Демонічного Короля");
  const other = hero.story.secretBox === "blessed" ? "cursed" : "blessed";
  showScene("👑 КОРОЛЬ ДЕМОНІВ ПОВАЛЕНИЙ", ["Замок здригається й тріскає по швах.", "На троні лишається меч і скринька, яку ти колись не обрав.", "🎁 Меч Демонічного Короля"]);
  openSecretBox(hero, other);
}

function castleRewards(hero, floor) {
  const ingredient = RECIPE_INGREDIENTS.find(i => i.floor === floor);
  if (ingredient && !hasItem(hero, ingredient.name)) {
    giveItem(hero, ingredient.name);
    say(`🌿 Знайдено інгредієнт: ${ingredient.name}!`, "gold");
  }
  if (floor % 10 === 0 && floor < DEMON_CASTLE.floors) {
    hero.gold += 50 * floor;
    say(`💰 Скарб вартового: +${50 * floor} золота.`, "gold");
  }
  if (floor === 50) grantRune(hero, "rulerRune");
  if (floor === DEMON_CASTLE.floors) finishDemonCastle(hero);
}

function descendCastle(hero, count) {
  let result = "none";
  for (let i = 0; i < count && hero.story.castleFloor < DEMON_CASTLE.floors; i++) {
    const floor = hero.story.castleFloor + 1;
    const fightResult = fightCastleFloor(hero, floor);
    if (fightResult === "dead") return "dead";
    if (fightResult !== "win") return "escape";
    hero.story.castleFloor = floor;
    castleRewards(hero, floor);
    result = "win";
    if (i < count - 1 && !confirm(`Поверх ${floor} пройдено.\n❤ ${hero.hp}/${hero.maxHp}\nСпускатися далі?`)) break;
  }
  return result;
}

function firstCastleEntry(hero) {
  if (hero.story.castleUnlocked) {
    if (isEpisodeDone(hero, 7)) return "again";
    return playEpisode(hero, 7) === "dead" ? "dead" : "entered";
  }
  if (!consumeKey(hero, "demon")) {
    say("🔒 Потрібен Ключ Демонічного Замку (секретний квест).");
    return "locked";
  }
  hero.story.castleUnlocked = true;
  showScene("🏰 ДЕМОНІЧНИЙ ЗАМОК", ["Чорний замок піднявся з розлому в землі.", "Сто поверхів. Сто випробувань.", "Десь у глибині ростуть квіти, здатні воскресити навіть мертвих."]);
  return playEpisode(hero, 7) === "dead" ? "dead" : "entered";
}

function runDemonCastle(hero) {
  const entry = firstCastleEntry(hero);
  if (entry === "locked") return "none";
  if (entry === "dead") return "dead";
  let result = entry === "entered" ? "win" : "none";
  while (hero.story.castleFloor < DEMON_CASTLE.floors) {
    const next = hero.story.castleFloor + 1;
    const options = ["Спуститися на 1 поверх", "Пройти 5 поверхів підряд", "Піднятися на поверхню"];
    const choice = askMenu(`🏰 ДЕМОНІЧНИЙ ЗАМОК · поверх ${next}/${DEMON_CASTLE.floors}`, options, getStatusHeader(hero));
    if (choice === 3) break;
    const step = descendCastle(hero, choice === 1 ? 1 : 5);
    if (step === "dead") return "dead";
    if (step !== "none") result = step;
  }
  return result;
}

function specialDungeonMenu(hero) {
  const castleLabel = hero.story.castleUnlocked
    ? `🏰 Демонічний Замок (поверх ${hero.story.castleFloor}/${DEMON_CASTLE.floors})`
    : "🏰 Демонічний Замок (потрібен ключ)";
  const choice = askMenu("🌌 ОСОБЛИВІ ПІДЗЕМЕЛЛЯ", ["🐍 Підземелля Касаки (потрібен ключ)", castleLabel, "Назад"]);
  if (choice === 1) return runKasaka(hero);
  if (choice === 2) return runDemonCastle(hero);
  return "none";
}


function trialStatues(hero) {
  const options = ["🙏 Помолитися статуї", "🚶 Відмовитися й іти далі", "🔍 Обшукати зал"];
  const header = "На стіні напис: «ВКЛОНИСЬ БОГУ, ІНАКШЕ ПОМРЕШ».\nКам'яні очі стежать за тобою.";
  const choice = askMenu("🗿 ХРАМ КАРТЕНОН: ЗАЛА СТАТУЙ", options, header);
  if (choice === 1) {
    healHp(hero, Math.ceil(hero.maxHp * 0.2));
    say("🙏 Ти схилив коліна. Статуя мовчить, холод відступає (+20% HP).", "good");
  } else if (choice === 2) {
    say("🗿 Статуя ожила й кинулась на тебе!", "bad");
    return battle(hero, scaleEnemy(DOUBLE_DUNGEON.guard, 1)) === "dead" ? "dead" : "ok";
  } else if (getRandomInt(1, 100) <= 60) {
    const gold = getRandomInt(15, 35);
    hero.gold += gold;
    say(`🔍 У кутку лежав гаманець: +${gold} золота.`, "gold");
  } else {
    loseHp(hero, 15);
    say("💥 Пастка! Уламки статуй вдаряють по тобі.", "bad");
  }
  return "ok";
}

function trialDoors(hero) {
  const correct = getRandomInt(1, 3);
  const choice = askMenu("🚪 ХРАМ КАРТЕНОН: ТРИ ДВЕРІ", ["Ліві двері", "Середні двері", "Праві двері"], "Напис: «Лише відважний побачить Бога».");
  if (choice === correct) {
    giveItem(hero, "Аптечка");
    say("✨ Двері відчинились. Знайдено Аптечку!", "good");
  } else {
    loseHp(hero, 15);
    say("💥 Пастка! Кам'яні скалки б'ють по тобі.", "bad");
  }
}

function awakenSystem(hero, died) {
  if (died) {
    hero.hp = Math.ceil(hero.maxHp * 0.5);
    say("💀 Усе потемніло... Але смерть ще не твоя.", "bad");
  } else {
    say("🏆 Ти вистояв проти Статуї Бога!", "good");
  }
  say("🔷 [Система]: Ви відповідаєте вимогам Гравця.");
  while (!confirm(`${flushEvents()}\n\n🔷 [Система]: Прийняти статус Гравця?`)) {
    say("🔷 [Система]: Система не приймає відмови. Повторюю запит.");
  }
  hero.isSystemPlayer = true;
  grantPassive(hero, "willToLive");
  hero.hp = hero.maxHp;
  dailyQuest = createDailyQuest(hero);
  showAbilityInfo("systemPlayer");
  showScene("🔷 ВИ СТАЛИ ГРАВЦЕМ", ["Перед очима спалахує напівпрозоре вікно.", "Щоденний квест відкрито. Магазин Системи відкрито."]);
}

function doubleDungeon(hero) {
  showScene("🌀 ЕПІЗОД 1: ПОДВІЙНЕ ПІДЗЕМЕЛЛЯ", [
    "Ти — мисливець E-рангу, найслабший у групі.",
    "Тебе взяли носити рюкзаки, а не битися.",
    "Звичайний D-ранговий рейд, казали вони."
  ]);
  showScene("🕳 ПАСТКА", [
    "За печерою ховається ще одне підземелля: ПОДВІЙНЕ.",
    "Важкі двері зачиняються за спиною. Шляху назад немає.",
    "Попереду — Храм Картенон, і хтось уже кричить."
  ]);
  if (battle(hero, scaleEnemy(DOUBLE_DUNGEON.guard, 1)) === "dead") return awakenSystem(hero, true);
  if (trialStatues(hero) === "dead") return awakenSystem(hero, true);
  trialDoors(hero);
  showScene("🗿 СТАТУЯ БОГА", ["Величезна статуя відкриває очі.", "Кам'яний голос шепоче: «КЛЯНИСЬ».", "Ніхто з групи вже не рухається."]);
  awakenSystem(hero, battle(hero, scaleEnemy(DOUBLE_DUNGEON.boss, 1)) === "dead");
}

function playCastleEpisode(hero) {
  showScene("🐺 ЕПІЗОД 7: ВАРТОВИЙ ЗАМКУ", [
    "Біля брами лежить триголовий пес розміром із будинок.",
    "Три пащі скалять зуби. Шляху назад немає.",
    "Хто не вклониться Замку, той стане його їжею."
  ]);
  const scale = 1 + Math.max(0, hero.level - EP_SCALE_FROM) * 0.04;
  if (battle(hero, scaleEnemy(CERBERUS, scale)) === "dead") return "dead";
  showScene("🚪 БРАМА ВІДЧИНЕНА", ["Цербер падає, і чорна брама відчиняється.", "Попереду перший поверх Замку."]);
  return "ok";
}

function gateApproach(hero) {
  const options = ["Іти першим, поки група чекає", "Лишитися з групою", "Оглянути місцевість"];
  const choice = askMenu("🌲 ВОРОТА ЗА МІСТОМ", options, "Над порожнім полем зависла чорна пляма. Вона пульсує.");
  if (choice === 1) { hero.bonusAttack += 3; say("🔥 Ти йдеш першим. Адреналін додає +3 атаки до кінця бою.", "good"); }
  else if (choice === 2) { healHp(hero, Math.ceil(hero.maxHp * 0.1)); say("🛡 Група підбадьорює тебе (+10% HP).", "good"); }
  else { giveItem(hero, "Пластир"); say("🔍 У траві лежав Пластир.", "gold"); }
}

function spiderDungeonPart(hero) {
  showScene("🕷 ЕПІЗОД 8: ПІДЗЕМЕЛЛЯ ПАВУКА", [
    "Група заходить у печеру, де все обплетено павутинням.",
    "Біля кокона Павука-Ткача вони раптом відступають.",
    "«Вибач. Комусь треба затримати його». Тебе лишають як приманку."
  ]);
  const scale = 1 + Math.max(0, hero.level - EP_SPIDER_LEVEL) * 0.04;
  if (battle(hero, scaleEnemy(SPIDER_BOSS, scale)) === "dead") return "dead";
  healHp(hero, Math.ceil(hero.maxHp * 0.5));
  say("🩹 Ти виповзаєш із печери й трохи приходиш до тями (+50% HP).", "good");
  return "ok";
}

function fightWave(hero, template, count, scale) {
  for (let i = 1; i <= count; i++) {
    say(`⚔ ${template.name}: ${i}/${count}`, "system");
    if (battle(hero, scaleEnemy(template, scale)) === "dead") return "dead";
    healHp(hero, Math.ceil(hero.maxHp * EP_WAVE_REGEN / 100));
  }
  return "ok";
}

function gangRevenge(hero) {
  const scale = 1 + Math.max(0, hero.level - EP_SPIDER_LEVEL) * 0.04;
  showScene("🔪 ПЕРША СПРОБА", ["Ти виживаєш і повертаєшся в місто.", "У темному провулку ніж входить тобі в спину.", "Ти ледве вириваєшся (-15% HP)."]);
  loseHp(hero, 15);
  showScene("🔷 ТЕРМІНОВИЙ КВЕСТ", ["Друга спроба: тебе оточує банда.", "Квест: убити 6 нападників.", "Ватажка не чіпай, доки не впадуть усі шестеро. Він іде другим етапом."]);
  if (fightWave(hero, GANG_MEMBER, 6, scale) === "dead") return "dead";
  showScene("👤 ВАТАЖОК", ["Шестеро лежать на землі.", "Ватажок банди виходить із тіні сам."]);
  return fightWave(hero, GANG_LEADER, 1, scale);
}

function playSpiderEpisode(hero) {
  if (spiderDungeonPart(hero) === "dead" || gangRevenge(hero) === "dead") return "dead";
  giveItem(hero, "Ампула Повного Відновлення");
  say("🎁 Нагорода квесту: Ампула Повного Відновлення.", "gold");
  grantRune(hero, "bloodRune");
  return "ok";
}


const RUNES = {
  stealthRune: { title: "🌑 РУНІЧНИЙ КАМІНЬ СКРИТНОСТІ", from: "Канг Теші", ability: "Скритність" },
  sprintRune: { title: "⚡ РУНІЧНИЙ КАМІНЬ СПРИНТУ", from: "Касаки", ability: "Спринт (Ртуть)" },
  bloodRune: { title: "😨 РУНІЧНИЙ КАМІНЬ ЖАГИ КРОВІ", from: "Павука-Ткача", ability: "Жага крові" },
  vitalRune: { title: "🎯 РУНІЧНИЙ КАМІНЬ ЖИТТЄВИХ ТОЧОК", from: "Ігріса", ability: "Удар по життєвих точках" },
  rulerRune: { title: "🌀 РУНІЧНИЙ КАМІНЬ ПРАВИТЕЛЯ", from: "вартового 50-го поверху", ability: "Влада Правителя" }
};

function grantRune(hero, flag) {
  if (hero.story[flag]) return;
  hero.story[flag] = true;
  const rune = RUNES[flag];
  showScene(rune.title, [`З ${rune.from} випадає чорний камінь із руною.`, `[Система]: Отримано здібність «${rune.ability}».`, "Дивись її в 🔷 Система → ✨ Здібності."]);
}

function grantStealthRune(hero) { grantRune(hero, "stealthRune"); }

function playKangEpisode(hero) {
  const scale = 1 + Math.max(0, hero.level - EP_KANG_LEVEL) * 0.04;
  showScene("⛓ ЕПІЗОД 9: РЕЙД ЗЛОЧИНЦІВ", [
    "Асоціація пропонує рейд, але групу зібрали зі злочинців.",
    "У підземеллі вони розбігаються й оточують тебе.",
    "Серед них асасин Канг Теші, і він працює без жалю."
  ]);
  if (fightWave(hero, CRIMINAL, 2, scale) === "dead") return "dead";
  showScene("🗡 АСАСИН", ["Тінь ковзає по стіні.", "Канг Теші виходить зі сліпої зони."]);
  if (fightWave(hero, KANG_TAESHIK, 1, scale) === "dead") return "dead";
  grantStealthRune(hero);
  return "ok";
}

function playGateEpisode(hero) {
  showScene("🚗 ЕПІЗОД 11: ЗА МІСТОМ", [
    "Асоціація вивозить рейд за межі міста.",
    "У полі, де вчора було порожньо, тремтить повітря.",
    "Ворота активуються. Над ними згущується синє світло."
  ]);
  gateApproach(hero);
  showScene("🌀 ВХІД У ВОРОТА", ["Світ перевертається, і ти опиняєшся всередині.", "Назустріч виходить Страж."]);
  const scale = 1 + Math.max(0, hero.level - EP_GATE_LEVEL) * 0.04;
  if (battle(hero, scaleEnemy(GATE_GUARD, scale)) === "dead") return "dead";
  giveItem(hero, "Ампула Повного Відновлення");
  say("🎁 Нагорода епізоду: Ампула Повного Відновлення.", "gold");
  return "ok";
}

function playJobQuestEpisode(hero) {
  showScene("🔷 ЕПІЗОД 12: ЗМІНА ПРОФЕСІЇ", [
    "[Система]: Умови виконано. Відкрито квест зміни професії.",
    `Мета: перемогти ${FINAL_BOSS.name}, Кривавого Лицаря, у меню 👑 Фінальний бос.`,
    "Нагорода: нова професія (клас) безкоштовно."
  ]);
  while (!confirm(`${flushEvents()}\n\n🔷 [Система]: Прийняти квест зміни професії?`)) {
    say("🔷 [Система]: Система не приймає відмови. Повторюю запит.");
  }
  hero.story.jobQuest = true;
  return "ok";
}

const EPISODES = [
  { id: 1, icon: "🌀", title: "Подвійне підземелля", auto: false, hint: "Стартовий епізод.",
    recap: ["Ти пережив Храм Картенон і прийняв статус Гравця."] },
  { id: 2, icon: "🏥", title: "Лікарня", auto: false, hint: "Стартовий епізод.",
    recap: ["Ти прокинувся в лікарні й дізнався про Систему."] },
  { id: 7, icon: "🐺", title: "Вартовий Замку", auto: false, play: playCastleEpisode,
    hint: "Увійди в Демонічний Замок (ключ із секретного квесту) і здолай Цербера.",
    recap: ["Ти вперше увійшов у Демонічний Замок.", "Цербер, триголовий вартовий, повалений."] },
  { id: 8, icon: "🕷", title: "Підземелля Павука", auto: true, play: playSpiderEpisode,
    when: hero => hero.level >= EP_SPIDER_LEVEL, hint: `Досягни ${EP_SPIDER_LEVEL} рівня.`,
    recap: ["Група кинула тебе біля Павука-Ткача.", "Після повернення на тебе двічі нападали: шестеро нападників і ватажок повалені."] },
  { id: 9, icon: "⛓", title: "Рейд злочинців", auto: true, play: playKangEpisode,
    when: hero => hero.level >= EP_KANG_LEVEL && isEpisodeDone(hero, 8), hint: `Досягни ${EP_KANG_LEVEL} рівня й пройди Епізод 8.`,
    recap: ["Канг Теші, асасин, повалений.", "Отримано Рунічний Камінь Скритності: нова здібність «Скритність»."] },
  { id: 11, icon: "🚗", title: "За містом", auto: true, play: playGateEpisode,
    when: hero => hero.level >= EP_GATE_LEVEL, hint: `Досягни ${EP_GATE_LEVEL} рівня.`,
    recap: ["Рейд виїхав за місто, Ворота активувалися.", "Страж Воріт повалений."] },
  { id: 12, icon: "🔄", title: "Зміна професії", auto: true, play: playJobQuestEpisode,
    when: hero => hero.level >= CLASS_CHANGE_LEVEL, hint: `Досягни ${CLASS_CHANGE_LEVEL} рівня.`,
    recap: [`Квест зміни професії прийнято. Подолай ${FINAL_BOSS.name} у меню 👑 Фінальний бос.`] }
];


function isEpisodeDone(hero, id) { return hero.story.episodes.includes(id); }

function markEpisode(hero, id) {
  if (!isEpisodeDone(hero, id)) hero.story.episodes.push(id);
}

function playEpisode(hero, id) {
  const episode = EPISODES.find(e => e.id === id);
  if (!episode || !episode.play || isEpisodeDone(hero, id)) return "skip";
  const result = episode.play(hero);
  if (result === "dead") return "dead";
  markEpisode(hero, id);
  say(`📖 Епізод ${id} «${episode.title}» пройдено.`, "system");
  return result;
}

function checkEpisodes(hero) {
  const next = EPISODES.find(e => e.auto && !isEpisodeDone(hero, e.id) && e.when(hero));
  if (!next) return "continue";
  return playEpisode(hero, next.id) === "dead" ? "dead" : "continue";
}

// Рядок епізоду для меню: ✔ пройдено, 🔓 відкрито, 🔒 закрито.
function episodeLine(hero, episode) {
  const mark = isEpisodeDone(hero, episode.id) ? "✔" : "🔒";
  return `${mark} Епізод ${episode.id}: ${episode.title}`;
}

function storyMenu(hero) {
  while (true) {
    const options = EPISODES.map(e => episodeLine(hero, e));
    options.push("Назад");
    const choice = askMenu("📖 СЮЖЕТ", options, `Пройдено епізодів: ${hero.story.episodes.length}/${EPISODES.length}`);
    if (choice === options.length) return;
    const episode = EPISODES[choice - 1];
    const lines = isEpisodeDone(hero, episode.id) ? episode.recap : [`Як відкрити: ${episode.hint}`];
    showScene(`${episode.icon} ЕПІЗОД ${episode.id}: ${episode.title}`, lines);
  }
}

function hospitalTopic(hero, topic) {
  if (topic === "doctor") {
    showScene("👨‍⚕ ЛІКАР", ["«Ти єдиний, хто вийшов із Подвійного підземелля.»", "«Рани зажили за ніч. Так не буває.»", "«Відпочивай, мисливцю.»"]);
  } else if (topic === "bill") {
    showScene("🧾 РАХУНОК", ["Лікування матері коштує дедалі більше.", "Мисливець E-рангу заробляє копійки.", "Треба ставати сильнішим."]);
  } else {
    showScene("🔷 СИСТЕМА", [
      "Щоденний квест: 100 віджимань, 100 присідань, 100 підйомів корпусу, біг 10 км.",
      "Нагорода: скринька, ампула повного відновлення, 5 очок характеристик.",
      "ШТРАФ за провал: Зона Штрафу. Там можна померти.",
      "Квест — у меню 🔷 Система."
    ]);
  }
}

function hospitalEpisode(hero) {
  showScene("🏥 ЕПІЗОД 2: ЛІКАРНЯ", ["Біле світло. Запах ліків.", "Ти розплющуєш очі в лікарняній палаті.", "Тіло болить, але рани... зникли?"]);
  const topics = [["doctor", "Поговорити з лікарем"], ["bill", "Перевірити рахунок"], ["system", "Прочитати вікно Системи"]];
  const seen = topics.map(() => false);
  while (true) {
    const options = topics.map((t, i) => `${seen[i] ? "✔ " : ""}${t[1]}`);
    options.push("Вийти з палати");
    const choice = askMenu("🏥 ЛІКАРНЯ", options, "Ти сидиш на ліжку й обмірковуєш, що сталося.");
    if (choice === options.length) break;
    seen[choice - 1] = true;
    hospitalTopic(hero, topics[choice - 1][0]);
  }
  showScene("🚪 ВИХІД", ["Ти виходиш із лікарні.", "Попереду — перший день нового життя Гравця."]);
}

// головне меню


function fightFinalBoss(hero) {
  if (hero.story.finalDone) {
    say(`${FINAL_BOSS.name} уже переможений.`);
    return "locked";
  }
  if (hero.level < BOSS_LEVEL) {
    say(`${FINAL_BOSS.name} з'явиться, коли ти досягнеш ${BOSS_LEVEL} рівня.`);
    return "locked";
  }
  if (checkEpisodes(hero) === "dead") return "dead";
  const boss = createEnemy(FINAL_BOSS);
  say(`${boss.name} чекає на тебе. Кожен 3-й його хід завдає подвійного урону!`, "bad");
  return battle(hero, boss);
}


function showMainMenu(hero) {
  const options = [
    "🌲 Безпечна локація (слабші вороги)",
    "🔥 Небезпечна локація (сильніші вороги, більша нагорода)",
    "🌌 Особливі підземелля (ключі)",
    "🏛 Асоціація Мисливців (магазин, іспит, зміна класу)",
    "🔷 Система (щоденний квест, магазин)",
    "🏕 База (відновлення, сон, алхімія, лікарня)",
    "👤 Переглянути героя",
    "🎒 Інвентар",
    hero.story.finalDone ? "👑 Фінальний бос (переможено)" : hero.level >= BOSS_LEVEL ? "👑 Фінальний бос" : `👑 Фінальний бос (з ${BOSS_LEVEL} рівня)`,
    "📖 Сюжет (епізоди)",
    "🚪 Вихід"
  ];
  return askMenu("ГОЛОВНЕ МЕНЮ", options, getStatusHeader(hero));
}

function afterFight(hero, result) {
  if (result === "dead") return "dead";
  if (result !== "none") spendAction(hero);
  return "continue";
}

function handleMenuChoice(hero, choice) {
  switch (choice) {
    case 1:
      return afterFight(hero, fight(hero, "safe"));
    case 2:
      if (!hasHealingItem(hero) && !confirm("У тебе немає предметів для лікування. Все одно йти?")) return "continue";
      return afterFight(hero, fight(hero, "danger"));
    case 3:
      return afterFight(hero, specialDungeonMenu(hero));
    case 4: associationMenu(hero); return "continue";
    case 5: systemMenu(hero); return "continue";
    case 6: baseMenu(hero); return "continue";
    case 7: showHeroStats(hero); return "continue";
    case 8: inventoryMenu(hero); return "continue";
    case 9: {
      const result = fightFinalBoss(hero);
      if (result === "dead") return "dead";
      if (result === "win") jobChangeReward(hero);
      return result === "win" ? "victory" : "continue";
    }
    case 10: storyMenu(hero); return "continue";
    default:
      return confirm("Точно вийти з гри?") ? "exit" : "continue";
  }
}

// нагорода за Ігріса 
function jobChangeReward(hero) {
  showScene("🔄 ПРОФЕСІЮ ЗМІНЕНО", [`${FINAL_BOSS.name} схиляє коліно.`, "[Система]: Квест виконано. Оберіть новий клас."]);
  changeClass(hero, true);
  grantMonarchPowers(hero);
}

// Нагорода за Ігріса: рунічний камінь і сили Тіньового Монарха 
function grantMonarchPowers(hero) {
  hero.story.monarch = true;
  grantRune(hero, "vitalRune");
  grantPassive(hero, "shadowExtraction");
  grantPassive(hero, "shadowStorage");
  showScene("👑 ТІНЬОВИЙ МОНАРХ", ["[Система]: Відкрито магію некромантії.", "Тіньовий обмін, Територія Монарха, Тіньове Тіло.", "Виклик Тіні й Збереження Тіні вже з тобою."]);
}

function showEnding() {
  const lines = [`${FINAL_BOSS.name}, Кривавий Лицар, повалений.`, "Ворота закриваються, і місто нарешті спокійне."]; // ЗМІНЕНО: бос - Ігріс
  if (player.story.motherHealed) lines.push("Мати чекає вдома. Ти повернувся не лише мисливцем, а й сином.");
  else lines.push("Але в лікарні мати все ще спить. Еліксир Життя чекає на тебе в глибинах Замку.");
  alert(panel("👑 КІНЕЦЬ", lines));
}

function resetGameState() {
  isGameRunning = true;
  monarchBonusChance = 0;
  isInRedGate = false;
  currentDungeon = null;
  eventLog = [];
  currentEnemy = null;
  gameDay = 1;
  actionsToday = 0;
  dailyQuest = null;
  emergencyQuest = null;
}


function applyDebugStart(hero) {
  hero.gold += DEBUG_START_GOLD;
  hero.autoPoints = true;
  while (hero.level < DEBUG_START_LEVEL) {
    hero.xp = hero.level * 100;
    checkLevelUp(hero);
  }
  hero.autoPoints = false;
}

function respawnInHospital(hero) {
  if (hero.level > 1) {
    hero.level--;
    STAT_KEYS.forEach(key => { if (hero.stats[key] > START_STAT) addStat(hero, key, -1); }); // скасовуємо автоматичний приріст
    hero.maxHp = Math.max(1, hero.maxHp - HP_PER_LEVEL);
  }
  hero.xp = 0;
  resetBattleEffects(hero);
  hero.hp = hero.maxHp;
  hero.mp = getMaxMp(hero);
  currentEnemy = null; isInRedGate = false; currentDungeon = null; emergencyQuest = null;
  gameDay++;
  actionsToday = 0;
  if (hero.isSystemPlayer) dailyQuest = createDailyQuest(hero);
  showScene("🏥 ВІДРОДЖЕННЯ", ["Темрява відступає. Знову біле світло й запах ліків.", `Ти прокидаєшся в лікарні. Рівень: ${hero.level} (за порятунок довелося заплатити).`, "Починається новий день."]);
}

function resolveState(state) {
  if (state === "dead" || !isAlive(player)) {
    respawnInHospital(player);
  } else if (state === "victory") {
    showEnding();
    if (confirm("Продовжити гру з силами Монарха?")) player.story.finalDone = true;
    else isGameRunning = false;
  } else if (state === "exit") {
    isGameRunning = false;
  }
}

function startGame() {
  resetGameState();
  console.log("Ласкаво просимо до Воріт: Сходження!");
  showScene("⚔ ВОРОТА: СХОДЖЕННЯ", ["Світ змінили Ворота, і мисливці б'ються з монстрами.", "Ти починаєш свій шлях найслабшим..."]);
  createHero();
  applyDebugStart(player);
  doubleDungeon(player);
  markEpisode(player, 1);
  hospitalEpisode(player);
  markEpisode(player, 2);
  showPendingEvents();

  while (isGameRunning) {
    let state = handleMenuChoice(player, showMainMenu(player));
    if (state === "continue" && isAlive(player)) state = checkEpisodes(player);
    showPendingEvents();
    resolveState(state);
  }
  console.log("Гру завершено.");
}

const startBtn = document.getElementById("startBtn");
if (startBtn) {
  startBtn.addEventListener("click", startGame);
} else {
  startGame();
}