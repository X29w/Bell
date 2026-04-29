import Link from "@/components/config/link";
import { Text, View } from "@tarojs/components";
import type { FC } from "react";
import { AtIcon } from "taro-ui";
import { useAppSelector } from "@/store";

const MySpace: FC = () => {
  const { list, currentId } = useAppSelector((s) => s.space);
  const currentSpace = list.find((s) => s.id === currentId);

  return (
    <View>
      <View className="flex justify-between">
        <Text className="text-xs font-semibold text-gray-1">My Spaces</Text>
        <Link to="/pages/inner/spaces/index">
          <Text className="text-xs font-medium text-blue-1">Manage</Text>
        </Link>
      </View>

      {currentSpace ? (
        <View className="w-full h-20 mt-3 px-4 flex flex-col justify-center border border-solid border-[#E2E8F0] rounded-lg bg-white">
          <View className="flex justify-between items-center">
            <View className="w-full flex items-center gap-3">
              <View className="w-10 h-10 bg-blue-1/10 rounded-lg" />
              <View className="flex flex-col gap-1">
                <Text className="text-black-1 text-base font-medium">{currentSpace.name}</Text>
                <Text className="text-[#64748B] text-xs">
                  {currentSpace._count?.commodities ?? 0} items • Primary Space
                </Text>
              </View>
            </View>
            <AtIcon value="chevron-right" size="20" color="#CBD5E1" />
          </View>
        </View>
      ) : (
        <View className="w-full h-20 mt-3 px-4 flex flex-col justify-center items-center border border-dashed border-[#E2E8F0] rounded-lg">
          <Text className="text-gray-2 text-sm">暂无空间</Text>
        </View>
      )}
    </View>
  );
};

export default MySpace;
