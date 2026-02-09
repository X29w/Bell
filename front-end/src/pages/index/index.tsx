import { View, Text, Button } from "@tarojs/components";
import { useLoad } from "@tarojs/taro";
import type { FC } from "react";

interface IndexProps {}

const Index: FC<IndexProps> = () => {
  useLoad(() => {
    console.log("Page loaded.");
  });
  return (
    <View className="index">
      <Text>Hello world!</Text>
      <Button>按钮文案</Button>
      <Button type="primary">按钮文案</Button>
      <Button type="warn">按钮文案</Button>
    </View>
  );
};

export default Index;
