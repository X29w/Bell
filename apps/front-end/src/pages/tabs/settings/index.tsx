import { View } from "@tarojs/components";
import type { FC } from "react";
import Signin from "./components/auth/signin";
import Signout from "./components/auth/signout";
import MySpace from "./components/my-space";
import SettingOptions from "./components/options";

const Settings: FC = () => {
  return (
    <View>
      <Signin />

      <View className="px-4 mt-8 flex flex-col gap-8">
        <MySpace />

        <SettingOptions />

        <Signout />
      </View>
    </View>
  );
};

export default Settings;
