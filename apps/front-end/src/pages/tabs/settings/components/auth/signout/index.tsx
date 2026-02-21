import { Text, View } from "@tarojs/components";
import type { FC } from "react";
import { AtIcon } from "taro-ui";

const Signout: FC = () => {
  return (
    <View className="w-full h-14 px-4 flex flex-col justify-center border border-solid border-[#E2E8F0] rounded-lg bg-white">
      <View className="flex items-center gap-3">
        <AtIcon prefixClass="icon" value="tuichu" size="20" color="#EF4444" />
        <Text className="text-[#EF4444] text-base font-medium">Log Out</Text>
      </View>
    </View>
  );
};

export default Signout;
