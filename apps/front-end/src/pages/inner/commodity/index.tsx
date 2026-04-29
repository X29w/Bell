import { Progress, Text, View } from "@tarojs/components";
import Taro, { useRouter } from "@tarojs/taro";
import { useState, useEffect, type FC } from "react";
import { AtIcon } from "taro-ui";
import { getCommodityDetail, updateCommodity, deleteCommodity } from "@/services/commodity";
import { upsertReminder, getReminder } from "@/services/commodity";

const CommodityDetail: FC = () => {
  const router = useRouter();
  const id = router.params.id || "";
  const [item, setItem] = useState<Commodity.Info | null>(null);
  const [reminder, setReminder] = useState<Commodity.Reminder | null>(null);
  const [daysBefore, setDaysBefore] = useState(2);

  /** 加载物品详情和提醒设置 */
  const loadData = async () => {
    if (!id) return;
    const detail = await getCommodityDetail(id);
    setItem(detail);

    const rem = await getReminder(id);
    if (rem) {
      setReminder(rem);
      setDaysBefore(rem.daysBefore);
    }
  };

  useEffect(() => {
    loadData();
  }, [id]);

  /** 计算过期天数 */
  const getDaysLeft = () => {
    if (!item) return 0;
    return Math.ceil((new Date(item.expiryDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
  };

  /** 计算进度条百分比（30 天为基准） */
  const getProgress = () => {
    const days = getDaysLeft();
    if (days <= 0) return 100;
    return Math.max(0, Math.min(100, ((30 - days) / 30) * 100));
  };

  /** 标记已使用 */
  const handleMarkUsed = async () => {
    await updateCommodity(id, { isUsed: true });
    Taro.showToast({ title: "已标记使用", icon: "success" });
    setTimeout(() => Taro.navigateBack(), 500);
  };

  /** 删除物品 */
  const handleDelete = async () => {
    const res = await Taro.showModal({ title: "确认删除", content: "删除后无法恢复" });
    if (!res.confirm) return;
    await deleteCommodity(id);
    Taro.showToast({ title: "已删除", icon: "success" });
    setTimeout(() => Taro.navigateBack(), 500);
  };

  /** 调整提醒天数 */
  const handleDaysChange = async (delta: number) => {
    const next = Math.max(1, Math.min(30, daysBefore + delta));
    setDaysBefore(next);
    await upsertReminder({ commodityId: id, daysBefore: next, isEnabled: true });
  };

  const daysLeft = getDaysLeft();
  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" });

  if (!item) {
    return (
      <View className="py-16 flex justify-center">
        <Text className="text-gray-2">加载中...</Text>
      </View>
    );
  }

  return (
    <View className="relative pb-24">
      <View className="w-full aspect-[390/320] bg-white" />

      <View className="px-6 mt-8">
        <Text className="text-3xl text-black-1 font-bold">{item.name}</Text>

        <View className="h-40 mt-8 p-6 bg-blue-1/5 rounded-xl">
          <View className="flex justify-between items-center">
            <Text className="text-sm text-blue-1 font-medium">Expiration Status</Text>
            <Text className="text-gray-2 text-xs">Exp: {formatDate(item.expiryDate)}</Text>
          </View>
          <View className="mt-4">
            <Text className="text-5xl text-blue-1 font-bold">
              {daysLeft > 0 ? String(daysLeft).padStart(2, "0") : "00"}
            </Text>
            <Text className="text-xl text-blue-1/70 font-medium">
              {daysLeft > 0 ? " days left" : " expired"}
            </Text>
          </View>
          <Progress className="mt-4" percent={getProgress()} strokeWidth={8} activeColor="#137FEC" />
        </View>

        <View className="mt-8">
          <Text className="text-xs text-gray-1 font-semibold">Notifications</Text>

          <View className="w-full h-21 p-4 mt-4 flex justify-between items-center bg-[#F8FAFC] rounded-xl border border-solid border-[#E2E8F0]">
            <View className="flex items-center gap-2">
              <View className="w-10 h-10 bg-gray-200 rounded-xl" />
              <View className="flex-1 flex flex-col">
                <Text className="text-sm font-medium text-black-1">Smart Reminder</Text>
                <Text className="text-xs text-gray-2">Alert before expiration</Text>
              </View>
            </View>
            <View className="flex items-center gap-3">
              <View className="w-24 h-12 flex flex-col justify-center border border-solid border-[#E2E8F0] rounded-xl">
                <View className="flex justify-around items-center">
                  <Text className="text-blue-1 text-lg" onClick={() => handleDaysChange(-1)}>-</Text>
                  <Text className="text-black-1 text-base font-bold">{daysBefore}</Text>
                  <Text className="text-blue-1 text-lg" onClick={() => handleDaysChange(1)}>+</Text>
                </View>
              </View>
              <Text className="text-xs font-medium">days</Text>
            </View>
          </View>

          <View className="fixed bottom-0 left-0 w-full h-24 px-6 flex flex-col justify-center bg-white">
            <View className="flex items-center gap-3">
              <View
                className="h-14 flex-1 grid place-items-center bg-blue-1 rounded-lg"
                onClick={handleMarkUsed}
              >
                <View className="flex items-center gap-2">
                  <AtIcon prefixClass="icon" value="dui" size="20" color="#ffffff" />
                  <Text className="text-base text-white font-bold">Mark as Used</Text>
                </View>
              </View>
              <View className="flex items-center gap-3">
                <View className="w-14 h-14 border border-solid border-[#F1F5F9] grid place-items-center rounded-lg">
                  <AtIcon prefixClass="icon" value="bianji" size="20" color="#64748B" />
                </View>
                <View
                  className="w-14 h-14 border border-solid border-[#FEF2F2] grid place-items-center rounded-lg"
                  onClick={handleDelete}
                >
                  <AtIcon prefixClass="icon" value="shanchu" size="20" color="#EF4444" />
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default CommodityDetail;
