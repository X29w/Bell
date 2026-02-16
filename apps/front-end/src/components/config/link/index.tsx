import { View, ViewProps } from "@tarojs/components";
import Taro from "@tarojs/taro";
import type { FC } from "react";

interface LinkProps extends ViewProps {
  replace?: boolean;
}

const Link: FC<LinkProps> = ({ replace = false, ...props }) => {
  const handleClick = (params) => {
    replace ? Taro.redirectTo(params) : Taro.navigateTo(params);
  };

  return <View onClick={handleClick} {...props} />;
};

export default Link;
