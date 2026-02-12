import { View, Text, Button } from "@tarojs/components";
import { useLoad } from "@tarojs/taro";
import type { FC } from "react";
import { AtButton, AtIcon } from "taro-ui";

const Index: FC<unknown> = () => {
  return (
    <View>
      <View className="flex justify-center">
        <View>
          <Text className="text-2xl">Main Party</Text>
          <AtIcon value="chevron-down" size='30' color='#F00' />
        </View>

        <View>
          <View className="w-0 h-0 rounded-full bg-[#137fec]"></View>
        </View>
      </View>
    </View>
  );
};

export default Index;
