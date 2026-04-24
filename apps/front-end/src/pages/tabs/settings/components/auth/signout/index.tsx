import { Text, View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import type { FC } from "react";
import { AtIcon } from "taro-ui";
import { useAppDispatch, useAppSelector } from "@/store";
import { logout } from "@/store/slice/user.slice";

const Signout: FC = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((s) => s.user.current);

  if (!user) return null;

  const handleLogout = () => {
    dispatch(logout());
    Taro.showToast({ title: "已退出登录", icon: "success" });
  };

  return (
    <View
      className="w-full h-14 px-4 flex flex-col justify-center border border-solid border-[#E2E8F0] rounded-lg bg-white"
      onClick={handleLogout}
    >
      <View className="flex items-center gap-3">
        <AtIcon prefixClass="icon" value="tuichu" size="20" color="#EF4444" />
        <Text className="text-[#EF4444] text-base font-medium">Log Out</Text>
      </View>
    </View>
  );
};

export default Signout;
