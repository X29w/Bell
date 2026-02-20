import Link from "@/components/config/link";
import { Switch, Text, View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import type { FC } from "react";

const Settings: FC = () => {
  return (
    <View>
      <View className="h-24 px-6 flex flex-col">
        <View className="h-full flex justify-between items-center">
          <Text className="text-black-1 text-3xl font-bold">Profile</Text>
          <Text className="text-blue-1 text-lg font-medium">Edit</Text>
        </View>
      </View>

      <View
        className="w-full flex justify-center"
        onClick={async () => {
          await Taro.login({
            complete: (res) => {
              console.log(res);
            },
            success: (res) => {
              console.log(res);
            },
            fail: (res) => {
              console.log(res);
            },
          });
        }}
      >
        <View className="mt-4 flex flex-col gap-4">
          <View className="w-24 h-24 mx-auto bg-gray-200 rounded-full"></View>
          <Text className="text-black-1 text-xl font-semibold">
            Alex Henderson
          </Text>
        </View>
      </View>

      <View className="px-4 mt-8 flex flex-col gap-8">
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
              <View className="w-2 h-2 bg-gray-300"></View>
            </View>
          </View>
        </View>

        <View>
          <Text className="text-xs text-gray-1 font-semibold">
            App Settings
          </Text>
          <View className="w-full h-16 mt-3 px-4 flex flex-col justify-center border border-solid border-[#E2E8F0] rounded-lg bg-white">
            <View className="flex justify-between">
              <View className="flex items-center gap-3">
                <View className="w-8 h-8 bg-gray-1"></View>
                <Text className="text-base text-black-1 font-medium">
                  Email Notifications
                </Text>
              </View>
              <Switch className="w-12 h-6" />
            </View>
          </View>
        </View>

        <View className="w-full h-14 px-4 flex flex-col justify-center border border-solid border-[#E2E8F0] rounded-lg bg-white">
          <View className="flex items-center gap-3">
            <View className="w-2 h-2 bg-gray-1"></View>
            <Text className="text-[#EF4444] text-base font-medium">
              Log Out
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Settings;
