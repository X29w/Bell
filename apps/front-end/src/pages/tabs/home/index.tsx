import Link from "@/components/config/link";
import { View, Text } from "@tarojs/components";
import { useDidShow } from "@tarojs/taro";
import type { FC } from "react";
import { AtIcon } from "taro-ui";
import Statistic from "./components/statistic";
import SearchCommodity from "@/components/feature/search-commodity";
import Header from "./components/header";
import ExpiredSoonList from "./components/expired-soon-list";
import { useAppDispatch, useAppSelector } from "@/store";
import { fetchSpacesAsync } from "@/store/slice/space.slice";
import { fetchCommoditiesAsync, fetchStatisticsAsync } from "@/store/slice/commodity.slice";

const Home: FC = () => {
  const dispatch = useAppDispatch();
  const { currentId } = useAppSelector((s) => s.space);

  useDidShow(() => {
    dispatch(fetchSpacesAsync()).then((action) => {
      const spaces = action.payload;
      if (Array.isArray(spaces) && spaces.length > 0) {
        const spaceId = spaces[0].id;
        dispatch(fetchStatisticsAsync(spaceId));
        dispatch(fetchCommoditiesAsync({ spaceId }));
      }
    });
  });

  return (
    <View className="relative w-full h-full py-4 flex flex-col">
      <Header />

      <View className="flex-1 py-4 px-6">
        <Statistic />

        <SearchCommodity className="my-8" />

        <View className="mb-4 flex justify-between items-center">
          <Text className="text-black-1 font-bold text-lg">Expiring Soon</Text>
          <Link to="/pages/tabs/list/index">
            <Text className="text-blue-1 font-semibold text-sm">View All</Text>
          </Link>
        </View>

        <ExpiredSoonList />
      </View>

      <Link to="/pages/inner/scanner/index">
        <View className="fixed bottom-2 left-1/2 -translate-x-1/2 w-12 h-12 grid place-items-center bg-blue-1 rounded-full">
          <AtIcon prefixClass="icon" value="paizhao" size={30} color="#FFFFFF" />
        </View>
      </Link>
    </View>
  );
};

export default Home;
