import RenderList from "@/components/config/render-list";
import { Checkbox, Text, View } from "@tarojs/components";
import { useState, type FC } from "react";
import { AtCheckbox, AtFloatLayout, AtIcon } from "taro-ui";
import SearchStatus from "./search-status";
import SearchCategory from "./search-category";
import SearchSort from "./search-sort";

interface SearchFilterProps {
  color: string;
  size: number;
}

const SearchFilter: FC<SearchFilterProps> = ({ color, size }) => {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<string>("Expired");
  const [category, setCategory] = useState<string>("All");

  return (
    <>
      <View
        className="w-12 h-full grid place-items-center bg-white rounded-2xl"
        onClick={() => setOpen(true)}
      >
        <AtIcon prefixClass="icon" value="shaixuan" color={color} size={size} />
      </View>
      <AtFloatLayout isOpened={open} onClose={() => setOpen(false)}>
        <View className="relative px-6 pb-24 pt-14">
          <View className="fixed top-0 left-0 right-0 w-full h-14 flex flex-col justify-center px-6 bg-white">
            <View className="flex items-center justify-between">
              <Text className="text-black-1 text-xl font-bold">
                Filter & Sort
              </Text>
              <Text className="text-blue-1 text-sm font-semibold">Reset</Text>
            </View>
          </View>

          <View>
            <Text className="text-xs text-gray-1 font-semibold">SORT BY</Text>
            <SearchSort />
          </View>

          <View className="mt-6">
            <Text className="text-xs text-gray-1 font-semibold">STATUS</Text>
            <SearchStatus value={status} onChange={setStatus} />
          </View>

          <View className="mt-6">
            <Text className="text-xs text-gray-1 font-semibold">CATEGORY</Text>
            <SearchCategory value={category} onChange={setCategory} />
          </View>

          <View className="fixed bottom-0 left-0 right-0 w-full h-24 px-6 flex flex-col justify-center bg-white border-t border-t-gray-1/40">
            <View className="w-full h-14 grid place-items-center rounded-xl bg-blue-1">
              <Text className="text-white text-base font-bold">
                Apply Filters
              </Text>
            </View>
          </View>
        </View>
      </AtFloatLayout>
    </>
  );
};

export default SearchFilter;
