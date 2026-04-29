import RenderList from "@/components/config/render-list";
import { Text, View } from "@tarojs/components";
import Taro, { useRouter } from "@tarojs/taro";
import { useState, useEffect, type FC } from "react";
import { AtIcon } from "taro-ui";
import { getSpaceDetail, deleteSpace, removeMember } from "@/services/space";
import { useAppDispatch } from "@/store";
import { setCurrentSpace } from "@/store/slice/space.slice";

const SpaceDetail: FC = () => {
  const router = useRouter();
  const id = router.params.id || "";
  const dispatch = useAppDispatch();
  const [space, setSpace] = useState<Space.Detail | null>(null);

  const loadDetail = async () => {
    if (!id) return;
    const detail = await getSpaceDetail(id);
    setSpace(detail);
  };

  useEffect(() => {
    loadDetail();
  }, [id]);

  /** 复制邀请码 */
  const handleCopy = () => {
    if (!space) return;
    Taro.setClipboardData({ data: space.inviteCode });
  };

  /** 切换到此空间 */
  const handleSwitch = () => {
    dispatch(setCurrentSpace(id));
    Taro.showToast({ title: "已切换", icon: "success" });
    setTimeout(() => Taro.switchTab({ url: "/pages/tabs/home/index" }), 500);
  };

  /** 删除空间 */
  const handleDelete = async () => {
    const res = await Taro.showModal({ title: "确认删除", content: "删除后所有物品将丢失" });
    if (!res.confirm) return;
    await deleteSpace(id);
    Taro.showToast({ title: "已删除", icon: "success" });
    setTimeout(() => Taro.navigateBack(), 500);
  };

  /** 移除成员 */
  const handleRemoveMember = async (userId: string) => {
    const res = await Taro.showModal({ title: "确认移除", content: "确定要移除该成员吗？" });
    if (!res.confirm) return;
    await removeMember(id, userId);
    loadDetail();
  };

  if (!space) {
    return (
      <View className="py-16 flex justify-center">
        <Text className="text-gray-2">加载中...</Text>
      </View>
    );
  }

  return (
    <View className="relative pb-40 pt-8">
      <View className="px-6">
        <View>
          <Text className="text-xs text-gray-1 font-semibold">Invite Code</Text>
          <View className="h-24 mt-3 px-5 flex justify-between items-center bg-blue-1/5 rounded-xl">
            <View className="flex flex-col">
              <Text className="text-blue-1 text-2xl font-bold">{space.inviteCode}</Text>
              <Text className="text-xs font-bold text-blue-1/60">Share this code to invite others</Text>
            </View>
            <View
              className="w-10 h-10 grid place-items-center rounded-xl bg-blue-1/10"
              onClick={handleCopy}
            >
              <AtIcon prefixClass="icon" value="fuzhi" size="20" color="#137FEC" />
            </View>
          </View>
        </View>

        <View className="mt-8 mb-4">
          <View className="flex justify-between items-center">
            <Text className="text-xs text-gray-1 font-semibold">Members</Text>
          </View>
        </View>

        <View>
          <RenderList
            items={space.members}
            extraKey={(m: Space.Member) => m.id}
            renderItems={(m: Space.Member) => (
              <View className="w-full h-16 flex flex-col justify-center">
                <View className="flex justify-between items-center">
                  <View className="flex items-center gap-4">
                    <View className="w-10 h-10 rounded-full bg-gray-200" />
                    <View className="flex flex-col">
                      <Text className="text-sm text-black-1 font-semibold">
                        {m.user.name || m.user.email}
                      </Text>
                      <Text className="text-xs text-gray-1 font-medium capitalize">{m.role}</Text>
                    </View>
                  </View>
                  {m.role === "owner" ? (
                    <View className="px-2 py-1 bg-blue-1/10 rounded-lg">
                      <Text className="text-xs text-blue-1 font-medium">Owner</Text>
                    </View>
                  ) : (
                    <Text
                      className="text-xs text-red-500 font-medium"
                      onClick={() => handleRemoveMember(m.userId)}
                    >
                      移除
                    </Text>
                  )}
                </View>
              </View>
            )}
          />
        </View>
      </View>

      <View className="fixed w-full bottom-0 left-0 h-40 px-6 flex flex-col justify-center gap-4 bg-white">
        <View
          className="h-14 flex justify-center items-center bg-blue-1 rounded-xl"
          onClick={handleSwitch}
        >
          <Text className="text-sm text-white font-semibold">Switch to this space</Text>
        </View>
        <View className="flex justify-center items-center">
          <Text className="text-sm text-red-500 font-semibold" onClick={handleDelete}>
            Delete Space
          </Text>
        </View>
      </View>
    </View>
  );
};

export default SpaceDetail;
