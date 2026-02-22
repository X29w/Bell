import RenderList from "@/components/config/render-list";
import SearchCommodity from "@/components/feature/search-commodity";
import { Text, View } from "@tarojs/components";
import type { FC } from "react";
import { AtSwipeAction } from "taro-ui";

const List: FC = () => {
  return (
    <View className="px-4">
      <SearchCommodity className="my-8" />

      <View className="mb-4 flex gap-2 items-center">
        <RenderList
          items={[...Array(3)]}
          renderItems={() => (
            <View className=" h-9 px-5 grid place-items-center text-sm font-medium bg-white rounded-2xl">
              All Items
            </View>
          )}
        />
      </View>

      <View className="w-full flex flex-col gap-3 field1">
        <RenderList
          items={[...Array(10)]}
          renderItems={() => (
            <AtSwipeAction
              autoClose
              options={[
                {
                  text: "取消",
                },
                {
                  text: "确认",
                },
              ]}
            >
              <View className="w-full h-24 flex flex-col justify-center border-l-4 border-l-[#10B981] rounded-lg">
                <View className="w-full px-4 flex justify-between items-start">
                  <View className="flex items-center gap-4">
                    <View className="w-14 h-14 bg-gray-200"></View>
                    <View className="flex flex-col">
                      <Text className="text-base font-bold text-black-1">
                        Sourdough Loaf
                      </Text>
                      <Text className="text-xs text-gray-2">Countertop</Text>
                      <Text className="text-xs text-gray-1">
                        Exp: Nov 02, 2023
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </AtSwipeAction>
          )}
        />
      </View>
    </View>
  );
};

export default List;
