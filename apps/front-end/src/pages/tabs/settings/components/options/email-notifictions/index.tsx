import { Switch, Text, View } from "@tarojs/components";
import type { FC } from "react";
import { AtIcon } from "taro-ui";

const EmailNotifictions: FC = () => {
  return (
    <View className="w-full h-16 mt-3 px-4 flex flex-col justify-center border border-solid border-[#E2E8F0] rounded-lg bg-white">
      <View className="flex justify-between">
        <View className="flex items-center gap-3">
          <View className="w-8 h-8 grid place-items-center bg-[#EFF6FF] rounded-lg">
            <AtIcon
              prefixClass="icon"
              value="lingdang"
              size="20"
              color="#2563EB"
            />
          </View>
          <Text className="text-base text-black-1 font-medium">
            Email Notifications
          </Text>
        </View>
        <Switch className="w-12 h-6" />
      </View>
    </View>
  );
};

export default EmailNotifictions;
