export type Language = "en" | "zh"

export interface Translations {
  common: {
    welcome: string
    statistics: string
    explore: string
    featured: string
    viewDetails: string
    backToHome: string
  }
  home: {
    welcomeTitle: string
    aboutSiteTitle: string
    aboutSiteDescription: string
    latestUpdatesTitle: string
    workExperience: string
    workExperienceDesc: string
    competitions: string
    competitionsDesc: string
    researchPapers: string
    researchPapersDesc: string
    openSource: string
    openSourceDesc: string
    featuredContentTitle: string
  }
  stats: {
    projects: string
    papers: string
    competitions: string
    presentations: string
  }
  experience: {
    title: string
    description: string
    workTab: string
    presentationsTab: string
    location: string
    date: string
    technologies: string
    viewSlides: string
  }
  competitions: {
    title: string
    description: string
    type: string
    rank: string
    skills: string
    viewWriteup: string
  }
  papers: {
    title: string
    description: string
    authors: string
    abstract: string
    keywords: string
    viewPdf: string
    viewCitation: string
  }
  projects: {
    title: string
    description: string
    technologies: string
    repo: string
    demo: string
  }
  profile: {
    readMore: string
    showLess: string
    skills: string
    more: string
  }
}

export const translations: Record<Language, Translations> = {
  en: {
    common: {
      welcome: "Welcome",
      statistics: "Statistics",
      explore: "Explore",
      featured: "Featured",
      viewDetails: "View details",
      backToHome: "Back to home",
    },
    home: {
      welcomeTitle: "Welcome to my digital playground",
      aboutSiteTitle: "About This Site",
      aboutSiteDescription:
        "This is my personal corner of the internet where I document my journey in IT and information security. Browse through my work experience, competition achievements, research papers, and open-source contributions.",
      latestUpdatesTitle: "Latest Updates",
      workExperience: "Work Experience",
      workExperienceDesc: "My professional journey and career milestones",
      competitions: "Competitions",
      competitionsDesc: "CTFs, hackathons, and security challenges",
      researchPapers: "Research Papers",
      researchPapersDesc: "Published works and academic contributions",
      openSource: "Open Source",
      openSourceDesc: "Projects and contributions to the community",
      featuredContentTitle: "Featured Content",
    },
    stats: {
      projects: "Projects",
      papers: "Papers",
      competitions: "Competitions",
      presentations: "Presentations",
    },
    experience: {
      title: "Experience",
      description: "My professional journey and speaking engagements",
      workTab: "Work Experience",
      presentationsTab: "Presentations",
      location: "Location",
      date: "Date",
      technologies: "Technologies",
      viewSlides: "View Slides",
    },
    competitions: {
      title: "Competitions",
      description: "CTFs, hackathons, and security challenges I've participated in",
      type: "Type",
      rank: "Rank",
      skills: "Skills",
      viewWriteup: "View Writeup",
    },
    papers: {
      title: "Research Papers",
      description: "My published works and academic contributions",
      authors: "Authors",
      abstract: "Abstract",
      keywords: "Keywords",
      viewPdf: "PDF",
      viewCitation: "Citation",
    },
    projects: {
      title: "Open Source Projects",
      description: "My contributions to the open source community",
      technologies: "Technologies",
      repo: "Repo",
      demo: "Demo",
    },
    profile: {
      readMore: "Read more",
      showLess: "Show less",
      skills: "Skills",
      more: "more",
    },
  },
  zh: {
    common: {
      welcome: "欢迎",
      statistics: "统计数据",
      explore: "探索",
      featured: "精选",
      viewDetails: "查看详情",
      backToHome: "返回首页",
    },
    home: {
      welcomeTitle: "欢迎来到我的数字乐园",
      aboutSiteTitle: "关于本站",
      aboutSiteDescription:
        "这是我在互联网上的个人角落，记录了我在IT和信息安全领域的旅程。浏览我的工作经历、竞赛成就、研究论文和开源贡献。",
      latestUpdatesTitle: "最新动态",
      workExperience: "工作经历",
      workExperienceDesc: "我的专业旅程和职业里程碑",
      competitions: "竞赛经历",
      competitionsDesc: "CTF、黑客马拉松和安全挑战",
      researchPapers: "研究论文",
      researchPapersDesc: "已发表的作品和学术贡献",
      openSource: "开源项目",
      openSourceDesc: "对社区的项目和贡献",
      featuredContentTitle: "精选内容",
    },
    stats: {
      projects: "项目",
      papers: "论文",
      competitions: "竞赛",
      presentations: "演讲",
    },
    experience: {
      title: "经历",
      description: "我的专业旅程和演讲经历",
      workTab: "工作经历",
      presentationsTab: "演讲经历",
      location: "地点",
      date: "日期",
      technologies: "技术栈",
      viewSlides: "查看幻灯片",
    },
    competitions: {
      title: "竞赛经历",
      description: "我参与过的CTF、黑客马拉松和安全挑战",
      type: "类型",
      rank: "排名",
      skills: "技能",
      viewWriteup: "查看解题报告",
    },
    papers: {
      title: "研究论文",
      description: "我发表的作品和学术贡献",
      authors: "作者",
      abstract: "摘要",
      keywords: "关键词",
      viewPdf: "PDF",
      viewCitation: "引用",
    },
    projects: {
      title: "开源项目",
      description: "我对开源社区的贡献",
      technologies: "技术栈",
      repo: "代码库",
      demo: "演示",
    },
    profile: {
      readMore: "阅读更多",
      showLess: "收起",
      skills: "技能",
      more: "更多",
    },
  },
}

export function getStatLabel(key: string, lang: Language): string {
  const statLabels: Record<string, keyof Translations["stats"]> = {
    projects: "projects",
    papers: "papers",
    competitions: "competitions",
    presentations: "presentations",
  }

  const statKey = statLabels[key]
  return statKey ? translations[lang].stats[statKey] : key
}

