export type Lang = "en" | "ja";

export type Pillar = { num: string; t: string; d: string };
export type Stat = { n: string; l: string };
export type ClassItem = {
  name: string;
  short: string;
  price: string;
  long: string;
  tags: string[];
};
export type ScheduleRow = {
  day: string;
  time: string;
  group: string;
  place: string;
};
export type Ground = { name: string; addr: string; access: string };
export type TimelineEntry = { year: string; text: string };
export type Photo = { src: string; cap: string };
export type Faq = { q: string; a: string };

export type Copy = {
  nav: [string, string, string, string, string];
  langLabel: string;
  heroKicker: string;
  heroTitle1: string;
  heroTitle2: string;
  heroSub: string;
  ctaTrial: string;
  ctaClasses: string;
  kickHint: string;
  marquee: string;
  pillarsKicker: string;
  pillarsTitle: string;
  pillars: Pillar[];
  stats: Stat[];
  classesKicker: string;
  classesTitle: string;
  classesIntro: string;
  seeAll: string;
  classes: ClassItem[];
  scheduleTitle: string;
  schedule: ScheduleRow[];
  locationsTitle: string;
  locations: Ground[];
  trialCtaTitle: string;
  trialCtaSub: string;
  coachKicker: string;
  coachName: string;
  coachIntro: string;
  coachBio1: string;
  coachBio2: string;
  coachQuote: string;
  philosophyTitle: string;
  philosophy: Pillar[];
  pathTitle: string;
  timeline: TimelineEntry[];
  galleryKicker: string;
  galleryTitle: string;
  galleryIntro: string;
  gallery: Photo[];
  contactKicker: string;
  contactTitle: string;
  contactIntro: string;
  lineCta: string;
  igCta: string;
  faqTitle: string;
  faqs: Faq[];
  footerBlurb: string;
  navLabel: string;
  menuLabel: string;
  contactLabel: string;
  footerCity: string;
  readMore: string;
};

export const LINE_URL = "https://line.me/R/ti/p/@kobisoccer";
export const LINE_HANDLE = "@kobisoccer";
export const INSTAGRAM_URL = "https://instagram.com/kobi.soccer.school";
export const INSTAGRAM_HANDLE = "@kobi.soccer.school";

/** Route for each entry of `Copy.nav`, in the same order. */
export const NAV_ROUTES = [
  "/",
  "/classes",
  "/coach",
  "/gallery",
  "/contact",
] as const;

export const COPY: Record<Lang, Copy> = {
  en: {
    nav: ["Home", "Classes", "Coach", "Gallery", "Contact"],
    langLabel: "日本語",
    heroKicker: "Kobe · Hyogo · Ages 4–14",
    heroTitle1: "Build the player.",
    heroTitle2: "Build the person.",
    heroSub:
      "Kobi Soccer School is a small-group academy led by a Moroccan coach who trains children in Japan with a European technical method — real repetitions, real decisions, and a standard of behaviour we never lower.",
    ctaTrial: "Book a trial",
    ctaClasses: "See classes",
    kickHint: "Click anywhere — the ball reacts",
    marquee:
      "TECHNIQUE · DECISION MAKING · CHARACTER · SMALL GROUPS · EVERY CHILD TOUCHES THE BALL ·",
    pillarsKicker: "Coaching philosophy",
    pillarsTitle: "Three things every session must deliver",
    pillars: [
      {
        num: "01",
        t: "Technique first",
        d: "Every session starts with the ball at the feet. Control, first touch, both feet — the fundamentals a player carries for life, drilled until they are automatic.",
      },
      {
        num: "02",
        t: "Decision making",
        d: "Small-sided games where children must look, choose and act under pressure. We coach the question, not the answer, so players learn to read the game themselves.",
      },
      {
        num: "03",
        t: "Character",
        d: "Punctuality, respect for teammates and opponents, effort when tired. Parents tell us this is what they notice first at home.",
      },
    ],
    stats: [
      { n: "8", l: "Max per group" },
      { n: "4–14", l: "Ages coached" },
      { n: "60+", l: "Players trained" },
      { n: "2", l: "Training grounds" },
    ],
    classesKicker: "Programmes",
    classesTitle: "Classes & Prices",
    classesIntro:
      "Four ways to train with us. Every new family starts with a trial session so the child — and the parents — can see how we work before committing to anything.",
    seeAll: "All classes",
    classes: [
      {
        name: "Regular group training",
        short: "Weekly small-group sessions, split by age.",
        price: "¥8,000 / month",
        long: "Two sessions a week in groups of up to eight, split U-8 / U-12 / U-14. A progressive curriculum across the term: ball mastery, passing patterns, one-v-one, and small-sided games. Monthly report to parents.",
        tags: ["90 min", "2× / week", "Ages 4–14"],
      },
      {
        name: "Special training",
        short: "Focused clinics on one theme.",
        price: "¥4,000 / session",
        long: "Saturday clinics that go deep on a single theme — finishing, defending one-v-one, goalkeeping, or speed and agility. Open to our players and to children from other clubs.",
        tags: ["120 min", "Saturdays", "Open to all clubs"],
      },
      {
        name: "Individual 1-on-1",
        short: "Private coaching, fully personalised.",
        price: "¥6,500 / hour",
        long: "One coach, one player. We assess, agree a target with the family, and build a personal plan — for children who want to catch up, or to pull ahead of their team level. Video feedback included.",
        tags: ["60 min", "By booking", "Video feedback"],
      },
      {
        name: "Trial session",
        short: "Come and try before you decide.",
        price: "¥1,000 first time",
        long: "A full regular session at trial price, with a short conversation with the coach afterwards about what we saw and what your child needs. No obligation to join.",
        tags: ["90 min", "Once per child", "No obligation"],
      },
    ],
    scheduleTitle: "Weekly schedule",
    schedule: [
      {
        day: "Tuesday",
        time: "17:00 – 18:30",
        group: "U-8 group",
        place: "Nada Futsal Park",
      },
      {
        day: "Tuesday",
        time: "18:45 – 20:15",
        group: "U-12 / U-14 group",
        place: "Nada Futsal Park",
      },
      {
        day: "Thursday",
        time: "17:00 – 18:30",
        group: "U-8 group",
        place: "Higashinada Ground",
      },
      {
        day: "Thursday",
        time: "18:45 – 20:15",
        group: "U-12 / U-14 group",
        place: "Higashinada Ground",
      },
      {
        day: "Saturday",
        time: "09:00 – 11:00",
        group: "Special training clinic",
        place: "Nada Futsal Park",
      },
      {
        day: "Sunday",
        time: "By booking",
        group: "Individual 1-on-1",
        place: "Either ground",
      },
    ],
    locationsTitle: "Where we train",
    locations: [
      {
        name: "Nada Futsal Park",
        addr: "2-14 Mizukasa-dori, Nada-ku, Kobe, Hyogo",
        access: "8 min walk from JR Rokkomichi · Parking for 20 cars",
      },
      {
        name: "Higashinada Sports Ground",
        addr: "1-3 Uozaki-hamamachi, Higashinada-ku, Kobe, Hyogo",
        access: "12 min walk from Hanshin Uozaki · Covered pitch",
      },
    ],
    trialCtaTitle: "Not sure which class fits?",
    trialCtaSub:
      "Message us on LINE with your child's age — we will recommend one.",
    coachKicker: "The coach",
    coachName: 'Coach Yassine "Kobi" Amrani',
    coachIntro:
      "Born in Casablanca, trained in a Moroccan academy, coaching children in Kobe since 2019. He runs every session himself — parents always know who is coaching their child.",
    coachBio1:
      "Yassine grew up in a Casablanca academy where technical repetition came before anything else, and played at regional level before an injury ended his playing career at 22. He moved to Japan in 2018, coached at two clubs in Hyogo, and founded Kobi Soccer School to teach the way he was taught: patiently, with the ball, and with high expectations of behaviour.",
    coachBio2:
      "He coaches in Japanese, English, French and Arabic, holds a JFA C licence, and is certified in first aid. Every player gets his phone number for their parents — questions are answered the same week.",
    coachQuote:
      '"A child who is not touching the ball is not training. That is the whole method."',
    philosophyTitle: "How we work",
    philosophy: [
      {
        num: "01",
        t: "Small groups only",
        d: "Eight players maximum, so the coach can correct every child by name, every session.",
      },
      {
        num: "02",
        t: "The ball is the teacher",
        d: "Almost no queuing, almost no laps. Fitness comes from the game itself.",
      },
      {
        num: "03",
        t: "Parents are informed",
        d: "A short written note each month on what your child improved and what we work on next.",
      },
      {
        num: "04",
        t: "Safety is not optional",
        d: "Insured sessions, first-aid trained coach, clear rules on heat, hydration and rest.",
      },
    ],
    pathTitle: "Background",
    timeline: [
      {
        year: "2008–2014",
        text: "Youth academy and regional-level football in Casablanca, Morocco.",
      },
      {
        year: "2018",
        text: "Moved to Japan; began coaching youth football in Hyogo prefecture.",
      },
      {
        year: "2019",
        text: "Founded Kobi Soccer School with one group of six children.",
      },
      {
        year: "2022",
        text: "Obtained JFA C coaching licence; added individual and clinic programmes.",
      },
      {
        year: "Today",
        text: "Two grounds, six weekly groups, and over sixty players trained.",
      },
    ],
    galleryKicker: "Inside a session",
    galleryTitle: "Training gallery",
    galleryIntro:
      "Photos from regular sessions in Kobe. No staged shots — this is what a Tuesday evening actually looks like.",
    gallery: [
      {
        src: "/uploads/training-1.jpg",
        cap: "Session briefing before small-sided games",
      },
      { src: "/uploads/training-2.jpg", cap: "End of a 1-on-1 session" },
      { src: "/uploads/training-4.jpg", cap: "Match ball, Higashinada ground" },
      { src: "/uploads/coach.jpg", cap: "Coach Yassine at the covered pitch" },
    ],
    contactKicker: "Get in touch",
    contactTitle: "Contact us",
    contactIntro:
      "The fastest way to reach us is LINE — we usually reply the same day. Tell us your child's age and which class you are interested in, and we will arrange a trial.",
    lineCta: "Message on LINE",
    igCta: "Follow on Instagram",
    faqTitle: "Questions parents ask",
    faqs: [
      {
        q: "My child has never played football. Is that ok?",
        a: "Yes — about half of our beginners have never played. The U-8 group in particular is built for first-time players, and the coach adapts the drills so nobody is left behind.",
      },
      {
        q: "What should my child bring?",
        a: "Football boots or trainers, shin pads, a water bottle, and a change of shirt. We provide balls, bibs and cones.",
      },
      {
        q: "What language is used in training?",
        a: "Mostly Japanese, with English used naturally alongside it. The coach also speaks French and Arabic.",
      },
      {
        q: "Can we pay monthly and cancel any time?",
        a: "Yes. Monthly fees are paid at the start of each month and you can stop with two weeks' notice — no annual contract.",
      },
      {
        q: "What happens when it rains?",
        a: "Higashinada is a covered pitch, so most sessions go ahead. If a session is cancelled we notify parents on LINE and add a make-up session.",
      },
    ],
    footerBlurb:
      "Small-group football coaching for children in Kobe. Technique, decisions, character.",
    navLabel: "Pages",
    menuLabel: "Menu",
    contactLabel: "Contact",
    footerCity: "Nada-ku & Higashinada-ku, Kobe",
    readMore: "About the coach",
  },

  ja: {
    nav: ["ホーム", "クラス", "コーチ", "ギャラリー", "お問い合わせ"],
    langLabel: "EN",
    heroKicker: "神戸・兵庫 ／ 4〜14歳",
    heroTitle1: "選手を育てる。",
    heroTitle2: "人を育てる。",
    heroSub:
      "Kobi Soccer School は、モロッコ出身のコーチが指導する少人数制サッカースクールです。ヨーロッパの技術指導をベースに、ボールに触る回数、自分で判断する経験、そして礼儀を大切にしています。",
    ctaTrial: "体験を申し込む",
    ctaClasses: "クラスを見る",
    kickHint: "画面をクリックするとボールが動きます",
    marquee: "技術 ・ 判断力 ・ 人間性 ・ 少人数制 ・ 全員がボールに触れる ・",
    pillarsKicker: "指導方針",
    pillarsTitle: "毎回の練習で必ず届ける3つのこと",
    pillars: [
      {
        num: "01",
        t: "まず技術",
        d: "練習は必ずボールを足元に置くところから。トラップ、ファーストタッチ、両足の使い分け。一生使える基礎を、体が覚えるまで繰り返します。",
      },
      {
        num: "02",
        t: "判断力",
        d: "少人数のゲーム形式で、見て、選んで、動く。答えではなく問いを与える指導で、自分で試合を読める選手に育てます。",
      },
      {
        num: "03",
        t: "人間性",
        d: "時間を守る、仲間と相手を尊重する、疲れても最後まで走る。保護者の方が最初に気づくのはここだと言われます。",
      },
    ],
    stats: [
      { n: "8", l: "1グループ最大人数" },
      { n: "4–14", l: "対象年齢" },
      { n: "60+", l: "指導した選手数" },
      { n: "2", l: "練習グラウンド" },
    ],
    classesKicker: "プログラム",
    classesTitle: "クラスと料金",
    classesIntro:
      "4つのクラスをご用意しています。入会前に必ず体験練習を受けていただき、お子様と保護者の方に指導内容を見ていただいてから決めていただきます。",
    seeAll: "すべてのクラス",
    classes: [
      {
        name: "レギュラーグループ",
        short: "年齢別・少人数の週2回コース",
        price: "月額 ¥8,000",
        long: "最大8名のグループで週2回。U-8／U-12／U-14に分かれ、ボールマスタリー、パス、1対1、ゲームへと段階的に進みます。毎月、保護者の方へレポートをお渡しします。",
        tags: ["90分", "週2回", "4〜14歳"],
      },
      {
        name: "特別練習",
        short: "テーマを絞った土曜クリニック",
        price: "1回 ¥4,000",
        long: "シュート、1対1の守備、ゴールキーパー、スピードとアジリティなど、テーマを1つに絞った土曜クリニック。他クラブの選手も参加できます。",
        tags: ["120分", "土曜日", "他クラブ可"],
      },
      {
        name: "個人レッスン（1対1）",
        short: "完全個別・目標に合わせた指導",
        price: "60分 ¥6,500",
        long: "コーチ1名に選手1名。現状を評価し、ご家庭と目標を決めて個別プランを作成します。追いつきたいお子様にも、さらに伸ばしたいお子様にも。動画フィードバック付き。",
        tags: ["60分", "予約制", "動画付き"],
      },
      {
        name: "体験練習",
        short: "まずは一度、参加してみてください",
        price: "初回 ¥1,000",
        long: "通常のレギュラー練習に体験価格で参加できます。練習後にコーチから、見えた良い点と課題を直接お話しします。入会の義務はありません。",
        tags: ["90分", "お一人1回", "入会義務なし"],
      },
    ],
    scheduleTitle: "週間スケジュール",
    schedule: [
      {
        day: "火曜",
        time: "17:00 – 18:30",
        group: "U-8 グループ",
        place: "灘フットサルパーク",
      },
      {
        day: "火曜",
        time: "18:45 – 20:15",
        group: "U-12 / U-14 グループ",
        place: "灘フットサルパーク",
      },
      {
        day: "木曜",
        time: "17:00 – 18:30",
        group: "U-8 グループ",
        place: "東灘グラウンド",
      },
      {
        day: "木曜",
        time: "18:45 – 20:15",
        group: "U-12 / U-14 グループ",
        place: "東灘グラウンド",
      },
      {
        day: "土曜",
        time: "09:00 – 11:00",
        group: "特別練習クリニック",
        place: "灘フットサルパーク",
      },
      {
        day: "日曜",
        time: "予約制",
        group: "個人レッスン",
        place: "いずれかの会場",
      },
    ],
    locationsTitle: "練習会場",
    locations: [
      {
        name: "灘フットサルパーク",
        addr: "兵庫県神戸市灘区水笠通2-14",
        access: "JR六甲道より徒歩8分 ／ 駐車場20台",
      },
      {
        name: "東灘スポーツグラウンド",
        addr: "兵庫県神戸市東灘区魚崎浜町1-3",
        access: "阪神魚崎より徒歩12分 ／ 屋根付きピッチ",
      },
    ],
    trialCtaTitle: "どのクラスか迷われたら",
    trialCtaSub:
      "LINEでお子様の年齢をお送りください。おすすめをご案内します。",
    coachKicker: "コーチ紹介",
    coachName: "ヤシン「Kobi」アムラニ",
    coachIntro:
      "モロッコ・カサブランカ出身。現地アカデミーで育ち、2019年から神戸で子どもたちを指導しています。すべての練習を本人が担当します。",
    coachBio1:
      "カサブランカのアカデミーで、何よりも技術の反復を重視する環境で育ち、地域リーグでプレー。22歳のとき怪我で選手生活を終えました。2018年に来日し、兵庫県内の2クラブで指導した後、自分が教わったやり方 — 根気強く、ボールとともに、そして規律を持って — を伝えるために Kobi Soccer School を設立しました。",
    coachBio2:
      "日本語・英語・フランス語・アラビア語で指導。JFA C級コーチライセンス、救急救命講習修了。保護者の方には連絡先をお渡しし、ご質問には必ずその週のうちにお答えします。",
    coachQuote: "「ボールに触っていない時間は、練習ではない。」",
    philosophyTitle: "スクールの約束",
    philosophy: [
      {
        num: "01",
        t: "少人数制のみ",
        d: "最大8名。毎回、全員の名前を呼んで指導し、修正します。",
      },
      {
        num: "02",
        t: "ボールが先生",
        d: "並んで待つ時間、走るだけの時間はほとんどありません。体力はゲームの中で身につきます。",
      },
      {
        num: "03",
        t: "保護者への報告",
        d: "毎月、成長した点と次の課題を短いレポートでお伝えします。",
      },
      {
        num: "04",
        t: "安全が最優先",
        d: "保険加入済み、救命講習修了コーチ。暑さ・水分・休憩について明確なルールを設けています。",
      },
    ],
    pathTitle: "経歴",
    timeline: [
      {
        year: "2008–2014",
        text: "モロッコ・カサブランカのユースアカデミー、地域リーグでプレー。",
      },
      { year: "2018", text: "来日。兵庫県内で少年サッカーの指導を開始。" },
      { year: "2019", text: "6名の子どもたちと Kobi Soccer School を設立。" },
      {
        year: "2022",
        text: "JFA C級ライセンス取得。個人レッスンとクリニックを開始。",
      },
      { year: "現在", text: "2会場・週6グループ、これまでに60名以上を指導。" },
    ],
    galleryKicker: "練習風景",
    galleryTitle: "ギャラリー",
    galleryIntro:
      "神戸での通常練習の写真です。演出はありません。火曜の夕方、実際にこうして練習しています。",
    gallery: [
      { src: "/uploads/training-1.jpg", cap: "ゲーム前のミーティング" },
      { src: "/uploads/training-2.jpg", cap: "個人レッスンの終わりに" },
      { src: "/uploads/training-4.jpg", cap: "試合球 ／ 東灘グラウンド" },
      { src: "/uploads/coach.jpg", cap: "屋根付きピッチにて" },
    ],
    contactKicker: "お問い合わせ",
    contactTitle: "ご連絡ください",
    contactIntro:
      "一番早いのは LINE です。通常は当日中にお返事します。お子様の年齢とご希望のクラスをお知らせいただければ、体験練習をご案内します。",
    lineCta: "LINEで相談する",
    igCta: "Instagramを見る",
    faqTitle: "よくあるご質問",
    faqs: [
      {
        q: "サッカーは初めてでも大丈夫ですか？",
        a: "はい。初心者の割合はおよそ半分です。特にU-8グループは初めてのお子様を前提に構成しており、コーチが一人ひとりに合わせて内容を調整します。",
      },
      {
        q: "持ち物は何が必要ですか？",
        a: "シューズ（スパイクまたは運動靴）、すね当て、水筒、着替えのシャツ。ボール・ビブス・コーンはスクールで用意します。",
      },
      {
        q: "練習は何語で行われますか？",
        a: "基本は日本語で、英語も自然に交えて指導します。コーチはフランス語とアラビア語も話します。",
      },
      {
        q: "月謝制ですか？途中でやめられますか？",
        a: "月謝は毎月初めのお支払いで、2週間前のご連絡で退会できます。年間契約はありません。",
      },
      {
        q: "雨の日はどうなりますか？",
        a: "東灘グラウンドは屋根付きのため、多くの場合は実施します。中止の場合はLINEでご連絡し、振替練習を設定します。",
      },
    ],
    footerBlurb: "神戸の少人数制サッカースクール。技術・判断力・人間性。",
    navLabel: "ページ",
    menuLabel: "メニュー",
    contactLabel: "連絡先",
    footerCity: "神戸市灘区・東灘区",
    readMore: "コーチについて",
  },
};
