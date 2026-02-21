import { Text, View } from "@tarojs/components";
import type { FC } from "react";
import EmailNotifictions from "./email-notifictions";

const SettingOptions: FC = () => {
  return (
    <View>
      <Text className="text-xs text-gray-1 font-semibold">App Settings</Text>
      <EmailNotifictions />
    </View>
  );
};

export default SettingOptions;
