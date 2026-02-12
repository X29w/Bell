import { View, Text } from "@tarojs/components";
import { useLoad } from "@tarojs/taro";
import type { FC } from "react";
import { AtButton, AtIcon } from "taro-ui";

const Home: FC = () => {
  useLoad(() => {
    console.log("Home page loaded.");
  });

  return (
    <View className="index">
      <Text className="text-2xl">123</Text>
      <Text
        style={{
          fontSize: "18px",
          fontWeight: "bold",
          display: "block",
          marginBottom: "20px",
        }}
      >
        Taro UI 样式测试
      </Text>

      <View
        style={{
          padding: "10px",
          marginBottom: "20px",
          backgroundColor: "#f5f5f5",
        }}
      >
        <Text
          style={{ display: "block", marginBottom: "10px", fontWeight: "bold" }}
        >
          Taro UI 按钮测试:
        </Text>

        <View style={{ marginBottom: "15px" }}>
          <Text>默认按钮:</Text>
          <AtButton>默认按钮</AtButton>
        </View>

        <View style={{ marginBottom: "15px" }}>
          <Text>主要按钮:</Text>
          <AtButton type="primary">主要按钮</AtButton>
        </View>

        <View style={{ marginBottom: "15px" }}>
          <Text>次要按钮:</Text>
          <AtButton type="secondary">次要按钮</AtButton>
        </View>

        <View style={{ marginBottom: "15px" }}>
          <Text>带图标按钮:</Text>
          <AtButton type="primary">
            <AtIcon value="heart" size="16" color="#fff"></AtIcon>
            喜欢
          </AtButton>
        </View>

        <View style={{ marginBottom: "15px" }}>
          <Text>圆形按钮:</Text>
          <AtButton type="primary" circle>
            圆
          </AtButton>
        </View>
      </View>

      <Text className="text-2xl font-bold text-center mb-6 text-blue-600">
        Tailwind CSS 测试页面
      </Text>

      {/* 布局测试 */}
      <View className="mb-6 p-4 bg-white rounded-lg shadow-sm">
        <Text className="text-lg font-semibold mb-3 text-gray-800">
          布局测试
        </Text>
        <View className="flex flex-col gap-3">
          <View className="p-3 bg-red-100 rounded">
            <Text className="text-red-800">红色容器</Text>
          </View>
          <View className="p-3 bg-green-100 rounded">
            <Text className="text-green-800">绿色容器</Text>
          </View>
          <View className="p-3 bg-blue-100 rounded">
            <Text className="text-blue-800">蓝色容器</Text>
          </View>
        </View>
      </View>

      {/* 文本样式测试 */}
      <View className="mb-6 p-4 bg-white rounded-lg shadow-sm">
        <Text className="text-lg font-semibold mb-3 text-gray-800">
          文本样式测试
        </Text>
        <View className="space-y-2">
          <Text className="text-xs text-gray-500">超小文本</Text>
          <Text className="text-sm text-gray-600">小文本</Text>
          <Text className="text-base text-gray-700">基础文本</Text>
          <Text className="text-lg text-gray-800">大文本</Text>
          <Text className="text-xl text-gray-900 font-bold">超大文本</Text>
        </View>
      </View>

      {/* 按钮测试 */}
      <View className="mb-6 p-4 bg-white rounded-lg shadow-sm">
        <Text className="text-lg font-semibold mb-3 text-gray-800">
          按钮测试
        </Text>
        <View className="flex flex-wrap gap-3">
          <View className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 active:bg-blue-700">
            <Text className="text-white">主要按钮</Text>
          </View>
          <View className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">
            <Text className="text-white">次要按钮</Text>
          </View>
          <View className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
            <Text className="text-white">成功按钮</Text>
          </View>
        </View>
      </View>

      {/* 响应式测试 */}
      <View className="p-4 bg-white rounded-lg shadow-sm">
        <Text className="text-lg font-semibold mb-3 text-gray-800">
          响应式测试
        </Text>
        <View className="grid grid-cols-2 gap-3 md:grid-cols-3">
          <View className="p-3 bg-purple-100 rounded text-center">
            <Text className="text-purple-800">项目 1</Text>
          </View>
          <View className="p-3 bg-yellow-100 rounded text-center">
            <Text className="text-yellow-800">项目 2</Text>
          </View>
          <View className="p-3 bg-pink-100 rounded text-center">
            <Text className="text-pink-800">项目 3</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Home;
