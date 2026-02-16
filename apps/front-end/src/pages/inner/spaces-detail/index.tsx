import RenderList from "@/components/config/render-list";
import { Text, View } from "@tarojs/components";
import type { FC } from "react";

const SpaceDetail: FC = () => {
  return (
    <View className="relative pb-40">
      <View className="px-6">
        <View>
          <Text className="text-xs text-gray-1 font-semibold">Invite Code</Text>
          <View className="h-24 mt-3 px-5 flex justify-between items-center bg-blue-1/5 rounded-xl">
            <View className="flex flex-col">
              <Text className="text-blue-1 text-2xl font-bold">HEM-829-X</Text>
              <Text className="text-xs font-bold text-blue-1/60">
                Share this code to invite others
              </Text>
            </View>
            <View className="w-10 h-10 rounded-xl bg-blue-1/10"></View>
          </View>
        </View>

        <View className="mt-8 mb-4">
          <View className="flex justify-between items-center">
            <Text className="text-xs text-gray-1 font-semibold">Members</Text>
            <Text className="text-xs text-blue-1 font-semibold">ADD NEW</Text>
          </View>
        </View>

        <View>
          <RenderList
            items={[...Array(3)]}
            renderItems={() => (
              <View className="w-full h-16 flex flex-col justify-center">
                <View className="flex justify-between items-center">
                  <View className="flex items-center gap-4">
                    <View className="w-10 h-10 rounded-full bg-gray-200"></View>
                    <View className="flex flex-col">
                      <Text className="text-sm text-black-1 font-semibold">
                        Sarah Jenkins
                      </Text>
                      <Text className="text-xs text-gray-1 font-medium">
                        Space Admin
                      </Text>
                    </View>
                  </View>
                  <View>
                    <View className="w-10 h-26 grid place-items-center bg-blue-1/10 rounded-lg">
                      <Text className="text-xs text-blue-1 font-medium">
                        You
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            )}
          />
        </View>
      </View>

      <View className="fixed w-full bottom-0 left-0 h-40 px-6 flex flex-col justify-center gap-4">
        <View className="h-14 flex justify-center items-center bg-blue-1 rounded-xl">
          <Text className="text-sm text-white font-semibold">
            Switch to this space
          </Text>
        </View>
        <View className="flex justify-center items-center gap-2">
          <View className="w-2 h-2 bg-gray-200"></View>
          <Text className="text-sm text-red-500 font-semibold">
            Delete Space
          </Text>
        </View>
      </View>
    </View>
  );
};

export default SpaceDetail;
