import { Text, View } from "@tarojs/components";
import type { FC } from "react";
import { AtIcon } from "taro-ui";

interface HeaderProps {}

const Header: FC<HeaderProps> = () => {
  return (
    <View className="w-full h-20 flex flex-col justify-center">
      <View className="px-6 flex justify-between items-center">
        <View className="flex items-center gap-2">
          <Text>Main Pantry</Text>
          <AtIcon value="chevron-down" size="14" color="#137FEC" />
        </View>
        <View className="flex items-center gap-4">
          <View className="w-10 h-10 grid place-items-center bg-blue-1/10 rounded-full">
            <AtIcon
              prefixClass="icon"
              value="lingdang"
              size="24"
              color="#137FEC"
            />
          </View>
          <View className="w-9 h-9 bg-gray-200 rounded-lg"></View>
        </View>
      </View>
    </View>
  );
};

export default Header;
