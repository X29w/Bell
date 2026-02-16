import { View, ViewProps } from "@tarojs/components";
import Taro from "@tarojs/taro";
import type { FC } from "react";

interface LinkProps extends ViewProps {
  replace?: boolean;
  to: string;
}

const Link: FC<LinkProps> = ({ replace = false, to, ...props }) => {
  const handleClick =async () => {
    replace ? await Taro.redirectTo({ url: to }) : await Taro.navigateTo({ url: to });
  };

  return <View onClick={handleClick} {...props} />;
};

export default Link;
