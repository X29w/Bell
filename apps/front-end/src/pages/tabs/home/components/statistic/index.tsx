import Link from "@/components/config/link";
import RenderList from "@/components/config/render-list";
import { View, Text, Input, ScrollView } from "@tarojs/components";
import { useLoad } from "@tarojs/taro";
import type { FC } from "react";
import { AtIcon } from "taro-ui";

interface StatisticProps {}

const Statistic: FC<StatisticProps> = () => {
  return (
    <View className="w-full h-32 grid grid-cols-3 gap-3">
      <View className="w-full h-full p-4 flex flex-col justify-between bg-white rounded-2xl">
        <View className="w-8 h-8 grid place-items-center bg-[#FEF2F2] rounded-lg">
          <AtIcon
            prefixClass="icon"
            value="yidaoqi"
            size={18}
            color="#DC2626"
          />
        </View>
        <Text className="text-black-1 text-2xl font-bold">3</Text>
        <Text className="text-[#94A3B8] text-xs font-semibold">EXPIED</Text>
      </View>
      <View className="w-full h-full p-4 flex flex-col justify-between bg-white rounded-2xl">
        <View className="w-8 h-8 grid place-items-center bg-[#FFFBEB] rounded-lg">
          <AtIcon
            prefixClass="icon"
            value="a-shijiankaishishijian"
            size={18}
            color="#F59E0B"
          />
        </View>
        <Text className="text-black-1 text-2xl font-bold">3</Text>
        <Text className="text-[#94A3B8] text-xs font-semibold">SOON</Text>
      </View>
      <View className="w-full h-full p-4 flex flex-col justify-between bg-blue-1 rounded-2xl">
        <View className="w-8 h-8 grid place-items-center bg-[#ffffff]/20 rounded-lg">
          <AtIcon prefixClass="icon" value="kucun" size={18} color="#ffffff" />
        </View>
        <Text className="text-white text-2xl font-bold">3</Text>
        <Text className="text-white/70 text-xs font-semibold">TOTAL</Text>
      </View>
    </View>
  );
};

export default Statistic;
