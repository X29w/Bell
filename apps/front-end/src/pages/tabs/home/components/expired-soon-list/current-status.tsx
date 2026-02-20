import { Text, View } from "@tarojs/components";
import type { FC, ReactNode } from "react";
import { AtIcon } from "taro-ui";

interface CurrentStatusProps {
  status: 0 | 1 | 2 | 3;
}

const CurrentStatus: FC<CurrentStatusProps> = ({ status }) => {
  const Today = () => (
    <View className="w-fit px-2 py-1 flex items-center gap-1 bg-[#FEF2F2] rounded-2xl">
      <AtIcon prefixClass="icon" value="cuowu1" size="16" color="#DC2626" />
      <Text className="text-[#DC2626] text-xs font-bold">TODAY</Text>
    </View>
  );

  const DaysLeft = () => (
    <View className="w-fit px-2 py-1 flex items-center gap-1 bg-[#FFFBEB] rounded-2xl">
      <AtIcon prefixClass="icon" value="cuowu" size="16" color="#D97706" />
      <Text className="text-[#D97706] text-xs font-bold">3 Days Left</Text>
    </View>
  );

  const Expired = () => (
    <View className="w-fit px-2 py-1 flex items-center gap-1 bg-[#F1F5F9] rounded-2xl">
      <AtIcon prefixClass="icon" value="cuowu1" size="16" color="#64748B" />
      <Text className="text-gray-2 text-xs font-bold">
        Expired （Yesterday）
      </Text>
    </View>
  );

  const componentsMap = new Map<typeof status, ReactNode>([
    [1, <Today key={1} />],
    [2, <DaysLeft key={2} />],
    [3, <Expired key={3} />],
  ]);

  return componentsMap.get(status);
};

export default CurrentStatus;
