import { Text, View } from "@tarojs/components";
import type { FC } from "react";
import { AtIcon } from "taro-ui";

const SpaceCreated: FC = () => {
  return (
    <View>
      <View className="w-20 h-20 mx-auto mt-8 grid place-items-center bg-blue-1/10 rounded-full">
        <View className="w-12 h-12 grid place-items-center bg-blue-1 rounded-full">
          <AtIcon value="check" size="20" color="#ffffff" />
        </View>
      </View>

      <View className="w-full mt-6 mb-2 flex justify-center">
        <Text className=" text-2xl font-bold text-black-1">Space Created!</Text>
      </View>
      <View className="w-full px-6 text-center">
        <Text className="w-full text-base text-gray-2 ">
          Invite others to join your "Kitchen Inventory" using this code.
        </Text>
      </View>

      <View className="mt-16 mb-6 px-3 flex justify-around">
        <View className="w-10 h-14 grid place-items-center bg-blue-1/5 rounded-xl border border-solid border-blue-1/10">
          <Text className="text-3xl font-bold text-blue-1">8</Text>
        </View>
        <View className="w-10 h-14 grid place-items-center bg-blue-1/5 rounded-xl border border-solid border-blue-1/10">
          <Text className="text-3xl font-bold text-blue-1">8</Text>
        </View>
        <View className="w-10 h-14 grid place-items-center bg-blue-1/5 rounded-xl border border-solid border-blue-1/10">
          <Text className="text-3xl font-bold text-blue-1">8</Text>
        </View>
        <View className="w-10 h-14 grid place-items-center">
          <Text className="text-3xl font-bold text-gray-1">—</Text>
        </View>
        <View className="w-10 h-14 grid place-items-center bg-blue-1/5 rounded-xl border border-solid border-blue-1/10">
          <Text className="text-3xl font-bold text-blue-1">8</Text>
        </View>
        <View className="w-10 h-14 grid place-items-center bg-blue-1/5 rounded-xl border border-solid border-blue-1/10">
          <Text className="text-3xl font-bold text-blue-1">8</Text>
        </View>
        <View className="w-10 h-14 grid place-items-center bg-blue-1/5 rounded-xl border border-solid border-blue-1/10">
          <Text className="text-3xl font-bold text-blue-1">8</Text>
        </View>
      </View>

      <View className="w-full flex justify-center">
        <View className="flex items-center gap-3">
          <View className="w-40 h-14 bg-blue-1 rounded-xl flex justify-center items-center gap-2">
            <AtIcon
              prefixClass="icon"
              value="fuzhi"
              size="20"
              color="#ffffff"
            />
            <Text className="text-base font-medium text-white">Copy Code</Text>
          </View>
          <View className="w-14 h-14 grid place-items-center border border-solid border-[#E2E8F0] rounded-xl">
            <AtIcon
              prefixClass="icon"
              value="fenxiang"
              size="24"
              color="#137FEC"
            />
          </View>
        </View>
      </View>

      <View className="w-full px-6 mt-8 flex justify-center">
        <Text className="text-sm text-blue-1 font-semibold">
          Go to My Space
        </Text>
      </View>
    </View>
  );
};

export default SpaceCreated;
