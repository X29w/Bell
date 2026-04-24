import { Progress, Text, View } from "@tarojs/components";
import Taro, { useRouter } from "@tarojs/taro";
import { useState, useEffect, type FC } from "react";
import { AtIcon } from "taro-ui";
import { getCommodityDetail, updateCommodity, deleteCommodity, upsertReminder, getReminder } from "@/services/commodity";
import type { Commodity as CommodityType } from "@/types/commodity";

const Commodity: FC = () => {
  const router = useRouter();
  const id = router.params.id || "";
  const [item, setItem] = useState<CommodityType | null>(null);
  const [daysBefore, setDaysBefore] = useState(2);

  useEffect(() => {
    if (!id) return;
    getCommodityDetail(id).then(setItem);
    getReminder(id).then((r) => {
      if (r) {
        setDaysBefore(r.daysBefore);
      }
    });
  }, [id]);

  if (!item) {
    return (
      <View className="py-16 flex justify-center">
        <Text className="text-gray-2">加载中...</Text>
      </View>
    );
  }

  const now = new Date();
  const expiry = new Date(item.expiryDate);
  const diffDays = Math.ceil((expiry.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  const totalDays = Math.ceil((expiry.getTime() - new Date(item.createdAt).getTime()) / (1000 * 60 * 60 * 24));
  const percent = totalDays > 0 ? Math.max(0, Math.min(100, (diffDays / totalDays) * 100)) : 0;

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" });

  const handleMarkUsed = async () => {
    await updateCommodity(id, { isUsed: true });
    Taro.showToast({ title: "已标记使用", icon: "success" });
    setTimeout(() => Taro.navigateBack(), 500);
  };

  const handleDelete = async () => {
    await deleteCommodity(id);
    Taro.showToast({ title: "已删除", icon: "success" });
    setTimeout(() => Taro.navigateBack(), 500);
  };

  const handleUpdateReminder = async (newDays: number) => {
    if (newDays < 1 || newDays > 30) return;
    setDaysBefore(newDays);
    await upsertReminder({ commodityId: id, daysBefore: newDays, isEnabled: true });
  };

  return (
    <View className="relative pb-24">
      <View className="w-full aspect-[390/320] bg-white"></View>

      <View className="px-6 mt-8">
        <Text className="text-3xl text-black-1 font-bold">{item.name}</Text>

        <View className="h-40 mt-8 p-6 bg-blue-1/5 rounded-xl">
          <View className="flex justify-between items-center">
            <Text className="text-sm text-blue-1 font-medium">Expiration Status</Text>
            <Text className="text-gray-2 text-xs">Exp: {formatDate(item.expiryDate)}</Text>
          </View>
          <View className="mt-4">
            <Text className="text-5xl text-blue-1 font-bold">
              {diffDays < 0 ? 0 : String(diffDays).padStart(2, "0")}
            </Text>
            <Text className="text-xl text-blue-1/70 font-medium">
              {diffDays < 0 ? " expired" : " days left"}
            </Text>
          </View>
          <Progress className="mt-4" percent={percent} strokeWidth={8} activeColor="#137FEC" />
        </View>

        <View className="mt-8">
          <Text className="text-xs text-gray-1 font-semibold">Notifications</Text>

          <View className="w-full p-4 mt-4 flex justify-between items-center bg-[#F8FAFC] rounded-xl border border-solid border-[#E2E8F0]">
            <View className="flex items-center gap-2">
              <View className="w-10 h-10 bg-blue-1/10 rounded-xl grid place-items-center">
                <AtIcon prefixClass="icon" value="lingdang" size="20" color="#137FEC" />
              </View>
              <View className="flex-1 flex flex-col">
                <Text className="text-sm font-medium text-black-1">Smart Reminder</Text>
                <Text className="text-xs text-gray-2">Alert before expiration</Text>
              </View>
            </View>
            <View className="flex items-center gap-3">
              <View className="w-24 h-12 flex flex-col justify-center border border-solid border-[#E2E8F0] rounded-xl">
                <View className="flex justify-around items-center">
                  <Text className="text-blue-1 text-lg" onClick={() => handleUpdateReminder(daysBefore - 1)}>-</Text>
                  <Text className="text-black-1 text-base font-bold">{daysBefore}</Text>
                  <Text className="text-blue-1 text-lg" onClick={() => handleUpdateReminder(daysBefore + 1)}>+</Text>
                </View>
              </View>
              <Text className="text-xs font-medium">days</Text>
            </View>
          </View>
        </View>
      </View>

      <View className="fixed bottom-0 left-0 w-full h-24 px-6 flex flex-col justify-center bg-white">
        <View className="flex items-center gap-3">
          <View className="h-14 flex-1 grid place-items-center bg-blue-1 rounded-lg" onClick={handleMarkUsed}>
            <View className="flex items-center gap-2">
              <AtIcon prefixClass="icon" value="dui" size="20" color="#ffffff" />
              <Text className="text-base text-white font-bold">Mark as Used</Text>
            </View>
          </View>
          <View
            className="w-14 h-14 grid place-items-center border border-solid border-[#FEF2F2] rounded-lg"
            onClick={handleDelete}
          >
            <AtIcon prefixClass="icon" value="cuowu1" size="20" color="#EF4444" />
          </View>
        </View>
      </View>
    </View>
  );
};

export default Commodity;
