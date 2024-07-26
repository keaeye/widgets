function actions(router, config, setConfig, t) {
  return [
    {
      id: "home",
      // name: t('home'),
      name: 'home',
      shortcut: ["h"],
      keywords: "home index",
      perform: () => router("/"),
      type: "link",
      section: "navigation",
    },
    // {
    //   id: "timeline",
    //   name: t('timeline'),
    //   shortcut: ["t"],
    //   keywords: "nav timeline",
    //   perform: () => router("timeline"),
    //   type: "link",
    //   section: "navigation",
    // },
    // {
    //   id: "hashtags",
    //   name: t('hashtags'),
    //   shortcut: ["h"],
    //   keywords: "nav tags",
    //   perform: () => router("hashtags"),
    //   type: "link",
    //   section: "navigation",
    // },
    {
      id: "writing",
      // name: t('writing'),
      name: 'writing',
      shortcut: ["h"],
      keywords: "writing",
      perform: () => router("writing"),
      type: "link",
      section: "navigation",
    },
    {
      id: "friends",
      name: t('friends.title'),
      shortcut: ["f"],
      keywords: "nav friends",
      perform: () => router("friends"),
      type: "link",
      section: "navigation",
    },
    {
      id: "about",
      name: t('about.title'),
      shortcut: ["a"],
      keywords: "nav about",
      perform: () => router("about"),
      type: "link",
      section: "navigation",
    },
    {
      id: "contact",
      // name: t('contact'),
      name: 'contact',
      shortcut: ["c"],
      keywords: "email",
      perform: () => window.open("mailto:chrisding03@gmail.com"),
      type: "contact",
      section: "other",
    },
    {
      id: "github",
      name: "Github",
      shortcut: ["g"],
      keywords: "git github",
      perform: () =>
        window.open("https://github.com/rookieroo", "_blank"),
      type: "github",
      section: "other",
    },
    {
      id: "twitter",
      name: "Twitter",
      shortcut: ["t"],
      keywords: "twitter tweet contact",
      perform: () => window.open("https://twitter.com/chrisding03", "_blank"),
      type: "twitter",
      section: "other",
    },
    {
      id: "mode",
      // name: t('toggle_mode'),
      name: 'Toggle mode',
      shortcut: ["m"],
      keywords: "Toggle dark mode ",
      section: "Modes",
    },
    {
      id: "light",
      parent: "mode",
      // name: t('customize.Light'),
      name: 'Light',
      shortcut: [],
      section: "Modes",
      keywords: "",
      perform: () => setConfig({...config, mode: 'light'}),
    },
    {
      id: "dark",
      parent: "mode",
      // name: t('customize.Dark'),
      name: 'Dark',
      shortcut: [],
      section: "Modes",
      keywords: "",
      perform: () => setConfig({...config, mode: 'dark'}),
    },
    {
      id: "system",
      parent: "mode",
      // name: t('customize.System'),
      name: 'System',
      shortcut: [],
      section: "Modes",
      keywords: "",
      perform: () => setConfig({...config, mode: 'system'}),
    }
  ];
}

export default actions;
