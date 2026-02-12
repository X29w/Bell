import { CoverImage, CoverView } from "@tarojs/components";
import type { TabBarItem } from "@tarojs/taro";
import Taro from "@tarojs/taro";
import { useState, type FC } from "react";
import RenderList from "../render-list";

interface CustomTabBarProps {
  list: TabBarItem[];
}

const CustomTabBar: FC<CustomTabBarProps> = ({ list = [] }) => {
  const [selectedPath, setSelectedPath] = useState<string>("");

  const switchTab = (targetPath: string) => {
    setSelectedPath(targetPath);
    Taro.switchTab({
      url: targetPath,
    });
  };

  return (
    <CoverView className="tab-bar">
      <CoverView className="tab-bar-border"></CoverView>
      <RenderList
        items={list}
        renderItems={(item) => (
          <CoverView
            className="tab-bar-item"
            key={item.pagePath}
            onClick={() => switchTab(item.pagePath)}
          >
            <CoverImage
              src={
                (selectedPath === item.pagePath
                  ? item.selectedIconPath
                  : item.iconPath)!
              }
              className="icon"
            />
            <CoverView className="text">{item.text}</CoverView>
          </CoverView>
        )}
      />
    </CoverView>
  );
};

export default CustomTabBar;
