import Link from "@/components/config/link";
import RenderList from "@/components/config/render-list";
import SearchCommodity from "@/components/feature/search-commodity";
import { Text, View } from "@tarojs/components";
import { useDidShow } from "@tarojs/taro";
import type { FC } from "react";
import { AtSwipeAction } from "taro-ui";
import { useAppDispatch, useAppSelector } from "@/store";
import { setCommodities } from "@/store/slice/commodity.slice";
import { getCommodities, deleteCommodity, updateCommodity } from "@/services/commodity";
import CurrentStatus from "../home/components/expired-soon-list/current-status";

const List: FC = () => {
  const dispatch = useAppDispatch();
  const { list } = useAppSelector((s) => s.commodity);
  const { currentId } = useAppSelector((s) => s.space);

  /** 加载物品列表 */
  const loadList = async () => {
    if (!currentId) return;
    const items = await getCommodities({ spaceId: currentId });
    dispatch(setCommodities(items));
  };

  useDidShow(() => {
    loadList();
  });

  /** 标记已使用 */
  const handleMarkUsed = async (id: string) => {
    await updateCommodity(id, { isUsed: true });
    loadList();
  };

  /** 删除物品 */
  const handleDelete = async (id: string) => {
    await deleteCommodity(id);
    loadList();
  };

  /** 格式化日期 */
  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" });
  };

  return (
    <View className="px-4">
      <SearchCommodity className="my-8" />

      <View className="w-full flex flex-col gap-3 field1">
        {list.length === 0 ? (
          <View className="py-16 flex justify-center">
            <Text className="text-gray-2 text-sm">暂无物品，点击底部按钮添加</Text>
          </View>
        ) : (
          <RenderList
            items={list}
            extraKey={(item: Commodity.Info) => item.id}
            renderItems={(item: Commodity.Info) => (
              <AtSwipeAction
                autoClose
                options={[
                  { text: "已使用", style: { backgroundColor: "#137FEC" } },
                  { text: "删除", style: { backgroundColor: "#EF4444" } },
                ]}
                onClick={(e) => {
                  if (e.text === "已使用") handleMarkUsed(item.id);
                  if (e.text === "删除") handleDelete(item.id);
                }}
              >
                <Link to={`/pages/inner/commodity/index?id=${item.id}`}>
                  <View className="w-full h-24 flex flex-col justify-center border-l-4 border-l-[#10B981] rounded-lg bg-white">
                    <View className="w-full px-4 flex justify-between items-start">
                      <View className="flex items-center gap-4">
                        <View className="w-14 h-14 bg-gray-200 rounded-lg" />
                        <View className="flex flex-col">
                          <Text className="text-base font-bold text-black-1">{item.name}</Text>
                          <Text className="text-xs text-gray-2">{item.location || ""}</Text>
                          <Text className="text-xs text-gray-1">Exp: {formatDate(item.expiryDate)}</Text>
                        </View>
                      </View>
                      <CurrentStatus expiryDate={item.expiryDate} />
                    </View>
                  </View>
                </Link>
              </AtSwipeAction>
            )}
          />
        )}
      </View>
    </View>
  );
};

export default List;
