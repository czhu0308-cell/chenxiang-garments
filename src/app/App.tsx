import { useEffect, useState } from "react";
import { ArrowRight, Check, Menu, X } from "lucide-react";

type Lang = "zh" | "ja" | "en";
type ProductCategory = "all" | "padded" | "outerwear" | "garments" | "details";

const LANGUAGES: { code: Lang; label: string }[] = [
  { code: "zh", label: "中文" },
  { code: "ja", label: "日本語" },
  { code: "en", label: "English" },
];

const FACTORY_IMAGES = {
  hero: "/factory/hero-micro-factory.jpg",
  facts: "/factory/facts-workshop-bg.jpg",
  products: "/factory/products-samples-bg.jpg",
  about: "/factory/a0da0333ab5da76b53655e90f666d07d.jpg",
  line: "/factory/06d3c11dbdd3c1ec81188204af7d4a8d.jpg",
  detail: "/factory/461c08776a8dda99f37e04c741bd1f35.jpg",
  jacket: "/factory/4863f0d9a4fc3b1f25abf8022c198dfd.jpg",
  inspection: "/factory/fb3ac09c58fc1aa784b83a3387137343.jpg",
};

const TRANSLATIONS = {
  zh: {
    htmlLang: "zh-CN",
    pageTitle: "如皋市晨翔服装有限公司 | 服装代加工制造工厂",
    brand: "晨翔服装",
    brandSub: "Chenxiang Garments · Rugao",
    inquiry: "发送询盘",
    nav: [
      ["工厂介绍", "#about"],
      ["制造能力", "#capabilities"],
      ["工厂资料", "#facts"],
      ["产品样品", "#products"],
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
          ["产品样品", "#products"],
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
      facts: "继续看产品样品",
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
    factsIntro: "以下信息根据现有工厂评估表和工厂卡片整理，正式合作前可按客户验厂或询盘要求复核更新。",
    facts: [
      ["创办时间", "2007 年 1 月 11 日", "晨翔工厂评估表记录"],
      ["月产量", "6,000 - 10,000 件", "适用于成衣、夹克、棉衣、羽绒服等品类"],
      ["主要设备", "52 台/套", "含缝纫机、包缝机、锁眼、烫台、充绒机等"],
      ["人员配置", "28 人", "含缝工、裁剪、打版、总检、包装等岗位"],
      ["生产区域", "约 2,000㎡+", "涵盖裁剪、缝纫车间、后道、仓库等区域"],
      ["适应产品", "成衣 / 夹克 / 棉衣 / 羽绒服", "可根据样衣、工艺单和订单要求评估"],
    ],
    productsLabel: "Sample Works",
    productsTitleA: "按品类展示",
    productsTitleB: "可承接样品方向",
    productsIntro: "当前先用现有工厂照片作为样品板块结构占位。后续补充真实样衣、平铺图、细节图后，可以直接替换成更完整的产品展示。",
    productCategories: [
      ["all", "全部"],
      ["padded", "羽绒 / 棉服"],
      ["outerwear", "夹克外套"],
      ["garments", "成衣加工"],
      ["details", "工艺细节"],
    ],
    productSamples: [
      ["padded", "羽绒服与棉服", "可围绕裁片、充绒/充棉、绗线、压线、整烫和成品质检进行订单评估。"],
      ["outerwear", "夹克与外套", "适合夹克、外套、呢子衣等品类，可根据样衣、工艺单和目标面料进行拆解。"],
      ["garments", "衬衫、裙装、裤装", "适应衬衫、裙装、裤装、连衣裙等成衣加工需求，重视尺寸稳定和批次一致性。"],
      ["details", "车缝与整理细节", "展示车缝、锁眼、订扣、整烫、包装等细节能力，适合作为质量沟通材料。"],
    ],
    brandReferenceLabel: "Order Experience",
    brandReferenceTitle: "历史订单涉及品牌参考",
    brandReferenceIntro: "以下品牌名称来自现有工厂评估资料，用于说明工厂曾接触过的订单标准与品类经验。正式上线前建议确认授权边界；当前页面以文字标识展示，不直接使用官方商标图形。",
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
      ["THE NORTH FACE", "https://www.thenorthface.jp/"],
      ["叙旧", ""],
    ],
    aboutLabel: "About Factory",
    aboutTitleA: "不做空泛包装，",
    aboutTitleB: "把工厂真实能力讲清楚",
    aboutParagraphs: [
      "如皋市晨翔服装有限公司位于江苏省如皋市城南街道马塘社区，是一家以服装生产加工为核心的制造型工厂。家族工厂从事服装代加工 20 多年，长期围绕成衣订单开展生产，近几年进一步拓展羽绒服、棉服等冬装品类。",
      "晨翔的优势不是流量，也不是概念，而是 20 多年代加工积累下来的现场经验：读懂工艺单、控制尺寸偏差、处理车缝细节、保持批次稳定，并按客户要求完成整烫、包装与出货配合。",
      "未来，晨翔可以作为制造端承接来自跨境电商、外贸贸易公司、买手店和成长型服装品牌的开发与生产需求。",
    ],
    capabilitiesLabel: "Manufacturing Scope",
    capabilitiesTitleA: "可承接的",
    capabilitiesTitleB: "核心制造能力",
    capabilitiesIntro: "适合将来做官网、B2B 询盘页、TikTok Shop 供应链背书，也能放入辰博贸易网站作为合作工厂展示。",
    capabilities: [
      ["01", "成衣加工制造", "Garment Manufacturing", "承接衬衫、裙装、裤装、夹克、外套等成衣品类，从样衣、版型调整到批量生产保持稳定交付。"],
      ["02", "羽绒服与棉服", "Down & Padded Jackets", "近年拓展冬装业务，覆盖裁片、充绒/充棉、绗线、压线、整烫与成品质检等关键工序。"],
      ["03", "20 多年代加工经验", "Japan Order Standard", "家族工厂深耕服装代加工 20 多年，长期服务日单体系，熟悉尺寸、线头、包装和批次稳定等要求。"],
      ["04", "小单快反配合", "Flexible Production", "适合品牌测款、跨境电商试单、买手店补单等需求，可围绕实际款式沟通样衣和起订量。"],
      ["05", "来样来图加工", "OEM Support", "根据客户样衣、工艺单、尺寸表或图片需求进行生产评估，协助拆解工艺和报价。"],
      ["06", "外贸协作基础", "Export Ready", "工厂位于江苏如皋服装产业带，可配合贸易主体完成外贸订单沟通、资料整理与出运衔接。"],
    ],
    qualityLabel: "Quality Control",
    qualityTitleA: "质量控制，",
    qualityTitleB: "从样衣开始",
    qualityText:
      "对服装工厂来说，品质不是最后验货才发生的事情。真正能影响成品稳定性的，是前期工艺理解、版型尺寸、面辅料确认、生产中查和返修机制。晨翔更适合把“日本订单标准”转化成可展示、可沟通的质量流程。",
    qualitySteps: ["需求确认与样衣评估", "纸样/尺寸表核对", "面辅料与工艺确认", "裁剪与上线生产", "中查巡检与问题返修", "尾查、整烫与包装", "装箱资料与出货配合"],
    qualityPillars: [
      ["人员配置", "组检 2 人 / 总检 2 人", "工厂评估表显示配置组检、总检、小烫、大烫、包装等岗位，形成从生产到后道的检查链路。"],
      ["设备覆盖", "52 台/套主要设备", "含缝纫机、双针车、包缝机、锁眼、订扣、烫台、模板机、花样机、充绒机等。"],
      ["现场评估", "整体环境：好", "评估表中整体环境与管理人员评价均记录为“好”，适合作为客户初步了解工厂管理的公开资料。"],
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
    galleryIntro: "官网第一版先用真实现场照片建立信任，后续可以补拍横版门头、样衣陈列、质检台、包装区和老板/团队合影。",
    galleryLabels: ["生产车间", "缝制工位", "工艺细节", "车间设备", "成衣检查", "样衣与成品", "员工操作", "现场管理"],
    contactLabel: "Business Inquiry",
    contactTitleA: "有样衣、有工艺单，",
    contactTitleB: "就可以开始评估",
    contactText: "你可以把这块后续接到 WhatsApp、邮箱或辰博贸易的询盘系统。当前页面先作为工厂展示页，重点让客户理解晨翔能做什么、为什么值得进一步沟通。",
    contactItems: [
      ["工厂名称", "如皋市晨翔服装有限公司"],
      ["所在地区", "江苏省如皋市城南街道马塘社区"],
      ["主营品类", "成衣加工、羽绒服、棉服及相关服装制造"],
      ["合作方式", "OEM 加工、样衣开发、小批量试单、外贸订单协作"],
    ],
    inquiryTitle: "询盘信息建议",
    inquiryTips: ["目标品类：成衣、羽绒服、棉服或其他服装类别", "资料准备：样衣照片、尺寸表、工艺单、面辅料要求", "订单规模：打样、小批量试单或批量生产数量", "交付要求：目标市场、包装方式、预计出货时间", "合作主体：工厂生产端可与贸易公司共同完成外贸协作"],
    reservedInquiry: "预留询盘入口",
    alert: "后续可以接入邮箱、WhatsApp 或辰博贸易的询盘系统。",
    footerDraft: "© 2026 如皋市晨翔服装有限公司 · 工厂展示网站草案",
  },
  ja: {
    htmlLang: "ja",
    pageTitle: "如皋市晨翔服装有限公司 | アパレルOEM工場",
    brand: "晨翔服装",
    brandSub: "Chenxiang Garments · Rugao",
    inquiry: "お問い合わせ",
    nav: [
      ["工場紹介", "#about"],
      ["生産能力", "#capabilities"],
      ["工場情報", "#facts"],
      ["サンプル", "#products"],
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
          ["サンプル", "#products"],
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
      facts: "サンプルを見る",
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
    productsLabel: "Sample Works",
    productsTitleA: "カテゴリー別に見る",
    productsTitleB: "対応可能なサンプル方向",
    productsIntro: "現段階では既存の工場写真を使ってサンプル展示の構成を作っています。今後、実際のサンプル写真、平置き写真、ディテール写真を追加すれば、より完成度の高い製品紹介にできます。",
    productCategories: [
      ["all", "すべて"],
      ["padded", "ダウン / 中綿"],
      ["outerwear", "ジャケット"],
      ["garments", "既製服加工"],
      ["details", "工程ディテール"],
    ],
    productSamples: [
      ["padded", "ダウン・中綿ウェア", "裁断、充填、キルティング、縫製、仕上げ、検品まで、注文内容に応じて評価できます。"],
      ["outerwear", "ジャケット・アウター", "ジャケット、コート、中綿アウターなど、サンプルや仕様書に基づき工程を確認できます。"],
      ["garments", "シャツ・スカート・パンツ", "シャツ、スカート、パンツ、ワンピースなどの既製服加工に対応し、寸法安定性とロット品質を重視します。"],
      ["details", "縫製・仕上げディテール", "縫製、ボタンホール、ボタン付け、アイロン、包装などの細部を品質確認材料として提示できます。"],
    ],
    brandReferenceLabel: "Order Experience",
    brandReferenceTitle: "過去注文に関わるブランド参考",
    brandReferenceIntro: "以下のブランド名は既存の工場評価資料に基づき、工場が経験してきた注文基準と品類を伝えるための参考表示です。公開前には使用範囲を確認し、現在は公式ロゴではなく文字表示にしています。",
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
      ["THE NORTH FACE", "https://www.thenorthface.jp/"],
      ["叙旧", ""],
    ],
    aboutLabel: "About Factory",
    aboutTitleA: "誇張ではなく、",
    aboutTitleB: "工場の実力を正確に伝える",
    aboutParagraphs: [
      "如皋市晨翔服装有限公司は、江蘇省如皋市城南街道馬塘社区にある服装加工を中心とした製造工場です。家族工場として20年以上アパレルOEMに携わり、既製服の受注生産を軸に、近年はダウンウェアや中綿ウェアにも対応しています。",
      "晨翔の強みは宣伝文句ではなく、現場で培った経験です。仕様書の理解、寸法誤差の管理、縫製ディテール、ロットの安定性、仕上げ、包装、出荷対応まで丁寧に進めます。",
      "今後は、越境ECブランド、貿易会社、セレクトショップ、成長中のアパレルブランドに向けた製造パートナーとして対応できます。",
    ],
    capabilitiesLabel: "Manufacturing Scope",
    capabilitiesTitleA: "対応可能な",
    capabilitiesTitleB: "主要生産能力",
    capabilitiesIntro: "公式サイト、B2B問い合わせ、TikTok Shopのサプライチェーン紹介、また辰博貿易サイトの協力工場紹介にも活用できます。",
    capabilities: [
      ["01", "既製服加工", "Garment Manufacturing", "シャツ、スカート、パンツ、ジャケット、アウターなど、サンプル確認から量産まで安定して対応します。"],
      ["02", "ダウン・中綿ウェア", "Down & Padded Jackets", "近年は冬物事業も拡大し、裁断、充填、キルティング、縫製、仕上げ、検品まで対応します。"],
      ["03", "20年以上のOEM経験", "Japan Order Standard", "20年以上の服装OEM経験を持ち、日本向け注文で求められる寸法、糸処理、包装、ロット安定性を理解しています。"],
      ["04", "小ロット・迅速対応", "Flexible Production", "ブランドのテスト販売、越境ECの試作、セレクトショップの追加生産など、実際の仕様に合わせて相談できます。"],
      ["05", "サンプル・画像から加工", "OEM Support", "サンプル、仕様書、サイズ表、写真をもとに生産可否、工程、見積もりを評価します。"],
      ["06", "輸出案件との連携", "Export Ready", "江蘇如皋の服装産業エリアに位置し、貿易主体と連携して輸出案件の資料整理や出荷対応を行えます。"],
    ],
    qualityLabel: "Quality Control",
    qualityTitleA: "品質管理は、",
    qualityTitleB: "サンプル段階から",
    qualityText:
      "服装工場にとって、品質は最終検品だけで決まるものではありません。仕様理解、型紙と寸法、資材確認、工程内検査、修正対応が製品の安定性を左右します。晨翔は日本向け注文の基準を、見える品質管理プロセスとして伝えることができます。",
    qualitySteps: ["要件確認とサンプル評価", "型紙・サイズ表確認", "生地・副資材・仕様確認", "裁断とライン投入", "工程内検査と修正", "最終検品・仕上げ・包装", "箱詰め資料と出荷連携"],
    qualityPillars: [
      ["人員体制", "工程検査 2名 / 最終検査 2名", "工場評価表には、工程検査、最終検査、アイロン、包装などの職種が記録され、生産から後工程までの確認体制があります。"],
      ["設備構成", "主要設備 52 台/セット", "ミシン、二本針、オーバーロック、ボタンホール、ボタン付け、アイロン台、テンプレート機、刺繍系設備、充填機などを含みます。"],
      ["現場評価", "全体環境：良好", "評価表では全体環境と管理者評価が「良好」と記録されており、工場管理を説明する公開資料として使えます。"],
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
    galleryIntro: "第一版では実際の現場写真で信頼感を伝えます。今後は入口、サンプルラック、検品台、包装エリア、チーム写真を追加するとさらに良くなります。",
    galleryLabels: ["生産現場", "縫製作業", "工程ディテール", "工場設備", "製品検査", "サンプルと完成品", "作業風景", "現場管理"],
    contactLabel: "Business Inquiry",
    contactTitleA: "サンプルや仕様書があれば、",
    contactTitleB: "評価を始められます",
    contactText: "今後、このエリアはメール、WhatsApp、または辰博貿易の問い合わせシステムに接続できます。現在は工場紹介ページとして、晨翔が何を提供できるかを明確に伝えることを重視しています。",
    contactItems: [
      ["工場名", "如皋市晨翔服装有限公司"],
      ["所在地", "江蘇省如皋市城南街道馬塘社区"],
      ["主な品目", "既製服加工、ダウンウェア、中綿ウェア、関連服装製造"],
      ["協力方式", "OEM加工、サンプル開発、小ロット試作、輸出案件連携"],
    ],
    inquiryTitle: "問い合わせ情報の目安",
    inquiryTips: ["対象品目：既製服、ダウンウェア、中綿ウェア、その他服装", "必要資料：サンプル写真、サイズ表、仕様書、生地・副資材の要求", "注文規模：サンプル、小ロット、量産数量", "納期条件：対象市場、包装方法、出荷予定時期", "協力形態：工場生産側と貿易会社が連携して対応可能"],
    reservedInquiry: "問い合わせ入口",
    alert: "今後、メール、WhatsApp、または辰博貿易の問い合わせシステムに接続できます。",
    footerDraft: "© 2026 如皋市晨翔服装有限公司 · 工場紹介サイト草案",
  },
  en: {
    htmlLang: "en",
    pageTitle: "Rugao Chenxiang Garments Co., Ltd. | Apparel OEM Manufacturer",
    brand: "Chenxiang Garments",
    brandSub: "Chenxiang Garments · Rugao",
    inquiry: "Send Inquiry",
    nav: [
      ["About", "#about"],
      ["Capabilities", "#capabilities"],
      ["Facts", "#facts"],
      ["Samples", "#products"],
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
          ["Sample Works", "#products"],
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
      facts: "Continue to Sample Works",
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
    productsLabel: "Sample Works",
    productsTitleA: "Product directions",
    productsTitleB: "by category",
    productsIntro: "This first version uses existing factory photos as placeholders for the sample-work structure. Once real sample photos, flat lays and detail shots are available, this section can become a full product showcase.",
    productCategories: [
      ["all", "All"],
      ["padded", "Down / Padded"],
      ["outerwear", "Outerwear"],
      ["garments", "Garments"],
      ["details", "Details"],
    ],
    productSamples: [
      ["padded", "Down & padded jackets", "Order evaluation can cover cutting, filling, quilting, stitching, finishing and final inspection."],
      ["outerwear", "Jackets & outerwear", "Suitable for jackets, coats and padded outerwear, with process review based on samples and tech packs."],
      ["garments", "Shirts, skirts & trousers", "Supports garment processing for shirts, skirts, trousers and dresses, with focus on measurement stability and batch consistency."],
      ["details", "Sewing & finishing details", "Sewing, buttonholes, button attaching, pressing and packing details can be used as quality communication material."],
    ],
    brandReferenceLabel: "Order Experience",
    brandReferenceTitle: "Brand references from past order records",
    brandReferenceIntro: "The following names are organized from existing factory assessment materials to communicate order-standard and category experience. Before public launch, authorization boundaries should be confirmed; this draft uses text marks instead of official logo artwork.",
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
      ["THE NORTH FACE", "https://www.thenorthface.jp/"],
      ["叙旧", ""],
    ],
    aboutLabel: "About Factory",
    aboutTitleA: "No empty claims,",
    aboutTitleB: "just real manufacturing capability",
    aboutParagraphs: [
      "Rugao Chenxiang Garments Co., Ltd. is located in Matang Community, Chengnan Subdistrict, Rugao, Jiangsu. It is a manufacturing-oriented factory focused on apparel production and processing. The family factory has over 20 years of apparel OEM experience, with recent expansion into down jackets and padded outerwear.",
      "Chenxiang's strength is not traffic or marketing language, but practical experience accumulated on the production floor: understanding tech packs, controlling measurement tolerances, handling sewing details, maintaining batch consistency, finishing, packaging and shipment coordination.",
      "Going forward, Chenxiang can serve as a manufacturing partner for cross-border e-commerce brands, trading companies, boutiques and growing apparel labels.",
    ],
    capabilitiesLabel: "Manufacturing Scope",
    capabilitiesTitleA: "Core",
    capabilitiesTitleB: "manufacturing capabilities",
    capabilitiesIntro: "Suitable for a factory website, B2B inquiry page, TikTok Shop supply-chain proof, and future supplier presentation on Chenbo Trading's website.",
    capabilities: [
      ["01", "Garment Manufacturing", "Garment Manufacturing", "Shirts, skirts, trousers, jackets, coats and related apparel categories, from sample review and pattern adjustment to stable bulk production."],
      ["02", "Down & Padded Jackets", "Down & Padded Jackets", "Expanded winterwear capability covering cutting, filling, quilting, sewing, finishing and final inspection."],
      ["03", "20+ Years OEM Experience", "Japan Order Standard", "Over 20 years of apparel OEM experience, including Japan-oriented orders with attention to measurements, thread trimming, packaging and batch consistency."],
      ["04", "Flexible Small Orders", "Flexible Production", "Suitable for brand testing, cross-border e-commerce trial orders and boutique replenishment, with sample and MOQ discussion based on actual styles."],
      ["05", "Sample & Reference OEM", "OEM Support", "Production evaluation based on samples, tech packs, size charts or reference images, including process breakdown and quotation support."],
      ["06", "Export Cooperation Base", "Export Ready", "Located in the Rugao apparel manufacturing area, the factory can coordinate with trading entities on export communication, documents and shipment support."],
    ],
    qualityLabel: "Quality Control",
    qualityTitleA: "Quality control",
    qualityTitleB: "starts from sampling",
    qualityText:
      "For an apparel factory, quality is not created only at final inspection. Stable products depend on early process understanding, pattern and measurement control, material confirmation, in-line inspection and repair mechanisms. Chenxiang can translate Japan-oriented order standards into a visible and communicable quality process.",
    qualitySteps: ["Requirement review and sample evaluation", "Pattern and size chart check", "Fabric, trims and process confirmation", "Cutting and line production", "In-line inspection and repair", "Final inspection, pressing and packing", "Carton documents and shipment coordination"],
    qualityPillars: [
      ["Quality team", "2 in-line inspectors / 2 final inspectors", "The factory assessment records roles including in-line inspection, final inspection, pressing, packing and management, forming a basic production-to-finishing quality chain."],
      ["Equipment coverage", "52 key units/sets", "Includes sewing machines, double-needle machines, overlock machines, buttonhole machines, button attaching, ironing tables, template machines, pattern machines and filling machines."],
      ["Site assessment", "Overall environment: good", "The assessment sheet records both overall environment and management evaluation as good, giving customers a first-level reference for factory management."],
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
    galleryIntro: "The first version uses real on-site photos to build trust. Later, horizontal shots of the entrance, sample racks, QC table, packing area and team can further improve the site.",
    galleryLabels: ["Production floor", "Sewing station", "Process detail", "Workshop equipment", "Garment inspection", "Samples and finished goods", "Operator at work", "Shop-floor management"],
    contactLabel: "Business Inquiry",
    contactTitleA: "With a sample or tech pack,",
    contactTitleB: "we can start evaluation",
    contactText: "This area can later connect to email, WhatsApp or Chenbo Trading's inquiry system. For now, this factory page helps customers understand what Chenxiang can produce and why a deeper conversation is worthwhile.",
    contactItems: [
      ["Factory", "Rugao Chenxiang Garments Co., Ltd."],
      ["Location", "Matang Community, Chengnan Subdistrict, Rugao, Jiangsu"],
      ["Main categories", "Garment processing, down jackets, padded jackets and related apparel manufacturing"],
      ["Cooperation", "OEM production, sample development, small trial orders and export-order coordination"],
    ],
    inquiryTitle: "Suggested inquiry details",
    inquiryTips: ["Target category: garments, down jackets, padded jackets or other apparel", "Materials: sample photos, size chart, tech pack, fabric and trim requirements", "Order scale: sampling, small trial order or bulk quantity", "Delivery needs: target market, packing method and expected shipment date", "Cooperation model: factory production can coordinate with trading companies for export orders"],
    reservedInquiry: "Inquiry Placeholder",
    alert: "This can later connect to email, WhatsApp or Chenbo Trading's inquiry system.",
    footerDraft: "© 2026 Rugao Chenxiang Garments Co., Ltd. · Factory website draft",
  },
} as const;

const GALLERY_IMAGES = [
  "/factory/cc8fca1c35454b79677a3f15c9c48e91.jpg",
  "/factory/22075cc6a0d47362d8d6f792f0ba53df.jpg",
  "/factory/36f12e292673c08733b8e1d1d2c8131b.jpg",
  "/factory/c7a165e82b9b8a01660500813360999b.jpg",
  "/factory/d65fdf6f7ba6c25af3d319461d20a086.jpg",
  "/factory/eaa9937535bceb6ae1088be4722adb41.jpg",
  "/factory/e38232e852cf70d1b4d3792fcc9184d0.jpg",
  "/factory/4aa57aa357fb7186afc2850c8779cabe.jpg",
];

const PRODUCT_IMAGES = [
  "/factory/4863f0d9a4fc3b1f25abf8022c198dfd.jpg",
  "/factory/eaa9937535bceb6ae1088be4722adb41.jpg",
  "/factory/06d3c11dbdd3c1ec81188204af7d4a8d.jpg",
  "/factory/fb3ac09c58fc1aa784b83a3387137343.jpg",
];

export default function App() {
  const [language, setLanguage] = useState<Lang>("zh");
  const [activeProductCategory, setActiveProductCategory] = useState<ProductCategory>("all");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const t = TRANSLATIONS[language];
  const filteredProductSamples = t.productSamples
    .map((sample, index) => ({ sample, image: PRODUCT_IMAGES[index] }))
    .filter(({ sample }) => activeProductCategory === "all" || sample[0] === activeProductCategory);

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
              {t.inquiry}
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
                <SectionLabel label={t.productsLabel} />
                <h2 className="text-4xl lg:text-5xl font-light leading-tight" style={{ fontFamily: "'Noto Serif SC', serif", fontWeight: 300 }}>
                  {t.productsTitleA}
                  <br />
                  <span className="text-primary">{t.productsTitleB}</span>
                </h2>
              </div>
              <p className="reveal text-sm leading-8 text-muted-foreground">{t.productsIntro}</p>
            </div>

            <div className="reveal mb-10 flex flex-wrap gap-3">
              {t.productCategories.map(([category, label]) => (
                <button
                  key={category}
                  onClick={() => setActiveProductCategory(category as ProductCategory)}
                  className={`px-4 py-2 text-xs tracking-widest transition-colors ${
                    activeProductCategory === category
                      ? "bg-primary text-primary-foreground"
                      : "border border-border bg-white/80 text-muted-foreground hover:border-primary/50 hover:text-foreground"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {filteredProductSamples.map(({ sample, image }) => {
                const [category, title, desc] = sample;
                return (
                  <article key={title} className="reveal group overflow-hidden bg-white/88 shadow-lg shadow-slate-200/60 backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 hover:bg-white hover:shadow-2xl hover:shadow-slate-300/70">
                    <div className="aspect-[4/3] overflow-hidden bg-muted">
                      <img src={image} alt={title} className="h-full w-full object-cover object-center scale-105 transition-transform duration-700 group-hover:scale-110" />
                    </div>
                    <div className="p-6">
                      <div className="text-[10px] tracking-[0.28em] text-primary/70 uppercase">{category}</div>
                      <h3 className="mt-3 text-xl text-foreground" style={{ fontFamily: "'Noto Serif SC', serif" }}>
                        {title}
                      </h3>
                      <p className="mt-4 text-sm leading-7 text-muted-foreground">{desc}</p>
                    </div>
                  </article>
                );
              })}
            </div>

            <div className="reveal mt-12 border border-white/70 bg-white/78 p-6 shadow-xl shadow-slate-200/50 backdrop-blur-md lg:p-8">
              <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
                <div>
                  <p className="text-[10px] tracking-[0.28em] text-primary/70 uppercase">{t.brandReferenceLabel}</p>
                  <h3 className="mt-3 text-2xl text-foreground" style={{ fontFamily: "'Noto Serif SC', serif" }}>
                    {t.brandReferenceTitle}
                  </h3>
                  <p className="mt-4 text-xs leading-7 text-muted-foreground">{t.brandReferenceIntro}</p>
                </div>
                <div className="grid grid-cols-2 gap-px bg-border/70 sm:grid-cols-3 xl:grid-cols-4">
                  {t.brandReferences.map(([brand, url]) => {
                    const content = <span className="text-sm font-semibold tracking-[0.18em] text-slate-700 transition-colors group-hover:text-primary">{brand}</span>;

                    return url ? (
                      <a
                        key={brand}
                        href={url}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`${brand} official website`}
                        className="group flex min-h-20 items-center justify-center bg-white/86 px-4 py-5 text-center transition-all duration-500 hover:-translate-y-1 hover:bg-white hover:shadow-lg hover:shadow-slate-200"
                      >
                        {content}
                      </a>
                    ) : (
                      <div key={brand} className="group flex min-h-20 items-center justify-center bg-white/70 px-4 py-5 text-center">
                        {content}
                      </div>
                    );
                  })}
                </div>
              </div>
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
                  <figcaption className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-foreground/75 to-transparent text-xs tracking-widest text-white">
                    {t.galleryLabels[index]}
                  </figcaption>
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
                {t.inquiryTitle}
              </h3>
              <div className="space-y-4 text-sm leading-7 text-muted-foreground">
                {t.inquiryTips.map((item) => (
                  <div key={item} className="flex gap-3">
                    <Check size={15} className="text-primary shrink-0 mt-1" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <button onClick={() => alert(t.alert)} className="mt-8 w-full py-4 bg-primary text-primary-foreground text-xs tracking-widest hover:bg-primary/90 transition-colors">
                {t.reservedInquiry}
              </button>
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
          <div className="text-xs text-muted-foreground">{t.footerDraft}</div>
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
