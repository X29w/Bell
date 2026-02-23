import { Checkbox, Text, View } from "@tarojs/components";
import type { FC } from "react";
import "@/assets/styles/override.scss";
import { AtCheckbox } from "taro-ui";

interface SearchSortProps {}

const SearchSort: FC<SearchSortProps> = () => {
  const options = [
    {
      value: "list1",
      label: "",
    },
  ];

  const checkedList = ["list1"];
  return (
    <View>
      <View className="mt-4 flex items-center justify-between field2">
        <Text className="text-base text-black-1 font-medium">
          Expiry Date (Soonest first)
        </Text>
        <AtCheckbox
          className="checkbox"
          options={options}
          selectedList={checkedList}
          onChange={() => {}}
        />
      </View>
      <View className="mt-4 flex items-center justify-between field2">
        <Text className="text-base text-black-1 font-medium">
          Expiry Date (Furthest first)
        </Text>
        <AtCheckbox
          className="checkbox"
          options={options}
          selectedList={checkedList}
          onChange={() => {}}
        />
      </View>
    </View>
  );
};

export default SearchSort;
