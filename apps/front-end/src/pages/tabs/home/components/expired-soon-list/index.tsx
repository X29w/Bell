import Link from "@/components/config/link";
import RenderList from "@/components/config/render-list";
import { ScrollView, Text, View } from "@tarojs/components";
import type { FC } from "react";
import { AtIcon } from "taro-ui";
import CurrentStatus from "./current-status";

interface ExpiredSoonListProps {}

const ExpiredSoonList: FC<ExpiredSoonListProps> = () => {
  return (
    <ScrollView
      scrollY
      className="h-[calc(100vh-680px)] flex flex-col gap-4 overflow-y-auto"
    >
      <RenderList
        items={[...Array(6)]}
        renderItems={() => (
          <Link to="/pages/inner/commodity/index">
            <View className="w-full h-28 flex justify-between items-center p-3 bg-white rounded-2xl">
              <View className="h-full flex items-center gap-4">
                <View className="w-20 h-20 bg-gray-300 rounded-lg"></View>
                <View className="flex flex-col justify-between">
                  <Text className="text-[#1E293B] text-base font-semibold">
                    Organic Whole Milk
                  </Text>
                  <Text className="text-[#94A3B8] text-base">Refrigerator</Text>
                  <CurrentStatus status={3} />
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
