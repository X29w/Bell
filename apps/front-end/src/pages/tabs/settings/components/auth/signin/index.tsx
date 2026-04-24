import { Text, View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import type { FC } from "react";
import { useAppSelector } from "@/store";

const Signin: FC = () => {
  const user = useAppSelector((s) => s.user.current);

  if (user) {
    return (
      <View className="w-full flex justify-center">
        <View className="mt-4 flex flex-col gap-2 items-center">
          <View className="w-24 h-24 mx-auto bg-gray-200 rounded-full"></View>
          <Text className="text-black-1 text-xl font-semibold">{user.name || user.email}</Text>
          <Text className="text-gray-500 text-sm">{user.email}</Text>
        </View>
      </View>
    );
  }

  return (
    <View className="w-full flex justify-center">
      <View className="mt-4 flex flex-col gap-4 items-center">
        <View className="w-24 h-24 mx-auto bg-gray-200 rounded-full"></View>
        <Text className="text-black-1 text-xl font-semibold">未登录</Text>
        <View
          className="bg-blue-1 text-white rounded-lg px-6 py-2 mt-2"
          onClick={() => Taro.navigateTo({ url: "/pages/inner/signin/index" })}
        >
          <Text className="text-white text-base">去登录</Text>
        </View>
      </View>
    </View>
  );
};

export default Signin;
