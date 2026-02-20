import Link from "@/components/config/link";
import RenderList from "@/components/config/render-list";
import { View, Text, Input, ScrollView } from "@tarojs/components";
import { useLoad } from "@tarojs/taro";
import type { FC } from "react";
import { AtIcon } from "taro-ui";
import Statistic from "./components/statistic";
import SearchCommodity from "@/components/feature/search-commodity";
import Header from "./components/header";
import ExpiredSoonList from "./components/expired-soon-list";

const Home: FC = () => {
  useLoad(() => {
    console.log("Home page loaded.");
  });

  return (
    <View className="relative w-full h-full py-4 flex flex-col">
      <Header />

      <View className="flex-1 py-4 px-6">
        <Statistic />

        <SearchCommodity />

        <View className="mb-4 flex justify-between items-center">
          <Text className="text-black-1 font-bold text-lg">Expiring Soon</Text>
          <Text className="text-blue-1 font-semibold text-sm">View All</Text>
        </View>

        <ExpiredSoonList />
      </View>

      <Link to="/pages/inner/scanner/index">
        <View className="fixed bottom-2 left-1/2 -translate-x-1/2 w-12 h-12 grid place-items-center bg-blue-1 rounded-full">
          <AtIcon
            prefixClass="icon"
            value="paizhao"
            size={30}
            color="#FFFFFF"
          />
        </View>
      </Link>
    </View>
  );
};

export default Home;
