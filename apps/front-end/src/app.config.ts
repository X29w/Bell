export default defineAppConfig({
  pages: [
    "pages/tabs/home/index",
    "pages/tabs/list/index",
    "pages/tabs/settings/index",
    "pages/inner/spaces/index",
    "pages/inner/scanner/index",
  ],
  tabBar: {
    // custom: true,
    color: "#94A388",
    selectedColor: "#137FEC",
    backgroundColor: "#FFF",
    list: [
      {
        pagePath: "pages/tabs/home/index",
        text: "HOME",
        iconPath: "assets/images/tabs/home-un-active.png",
        selectedIconPath: "assets/images/tabs/home-active.png",
      },
      {
        pagePath: "pages/tabs/list/index",
        text: "LIST",
        iconPath: "assets/images/tabs/list-un-active.png",
        selectedIconPath: "assets/images/tabs/list-active.png",
      },
      {
        pagePath: "pages/tabs/settings/index",
        text: "SETTINGS",
        iconPath: "assets/images/tabs/setting-un-active.png",
        selectedIconPath: "assets/images/tabs/setting-active.png",
      },
    ],
  },
  window: {
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#fff",
    navigationBarTitleText: "WeChat",
    navigationBarTextStyle: "black",
  },
  lazyCodeLoading: "requiredComponents",
});
