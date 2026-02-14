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
        iconPath: "",
        selectedIconPath: "",
      },
      {
        pagePath: "pages/list/index",
        text: "LIST",
        iconPath: "",
        selectedIconPath: "",
      },
      {
        pagePath: "pages/spaces/index",
        text: "SPACES",
        iconPath: "",
        selectedIconPath: "",
      },
      {
        pagePath: "pages/settings/index",
        text: "SETTINGS",
        iconPath: "",
        selectedIconPath: "",
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
