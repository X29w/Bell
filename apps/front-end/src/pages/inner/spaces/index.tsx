import Link from "@/components/config/link";
import RenderList from "@/components/config/render-list";
import { Input, Text, View } from "@tarojs/components";
import Taro, { useDidShow } from "@tarojs/taro";
import { useState, type FC } from "react";
import { AtIcon } from "taro-ui";
import { useAppDispatch, useAppSelector } from "@/store";
import { fetchSpacesAsync } from "@/store/slice/space.slice";
import { createSpace } from "@/services/space";
import type { Space } from "@/types/space";

const Spaces: FC = () => {
  const dispatch = useAppDispatch();
  const { list } = useAppSelector((s) => s.space);
  const [showCreate, setShowCreate] = useState(false);
  const [newName, setNewName] = useState("");

  useDidShow(() => {
    dispatch(fetchSpacesAsync());
  });

  const handleCreate = async () => {
    if (!newName.trim()) {
      Taro.showToast({ title: "请输入空间名称", icon: "none" });
      return;
    }
    try {
      const space = await createSpace({ name: newName.trim() });
      setNewName("");
      setShowCreate(false);
      dispatch(fetchSpacesAsync());
      Taro.navigateTo({ url: `/pages/inner/space-created/index?code=${space.inviteCode}&name=${space.name}` });
    } catch {
      // 错误已在 request 层处理
    }
  };

  return (
    <View>
      <View className="w-full h-16 flex items-center justify-between px-4">
        <View />
        <Text className="text-lg font-semibold text-black-1">Manage Spaces</Text>
        <View />
      </View>

      <View className="px-4">
        <View className="flex flex-col gap-4">
          {list.length === 0 ? (
            <View className="py-8 flex justify-center">
              <Text className="text-gray-2 text-sm">暂无空间，创建一个吧</Text>
            </View>
          ) : (
            <RenderList
              items={list}
              extraKey={(item: Space) => item.id}
              renderItems={(item: Space) => (
                <Link to={`/pages/inner/space-detail/index?id=${item.id}`}>
                  <View className="h-24 p-4 flex justify-between items-center bg-white rounded-lg">
                    <View className="flex justify-between items-center gap-4">
                      <View className="w-14 h-14 bg-blue-1/10 rounded-lg"></View>
                      <View className="flex flex-col gap-1">
                        <Text className="text-lg font-bold text-black-1">{item.name}</Text>
                        <View className="flex items-center gap-2">
                          <Text className="text-sm text-gray-2">{item._count?.commodities || 0} items</Text>
                          <Text className="text-sm text-gray-2">{item._count?.members || 0} members</Text>
                        </View>
                      </View>
                    </View>
                    <AtIcon value="chevron-right" size="20" color="#CBD5E1" />
                  </View>
                </Link>
              )}
            />
          )}
        </View>

        <View className="w-full h-40 mt-8 mb-14 p-6 flex gap-4 bg-blue-1/5 rounded-xl border border-dashed border-blue-1/20">
          <View className="w-8 h-8 grid place-items-center bg-blue-1/10 rounded-full">
            <AtIcon prefixClass="icon" value="xiangfa" size="18" color="#137FEC" />
          </View>
          <View className="flex-1 flex flex-col gap-1">
            <Text className="text-base text-blue-1 font-semibold">Pro Tip</Text>
            <Text className="text-sm text-[#475569]">
              Organize your spaces by location or purpose to track items more efficiently across multiple properties.
            </Text>
          </View>
        </View>

        {showCreate && (
          <View className="mb-4 flex items-center gap-2">
            <Input
              className="flex-1 h-14 px-4 bg-white rounded-xl border border-solid border-[#E2E8F0]"
              placeholder="空间名称"
              value={newName}
              onInput={(e) => setNewName(e.detail.value)}
            />
            <View className="h-14 px-4 grid place-items-center bg-blue-1 rounded-xl" onClick={handleCreate}>
              <Text className="text-white text-sm font-bold">确定</Text>
            </View>
          </View>
        )}

        <View
          className="w-full h-14 grid place-items-center rounded-xl bg-blue-1"
          onClick={() => setShowCreate(!showCreate)}
        >
          <View className="flex items-center gap-2">
            <AtIcon prefixClass="icon" value="jia" size="18" color="#ffffff" />
            <Text className="text-base text-white font-bold">Create New Space</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Spaces;
