import Link from "@/components/config/link";
import RenderList from "@/components/config/render-list";
import { Text, View } from "@tarojs/components";
import type { FC } from "react";

const Spaces: FC = () => {
  return (
    <View>
      <View className="w-full h-16 flex items-center justify-between">
        <View className="w-2 h-2 bg-gray-200"></View>
        <Text className="text-lg font-semibold text-black-1">
          Manage Categories
        </Text>
        <View />
      </View>

      <View className="px-4">
        <View className="flex flex-col gap-4">
          <RenderList
            items={[...Array(3)]}
            renderItems={() => (
              <Link to="/pages/inner/spaces-detail/index">
                <View className="h-24 p-4 flex justify-between items-center bg-white">
                  <View className="flex justify-between items-center gap-4">
                    <View className="w-14 h-14 bg-blue-1/10 rounded-lg"></View>
                    <View className="flex flex-col gap-1">
                      <Text className="text-lg font-bold text-black-1">
                        Home
                      </Text>
                      <View className="flex items-center">
                        <Text className="text-sm text-gray-2">124</Text>
                        <Text className="text-sm text-gray-2">3</Text>
                      </View>
                    </View>
                  </View>
                  <View>
                    <View className="w-2 h-2 bg-gray-200"></View>
                  </View>
                </View>
              </Link>
            )}
          />
        </View>

        <View className="w-full h-40 mt-8 mb-14 p-6 flex gap-4 bg-blue-1/5 rounded-xl border border-dashed border-blue-1/20">
          <View className="w-2 h-2 bg-gray-200"></View>
          <View className="flex-1 flex flex-col gap-1">
            <Text className="text-base text-blue-1 font-semibold">Pro Tip</Text>
            <Text className="text-sm text-[#475569]">
              Organize your spaces by location or purpose to track items more
              efficiently across multiple properties.
            </Text>
          </View>
        </View>

        <View className="w-full h-14 grid place-items-center rounded-xl bg-blue-1">
          <View className="flex items-center gap-2">
            <View className="w-2 h-2 bg-gray-200"></View>
            <Text className="text-base text-white font-bold">
              Create New Space
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Spaces;
