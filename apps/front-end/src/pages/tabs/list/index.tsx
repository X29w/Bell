import RenderList from "@/components/config/render-list";
import { Input, Text, View } from "@tarojs/components";
import type { FC } from "react";
import { AtSwipeAction } from "taro-ui";

const List: FC = () => {
  return (
    <View className="px-4">
      <View className="w-full h-16 flex flex-col justify-center">
        <Text className="text-2xl text-black-1 font-bold">Inventory</Text>
      </View>

      <View className="w-full h-12 mb-8 flex items-center gap-3">
        <Input
          className="flex-1 h-full px-3 bg-white rounded-2xl"
          placeholder="Search inventory..."
        />
        <View className="w-12 h-full bg-white rounded-2xl"></View>
      </View>

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

      <View className="flex flex-col gap-3">
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
              <View className="w-full h-24 flex flex-col justify-center bg-white">
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
                  <View className="px-2 grid place-items-center">
                    <Text className="text-[#059669] font-bold text-xs">
                      FRESH
                    </Text>
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
