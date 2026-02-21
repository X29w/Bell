import Link from "@/components/config/link";
import { Text, View } from "@tarojs/components";
import type { FC } from "react";
import { AtIcon } from "taro-ui";

const MySpace: FC = () => {
  return (
    <View>
      <View className="flex justify-between">
        <Text className="text-xs font-semibold text-gray-1">My Spaces</Text>
        <Link to="/pages/inner/spaces/index">
          <Text className="text-xs font-medium text-blue-1">Manage</Text>
        </Link>
      </View>

      <View className="w-full h-20 mt-3 px-4 flex flex-col justify-center border border-solid border-[#E2E8F0] rounded-lg bg-white">
        <View className="flex justify-between items-center">
          <View className="w-full flex items-center gap-3">
            <View className="w-10 h-10 bg-gray-1"></View>
            <View className="flex flex-col gap-1">
              <Text className="text-black-1 text-base font-medium">
                Main Home
              </Text>
              <Text className="text-[#64748B] text-xs">
                48 items • Primary Space
              </Text>
            </View>
          </View>
          <AtIcon value="chevron-right" size="20" color="#CBD5E1" />
        </View>
      </View>
    </View>
  );
};

export default MySpace;
