import { Text, View } from "@tarojs/components";
import type { FC } from "react";
import { AtIcon } from "taro-ui";

const Signin: FC = () => {
  return (
    <View className="w-full h-full mt-12 px-6">
      <View>
        <View className="w-20 h-20 mx-auto grid place-items-center bg-blue-1/10 rounded-2xl">
          <AtIcon prefixClass="icon" value="kucun" size={50} color="#137FEC" />
        </View>

        <View className="mt-8 mb-40 flex flex-col items-center gap-2">
          <Text className="text-black-1 text-4xl font-medium">家物清单</Text>
          <Text className="text-black-2 text-lg font-medium">
            让居家生活更有序
          </Text>
        </View>

        <View className="w-full h-14 flex items-center gap-2 justify-center bg-blue-1 rounded-2xl">
          <AtIcon
            prefixClass="icon"
            value="029-chat"
            size={20}
            color="#ffffff"
          />
          <Text className="text-white text-base font-medium">微信一键登录</Text>
        </View>

        <View className="mt-8 flex justify-center items-center">
          <Text className="text-sm text-gray-2 font-medium">skip</Text>
        </View>
      </View>
    </View>
  );
};

export default Signin;
