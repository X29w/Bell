import { Input, Text, View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { useState, type FC } from "react";
import { AtIcon } from "taro-ui";
import { useAppDispatch } from "@/store";
import { signinAsync, fetchProfileAsync } from "@/store/slice/user.slice";
import { fetchSpacesAsync } from "@/store/slice/space.slice";

const Signin: FC = () => {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Taro.showToast({ title: "请输入邮箱和密码", icon: "none" });
      return;
    }

    setLoading(true);
    try {
      await dispatch(signinAsync({ email, password })).unwrap();
      await dispatch(fetchProfileAsync());
      await dispatch(fetchSpacesAsync());
      Taro.showToast({ title: "登录成功", icon: "success" });
      setTimeout(() => Taro.switchTab({ url: "/pages/tabs/home/index" }), 500);
    } catch {
      // 错误已在 request 层处理
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="w-full h-full mt-12 px-6">
      <View>
        <View className="w-20 h-20 mx-auto grid place-items-center bg-blue-1/10 rounded-2xl">
          <AtIcon prefixClass="icon" value="kucun" size={50} color="#137FEC" />
        </View>

        <View className="mt-8 mb-16 flex flex-col items-center gap-2">
          <Text className="text-black-1 text-4xl font-medium">家物清单</Text>
          <Text className="text-black-2 text-lg font-medium">让居家生活更有序</Text>
        </View>

        <View className="flex flex-col gap-4 mb-8">
          <View className="h-14 px-4 flex items-center bg-white rounded-2xl border border-solid border-[#E2E8F0]">
            <Input
              className="flex-1"
              type="text"
              placeholder="邮箱"
              value={email}
              onInput={(e) => setEmail(e.detail.value)}
            />
          </View>
          <View className="h-14 px-4 flex items-center bg-white rounded-2xl border border-solid border-[#E2E8F0]">
            <Input
              className="flex-1"
              type="safe-password"
              placeholder="密码"
              value={password}
              onInput={(e) => setPassword(e.detail.value)}
            />
          </View>
        </View>

        <View
          className={`w-full h-14 flex items-center gap-2 justify-center rounded-2xl ${loading ? "bg-blue-1/50" : "bg-blue-1"}`}
          onClick={loading ? undefined : handleLogin}
        >
          <Text className="text-white text-base font-medium">
            {loading ? "登录中..." : "登录"}
          </Text>
        </View>

        <View
          className="mt-8 flex justify-center items-center"
          onClick={() => Taro.switchTab({ url: "/pages/tabs/home/index" })}
        >
          <Text className="text-sm text-gray-2 font-medium">skip</Text>
        </View>
      </View>
    </View>
  );
};

export default Signin;
