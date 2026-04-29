import Link from "@/components/config/link";
import RenderList from "@/components/config/render-list";
import { Text, View } from "@tarojs/components";
import Taro, { useDidShow } from "@tarojs/taro";
import { useState, type FC } from "react";
import { AtIcon } from "taro-ui";
import { getMySpaces, createSpace } from "@/services/space";

const Spaces: FC = () => {
  const [spaces, setSpaces] = useState<Space.Info[]>([]);

  const loadSpaces = async () => {
    const list = await getMySpaces();
    setSpaces(list);
  };

  useDidShow(() => {
    loadSpaces();
  });

  /** 创建新空间 */
  const handleCreate = async () => {
    const res = await Taro.showModal({
      title: "创建空间",
      editable: true,
      placeholderText: "输入空间名称",
    });
    if (!res.confirm || !res.content) return;

    const space = await createSpace({ name: res.content });
    Taro.navigateTo({ url: `/pages/inner/space-created/index?id=${space.id}&code=${space.inviteCode}` });
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
          {spaces.length === 0 ? (
            <View className="py-16 flex justify-center">
              <Text className="text-gray-2 text-sm">暂无空间，点击下方按钮创建</Text>
            </View>
          ) : (
            <RenderList
              items={spaces}
              extraKey={(item: Space.Info) => item.id}
              renderItems={(item: Space.Info) => (
                <Link to={`/pages/inner/space-detail/index?id=${item.id}`}>
                  <View className="h-24 p-4 flex justify-between items-center bg-white rounded-lg">
                    <View className="flex justify-between items-center gap-4">
                      <View className="w-14 h-14 bg-blue-1/10 rounded-lg" />
                      <View className="flex flex-col gap-1">
                        <Text className="text-lg font-bold text-black-1">{item.name}</Text>
                        <View className="flex items-center gap-2">
                          <Text className="text-sm text-gray-2">{item._count?.commodities ?? 0} items</Text>
                          <Text className="text-sm text-gray-2">{item._count?.members ?? 0} members</Text>
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

        <View className="w-full h-14 grid place-items-center rounded-xl bg-blue-1" onClick={handleCreate}>
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
