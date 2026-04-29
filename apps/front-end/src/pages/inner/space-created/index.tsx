import { Text, View } from "@tarojs/components";
import Taro, { useRouter } from "@tarojs/taro";
import type { FC } from "react";
import { AtIcon } from "taro-ui";

const SpaceCreated: FC = () => {
  const router = useRouter();
  const code = router.params.code || "";
  const codeChars = code.replace(/-/g, "");

  /** 复制邀请码 */
  const handleCopy = () => {
    Taro.setClipboardData({ data: code });
  };

  /** 跳转到空间列表 */
  const handleGoToSpaces = () => {
    Taro.navigateBack();
  };

  return (
    <View>
      <View className="w-20 h-20 mx-auto mt-8 grid place-items-center bg-blue-1/10 rounded-full">
        <View className="w-12 h-12 grid place-items-center bg-blue-1 rounded-full">
          <AtIcon value="check" size="20" color="#ffffff" />
        </View>
      </View>

      <View className="w-full mt-6 mb-2 flex justify-center">
        <Text className="text-2xl font-bold text-black-1">Space Created!</Text>
      </View>
      <View className="w-full px-6 text-center">
        <Text className="w-full text-base text-gray-2">
          Invite others to join your space using this code.
        </Text>
      </View>

      <View className="mt-16 mb-6 px-3 flex justify-around">
        {codeChars.split("").map((char, i) => (
          <View
            key={i}
            className="w-10 h-14 grid place-items-center bg-blue-1/5 rounded-xl border border-solid border-blue-1/10"
          >
            <Text className="text-3xl font-bold text-blue-1">{char}</Text>
          </View>
        ))}
      </View>

      <View className="w-full flex justify-center">
        <View className="flex items-center gap-3">
          <View
            className="w-40 h-14 bg-blue-1 rounded-xl flex justify-center items-center gap-2"
            onClick={handleCopy}
          >
            <AtIcon prefixClass="icon" value="fuzhi" size="20" color="#ffffff" />
            <Text className="text-base font-medium text-white">Copy Code</Text>
          </View>
        </View>
      </View>

      <View className="w-full px-6 mt-8 flex justify-center" onClick={handleGoToSpaces}>
        <Text className="text-sm text-blue-1 font-semibold">Go to My Space</Text>
      </View>
    </View>
  );
};

export default SpaceCreated;
