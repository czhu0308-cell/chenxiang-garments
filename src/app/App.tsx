import { useEffect, useState } from "react";
import { ArrowRight, Check, Mail, Menu, MessageCircle, UserRound, X } from "lucide-react";

type Lang = "zh" | "ja" | "en";

const LANGUAGES: { code: Lang; label: string }[] = [
  { code: "zh", label: "中文" },
  { code: "ja", label: "日本語" },
  { code: "en", label: "English" },
];

const CONTACT_EMAIL = "czhu008@gmail.com";
const WHATSAPP_NUMBER = "6594477487";
const WHATSAPP_DISPLAY = "+65 9447 7487";

const factoryImage = (filename: string) =>
  `${import.meta.env.BASE_URL}factory/${filename}`;

const FACTORY_IMAGES = {
  hero: factoryImage("hero-micro-factory.jpg"),
  facts: factoryImage("facts-workshop-bg.jpg"),
  products: factoryImage("products-samples-bg.jpg"),
  about: factoryImage("a0da0333ab5da76b53655e90f666d07d.jpg"),
  line: factoryImage("06d3c11dbdd3c1ec81188204af7d4a8d.jpg"),
  detail: factoryImage("461c08776a8dda99f37e04c741bd1f35.jpg"),
  jacket: factoryImage("4863f0d9a4fc3b1f25abf8022c198dfd.jpg"),
  inspection: factoryImage("fb3ac09c58fc1aa784b83a3387137343.jpg"),
};

const TRANSLATIONS = {
  zh: {
    htmlLang: "zh-CN",
    pageTitle: "如皋市晨翔服装有限公司 | 服装代加工制造工厂",
    brand: "晨翔服装",
    brandSub: "Chenxiang Garments · Rugao",
    contactAction: "联系我们",
    nav: [
      ["工厂介绍", "#about"],
      ["制造能力", "#capabilities"],
      ["工厂资料", "#facts"],
      ["品牌参考", "#products"],
      ["质量流程", "#quality"],
      ["社区微工厂", "#community"],
      ["工厂实景", "#gallery"],
      ["联系合作", "#contact"],
    ],
    navGroups: [
      [
        "关于晨翔",
        [
          ["工厂介绍", "#about"],
          ["社区微工厂", "#community"],
        ],
      ],
      [
        "制造能力",
        [
          ["制造能力", "#capabilities"],
          ["质量流程", "#quality"],
        ],
      ],
      [
        "资料展示",
        [
          ["工厂资料", "#facts"],
          ["品牌参考", "#products"],
          ["工厂实景", "#gallery"],
        ],
      ],
    ],
    heroEyebrow: "Rugao Chenxiang Garments Co., Ltd.",
    heroTitleA: "晨光之下，",
    heroTitleB: "把每一件衣服做好",
    heroLeadBefore: "家族工厂深耕服装代加工",
    heroYears: "20 多年",
    heroLeadAfter:
      "，专注成衣加工、羽绒服及服装生产，长期承接日本订单体系，重视版型、尺寸、线迹、整烫与包装细节。我们希望用稳定制造能力，服务跨境电商品牌、外贸客户与成长型服装企业。",
    ctaCapabilities: "查看制造能力",
    ctaGallery: "查看工厂实景",
    nextLinks: {
      facts: "继续看品牌参考",
      products: "了解工厂介绍",
      about: "查看制造能力",
      capabilities: "查看质量流程",
      quality: "了解社区微工厂",
      community: "查看工厂实景",
      gallery: "联系合作",
    },
    floatingLabel: "OEM EXPERIENCE",
    floatingYears: "years",
    floatingText: "稳定代加工经验，服务成衣、羽绒服与外贸协作订单。",
    stats: [
      ["20 多年经验", "长期做服装代加工，把稳定交付和现场细节沉淀成工厂能力"],
      ["日单标准", "熟悉日本客户对尺寸、针距、线头与包装的细节要求"],
      ["成衣制造", "围绕服装代加工生产，延伸羽绒服与棉服业务"],
    ],
    factsLabel: "Factory Snapshot",
    factsTitleA: "来自评估资料的",
    factsTitleB: "真实工厂信息",
    factsIntro: "以下信息根据现有工厂评估表和工厂卡片整理，正式合作前可按客户验厂或订单评估要求复核更新。",
    facts: [
      ["创办时间", "2007 年 1 月 11 日", "晨翔工厂评估表记录"],
      ["月产量", "6,000 - 10,000 件", "适用于成衣、夹克、棉衣、羽绒服等品类"],
      ["主要设备", "52 台/套", "含缝纫机、包缝机、锁眼、烫台、充绒机等"],
      ["人员配置", "28 人", "含缝工、裁剪、打版、总检、包装等岗位"],
      ["生产区域", "约 2,000㎡+", "涵盖裁剪、缝纫车间、后道、仓库等区域"],
      ["适应产品", "成衣 / 夹克 / 棉衣 / 羽绒服", "可根据样衣、工艺单和订单要求评估"],
    ],
    brandReferenceLabel: "Order Experience",
    brandReferenceTitle: "历史订单涉及品牌参考",
    brandReferenceIntro: "以下品牌名称依据工厂历史订单及评估资料整理，仅用于说明过往生产经验与订单标准。相关商标归各自权利人所有，本页不构成品牌授权、经销或持续合作关系声明。",
    brandReferences: [
      ["SM2", "https://www.canshop.jp/sm2/"],
      ["MOUSSY", "https://www.moussy.ne.jp/"],
      ["niko and ...", "https://www.nikoand.jp/"],
      ["studio CLIP", "https://www.dot-st.com/studioclip/"],
      ["GLOBAL WORK", "https://en.globalwork.jp/"],
      ["SLY", "https://www.baroque-global.com/en/brand/sly"],
      ["AMERI", "https://amerivintage.co.jp/"],
      ["PING", "https://www.ping-appareljapan.com/"],
      ["417", "https://four-one-seven.jp/"],
      ["叙旧", ""],
    ],
    aboutLabel: "About Factory",
    aboutTitleA: "不做空泛包装，",
    aboutTitleB: "把工厂真实能力讲清楚",
    aboutParagraphs: [
      "如皋市晨翔服装有限公司位于江苏省如皋市城南街道马塘社区，是一家以服装生产加工为核心的制造型工厂。家族工厂从事服装代加工 20 多年，长期围绕成衣订单开展生产，近几年进一步拓展羽绒服、棉服等冬装品类。",
      "晨翔的优势不是流量，也不是概念，而是 20 多年代加工积累下来的现场经验：读懂工艺单、控制尺寸偏差、处理车缝细节、保持批次稳定，并按客户要求完成整烫、包装与出货配合。",
      "晨翔面向跨境电商品牌、外贸贸易公司、买手店和成长型服装品牌，提供样衣开发、订单评估与生产协作。",
    ],
    capabilitiesLabel: "Manufacturing Scope",
    capabilitiesTitleA: "可承接的",
    capabilitiesTitleB: "核心制造能力",
    capabilitiesIntro: "从样衣评估、工艺沟通到批量生产与出货配合，晨翔根据订单要求提供稳定、透明的服装 OEM 制造服务。",
    capabilities: [
      ["01", "成衣加工制造", "Garment Manufacturing", "承接衬衫、裙装、裤装、夹克、外套等成衣品类，从样衣、版型调整到批量生产保持稳定交付。"],
      ["02", "羽绒服与棉服", "Down & Padded Jackets", "近年也承接羽绒服与棉服加工订单，可根据客户需求进行生产评估。"],
      ["03", "20 多年代加工经验", "Japan Order Standard", "家族工厂深耕服装代加工 20 多年，长期服务日单体系，熟悉尺寸、线头、包装和批次稳定等要求。"],
      ["04", "小单快反配合", "Flexible Production", "适合品牌测款、跨境电商试单、买手店补单等需求，可围绕实际款式沟通样衣和起订量。"],
      ["05", "来样来图加工", "OEM Support", "根据客户样衣、工艺单、尺寸表或图片需求进行生产评估，协助拆解工艺和报价。"],
      ["06", "外贸协作基础", "Export Ready", "工厂位于江苏如皋服装产业带，可配合贸易主体完成外贸订单沟通、资料整理与出运衔接。"],
    ],
    qualityLabel: "Quality Control",
    qualityTitleA: "质量控制，",
    qualityTitleB: "从样衣开始",
    qualityText:
      "对服装工厂来说，品质不是最后验货才发生的事情。真正影响成品稳定性的，是前期工艺理解、版型尺寸、面辅料确认、生产中查和返修机制。晨翔将长期积累的日本订单经验落实到可执行、可追踪的质量流程中。",
    qualitySteps: ["需求确认与样衣评估", "纸样/尺寸表核对", "面辅料与工艺确认", "裁剪与上线生产", "中查巡检与问题返修", "尾查、整烫与包装", "装箱资料与出货配合"],
    qualityPillars: [
      ["人员配置", "组检 2 人 / 总检 2 人", "工厂评估表显示配置组检、总检、小烫、大烫、包装等岗位，形成从生产到后道的检查链路。"],
      ["设备覆盖", "52 台/套主要设备", "含缝纫机、双针车、包缝机、锁眼、订扣、烫台、模板机、花样机、充绒机等。"],
      ["现场评估", "整体环境：好", "现有评估表中，工厂整体环境与管理人员评价均记录为“好”。"],
      ["流程节点", "样衣 - 生产 - 后道 - 包装", "围绕样衣评估、尺寸核对、生产中查、尾查整烫、包装出货建立基础质量流程。"],
    ],
    qualityEvidenceTitle: "来自工厂评估表的质量相关信息",
    qualityEvidence: ["适应产品：衬衫、连衣裙、裤子、夹克、西装、呢子衣、棉衣、羽绒服等", "人员岗位：组检、总检、小烫、大烫、包装、管理人员等", "区域配置：裁剪、缝纫车间、后道、仓库等生产空间", "设备能力：锁眼、订扣、烫台、充绒等后道与冬装相关设备"],
    communityLabel: "Community Factory",
    communityTitleA: "马塘社区的",
    communityTitleB: "服装加工微工厂",
    communityParagraphs: [
      "人民图片网在 2026 年 2 月 1 日发布的《江苏如皋：“微工厂”带动家门口就业》中，提到江苏省如皋市城南街道马塘社区服装加工“微工厂”内，村民们忙着赶制订单。",
      "服装制造不仅连接订单和产线，也连接本地社区与家庭。晨翔扎根马塘社区，希望通过稳定的生产岗位，让更多劳动者在家门口获得工作机会。",
    ],
    communityLink: "查看人民图片网报道来源",
    stabilizationLink: "查看如皋市稳岗返还公示",
    galleryLabel: "Factory Gallery",
    galleryTitleA: "工厂实景",
    galleryTitleB: "与生产细节",
    galleryIntro: "以下照片拍摄于晨翔生产现场，呈现车间环境、缝制作业、设备配置、检验环节与日常生产管理。",
    galleryLabels: ["生产车间", "缝制工位", "工艺细节", "车间设备", "成衣检查", "现场陈列", "员工操作", "现场管理"],
    contactLabel: "Contact",
    contactTitleA: "直接联系，",
    contactTitleB: "沟通生产合作",
    contactText: "如有样衣、尺寸表或工艺单，欢迎通过邮箱或 WhatsApp 联系。我们会根据品类、数量、工艺和交期要求进行初步评估。",
    contactItems: [
      ["工厂名称", "如皋市晨翔服装有限公司"],
      ["所在地区", "江苏省如皋市城南街道马塘社区"],
      ["主营品类", "成衣加工、羽绒服、棉服及相关服装制造"],
      ["合作方式", "OEM 加工、样衣开发、小批量试单、外贸订单协作"],
    ],
    contactMethodsTitle: "联系方式",
    emailLabel: "公司邮箱",
    emailAction: "发送邮件",
    contactPersonLabel: "联系人",
    contactPerson: "朱先生",
    whatsappAction: "打开 WhatsApp",
    contactNote: "联系时建议提供产品类别、预计数量、目标交期，并附上样衣照片、尺寸表或工艺单，以便更快评估。",
    footer: "© 2026 如皋市晨翔服装有限公司 · 版权所有",
  },
  ja: {
    htmlLang: "ja",
    pageTitle: "如皋市晨翔服装有限公司 | アパレルOEM工場",
    brand: "晨翔服装",
    brandSub: "Chenxiang Garments · Rugao",
    contactAction: "お問い合わせ",
    nav: [
      ["工場紹介", "#about"],
      ["生産能力", "#capabilities"],
      ["工場情報", "#facts"],
      ["ブランド参考", "#products"],
      ["品質管理", "#quality"],
      ["地域工場", "#community"],
      ["工場写真", "#gallery"],
      ["お問い合わせ", "#contact"],
    ],
    navGroups: [
      [
        "晨翔について",
        [
          ["工場紹介", "#about"],
          ["地域工場", "#community"],
        ],
      ],
      [
        "生産能力",
        [
          ["生産能力", "#capabilities"],
          ["品質管理", "#quality"],
        ],
      ],
      [
        "資料展示",
        [
          ["工場情報", "#facts"],
          ["ブランド参考", "#products"],
          ["工場写真", "#gallery"],
        ],
      ],
    ],
    heroEyebrow: "Rugao Chenxiang Garments Co., Ltd.",
    heroTitleA: "朝の光のもとで、",
    heroTitleB: "一着一着を丁寧に仕上げる",
    heroLeadBefore: "家族工場としてアパレルOEMに",
    heroYears: "20年以上",
    heroLeadAfter:
      "携わり、既製服加工、ダウンウェア、各種縫製品の生産に対応しています。日本向け注文の経験を通じ、型紙、寸法、縫製、仕上げ、包装まで細部を重視しています。越境ECブランド、貿易会社、成長中のアパレル企業を安定した生産力で支えます。",
    ctaCapabilities: "生産能力を見る",
    ctaGallery: "工場写真を見る",
    nextLinks: {
      facts: "ブランド参考を見る",
      products: "工場紹介を見る",
      about: "生産能力を見る",
      capabilities: "品質管理を見る",
      quality: "地域工場を見る",
      community: "工場写真を見る",
      gallery: "お問い合わせへ",
    },
    floatingLabel: "OEM EXPERIENCE",
    floatingYears: "years",
    floatingText: "既製服、ダウンウェア、輸出向け案件に対応する安定したOEM経験。",
    stats: [
      ["20年以上の経験", "長年のOEM加工を通じ、安定納期と現場品質を積み重ねています"],
      ["日本向け基準", "寸法、ピッチ、糸処理、包装など細かな要求に対応"],
      ["既製服生産", "服装OEMを中心に、ダウンウェアと中綿ウェアにも対応"],
    ],
    factsLabel: "Factory Snapshot",
    factsTitleA: "評価資料に基づく",
    factsTitleB: "実際の工場情報",
    factsIntro: "以下の情報は既存の工場評価表と工場カルテをもとに整理したものです。正式な取引前には、監査や問い合わせ内容に応じて確認・更新できます。",
    facts: [
      ["創業時期", "2007年1月11日", "晨翔工場評価表の記録"],
      ["月産能力", "6,000 - 10,000 点", "既製服、ジャケット、中綿、ダウンウェアなどに対応"],
      ["主要設備", "52 台/セット", "ミシン、オーバーロック、ボタンホール、アイロン台、充填機など"],
      ["人員構成", "28 名", "縫製、裁断、型紙、最終検品、包装などの職種を含む"],
      ["生産エリア", "約 2,000㎡+", "裁断、縫製工場、後工程、倉庫などを含む"],
      ["対応製品", "既製服 / ジャケット / 中綿 / ダウンウェア", "サンプル、仕様書、注文条件に応じて評価可能"],
    ],
    brandReferenceLabel: "Order Experience",
    brandReferenceTitle: "過去注文に関わるブランド参考",
    brandReferenceIntro: "以下のブランド名は、過去の注文記録および工場評価資料に基づく生産経験の参考表示です。各商標はそれぞれの権利者に帰属し、ブランドの認定、販売代理、継続的な取引関係を示すものではありません。",
    brandReferences: [
      ["SM2", "https://www.canshop.jp/sm2/"],
      ["MOUSSY", "https://www.moussy.ne.jp/"],
      ["niko and ...", "https://www.nikoand.jp/"],
      ["studio CLIP", "https://www.dot-st.com/studioclip/"],
      ["GLOBAL WORK", "https://en.globalwork.jp/"],
      ["SLY", "https://www.baroque-global.com/en/brand/sly"],
      ["AMERI", "https://amerivintage.co.jp/"],
      ["PING", "https://www.ping-appareljapan.com/"],
      ["417", "https://four-one-seven.jp/"],
      ["叙旧", ""],
    ],
    aboutLabel: "About Factory",
    aboutTitleA: "誇張ではなく、",
    aboutTitleB: "工場の実力を正確に伝える",
    aboutParagraphs: [
      "如皋市晨翔服装有限公司は、江蘇省如皋市城南街道馬塘社区にある服装加工を中心とした製造工場です。家族工場として20年以上アパレルOEMに携わり、既製服の受注生産を軸に、近年はダウンウェアや中綿ウェアにも対応しています。",
      "晨翔の強みは宣伝文句ではなく、現場で培った経験です。仕様書の理解、寸法誤差の管理、縫製ディテール、ロットの安定性、仕上げ、包装、出荷対応まで丁寧に進めます。",
      "越境ECブランド、貿易会社、セレクトショップ、成長中のアパレルブランドに向けて、サンプル開発、注文評価、生産連携を提供します。",
    ],
    capabilitiesLabel: "Manufacturing Scope",
    capabilitiesTitleA: "対応可能な",
    capabilitiesTitleB: "主要生産能力",
    capabilitiesIntro: "サンプル評価、仕様確認、量産、出荷連携まで、注文条件に応じた安定性と透明性のあるアパレルOEMサービスを提供します。",
    capabilities: [
      ["01", "既製服加工", "Garment Manufacturing", "シャツ、スカート、パンツ、ジャケット、アウターなど、サンプル確認から量産まで安定して対応します。"],
      ["02", "ダウン・中綿ウェア", "Down & Padded Jackets", "近年はダウン・中綿ウェアの加工注文にも対応し、お客様の要件に応じて生産可否を確認します。"],
      ["03", "20年以上のOEM経験", "Japan Order Standard", "20年以上の服装OEM経験を持ち、日本向け注文で求められる寸法、糸処理、包装、ロット安定性を理解しています。"],
      ["04", "小ロット・迅速対応", "Flexible Production", "ブランドのテスト販売、越境ECの試作、セレクトショップの追加生産など、実際の仕様に合わせて相談できます。"],
      ["05", "サンプル・画像から加工", "OEM Support", "サンプル、仕様書、サイズ表、写真をもとに生産可否、工程、見積もりを評価します。"],
      ["06", "輸出案件との連携", "Export Ready", "江蘇如皋の服装産業エリアに位置し、貿易主体と連携して輸出案件の資料整理や出荷対応を行えます。"],
    ],
    qualityLabel: "Quality Control",
    qualityTitleA: "品質管理は、",
    qualityTitleB: "サンプル段階から",
    qualityText:
      "服装工場にとって、品質は最終検品だけで決まるものではありません。仕様理解、型紙と寸法、資材確認、工程内検査、修正対応が製品の安定性を左右します。晨翔は日本向け注文で培った経験を、実行可能で追跡できる品質管理プロセスに反映しています。",
    qualitySteps: ["要件確認とサンプル評価", "型紙・サイズ表確認", "生地・副資材・仕様確認", "裁断とライン投入", "工程内検査と修正", "最終検品・仕上げ・包装", "箱詰め資料と出荷連携"],
    qualityPillars: [
      ["人員体制", "工程検査 2名 / 最終検査 2名", "工場評価表には、工程検査、最終検査、アイロン、包装などの職種が記録され、生産から後工程までの確認体制があります。"],
      ["設備構成", "主要設備 52 台/セット", "ミシン、二本針、オーバーロック、ボタンホール、ボタン付け、アイロン台、テンプレート機、刺繍系設備、充填機などを含みます。"],
      ["現場評価", "全体環境：良好", "既存の評価表では、工場全体の環境と管理者評価がともに「良好」と記録されています。"],
      ["工程管理", "サンプル - 生産 - 後工程 - 包装", "サンプル評価、寸法確認、工程内検査、最終確認、仕上げ、包装出荷までの基本品質フローを構成しています。"],
    ],
    qualityEvidenceTitle: "工場評価表に基づく品質関連情報",
    qualityEvidence: ["対応製品：シャツ、ワンピース、パンツ、ジャケット、コート、中綿、ダウンウェアなど", "職種：工程検査、最終検査、アイロン、包装、管理者など", "エリア：裁断、縫製工場、後工程、倉庫など", "設備：ボタンホール、ボタン付け、アイロン台、充填機など"],
    communityLabel: "Community Factory",
    communityTitleA: "馬塘社区の",
    communityTitleB: "服装加工マイクロ工場",
    communityParagraphs: [
      "人民图片网は2026年2月1日、「江蘇如皋：“微工厂”带动家门口就业」という記事で、如皋市城南街道馬塘社区の服装加工マイクロ工場で住民が注文品を生産している様子を紹介しました。",
      "服装製造は注文や生産ラインだけでなく、地域社会と家庭にもつながっています。晨翔は馬塘社区に根ざし、安定した生産の場を通じて、地域の人々が自宅近くで働ける機会を広げていきます。",
    ],
    communityLink: "人民图片网の記事を見る",
    stabilizationLink: "如皋市の雇用安定返還公示を見る",
    galleryLabel: "Factory Gallery",
    galleryTitleA: "工場風景",
    galleryTitleB: "と生産ディテール",
    galleryIntro: "以下の写真は晨翔の生産現場で撮影され、工場環境、縫製作業、設備、検品工程、日常の生産管理を紹介しています。",
    galleryLabels: ["生産現場", "縫製作業", "工程ディテール", "工場設備", "製品検査", "現場展示", "作業風景", "現場管理"],
    contactLabel: "Contact",
    contactTitleA: "直接連絡して、",
    contactTitleB: "生産について相談する",
    contactText: "サンプル、サイズ表、仕様書をお持ちの場合は、メールまたは WhatsApp でご連絡ください。品目、数量、仕様、納期に基づいて初期評価を行います。",
    contactItems: [
      ["工場名", "如皋市晨翔服装有限公司"],
      ["所在地", "江蘇省如皋市城南街道馬塘社区"],
      ["主な品目", "既製服加工、ダウンウェア、中綿ウェア、関連服装製造"],
      ["協力方式", "OEM加工、サンプル開発、小ロット試作、輸出案件連携"],
    ],
    contactMethodsTitle: "連絡先",
    emailLabel: "会社メール",
    emailAction: "メールを送る",
    contactPersonLabel: "担当者",
    contactPerson: "朱様",
    whatsappAction: "WhatsAppを開く",
    contactNote: "品目、予定数量、希望納期をご記載のうえ、サンプル写真、サイズ表、仕様書を添付いただくと、より迅速に確認できます。",
    footer: "© 2026 如皋市晨翔服装有限公司 · All Rights Reserved",
  },
  en: {
    htmlLang: "en",
    pageTitle: "Rugao Chenxiang Garments Co., Ltd. | Apparel OEM Manufacturer",
    brand: "Chenxiang Garments",
    brandSub: "Chenxiang Garments · Rugao",
    contactAction: "Contact Us",
    nav: [
      ["About", "#about"],
      ["Capabilities", "#capabilities"],
      ["Facts", "#facts"],
      ["Brand References", "#products"],
      ["Quality", "#quality"],
      ["Community", "#community"],
      ["Gallery", "#gallery"],
      ["Contact", "#contact"],
    ],
    navGroups: [
      [
        "About",
        [
          ["Factory Introduction", "#about"],
          ["Community Factory", "#community"],
        ],
      ],
      [
        "Manufacturing",
        [
          ["Capabilities", "#capabilities"],
          ["Quality Process", "#quality"],
        ],
      ],
      [
        "Showcase",
        [
          ["Factory Facts", "#facts"],
          ["Brand References", "#products"],
          ["Factory Gallery", "#gallery"],
        ],
      ],
    ],
    heroEyebrow: "Rugao Chenxiang Garments Co., Ltd.",
    heroTitleA: "Under the morning light,",
    heroTitleB: "we make every garment with care",
    heroLeadBefore: "Our family factory has focused on apparel OEM for",
    heroYears: "20+ years",
    heroLeadAfter:
      ", covering garment manufacturing, down jackets and related apparel production. With long-term experience in Japan-oriented orders, we pay close attention to patterns, measurements, stitching, finishing and packaging details. We support cross-border e-commerce brands, trading companies and growing apparel businesses with stable production capability.",
    ctaCapabilities: "View Capabilities",
    ctaGallery: "View Factory Gallery",
    nextLinks: {
      facts: "Continue to Brand References",
      products: "Learn About the Factory",
      about: "View Manufacturing Scope",
      capabilities: "View Quality Process",
      quality: "Learn About Community Factory",
      community: "View Factory Gallery",
      gallery: "Contact Us",
    },
    floatingLabel: "OEM EXPERIENCE",
    floatingYears: "years",
    floatingText: "Reliable OEM experience for garments, down jackets and export cooperation.",
    stats: [
      ["20+ Years Experience", "Long-term apparel OEM experience built on stable delivery and shop-floor details"],
      ["Japan Order Standard", "Experienced with strict requirements on measurements, stitches, thread trimming and packaging"],
      ["Garment Manufacturing", "Apparel OEM production with extended capability in down and padded jackets"],
    ],
    factsLabel: "Factory Snapshot",
    factsTitleA: "Real factory data",
    factsTitleB: "from assessment files",
    factsIntro: "The following information is organized from existing factory assessment sheets and factory records. It can be reconfirmed and updated before formal audits or production inquiries.",
    facts: [
      ["Founded", "Jan 11, 2007", "Recorded in Chenxiang factory assessment"],
      ["Monthly output", "6,000 - 10,000 pcs", "Applicable to garments, jackets, padded wear and down jackets"],
      ["Key equipment", "52 units/sets", "Including sewing machines, overlock machines, buttonhole machines, ironing tables and filling machines"],
      ["Team setup", "28 people", "Including sewing, cutting, pattern/CAD, final inspection and packing roles"],
      ["Production areas", "Approx. 2,000㎡+", "Covering cutting, sewing workshop, finishing and warehouse areas"],
      ["Product scope", "Garments / jackets / padded wear / down jackets", "Production can be evaluated based on samples, tech packs and order requirements"],
    ],
    brandReferenceLabel: "Order Experience",
    brandReferenceTitle: "Brand references from past order records",
    brandReferenceIntro: "The following names are based on historical order records and factory assessment materials and are shown solely as references to past production experience. All trademarks belong to their respective owners; this page does not imply endorsement, distribution rights or an ongoing business relationship.",
    brandReferences: [
      ["SM2", "https://www.canshop.jp/sm2/"],
      ["MOUSSY", "https://www.moussy.ne.jp/"],
      ["niko and ...", "https://www.nikoand.jp/"],
      ["studio CLIP", "https://www.dot-st.com/studioclip/"],
      ["GLOBAL WORK", "https://en.globalwork.jp/"],
      ["SLY", "https://www.baroque-global.com/en/brand/sly"],
      ["AMERI", "https://amerivintage.co.jp/"],
      ["PING", "https://www.ping-appareljapan.com/"],
      ["417", "https://four-one-seven.jp/"],
      ["叙旧", ""],
    ],
    aboutLabel: "About Factory",
    aboutTitleA: "No empty claims,",
    aboutTitleB: "just real manufacturing capability",
    aboutParagraphs: [
      "Rugao Chenxiang Garments Co., Ltd. is located in Matang Community, Chengnan Subdistrict, Rugao, Jiangsu. It is a manufacturing-oriented factory focused on apparel production and processing. The family factory has over 20 years of apparel OEM experience, with recent expansion into down jackets and padded outerwear.",
      "Chenxiang's strength is not traffic or marketing language, but practical experience accumulated on the production floor: understanding tech packs, controlling measurement tolerances, handling sewing details, maintaining batch consistency, finishing, packaging and shipment coordination.",
      "Chenxiang supports cross-border e-commerce brands, trading companies, boutiques and growing apparel labels with sample development, order evaluation and production coordination.",
    ],
    capabilitiesLabel: "Manufacturing Scope",
    capabilitiesTitleA: "Core",
    capabilitiesTitleB: "manufacturing capabilities",
    capabilitiesIntro: "From sample evaluation and specification review to bulk production and shipment coordination, Chenxiang provides stable and transparent apparel OEM services tailored to each order.",
    capabilities: [
      ["01", "Garment Manufacturing", "Garment Manufacturing", "Shirts, skirts, trousers, jackets, coats and related apparel categories, from sample review and pattern adjustment to stable bulk production."],
      ["02", "Down & Padded Jackets", "Down & Padded Jackets", "We also accept down and padded jacket processing orders, subject to production review based on customer requirements."],
      ["03", "20+ Years OEM Experience", "Japan Order Standard", "Over 20 years of apparel OEM experience, including Japan-oriented orders with attention to measurements, thread trimming, packaging and batch consistency."],
      ["04", "Flexible Small Orders", "Flexible Production", "Suitable for brand testing, cross-border e-commerce trial orders and boutique replenishment, with sample and MOQ discussion based on actual styles."],
      ["05", "Sample & Reference OEM", "OEM Support", "Production evaluation based on samples, tech packs, size charts or reference images, including process breakdown and quotation support."],
      ["06", "Export Cooperation Base", "Export Ready", "Located in the Rugao apparel manufacturing area, the factory can coordinate with trading entities on export communication, documents and shipment support."],
    ],
    qualityLabel: "Quality Control",
    qualityTitleA: "Quality control",
    qualityTitleB: "starts from sampling",
    qualityText:
      "For an apparel factory, quality is not created only at final inspection. Stable products depend on early process understanding, pattern and measurement control, material confirmation, in-line inspection and repair mechanisms. Chenxiang applies its Japan-oriented order experience through an actionable and traceable quality process.",
    qualitySteps: ["Requirement review and sample evaluation", "Pattern and size chart check", "Fabric, trims and process confirmation", "Cutting and line production", "In-line inspection and repair", "Final inspection, pressing and packing", "Carton documents and shipment coordination"],
    qualityPillars: [
      ["Quality team", "2 in-line inspectors / 2 final inspectors", "The factory assessment records roles including in-line inspection, final inspection, pressing, packing and management, forming a basic production-to-finishing quality chain."],
      ["Equipment coverage", "52 key units/sets", "Includes sewing machines, double-needle machines, overlock machines, buttonhole machines, button attaching, ironing tables, template machines, pattern machines and filling machines."],
      ["Site assessment", "Overall environment: good", "The existing assessment sheet records both the factory environment and management evaluation as good."],
      ["Process control", "Sample - production - finishing - packing", "The system covers sample evaluation, measurement checking, in-line inspection, final checking, pressing, packing and shipment coordination."],
    ],
    qualityEvidenceTitle: "Quality-related data from factory assessment",
    qualityEvidence: ["Applicable products: shirts, dresses, trousers, jackets, suits, wool coats, padded jackets and down jackets", "Team roles: in-line inspection, final inspection, pressing, packing and management", "Areas: cutting, sewing workshop, finishing and warehouse", "Equipment: buttonhole, button attaching, ironing table and filling machines"],
    communityLabel: "Community Factory",
    communityTitleA: "The garment micro-factory",
    communityTitleB: "in Matang Community",
    communityParagraphs: [
      "People's Images published a report on February 1, 2026, titled 'Jiangsu Rugao: Micro-factories drive employment near home.' It described villagers working on orders inside a garment processing micro-factory in Matang Community, Chengnan Subdistrict, Rugao.",
      "Apparel manufacturing is not only about orders and production lines; it also connects local communities and families. Rooted in Matang Community, Chenxiang hopes to create stable production jobs and more opportunities for people to work closer to home.",
    ],
    communityLink: "View the People's Images source",
    stabilizationLink: "View Rugao employment-stabilization notice",
    galleryLabel: "Factory Gallery",
    galleryTitleA: "Factory scenes",
    galleryTitleB: "and production details",
    galleryIntro: "The following photographs were taken at Chenxiang's production site and show the workshop environment, sewing operations, equipment, inspection activities and daily production management.",
    galleryLabels: ["Production floor", "Sewing station", "Process detail", "Workshop equipment", "Garment inspection", "Workshop display", "Operator at work", "Shop-floor management"],
    contactLabel: "Contact",
    contactTitleA: "Contact us directly",
    contactTitleB: "to discuss production",
    contactText: "If you have a sample, size chart or tech pack, contact us by email or WhatsApp. We will make an initial assessment based on the category, quantity, specifications and timeline.",
    contactItems: [
      ["Factory", "Rugao Chenxiang Garments Co., Ltd."],
      ["Location", "Matang Community, Chengnan Subdistrict, Rugao, Jiangsu"],
      ["Main categories", "Garment processing, down jackets, padded jackets and related apparel manufacturing"],
      ["Cooperation", "OEM production, sample development, small trial orders and export-order coordination"],
    ],
    contactMethodsTitle: "Direct Contact",
    emailLabel: "Company Email",
    emailAction: "Send Email",
    contactPersonLabel: "Contact Person",
    contactPerson: "Mr. Zhu",
    whatsappAction: "Open WhatsApp",
    contactNote: "For a faster review, include the product category, estimated quantity and target delivery date, together with sample photos, a size chart or a tech pack.",
    footer: "© 2026 Rugao Chenxiang Garments Co., Ltd. · All Rights Reserved",
  },
} as const;

const GALLERY_IMAGES = [
  factoryImage("cc8fca1c35454b79677a3f15c9c48e91.jpg"),
  factoryImage("22075cc6a0d47362d8d6f792f0ba53df.jpg"),
  factoryImage("36f12e292673c08733b8e1d1d2c8131b.jpg"),
  factoryImage("c7a165e82b9b8a01660500813360999b.jpg"),
  factoryImage("d65fdf6f7ba6c25af3d319461d20a086.jpg"),
  factoryImage("eaa9937535bceb6ae1088be4722adb41.jpg"),
  factoryImage("e38232e852cf70d1b4d3792fcc9184d0.jpg"),
  factoryImage("4aa57aa357fb7186afc2850c8779cabe.jpg"),
];

export default function App() {
  const [language, setLanguage] = useState<Lang>("zh");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const t = TRANSLATIONS[language];

  useEffect(() => {
    document.documentElement.lang = t.htmlLang;
    document.title = t.pageTitle;
  }, [t.htmlLang, t.pageTitle]);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
      setScrollY(window.scrollY);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const items = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14 }
    );

    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, [language]);

  const scrollTo = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const chooseLanguage = (nextLanguage: Lang) => {
    setLanguage(nextLanguage);
    setMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-background text-foreground" style={{ fontFamily: "'Noto Sans SC', sans-serif" }}>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled ? "py-3" : "py-4"
        }`}
      >
        <div className="liquid-nav mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-8">
          <button onClick={() => scrollTo("#top")} className="text-left leading-none">
            <span className="block text-lg font-semibold tracking-widest text-primary" style={{ fontFamily: "'Noto Serif SC', serif" }}>
              {t.brand}
            </span>
            <span className="block text-[9px] tracking-[0.32em] text-muted-foreground uppercase mt-1">{t.brandSub}</span>
          </button>

          <nav className="hidden lg:flex items-center gap-5">
            {t.navGroups.map(([label, links]) => (
              <NavDropdown key={label} label={label} links={links} onNavigate={scrollTo} />
            ))}
            <LanguageSwitcher language={language} onChange={chooseLanguage} />
            <button onClick={() => scrollTo("#contact")} className="ml-2 px-5 py-2 text-xs tracking-widest bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
              {t.contactAction}
            </button>
          </nav>

          <button className="lg:hidden p-1" onClick={() => setMenuOpen((v) => !v)} aria-label="Toggle menu">
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {menuOpen && (
          <div className="lg:hidden bg-background border-t border-border px-6 py-5 flex flex-col gap-5">
            {t.navGroups.map(([groupLabel, links]) => (
              <div key={groupLabel}>
                <div className="mb-2 text-[10px] tracking-[0.25em] text-primary">{groupLabel}</div>
                <div className="flex flex-col gap-3">
                  {links.map(([label, href]) => (
                    <button key={href} onClick={() => scrollTo(href)} className="text-sm tracking-widest text-left text-muted-foreground hover:text-foreground">
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            ))}
            <LanguageSwitcher language={language} onChange={chooseLanguage} compact={false} />
            <button
              onClick={() => scrollTo("#contact")}
              className="mt-1 w-full bg-primary px-5 py-3 text-xs tracking-widest text-primary-foreground transition-colors hover:bg-primary/90"
            >
              {t.contactAction}
            </button>
          </div>
        )}
      </header>

      <main id="top">
        <section className="relative min-h-screen overflow-hidden bg-white pt-28 lg:pt-36 pb-16 lg:pb-24 flex items-center">
          <div className="absolute inset-0">
            <img
              src={FACTORY_IMAGES.hero}
              alt="factory background"
              className="h-full w-full object-cover object-center blur-[0.5px] will-change-transform"
              style={{ transform: `scale(1.05) translateY(${scrollY * 0.05}px)` }}
            />
            <div className="absolute inset-0 bg-white/68" />
            <div className="absolute inset-0 bg-gradient-to-r from-white via-white/84 to-white/42" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full">
            <div className="reveal max-w-3xl">
              <SectionLabel label={t.heroEyebrow} />

              <h1 className="text-5xl lg:text-7xl font-light leading-[1.08] max-w-4xl mb-8" style={{ fontFamily: "'Noto Serif SC', serif", fontWeight: 300 }}>
                {t.heroTitleA}
                <br />
                <span className="text-primary">{t.heroTitleB}</span>
              </h1>

              <p className="max-w-2xl text-sm lg:text-base leading-8 text-muted-foreground mb-10">
                {t.heroLeadBefore} <strong className="text-2xl lg:text-3xl font-semibold text-foreground align-baseline">{t.heroYears}</strong>
                {t.heroLeadAfter}
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <button onClick={() => scrollTo("#capabilities")} className="group flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground text-xs tracking-widest hover:bg-primary/90 transition-colors w-fit shadow-sm">
                  {t.ctaCapabilities}
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </button>
                <button onClick={() => scrollTo("#gallery")} className="px-8 py-4 border border-border bg-white text-xs tracking-widest text-muted-foreground hover:text-foreground hover:border-primary/50 transition-colors w-fit">
                  {t.ctaGallery}
                </button>
              </div>
            </div>
            <div className="reveal absolute bottom-10 right-6 hidden lg:block">
              <div className="text-[10px] tracking-[0.3em] text-muted-foreground">{t.floatingLabel}</div>
              <div className="mt-2 flex items-end gap-2">
                <span className="text-6xl font-semibold text-foreground" style={{ fontFamily: "'Noto Serif SC', serif" }}>
                  20+
                </span>
                <span className="pb-2 text-sm text-muted-foreground">{t.floatingYears}</span>
              </div>
              <div className="mt-4 h-px w-32 bg-primary/40" />
              <p className="mt-4 max-w-44 text-xs leading-6 text-muted-foreground">{t.floatingText}</p>
            </div>
          </div>
        </section>

        <section className="border-y border-border bg-secondary">
          <div className="max-w-7xl mx-auto px-6 lg:px-12 py-9 grid md:grid-cols-3 gap-8">
            {t.stats.map(([title, desc]) => (
              <div key={title} className="reveal border-l border-primary/40 pl-5">
                <h3 className="text-lg text-foreground mb-2" style={{ fontFamily: "'Noto Serif SC', serif" }}>
                  {title}
                </h3>
                <p className="text-sm leading-7 text-muted-foreground">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="facts" className="relative overflow-hidden py-24 lg:py-32 bg-white">
          <div className="absolute inset-0">
            <img
              src={FACTORY_IMAGES.facts}
              alt="factory facts background"
              className="h-full w-full object-cover object-center blur-[0.5px] will-change-transform"
              style={{ transform: `scale(1.05) translateY(${Math.max(scrollY - 360, 0) * 0.04}px)` }}
            />
            <div className="absolute inset-0 bg-white/68" />
            <div className="absolute inset-0 bg-gradient-to-r from-white via-white/84 to-white/42" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
            <div className="reveal mb-14 max-w-3xl">
              <SectionLabel label={t.factsLabel} />
              <h2 className="text-4xl lg:text-5xl font-light leading-tight mb-6" style={{ fontFamily: "'Noto Serif SC', serif", fontWeight: 300 }}>
                {t.factsTitleA}
                <br />
                <span className="text-primary">{t.factsTitleB}</span>
              </h2>
              <p className="text-sm leading-8 text-muted-foreground">{t.factsIntro}</p>
            </div>

            <div className="grid gap-px bg-border md:grid-cols-2 lg:grid-cols-3">
              {t.facts.map(([label, value, note]) => (
                <div key={label} className="reveal group bg-white/86 p-7 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:bg-white hover:shadow-xl hover:shadow-slate-200">
                  <div className="text-[10px] tracking-[0.28em] text-primary/70">{label}</div>
                  <div className="mt-4 text-2xl font-semibold text-foreground" style={{ fontFamily: "'Noto Serif SC', serif" }}>
                    {value}
                  </div>
                  <p className="mt-4 text-sm leading-7 text-muted-foreground">{note}</p>
                </div>
              ))}
            </div>
            <SectionBridge label={t.nextLinks.facts} href="#products" onNavigate={scrollTo} />
          </div>
        </section>

        <section id="products" className="relative overflow-hidden py-24 lg:py-32 bg-white">
          <div className="absolute inset-0">
            <img
              src={FACTORY_IMAGES.products}
              alt="sample rack background"
              className="h-full w-full object-cover object-center blur-[0.5px] will-change-transform"
              style={{ transform: `scale(1.05) translateY(${Math.max(scrollY - 820, 0) * 0.035}px)` }}
            />
            <div className="absolute inset-0 bg-white/70" />
            <div className="absolute inset-0 bg-gradient-to-r from-white via-white/84 to-white/45" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
            <div className="mb-12 grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
              <div className="reveal">
                <SectionLabel label={t.brandReferenceLabel} />
                <h2 className="text-4xl lg:text-5xl font-light leading-tight" style={{ fontFamily: "'Noto Serif SC', serif", fontWeight: 300 }}>
                  {t.brandReferenceTitle}
                </h2>
              </div>
              <p className="reveal text-sm leading-8 text-muted-foreground">{t.brandReferenceIntro}</p>
            </div>

            <div className="reveal grid grid-cols-2 gap-px bg-border/70 shadow-xl shadow-slate-200/50 sm:grid-cols-3 xl:grid-cols-5">
              {t.brandReferences.map(([brand, url]) => {
                const content = <span className="text-sm font-semibold tracking-[0.18em] text-slate-700 transition-colors group-hover:text-primary">{brand}</span>;

                return url ? (
                  <a
                    key={brand}
                    href={url}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${brand} official website`}
                    className="group flex min-h-24 items-center justify-center bg-white/86 px-4 py-5 text-center backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:bg-white hover:shadow-lg hover:shadow-slate-200"
                  >
                    {content}
                  </a>
                ) : (
                  <div key={brand} className="group flex min-h-24 items-center justify-center bg-white/70 px-4 py-5 text-center backdrop-blur-sm">
                    {content}
                  </div>
                );
              })}
            </div>
            <SectionBridge label={t.nextLinks.products} href="#about" onNavigate={scrollTo} />
          </div>
        </section>

        <section id="about" className="relative overflow-hidden py-24 lg:py-32">
          <div className="absolute inset-0">
            <img
              src={FACTORY_IMAGES.about}
              alt="factory workshop background"
              className="h-full w-full object-cover object-center blur-[0.5px] will-change-transform"
              style={{ transform: `scale(1.03) translateY(${Math.max(scrollY - 520, 0) * 0.035}px)` }}
            />
            <div className="absolute inset-0 bg-white/34" />
            <div className="absolute inset-0 bg-gradient-to-r from-white/96 via-white/74 to-white/28" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
            <div className="reveal max-w-3xl py-8 lg:py-12">
              <SectionLabel label={t.aboutLabel} />
              <h2 className="text-4xl lg:text-5xl font-light leading-tight mb-8" style={{ fontFamily: "'Noto Serif SC', serif", fontWeight: 300 }}>
                {t.aboutTitleA}
                <br />
                <span className="text-primary">{t.aboutTitleB}</span>
              </h2>
              <div className="space-y-5 text-sm leading-8 text-muted-foreground">
                {t.aboutParagraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>
            <SectionBridge label={t.nextLinks.about} href="#capabilities" onNavigate={scrollTo} />
          </div>
        </section>

        <section id="capabilities" className="py-24 lg:py-32 bg-secondary">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-14">
              <div className="reveal">
                <SectionLabel label={t.capabilitiesLabel} />
                <h2 className="text-4xl lg:text-5xl font-light leading-tight" style={{ fontFamily: "'Noto Serif SC', serif", fontWeight: 300 }}>
                  {t.capabilitiesTitleA}
                  <br />
                  <span className="text-primary">{t.capabilitiesTitleB}</span>
                </h2>
              </div>
              <p className="text-sm leading-7 text-muted-foreground max-w-sm">{t.capabilitiesIntro}</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
              {t.capabilities.map(([num, title, subtitle, desc]) => (
                <div key={num} className="reveal group bg-card hover:bg-white p-8 lg:p-10 transition-all duration-500 shadow-sm shadow-slate-100 hover:-translate-y-2 hover:shadow-2xl hover:shadow-slate-200">
                  <span className="text-xs tracking-[0.3em] text-primary/60 transition-colors group-hover:text-primary">{num}</span>
                  <h3 className="mt-5 text-xl text-foreground" style={{ fontFamily: "'Noto Serif SC', serif" }}>
                    {title}
                  </h3>
                  <p className="mt-1 text-[10px] tracking-widest uppercase text-primary/60">{subtitle}</p>
                  <p className="mt-5 text-sm leading-7 text-muted-foreground">{desc}</p>
                </div>
              ))}
            </div>
            <SectionBridge label={t.nextLinks.capabilities} href="#quality" onNavigate={scrollTo} />
          </div>
        </section>

        <section id="quality" className="py-24 lg:py-32 bg-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="grid lg:grid-cols-[0.85fr_1.15fr] gap-14 lg:gap-20 items-start">
              <div className="reveal lg:sticky lg:top-28">
                <SectionLabel label={t.qualityLabel} />
                <h2 className="text-4xl lg:text-5xl font-light leading-tight mb-8" style={{ fontFamily: "'Noto Serif SC', serif", fontWeight: 300 }}>
                  {t.qualityTitleA}
                  <br />
                  <span className="text-primary">{t.qualityTitleB}</span>
                </h2>
                <p className="text-sm leading-8 text-muted-foreground mb-8">{t.qualityText}</p>
                <div className="space-y-3">
                  {t.qualitySteps.map((step) => (
                    <div key={step} className="flex items-center gap-3 text-sm text-muted-foreground">
                      <Check size={15} className="text-primary shrink-0" />
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="grid md:grid-cols-2 gap-px bg-border">
                  {t.qualityPillars.map(([label, value, desc]) => (
                    <article key={label} className="reveal bg-secondary/80 p-7 transition-all duration-500 hover:-translate-y-1 hover:bg-white hover:shadow-xl hover:shadow-slate-200">
                      <p className="text-[10px] tracking-[0.28em] text-primary/70">{label}</p>
                      <h3 className="mt-4 text-2xl font-semibold text-foreground" style={{ fontFamily: "'Noto Serif SC', serif" }}>
                        {value}
                      </h3>
                      <p className="mt-4 text-sm leading-7 text-muted-foreground">{desc}</p>
                    </article>
                  ))}
                </div>

                <div className="reveal mt-8 border border-border bg-white p-7 shadow-lg shadow-slate-100">
                  <h3 className="text-xl text-foreground" style={{ fontFamily: "'Noto Serif SC', serif" }}>
                    {t.qualityEvidenceTitle}
                  </h3>
                  <div className="mt-5 grid gap-3 md:grid-cols-2">
                    {t.qualityEvidence.map((item) => (
                      <div key={item} className="flex items-start gap-3 text-sm leading-7 text-muted-foreground">
                        <Check size={15} className="mt-1.5 text-primary shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 grid grid-cols-2 gap-4">
                  {[FACTORY_IMAGES.line, FACTORY_IMAGES.detail, FACTORY_IMAGES.jacket, FACTORY_IMAGES.inspection].map((src, index) => (
                    <div key={src} className={`reveal aspect-[4/5] overflow-hidden bg-secondary shadow-xl shadow-slate-100 ${index === 1 ? "mt-10" : ""} ${index === 2 ? "-mt-10" : ""}`}>
                      <img src={src} alt="factory production detail" className="h-full w-full object-cover scale-110 object-center transition-transform duration-700 hover:scale-118" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <SectionBridge label={t.nextLinks.quality} href="#community" onNavigate={scrollTo} />
          </div>
        </section>

        <section id="community" className="py-24 lg:py-32 bg-secondary">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-14 lg:gap-24 items-start">
              <div className="reveal">
                <SectionLabel label={t.communityLabel} />
                <h2 className="text-4xl lg:text-5xl font-light leading-tight" style={{ fontFamily: "'Noto Serif SC', serif", fontWeight: 300 }}>
                  {t.communityTitleA}
                  <br />
                  <span className="text-primary">{t.communityTitleB}</span>
                </h2>
              </div>
              <div className="reveal space-y-5 text-sm leading-8 text-muted-foreground">
                {t.communityParagraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                <div className="flex flex-wrap gap-x-6 gap-y-3">
                  <a href="http://vip.people.com.cn/albumsDetail?aid=2034998&pid=15207963" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-xs tracking-widest text-primary hover:text-primary/80">
                    {t.communityLink}
                    <ArrowRight size={13} />
                  </a>
                  <a href="http://www.rugao.gov.cn/rgsrsj/gggs/content/84b3f4f9-3f4f-4444-adbe-407feff4ac5a.html" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-xs tracking-widest text-primary hover:text-primary/80">
                    {t.stabilizationLink}
                    <ArrowRight size={13} />
                  </a>
                </div>
              </div>
            </div>
            <SectionBridge label={t.nextLinks.community} href="#gallery" onNavigate={scrollTo} />
          </div>
        </section>

        <section id="gallery" className="py-24 lg:py-32">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-14">
              <div className="reveal">
                <SectionLabel label={t.galleryLabel} />
                <h2 className="text-4xl lg:text-5xl font-light leading-tight" style={{ fontFamily: "'Noto Serif SC', serif", fontWeight: 300 }}>
                  {t.galleryTitleA}
                  <span className="text-primary"> {t.galleryTitleB}</span>
                </h2>
              </div>
              <p className="text-sm leading-7 text-muted-foreground max-w-sm">{t.galleryIntro}</p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {GALLERY_IMAGES.map((src, index) => (
                <figure key={src} className="reveal group relative aspect-[3/4] overflow-hidden bg-secondary shadow-lg shadow-slate-100 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-slate-200">
                  <img src={src} alt={t.galleryLabels[index]} className="h-full w-full object-cover scale-110 group-hover:scale-125 transition-transform duration-700" />
                </figure>
              ))}
            </div>
            <SectionBridge label={t.nextLinks.gallery} href="#contact" onNavigate={scrollTo} />
          </div>
        </section>

        <section id="contact" className="py-24 lg:py-32 bg-secondary">
          <div className="max-w-7xl mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-14 lg:gap-24">
            <div className="reveal">
              <SectionLabel label={t.contactLabel} />
              <h2 className="text-4xl lg:text-5xl font-light leading-tight mb-8" style={{ fontFamily: "'Noto Serif SC', serif", fontWeight: 300 }}>
                {t.contactTitleA}
                <br />
                <span className="text-primary">{t.contactTitleB}</span>
              </h2>
              <p className="text-sm leading-8 text-muted-foreground mb-8">{t.contactText}</p>
              <div className="space-y-5">
                {t.contactItems.map(([label, value]) => (
                  <div key={label} className="flex gap-4 text-sm">
                    <span className="w-24 shrink-0 text-[10px] tracking-[0.22em] text-primary/70 uppercase pt-1">{label}</span>
                    <span className="text-muted-foreground leading-7">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="reveal bg-card border border-border p-8 lg:p-10 shadow-xl shadow-slate-100">
              <h3 className="text-xl mb-6" style={{ fontFamily: "'Noto Serif SC', serif" }}>
                {t.contactMethodsTitle}
              </h3>

              <div className="space-y-4">
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="group flex items-center gap-5 border border-border bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg hover:shadow-slate-200/60"
                >
                  <span className="flex size-11 shrink-0 items-center justify-center bg-primary/10 text-primary">
                    <Mail size={19} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[10px] tracking-[0.22em] text-primary/70 uppercase">{t.emailLabel}</span>
                    <span className="mt-1 block break-all text-sm text-foreground">{CONTACT_EMAIL}</span>
                  </span>
                  <span className="hidden text-[10px] tracking-widest text-muted-foreground transition-colors group-hover:text-primary sm:block">{t.emailAction}</span>
                </a>

                <div className="flex items-center gap-5 border border-border bg-white p-5">
                  <span className="flex size-11 shrink-0 items-center justify-center bg-primary/10 text-primary">
                    <UserRound size={19} />
                  </span>
                  <span>
                    <span className="block text-[10px] tracking-[0.22em] text-primary/70 uppercase">{t.contactPersonLabel}</span>
                    <span className="mt-1 block text-sm text-foreground">{t.contactPerson}</span>
                  </span>
                </div>

                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}`}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center gap-5 border border-border bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg hover:shadow-slate-200/60"
                >
                  <span className="flex size-11 shrink-0 items-center justify-center bg-primary/10 text-primary">
                    <MessageCircle size={19} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[10px] tracking-[0.22em] text-primary/70 uppercase">WhatsApp</span>
                    <span className="mt-1 block text-sm text-foreground">{WHATSAPP_DISPLAY}</span>
                  </span>
                  <span className="hidden text-[10px] tracking-widest text-muted-foreground transition-colors group-hover:text-primary sm:block">{t.whatsappAction}</span>
                </a>
              </div>

              <p className="mt-6 border-l-2 border-primary/50 pl-4 text-xs leading-6 text-muted-foreground">{t.contactNote}</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border py-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col lg:flex-row gap-6 lg:items-center lg:justify-between">
          <div>
            <div className="text-base tracking-widest text-primary" style={{ fontFamily: "'Noto Serif SC', serif" }}>
              {t.brand}
            </div>
            <div className="mt-1 text-[10px] tracking-[0.28em] text-muted-foreground uppercase">{t.brandSub}</div>
          </div>
          <div className="text-xs text-muted-foreground">{t.footer}</div>
        </div>
      </footer>
    </div>
  );
}

function LanguageSwitcher({ language, onChange, compact = true }: { language: Lang; onChange: (language: Lang) => void; compact?: boolean }) {
  const currentLanguage = LANGUAGES.find((item) => item.code === language) ?? LANGUAGES[0];

  if (!compact) {
    return (
      <div className="pt-2">
        <div className="mb-2 text-[10px] tracking-[0.25em] text-primary">LANGUAGE</div>
        <div className="flex flex-wrap gap-3">
          {LANGUAGES.map((item) => (
            <button
              key={item.code}
              onClick={() => onChange(item.code)}
              className={`text-xs tracking-widest transition-colors ${
                language === item.code ? "text-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="group relative py-3">
      <button className="flex items-center gap-1 text-xs tracking-[0.16em] text-muted-foreground transition-colors group-hover:text-foreground">
        {currentLanguage.label}
        <span className="text-[10px] text-primary transition-transform group-hover:rotate-180">▾</span>
      </button>
      <div className="pointer-events-none absolute left-0 top-full z-50 min-w-32 translate-y-2 opacity-0 transition-all duration-200 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100">
        <div className="border border-border bg-white/95 p-2 shadow-xl shadow-slate-200/70 backdrop-blur-md">
          {LANGUAGES.map((item) => (
            <button
              key={item.code}
              onClick={() => onChange(item.code)}
              className={`block w-full px-4 py-3 text-left text-xs tracking-[0.14em] transition-colors hover:bg-secondary hover:text-foreground ${
                language === item.code ? "text-foreground" : "text-muted-foreground"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function NavDropdown({
  label,
  links,
  onNavigate,
}: {
  label: string;
  links: readonly (readonly [string, string])[];
  onNavigate: (href: string) => void;
}) {
  return (
    <div className="group relative py-3">
      <button className="flex items-center gap-1 text-xs tracking-[0.16em] text-muted-foreground transition-colors group-hover:text-foreground">
        {label}
        <span className="text-[10px] text-primary transition-transform group-hover:rotate-180">▾</span>
      </button>
      <div className="pointer-events-none absolute left-0 top-full z-50 min-w-44 translate-y-2 opacity-0 transition-all duration-200 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100">
        <div className="border border-border bg-white/95 p-2 shadow-xl shadow-slate-200/70 backdrop-blur-md">
          {links.map(([itemLabel, href]) => (
            <button
              key={href}
              onClick={() => onNavigate(href)}
              className="block w-full px-4 py-3 text-left text-xs tracking-[0.14em] text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              {itemLabel}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function SectionBridge({ label, href, onNavigate }: { label: string; href: string; onNavigate: (href: string) => void }) {
  return (
    <div className="reveal mt-14 flex items-center gap-5">
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-border" />
      <button
        onClick={() => onNavigate(href)}
        className="group inline-flex items-center gap-2 whitespace-nowrap text-[10px] tracking-[0.28em] text-muted-foreground transition-colors hover:text-foreground"
      >
        {label}
        <ArrowRight size={13} className="text-primary transition-transform group-hover:translate-x-1" />
      </button>
    </div>
  );
}

function SectionLabel({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-4 mb-6">
      <div className="w-8 h-px bg-primary" />
      <span className="text-[10px] tracking-[0.35em] uppercase text-primary">{label}</span>
    </div>
  );
}
