"use strict";
const taro = require("../../taro.js");
require("../../babelHelpers.js");
const Index = () => {
  taro.taroExports.useLoad(() => {
    console.log("Page loaded.");
  });
  return /* @__PURE__ */ taro.jsxs(taro.View, { className: "index", children: [
    /* @__PURE__ */ taro.jsx(taro.Text, { children: "Hello world!" }),
    /* @__PURE__ */ taro.jsx(taro.Button, { children: "按钮文案" }),
    /* @__PURE__ */ taro.jsx(taro.Button, { type: "primary", children: "按钮文案" }),
    /* @__PURE__ */ taro.jsx(taro.Button, { type: "warn", children: "按钮文案" })
  ] });
};
var config = {
  "navigationBarTitleText": "首页",
  "usingComponents": {
    "comp": "../../comp"
  }
};
Page(taro.createPageConfig(Index, "pages/index/index", { root: { cn: [] } }, config || {}));
//# sourceMappingURL=index.js.map
