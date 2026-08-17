export type Lang = "ja" | "en";

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
/** A short training video. `w`/`h` are the source pixels, for the aspect ratio. */
export type Clip = {
  src: string;
  poster: string;
  cap: string;
  w: number;
  h: number;
};
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
  scheduleNote: string;
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
  clipsTitle: string;
  clips: Clip[];
  clipPlay: string;
  clipPause: string;
  photosTitle: string;
  gallery: Photo[];
  contactKicker: string;
  contactTitle: string;
  contactIntro: string;
  lineCta: string;
  igCta: string;
  emailCta: string;
  coachIgCta: string;
  faqTitle: string;
  faqs: Faq[];
  footerBlurb: string;
  navLabel: string;
  menuLabel: string;
  contactLabel: string;
  footerCity: string;
  readMore: string;
};

/**
 * TODO — still the mock-up's placeholder. The official LINE URL / QR code is on
 * the brief's list of things Kobi must supply before launch, and every page
 * points LINE-first, so this is the last link that needs replacing.
 */
export const LINE_URL = "https://line.me/R/ti/p/@kobisoccer";
export const LINE_HANDLE = "@kobisoccer";

export const EMAIL = "contact@kobisoccerschool.com";

export const INSTAGRAM_URL = "https://instagram.com/kobisoccerschool.awajishima";
export const INSTAGRAM_HANDLE = "@kobisoccerschool.awajishima";

/** Kobi's own coaching account, separate from the school's. */
export const COACH_INSTAGRAM_URL = "https://instagram.com/Kobi.coach";
export const COACH_INSTAGRAM_HANDLE = "@Kobi.coach";

/** Route for each entry of `Copy.nav`, in the same order. */
export const NAV_ROUTES = [
  "/",
  "/classes",
  "/coach",
  "/gallery",
  "/contact",
] as const;

export const COPY: Record<Lang, Copy> = {
  ja: {
    nav: ["ホーム", "クラス・料金", "コーチ", "ギャラリー", "お問い合わせ"],
    langLabel: "EN",
    heroKicker: "兵庫・淡路島 ／ 個を伸ばすサッカースクール",
    heroTitle1: "自分で観て、考えて、",
    heroTitle2: "挑戦できる選手へ。",
    heroSub:
      "KOBI SOCCER SCHOOL は、子ども一人ひとりの技術・判断力・創造性を育てるサッカースクールです。答えを上から与えるだけではなく、ゲームの中で観て、考え、決めて、挑戦する経験を大切にしています。",
    ctaTrial: "無料体験を申し込む",
    ctaClasses: "スケジュールを見る",
    kickHint: "画面をタップするとボールが動きます",
    marquee:
      "観る ・ 理解する ・ 決める ・ 実行する ・ 適応する ・ 挑戦する ・",
    pillarsKicker: "指導理念",
    pillarsTitle: "自分で答えを見つけるための6つのステップ",
    pillars: [
      {
        num: "01",
        t: "観る",
        d: "ボール、味方、相手、スペース、ゴール、プレッシャー。まず、まわりで何が起きているかを見ることから始めます。",
      },
      {
        num: "02",
        t: "理解する",
        d: "その状況が何を求めているのか、どんな選択肢があるのかを掴む。見えたものの意味を考えます。",
      },
      {
        num: "03",
        t: "決める",
        d: "コーチの指示を待つのではなく、自分でプレーを選ぶ。判断する回数が、選手を伸ばします。",
      },
      {
        num: "04",
        t: "実行する",
        d: "選んだプレーを、適切な技術・質・タイミングで実行する。ここで技術が意味を持ちます。",
      },
      {
        num: "05",
        t: "適応する",
        d: "相手、スペース、スピード、新しい情報。変わり続ける状況に合わせて、次の一手を変えていきます。",
      },
      {
        num: "06",
        t: "挑戦する",
        d: "挑戦し、失敗し、学び、もう一度挑戦する。その勇気こそ、いちばん伸ばしたい力です。",
      },
    ],
    stats: [
      { n: "70%", l: "ゲーム形式の練習" },
      { n: "90", l: "分 ／ 1回の練習" },
      { n: "3", l: "曜日 ／ 週" },
      { n: "3", l: "練習会場" },
    ],
    classesKicker: "クラスと料金",
    classesTitle: "クラス・料金",
    classesIntro:
      "初回の体験練習は無料です。その後は1回ごとのお支払い、またはお得な回数券をご利用いただけます。マンツーマンの個人レッスンもご用意しています。まずは一度、練習を見にいらしてください。",
    seeAll: "クラスを見る",
    classes: [
      {
        name: "レギュラークラス",
        short: "月・水・金の通常練習",
        price: "1回 ¥1,000",
        long: "月曜・水曜・金曜に行う通常のクラスです。少人数ゲームや対人を中心に、必要に応じて基礎技術も丁寧に確認します。所属チームがあるお子様も参加できます。",
        tags: ["90分", "月・水・金", "チーム所属可"],
      },
      {
        name: "回数券",
        short: "11回分をまとめてお得に",
        price: "11回 ¥10,000",
        long: "11回分の回数券です。1回あたり約¥909となり、通常参加よりお得にご利用いただけます。ご利用方法はLINEでご案内します。",
        tags: ["11回分", "1回あたり約¥909", "レギュラークラス用"],
      },
      {
        name: "個人レッスン",
        short: "マンツーマンで課題に集中",
        price: "60分 ¥6,000",
        long: "コーチ1名に選手1名。今の課題をご家庭と一緒に確認し、そのお子様に必要なテーマへ集中して取り組みます。ご希望の日程はご相談ください。",
        tags: ["60分", "予約制", "個別対応"],
      },
      {
        name: "体験練習",
        short: "初回は無料です",
        price: "初回無料",
        long: "初めての体験練習は無料です。通常のクラスにそのまま参加していただけます。練習後にコーチから、お子様の様子と次に伸ばしたい点を直接お話しします。LINEからお申し込みください。",
        tags: ["初回無料", "通常クラスに参加", "入会義務なし"],
      },
    ],
    scheduleTitle: "週間スケジュール",
    schedule: [
      {
        day: "月曜",
        time: "17:00 – 18:30",
        group: "レギュラークラス",
        place: "会場はお問い合わせください",
      },
      {
        day: "月曜",
        time: "18:30 – 20:00",
        group: "レギュラークラス",
        place: "会場はお問い合わせください",
      },
      {
        day: "水曜",
        time: "17:00 – 18:00",
        group: "小学1年生クラス（開講時）",
        place: "佐野 屋内運動施設",
      },
      {
        day: "水曜",
        time: "17:00 – 18:30",
        group: "レギュラークラス",
        place: "会場はお問い合わせください",
      },
      {
        day: "水曜",
        time: "18:30 – 20:00",
        group: "レギュラークラス",
        place: "会場はお問い合わせください",
      },
      {
        day: "金曜",
        time: "17:00 – 18:30",
        group: "レギュラークラス",
        place: "会場はお問い合わせください",
      },
      {
        day: "金曜",
        time: "18:30 – 20:00",
        group: "レギュラークラス",
        place: "会場はお問い合わせください",
      },
    ],
    scheduleNote:
      "スケジュールと会場は変更になる場合があります。最新の情報と当日の会場は、LINEにてご確認ください。",
    locationsTitle: "練習会場",
    locations: [
      {
        name: "佐野 屋内運動施設",
        addr: "兵庫県淡路市佐野（詳細住所は準備中）",
        access: "屋内施設のため、天候の影響を受けにくい会場です",
      },
      {
        name: "淡路市役所 フットサル場",
        addr: "兵庫県淡路市（詳細住所は準備中）",
        access: "アクセス・駐車場のご案内は準備中です",
      },
      /**
       * TODO — the third ground's real name. The developer brief only names the
       * two above, so this card stays deliberately vague rather than guessing at
       * a venue a parent might then drive to.
       */
      {
        name: "第3の練習会場",
        addr: "兵庫県淡路市（名称・詳細住所は準備中）",
        access: "当日の会場はLINEにてご案内しています",
      },
    ],
    trialCtaTitle: "どのクラスか迷われたら",
    trialCtaSub:
      "LINEでお子様の学年をお知らせください。おすすめのクラスをご案内します。初回の体験は無料です。",
    coachKicker: "コーチ紹介",
    coachName: "「Kobi」シャリフ・アブデルカビル",
    coachIntro:
      "モロッコ出身。2024年5月に淡路島で KOBI SOCCER SCHOOL を立ち上げ、すべての練習を自身で担当しています。",
    coachBio1:
      "モロッコで育ち、日本で指導者としてのキャリアを重ねてきました。スポーツアカデミーで Head of Soccer を務め、中学校サッカーの指導も経験しています。2024年5月、淡路島で KOBI SOCCER SCHOOL を開校しました。",
    coachBio2:
      "JFA B級コーチライセンス、PFSA Opposition Analysis レベル1・2、FIFA セーフガーディングを修了。学び続けながら、将来的には JFA A級ライセンスの取得と、さらに高いレベルでの指導を目指しています。",
    coachQuote: "「どうやるか」の前に、「いつ、なぜ、それを使うのか」。",
    philosophyTitle: "スクールの考え方",
    philosophy: [
      {
        num: "01",
        t: "個を先に",
        d: "早い段階でポジションを固定しません。受ける、運ぶ、パス、ドリブル、シュート、守備、切り替え。どの役割でも通用する力を育てます。",
      },
      {
        num: "02",
        t: "ゲームの中で学ぶ",
        d: "練習のおよそ7割は少人数ゲーム、ロンド、数的優位、切り替えなど。残りの3割で基礎技術やコーディネーションを丁寧に確認します。",
      },
      {
        num: "03",
        t: "問いかける指導",
        d: "答えを先に渡さず、質問で気づきを促します。必要なときははっきり修正し、そのあと判断を選手に返します。",
      },
      {
        num: "04",
        t: "失敗できる場所",
        d: "ミスは選手とコーチにとっての情報です。結果だけでなく、観察・勇気ある判断・良いタイミング・努力を評価します。",
      },
    ],
    pathTitle: "経歴と資格",
    timeline: [
      {
        year: "2024.05",
        text: "淡路島で KOBI SOCCER SCHOOL を開校。すべての練習をコーチ本人が担当しています。",
      },
      {
        year: "指導歴",
        text: "スポーツアカデミーでの Head of Soccer、中学校サッカーの指導を経験。",
      },
      {
        year: "資格",
        text: "JFA B級コーチライセンス ／ PFSA Opposition Analysis レベル1・2 ／ FIFA セーフガーディング修了。",
      },
      {
        year: "これから",
        text: "JFA A級ライセンスの取得と、さらに高いレベルでの指導を目指しています。",
      },
    ],
    galleryKicker: "練習風景",
    galleryTitle: "ギャラリー",
    galleryIntro:
      "淡路島での実際の練習の様子です。演出はありません。子どもたちが自分で観て、考えて、挑戦している時間です。",
    clipsTitle: "動画で見る練習",
    clips: [
      {
        src: "/uploads/session-indoor-ball-mastery.mp4",
        poster: "/uploads/session-indoor-ball-mastery-poster.jpg",
        cap: "屋内でのボールマスタリー",
        w: 464,
        h: 832,
      },
      {
        src: "/uploads/session-indoor-dribbling.mp4",
        poster: "/uploads/session-indoor-dribbling-poster.jpg",
        cap: "ドリブルとボールコントロール",
        w: 576,
        h: 1024,
      },
    ],
    clipPlay: "再生",
    clipPause: "一時停止",
    photosTitle: "写真",
    gallery: [
      { src: "/uploads/team-group-photo.jpg", cap: "スクール全員での集合写真" },
      {
        src: "/uploads/training-cone-dribbling.jpg",
        cap: "コーンを使ったドリブル練習",
      },
      {
        src: "/uploads/coach-with-players.jpg",
        cap: "練習のあとに、コーチと一緒に",
      },
      { src: "/uploads/coach-portrait.jpg", cap: "コーチ Kobi" },
    ],
    contactKicker: "お問い合わせ",
    contactTitle: "ご連絡ください",
    contactIntro:
      "一番早いのは LINE です。メールでも承ります。お子様の学年と、ご希望の曜日やクラスをお知らせください。初回無料の体験練習をご案内します。",
    lineCta: "LINEで問い合わせる",
    igCta: "Instagramを見る",
    emailCta: "メールを送る",
    coachIgCta: "コーチのInstagram",
    faqTitle: "よくあるご質問",
    faqs: [
      {
        q: "サッカーは初めてでも参加できますか？",
        a: "はい。年齢やレベルに合わせて、ルール・スペース・人数・難易度を調整します。まずはボールに触れる回数を増やし、できた、という経験を積むところから始めます。",
      },
      {
        q: "他のチームに所属していても参加できますか？",
        a: "はい。KOBI はチームの活動と両立できるスクールです。チームでは「チームのためのプレー」を学び、KOBI では個人の技術・判断力・創造性を伸ばします。",
      },
      {
        q: "持ち物は何が必要ですか？",
        a: "動きやすい服装、シューズ、すね当て、飲みもの、着替えをお持ちください。ご不明な点は、LINEでお気軽にお尋ねください。",
      },
      {
        q: "雨の日はどうなりますか？",
        a: "屋内施設で行うクラスは天候の影響を受けにくく、多くの場合はそのまま実施します。中止や会場の変更がある場合は、LINEでご連絡します。",
      },
      {
        q: "お支払いはどうなりますか？",
        a: "初回の体験練習は無料です。その後の通常参加は1回 ¥1,000、11回分 ¥10,000 の回数券もご利用いただけます。個人レッスンは60分 ¥6,000 です。",
      },
      {
        q: "体験はどう申し込めばいいですか？",
        a: "LINEからご連絡ください。お子様の学年とご希望の曜日をお知らせいただければ、空き状況と当日のご案内をお送りします。初回の体験は無料で、入会の義務もありません。",
      },
      {
        q: "クラスは年齢やレベルで分かれていますか？",
        a: "時間帯によってクラスを分けています。水曜日には小学1年生向けのクラスもあります（開講時）。詳しくは週間スケジュールをご覧ください。",
      },
      {
        q: "チームとの違いは何ですか？",
        a: "チームは「チームのために戦う力」を育てます。KOBI SOCCER SCHOOL は「一人の選手として上手くなる力」を育てます。どちらかを選ぶ必要はなく、両立できます。",
      },
    ],
    footerBlurb:
      "淡路島のサッカースクール。観る・考える・決める・挑戦する。個を伸ばす指導を行っています。",
    navLabel: "ページ",
    menuLabel: "メニュー",
    contactLabel: "連絡先",
    footerCity: "兵庫県淡路市",
    readMore: "コーチについて",
  },

  en: {
    nav: ["Home", "Classes & Fees", "Coach", "Gallery", "Contact"],
    langLabel: "日本語",
    heroKicker: "Awaji Island · Hyogo · Individual development",
    heroTitle1: "Observe. Think. Decide.",
    heroTitle2: "Then challenge.",
    heroSub:
      "KOBI Soccer School develops each child's technique, decision-making and creativity. Rather than handing down answers, we build sessions where players have to look, think, choose and take on the challenge themselves.",
    ctaTrial: "Book a free trial",
    ctaClasses: "See the schedule",
    kickHint: "Tap anywhere — the ball reacts",
    marquee:
      "OBSERVE · UNDERSTAND · DECIDE · EXECUTE · ADAPT · CHALLENGE ·",
    pillarsKicker: "Coaching philosophy",
    pillarsTitle: "Six steps every player learns to run for themselves",
    pillars: [
      {
        num: "01",
        t: "Observe",
        d: "Ball, teammates, opponents, space, goal, pressure. Everything starts with scanning what is actually happening around you.",
      },
      {
        num: "02",
        t: "Understand",
        d: "Recognise what the situation is asking for, and what the real options are. Seeing is only useful once it means something.",
      },
      {
        num: "03",
        t: "Decide",
        d: "Choose an action instead of waiting for the coach's command. The number of decisions a child makes is what moves them forward.",
      },
      {
        num: "04",
        t: "Execute",
        d: "Play the chosen action with the right technique, quality and timing. This is where technique earns its meaning.",
      },
      {
        num: "05",
        t: "Adapt",
        d: "Opponents, space, speed, new information. The picture keeps changing, so the next action has to change with it.",
      },
      {
        num: "06",
        t: "Challenge",
        d: "Try, fail, learn, and try again. That courage is the quality we most want every player to leave with.",
      },
    ],
    stats: [
      { n: "70%", l: "Game-based training" },
      { n: "90", l: "Minutes per session" },
      { n: "3", l: "Days a week" },
      { n: "3", l: "Training venues" },
    ],
    classesKicker: "Classes and fees",
    classesTitle: "Classes & Fees",
    classesIntro:
      "The first trial session is free. After that, pay per session or use a discounted ticket card. One-to-one private lessons are also available. Every new family is welcome to come and watch a session first.",
    seeAll: "See classes",
    classes: [
      {
        name: "Regular class",
        short: "Monday, Wednesday and Friday sessions.",
        price: "¥1,000 per session",
        long: "Our standard sessions on Monday, Wednesday and Friday. Built around small-sided games and one-v-one work, with focused technical practice whenever a player needs it. Children who already belong to a team are welcome.",
        tags: ["90 min", "Mon / Wed / Fri", "Team players welcome"],
      },
      {
        name: "Ticket card",
        short: "Eleven sessions, bought together.",
        price: "11 sessions ¥10,000",
        long: "A card covering eleven sessions — about ¥909 each, cheaper than paying per visit. Ask on LINE for how the card works.",
        tags: ["11 sessions", "≈ ¥909 each", "Regular class"],
      },
      {
        name: "Private lesson",
        short: "One-to-one, focused on one goal.",
        price: "¥6,000 / 60 min",
        long: "One coach, one player. We agree the current priority with the family and work on exactly that. Get in touch to arrange a time.",
        tags: ["60 min", "By booking", "Fully personalised"],
      },
      {
        name: "Trial session",
        short: "Your first one is on us.",
        price: "Free",
        long: "The first trial session is free. Join a normal class as it runs, and afterwards the coach will talk to you directly about what he saw and what your child could work on next. Apply through LINE.",
        tags: ["First one free", "A normal class", "No obligation"],
      },
    ],
    scheduleTitle: "Weekly schedule",
    schedule: [
      {
        day: "Monday",
        time: "17:00 – 18:30",
        group: "Regular class",
        place: "Ask us for the venue",
      },
      {
        day: "Monday",
        time: "18:30 – 20:00",
        group: "Regular class",
        place: "Ask us for the venue",
      },
      {
        day: "Wednesday",
        time: "17:00 – 18:00",
        group: "First-grade class (when running)",
        place: "Sano indoor facility",
      },
      {
        day: "Wednesday",
        time: "17:00 – 18:30",
        group: "Regular class",
        place: "Ask us for the venue",
      },
      {
        day: "Wednesday",
        time: "18:30 – 20:00",
        group: "Regular class",
        place: "Ask us for the venue",
      },
      {
        day: "Friday",
        time: "17:00 – 18:30",
        group: "Regular class",
        place: "Ask us for the venue",
      },
      {
        day: "Friday",
        time: "18:30 – 20:00",
        group: "Regular class",
        place: "Ask us for the venue",
      },
    ],
    scheduleNote:
      "Times and venues can change. Check LINE for the current schedule and for which venue a session is at.",
    locationsTitle: "Where we train",
    locations: [
      {
        name: "Sano indoor facility",
        addr: "Sano, Awaji City, Hyogo (full address to follow)",
        access: "Indoors, so sessions are rarely affected by the weather",
      },
      {
        name: "Awaji City Hall futsal venue",
        addr: "Awaji City, Hyogo (full address to follow)",
        access: "Access and parking details to follow",
      },
      /** See the Japanese entry — the third ground's real name is still to come. */
      {
        name: "Third venue",
        addr: "Awaji City, Hyogo (name and address to follow)",
        access: "We confirm each session's venue on LINE",
      },
    ],
    trialCtaTitle: "Not sure which class fits?",
    trialCtaSub:
      "Message us on LINE with your child's school year and we will recommend one. The first trial is free.",
    coachKicker: "The coach",
    coachName: "Kobi — Charif Abdelkabir",
    coachIntro:
      "Moroccan-born, and the founder of KOBI Soccer School on Awaji Island since May 2024. He runs every session himself.",
    coachBio1:
      "Kobi grew up in Morocco and built his coaching career in Japan. He has worked as Head of Soccer at a sports academy and coached junior-high-school football, before opening KOBI Soccer School on Awaji Island in May 2024.",
    coachBio2:
      "He holds the JFA B coaching licence, PFSA Opposition Analysis Levels 1 and 2, and FIFA Safeguarding certification. He continues to study, with the JFA A licence and coaching at a higher level as his long-term goal.",
    coachQuote: "Before how — when, where, and why.",
    philosophyTitle: "How we work",
    philosophy: [
      {
        num: "01",
        t: "The individual first",
        d: "No child is locked into one position early. Receiving, carrying, passing, dribbling, finishing, defending, transitioning — we train what works in any role.",
      },
      {
        num: "02",
        t: "Learning inside the game",
        d: "Roughly 70% of a session is small-sided games, rondos, numerical advantages and transitions. The other 30% is careful technical and coordination work.",
      },
      {
        num: "03",
        t: "Coaching by question",
        d: "We ask rather than tell, so players spot the problem themselves. When a correction is needed it is clear — then the decision goes back to the player.",
      },
      {
        num: "04",
        t: "Room to fail",
        d: "Mistakes are information, for the player and the coach. We praise observation, brave decisions, good timing and effort — not only the outcome.",
      },
    ],
    pathTitle: "Background & qualifications",
    timeline: [
      {
        year: "2024.05",
        text: "Founded KOBI Soccer School on Awaji Island. Every session is coached by Kobi himself.",
      },
      {
        year: "Experience",
        text: "Head of Soccer at a sports academy; junior-high-school football coaching.",
      },
      {
        year: "Licences",
        text: "JFA B coaching licence · PFSA Opposition Analysis Levels 1 & 2 · FIFA Safeguarding.",
      },
      {
        year: "Next",
        text: "Working towards the JFA A licence and coaching at a higher level.",
      },
    ],
    galleryKicker: "Inside a session",
    galleryTitle: "Training gallery",
    galleryIntro:
      "Real sessions on Awaji Island. Nothing staged — just children looking, thinking and taking things on.",
    clipsTitle: "Sessions in motion",
    clips: [
      {
        src: "/uploads/session-indoor-ball-mastery.mp4",
        poster: "/uploads/session-indoor-ball-mastery-poster.jpg",
        cap: "Ball mastery, indoors",
        w: 464,
        h: 832,
      },
      {
        src: "/uploads/session-indoor-dribbling.mp4",
        poster: "/uploads/session-indoor-dribbling-poster.jpg",
        cap: "Dribbling and close control",
        w: 576,
        h: 1024,
      },
    ],
    clipPlay: "Play",
    clipPause: "Pause",
    photosTitle: "Photographs",
    gallery: [
      { src: "/uploads/team-group-photo.jpg", cap: "The whole school together" },
      {
        src: "/uploads/training-cone-dribbling.jpg",
        cap: "Dribbling through the cones",
      },
      {
        src: "/uploads/coach-with-players.jpg",
        cap: "With the coach after a session",
      },
      { src: "/uploads/coach-portrait.jpg", cap: "Coach Kobi" },
    ],
    contactKicker: "Get in touch",
    contactTitle: "Contact us",
    contactIntro:
      "LINE is the fastest way to reach us, and email works too. Tell us your child's school year and which days or class you are interested in, and we will arrange a free trial session.",
    lineCta: "Message on LINE",
    igCta: "Follow on Instagram",
    emailCta: "Email us",
    coachIgCta: "Kobi on Instagram",
    faqTitle: "Questions parents ask",
    faqs: [
      {
        q: "Can a complete beginner join?",
        a: "Yes. We adjust the rules, space, numbers and difficulty to the age and level in front of us. Beginners start by getting as many touches as possible and building up successful experiences.",
      },
      {
        q: "Can my child join while playing for another team?",
        a: "Yes. KOBI is designed to run alongside a team. The team teaches players how to play for the team; KOBI develops their individual technique, decision-making and creativity.",
      },
      {
        q: "What should my child bring?",
        a: "Comfortable kit, football shoes, shin pads, a drink and a change of clothes. Ask us on LINE if you are unsure about anything.",
      },
      {
        q: "What happens when it rains?",
        a: "Classes held at the indoor facility are rarely affected, so most sessions go ahead. If a session is cancelled or the venue changes, we let parents know on LINE.",
      },
      {
        q: "How does payment work?",
        a: "The first trial session is free. After that a regular session is ¥1,000, and there is a ticket card covering 11 sessions for ¥10,000. Private lessons are ¥6,000 for 60 minutes.",
      },
      {
        q: "How do we apply for a trial?",
        a: "Message us on LINE. Tell us your child's school year and the days that suit you, and we will send back availability and what to expect. The first session is free, with no obligation to join.",
      },
      {
        q: "Are classes split by age or level?",
        a: "Classes are split across the time slots. There is also a first-grade class on Wednesdays when it is running. See the weekly schedule for details.",
      },
      {
        q: "What is the difference between KOBI and a team?",
        a: "A team develops the ability to compete for the team. KOBI Soccer School develops the ability to become a better individual player. You do not have to choose — the two work together.",
      },
    ],
    footerBlurb:
      "A soccer school on Awaji Island. Observe, understand, decide, challenge — individual development first.",
    navLabel: "Pages",
    menuLabel: "Menu",
    contactLabel: "Contact",
    footerCity: "Awaji City, Hyogo",
    readMore: "About the coach",
  },
};
