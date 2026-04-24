import { Text, View } from "@tarojs/components";
import type { FC } from "react";
import { AtIcon } from "taro-ui";

interface CurrentStatusProps {
  expiryDate: string;
}

/** 根据过期日期计算并展示状态标签 */
const CurrentStatus: FC<CurrentStatusProps> = ({ expiryDate }) => {
  const now = new Date();
  const expiry = new Date(expiryDate);
  const diffMs = expiry.getTime() - now.getTime();
  const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays < 0) {
    return (
      <View className="w-fit px-2 py-1 flex items-center gap-1 bg-[#F1F5F9] rounded-2xl">
        <AtIcon prefixClass="icon" value="cuowu1" size="16" color="#64748B" />
        <Text className="text-gray-2 text-xs font-bold">
          Expired ({Math.abs(diffDays)}d ago)
        </Text>
      </View>
    );
  }

  if (diffDays === 0) {
    return (
      <View className="w-fit px-2 py-1 flex items-center gap-1 bg-[#FEF2F2] rounded-2xl">
        <AtIcon prefixClass="icon" value="cuowu1" size="16" color="#DC2626" />
        <Text className="text-red-1 text-xs font-bold">TODAY</Text>
      </View>
    );
  }

  if (diffDays <= 7) {
    return (
      <View className="w-fit px-2 py-1 flex items-center gap-1 bg-[#FFFBEB] rounded-2xl">
        <AtIcon prefixClass="icon" value="cuowu" size="16" color="#D97706" />
        <Text className="text-[#D97706] text-xs font-bold">{diffDays} Days Left</Text>
      </View>
    );
  }

  return (
    <View className="w-fit px-2 py-1 flex items-center gap-1 bg-[#DCFCE7] rounded-2xl">
      <AtIcon prefixClass="icon" value="dui" size="16" color="#16A34A" />
      <Text className="text-[#16A34A] text-xs font-bold">Fresh</Text>
    </View>
  );
};

export default CurrentStatus;
