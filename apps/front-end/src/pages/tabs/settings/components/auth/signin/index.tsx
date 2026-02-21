import { Button, Text, View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import type { FC } from "react";
import { useState } from "react";

const Signin: FC = () => {
  const [userInfo, setUserInfo] = useState({
    nickName: "",
    avatarUrl: "",
    phone: "",
    isLoggedIn: false,
  });

  const handleGetUserProfileAndPhone = (e: any) => {
    console.log("e", e);
    // 处理手机号授权结果
    if (e.detail.errMsg === "getPhoneNumber:ok") {
      console.log("手机号授权成功:", e.detail);

      // 模拟获取用户基本信息（实际项目中可能需要额外调用）
      const mockUserInfo = {
        nickName: "微信用户",
        avatarUrl: "",
        phone: "138****8888", // 从授权中获取或模拟
      };

      setUserInfo({
        ...mockUserInfo,
        isLoggedIn: true,
      });

      Taro.showToast({
        title: "登录成功",
        icon: "success",
      });
    } else {
      console.log("手机号授权失败:", e.detail.errMsg);
      Taro.showToast({
        title: "授权失败，请重试",
        icon: "none",
      });
    }
  };

  const handleGetPhoneNumber = async (e: any) => {
    try {
      if (userInfo.isLoggedIn && userInfo.phone) {
        Taro.showToast({
          title: "您已绑定手机号",
          icon: "none",
        });
        return;
      }

      if (e.detail.errMsg !== "getPhoneNumber:ok") {
        throw new Error("获取手机号失败");
      }

      Taro.showLoading({ title: "绑定中..." });

      // 模拟获取手机号（实际项目中需要后端解密）
      // 这里直接使用模拟数据
      setUserInfo((prev) => ({
        ...prev,
        phone: "138****8888",
      }));

      Taro.hideLoading();
      Taro.showToast({
        title: "手机号绑定成功",
        icon: "success",
      });
    } catch (error: any) {
      Taro.hideLoading();
      console.error("获取手机号失败:", error);
      Taro.showToast({
        title: error.message || "获取手机号失败",
        icon: "none",
      });
    }
  };

  const handleLogout = () => {
    setUserInfo({
      nickName: "",
      avatarUrl: "",
      phone: "",
      isLoggedIn: false,
    });
    Taro.showToast({
      title: "已退出登录",
      icon: "success",
    });
  };

  return (
    <View className="w-full flex justify-center">
      <View className="mt-4 flex flex-col gap-4 items-center">
        {userInfo.isLoggedIn ? (
          <>
            <View className="w-24 h-24 mx-auto bg-gray-200 rounded-full overflow-hidden">
              {userInfo.avatarUrl && (
                <img
                  src={userInfo.avatarUrl}
                  alt="头像"
                  className="w-full h-full object-cover"
                />
              )}
            </View>
            <Text className="text-black-1 text-xl font-semibold">
              {userInfo.nickName}
            </Text>
            {userInfo.phone && (
              <Text className="text-gray-500 text-sm">{userInfo.phone}</Text>
            )}
            <Button
              className="bg-red-500 text-white rounded-lg px-6 py-2 mt-2"
              onClick={handleLogout}
            >
              退出登录
            </Button>
            {!userInfo.phone && (
              <Button
                className="bg-green-500 text-white rounded-lg px-6 py-2 mt-2"
                openType="getPhoneNumber"
                onGetPhoneNumber={handleGetPhoneNumber}
              >
                绑定手机号
              </Button>
            )}
          </>
        ) : (
          <>
            <View className="w-24 h-24 mx-auto bg-gray-200 rounded-full"></View>
            <Text className="text-black-1 text-xl font-semibold">未登录</Text>
            <Button
              className="bg-blue-500 text-white rounded-lg px-6 py-2 mt-2"
              openType="getPhoneNumber"
              onGetPhoneNumber={handleGetUserProfileAndPhone}
            >
              微信一键登录
            </Button>
          </>
        )}
      </View>
    </View>
  );
};

export default Signin;
