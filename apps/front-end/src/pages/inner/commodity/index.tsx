import { Progress, Text, View } from "@tarojs/components";
import type { FC } from "react";
import { AtIcon } from "taro-ui";

const Commodity: FC = () => {
  return (
    <View className="relative pb-24">
      <View className="w-full aspect-[390/320] bg-white"></View>

      <View className="px-6 mt-8">
        <Text className="text-3xl text-black-1 font-bold">
          Organic Whole Milk
        </Text>

        <View className="h-40 mt-8 p-6 bg-blue-1/5 rounded-xl">
          <View className="flex justify-between items-center">
            <Text className="text-sm text-blue-1 font-medium">
              Expiration Status
            </Text>
            <Text className="text-gray-2 text-xs">Exp: Oct 24, 2023</Text>
          </View>
          <View className="mt-4">
            <Text className="text-5xl text-blue-1 font-bold">05</Text>
            <Text className="text-xl text-blue-1/70 font-medium">
              days left
            </Text>
          </View>
          <Progress
            className="mt-4"
            percent={50}
            strokeWidth={8}
            activeColor="#137FEC"
          />
        </View>

        <View className="mt-8">
          <Text className="text-xs text-gray-1 font-semibold">
            Notifications
          </Text>

          <View className="w-full h-21 p-4 mt-4 flex justify-between items-center bg-[#F8FAFC] rounded-xl border border-solid border-[#E2E8F0]">
            <View className="flex items-center gap-2">
              <View className="w-10 h-10 bg-gray-200 rounded-xl"></View>
              <View className="flex-1 flex flex-col">
                <Text className="text-sm font-medium text-black-1">
                  Smart Reminder
                </Text>
                <Text className="text-xs text-gray-2">
                  Alert before expiration
                </Text>
              </View>
            </View>
            <View className="flex items-center gap-3">
              <View className="w-24 h-12 flex flex-col justify-center border border-solid border-[#E2E8F0] rounded-xl">
                <View className="flex justify-around items-center">
                  <Text className="text-blue-1 text-lg">-</Text>
                  <Text className="text-black-1 text-base font-bold">2</Text>
                  <Text className="text-blue-1 text-lg">+</Text>
                </View>
              </View>
              <Text className="text-xs font-medium">days</Text>
            </View>
          </View>

          <View className="fixed bottom-0 left-0 w-full h-24 px-6 flex flex-col justify-center bg-white">
            <View className="flex items-center gap-3">
              <View className="h-14 flex-1 grid place-items-center bg-blue-1 rounded-lg">
                <View className="flex items-center gap-2">
                  <AtIcon
                    prefixClass="icon"
                    value="dui"
                    size="20"
                    color="#ffffff"
                  />

                  <Text className="text-base text-white font-bold">
                    Mark as Used
                  </Text>
                </View>
              </View>

              <View className="flex items-center gap-3">
                <View className="w-14 h-14 border border-solid border-[#F1F5F9]"></View>
                <View className="w-14 h-14 border border-solid border-[#FEF2F2]"></View>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Commodity;
