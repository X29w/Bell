import { View, Text } from "@tarojs/components";
import { useLoad } from "@tarojs/taro";
import type { FC } from "react";
import { AtButton, AtIcon } from "taro-ui";

const Home: FC = () => {
  useLoad(() => {
    console.log("Home page loaded.");
  });

  return (
    <View className="index">
     
    </View>
  );
};

export default Home;
