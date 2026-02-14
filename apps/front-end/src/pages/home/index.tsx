import RenderList from "@/components/config/render-list";
import { View, Text, Input, ScrollView } from "@tarojs/components";
import { useLoad } from "@tarojs/taro";
import type { FC } from "react";
import { AtButton, AtIcon } from "taro-ui";

const Home: FC = () => {
  useLoad(() => {
    console.log("Home page loaded.");
  });

  return (
    <View className="relative w-full h-full flex flex-col">
      <View className="w-full h-20 flex flex-col justify-center">
        <View className="px-6 flex justify-between items-center">
          <Text>Main Pantry</Text>
          <View className="flex items-center gap-4">
            <View className="w-10 h-10 bg-[#137FEC]/10 rounded-full"></View>
            <View className="w-9 h-9 bg-gray-200"></View>
          </View>
        </View>
      </View>

      <View className="flex-1 py-4 px-6">
        <View className="w-full h-32 grid grid-cols-3 gap-3">
          <View className="w-full h-full p-4 flex flex-col justify-between bg-white rounded-2xl">
            <View className="w-8 h-8 bg-[#FEF2F2]"></View>
            <Text className="text-[#0F172A] text-2xl font-bold">3</Text>
            <Text className="text-[#94A3B8] text-xs font-semibold">3</Text>
          </View>
          <View className="w-full h-full p-4 flex flex-col justify-between bg-white rounded-2xl">
            <View className="w-8 h-8 bg-[#FEF2F2]"></View>
            <Text className="text-[#0F172A] text-2xl font-bold">3</Text>
            <Text className="text-[#94A3B8] text-xs font-semibold">3</Text>
          </View>
          <View className="w-full h-full p-4 flex flex-col justify-between bg-white rounded-2xl">
            <View className="w-8 h-8 bg-[#FEF2F2]"></View>
            <Text className="text-[#0F172A] text-2xl font-bold">3</Text>
            <Text className="text-[#94A3B8] text-xs font-semibold">3</Text>
          </View>
        </View>

        <View className="w-full h-12 my-8 flex items-center">
          <Input
            className="flex-1 h-full gap-3 bg-white rounded-2xl"
            placeholder="Search inventory..."
          />
          <View className="w-12 h-full bg-white rounded-2xl"></View>
        </View>

        <View className="flex justify-between items-center">
          <Text className="text-[#0F172A] font-bold text-lg">
            Expiring Soon
          </Text>
          <Text className="text-[#137FEC] font-semibold text-sm">View All</Text>
        </View>

        <ScrollView scrollY  className="h-[calc(100vh-680px)] flex flex-col gap-4 overflow-y-auto">
          <RenderList
            items={[...Array(6)]}
            renderItems={() => (
              <View className="w-full h-28 flex justify-between items-center p-3 bg-white rounded-2xl">
                <View className="h-full flex items-center gap-4">
                  <View className="w-20 h-20 bg-gray-300 rounded-lg"></View>
                  <View className="flex flex-col justify-between">
                    <Text className="text-[#1E293B] text-base font-semibold">
                      Organic Whole Milk
                    </Text>
                    <Text className="text-[#94A3B8] text-base">
                      Refrigerator
                    </Text>
                    <View className="w-fit px-2 py-1 flex items-center gap-1 bg-[#FEF2F2] rounded-2xl">
                      <View className="w-4 h-4 bg-gray-300 "></View>
                      <Text className="text-[#DC2626] text-xs font-bold">
                        TODAY
                      </Text>
                    </View>
                  </View>
                </View>
                <View className="w-2 h-2 bg-gray-300">
                  
                </View>
              </View>
            )}
          />
        </ScrollView>
      </View>

      <View className="fixed bottom-2 left-1/2 -translate-x-1/2 w-12 h-12 bg-[#137FEC] rounded-full"></View>
    </View>
  );
};

export default Home;
