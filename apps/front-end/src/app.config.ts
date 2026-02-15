export default defineAppConfig({
  pages: [
    "pages/home/index",
    "pages/list/index",
    "pages/spaces/index",
    "pages/settings/index",
  ],
  tabBar: {
    // custom: true,
    color: "#94A388",
    selectedColor: "#137FEC",
    backgroundColor: "#FFF",
    list: [
      {
        pagePath: "pages/home/index",
        text: "HOME",
        iconPath: "assets/images/tabs/home-un-active.png",
        selectedIconPath: "assets/images/tabs/home-active.png",
      },
      {
        pagePath: "pages/list/index",
        text: "LIST",
        iconPath: "assets/images/tabs/list-un-active.png",
        selectedIconPath: "assets/images/tabs/list-active.png",
      },
      {
        pagePath: "pages/spaces/index",
        text: "SPACES",
        iconPath: "assets/images/tabs/space-un-active.png",
        selectedIconPath: "assets/images/tabs/space-active.png",
      },
      {
        pagePath: "pages/settings/index",
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
