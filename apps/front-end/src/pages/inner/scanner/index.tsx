import { Image, Input, Picker, Text, View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { useState, useEffect, type FC } from "react";
import { AtIcon, AtList, AtListItem } from "taro-ui";
import { useAppSelector } from "@/store";
import { createCommodity } from "@/services/commodity";
import { getCategories } from "@/services/commodity";
import type { Category } from "@/types/commodity";

const Scanner: FC = () => {
  const { currentId } = useAppSelector((s) => s.space);
  const [selectedImage, setSelectedImage] = useState("");
  const [name, setName] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [categoryIndex, setCategoryIndex] = useState(-1);
  const [categories, setCategories] = useState<Category[]>([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (currentId) {
      getCategories(currentId).then(setCategories);
    }
  }, [currentId]);

  const handleChooseImage = async () => {
    try {
      const res = await Taro.chooseImage({
        count: 1,
        sizeType: ["original", "compressed"],
        sourceType: ["album", "camera"],
      });
      if (res.tempFilePaths?.length > 0) {
        setSelectedImage(res.tempFilePaths[0]);
      }
    } catch {
      Taro.showToast({ title: "选择图片失败", icon: "none" });
    }
  };

  const handleSave = async () => {
    if (!name) {
      Taro.showToast({ title: "请输入物品名称", icon: "none" });
      return;
    }
    if (!expiryDate) {
      Taro.showToast({ title: "请选择过期日期", icon: "none" });
      return;
    }
    if (!currentId) {
      Taro.showToast({ title: "请先创建或选择一个空间", icon: "none" });
      return;
    }

    setSaving(true);
    try {
      await createCommodity({
        name,
        expiryDate: new Date(expiryDate).toISOString(),
        spaceId: currentId,
        categoryId: categoryIndex >= 0 ? categories[categoryIndex]?.id : undefined,
        imageUrl: selectedImage || undefined,
      });
      Taro.showToast({ title: "添加成功", icon: "success" });
      setTimeout(() => Taro.navigateBack(), 500);
    } catch {
      // 错误已在 request 层处理
    } finally {
      setSaving(false);
    }
  };

  return (
    <View>
      <View className="h-16 flex flex-col justify-center">
        <View className="w-full flex justify-between items-center">
          <View className="w-2 h-2 bg-gray-200"></View>
          <Text className="text-lg text-black-1 font-bold">Scan and Add</Text>
          <View />
        </View>
      </View>

      <View className="p-4 bg-white">
        <View className="aspect-[358/243] bg-gray-200" onClick={handleChooseImage}>
          {selectedImage ? (
            <Image src={selectedImage} className="w-full h-full object-cover" mode="aspectFill" />
          ) : (
            <View className="w-full h-full flex flex-col items-center justify-center">
              <View className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center mb-2">
                <Text className="text-gray-500 text-2xl">+</Text>
              </View>
              <Text className="text-gray-500 text-sm">点击选择图片</Text>
            </View>
          )}
        </View>
      </View>

      <View className="px-4">
        <View>
          <Text className="text-xs text-gray-1 font-semibold">Item Name</Text>
          <View className="bg-white rounded-lg">
            <Input
              className="h-14 px-4"
              placeholder="输入物品名称"
              value={name}
              onInput={(e) => setName(e.detail.value)}
            />
          </View>
        </View>

        <View className="flex items-center gap-4">
          <View className="flex-1">
            <Text className="text-xs text-gray-1 font-semibold">Category</Text>
            <Picker
              mode="selector"
              range={categories.map((c) => c.name)}
              onChange={(e) => setCategoryIndex(Number(e.detail.value))}
            >
              <AtList>
                <AtListItem title={categoryIndex >= 0 ? categories[categoryIndex].name : "选择分类"} />
              </AtList>
            </Picker>
          </View>
          <View className="flex-1">
            <Text className="text-xs text-gray-1 font-semibold">Exp. Date</Text>
            <Picker mode="date" value={expiryDate} onChange={(e) => setExpiryDate(e.detail.value)}>
              <AtList>
                <AtListItem title={expiryDate || "选择日期"} />
              </AtList>
            </Picker>
          </View>
        </View>

        <View
          className={`w-full h-14 mt-5 grid place-items-center rounded-2xl ${saving ? "bg-blue-1/50" : "bg-blue-1"}`}
          onClick={saving ? undefined : handleSave}
        >
          <View className="flex gap-2 items-center">
            <AtIcon prefixClass="icon" value="dui" size="20" color="#ffffff" />
            <Text className="text-base text-white font-bold">{saving ? "保存中..." : "Save Item"}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Scanner;
