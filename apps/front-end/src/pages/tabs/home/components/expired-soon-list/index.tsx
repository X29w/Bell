import Link from "@/components/config/link";
import RenderList from "@/components/config/render-list";
import { ScrollView, Text, View } from "@tarojs/components";
import type { FC } from "react";
import { AtIcon } from "taro-ui";
import CurrentStatus from "./current-status";
import { useAppSelector } from "@/store";
import type { Commodity } from "@/types/commodity";

const ExpiredSoonList: FC = () => {
  const { list } = useAppSelector((s) => s.commodity);

  // 只显示即将过期和已过期的（7天内），排除已使用
  const soonList = list
    .filter((item) => {
      const diff = new Date(item.expiryDate).getTime() - Date.now();
      const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
      return days <= 7 && !item.isUsed;
    })
    .slice(0, 10);

  if (soonList.length === 0) {
    return (
      <View className="py-8 flex justify-center">
        <Text className="text-gray-2 text-sm">暂无即将过期的物品</Text>
      </View>
    );
  }

  return (
    <ScrollView scrollY className="h-[calc(100vh-680px)] flex flex-col gap-4 overflow-y-auto">
      <RenderList
        items={soonList}
        extraKey={(item: Commodity) => item.id}
        renderItems={(item: Commodity) => (
          <Link to={`/pages/inner/commodity/index?id=${item.id}`}>
            <View className="w-full h-28 flex justify-between items-center p-3 bg-white rounded-2xl">
              <View className="h-full flex items-center gap-4">
                <View className="w-20 h-20 bg-gray-300 rounded-lg"></View>
                <View className="flex flex-col justify-between">
                  <Text className="text-[#1E293B] text-base font-semibold">{item.name}</Text>
                  <Text className="text-[#94A3B8] text-base">{item.location || "未设置位置"}</Text>
                  <CurrentStatus expiryDate={item.expiryDate} />
                </View>
              </View>
              <AtIcon value="chevron-right" size="20" color="#CBD5E1" />
            </View>
          </Link>
        )}
      />
    </ScrollView>
  );
};

export default ExpiredSoonList;
