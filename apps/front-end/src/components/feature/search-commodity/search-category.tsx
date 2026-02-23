import RenderList from "@/components/config/render-list";
import { Text, View } from "@tarojs/components";
import type { FC } from "react";

interface SearchCategoryProps {
  value: string;
  onChange: (value: string) => void;
}

const SearchCategory: FC<SearchCategoryProps> = ({ value, onChange }) => {
  const list = [
    {
      label: "All",
    },
    {
      label: "Medical",
    },
    {
      label: "cook",
    },
  ];

  return (
    <View className="mt-4 flex flex-wrap gap-3">
      <RenderList
        items={list}
        renderItems={(item) => (
          <View
            className={`px-4 py-2 border border-solid rounded-3xl ${value === item.label ? "bg-blue-1/10 border-blue-1" : "border-[#E2E8F0] bg-white"}`}
            onClick={() => onChange(item.label)}
          >
            <Text
              className={`text-sm ${value === item.label ? "text-blue-1" : "text-black-1"}`}
            >
              {item.label}
            </Text>
          </View>
        )}
      />
    </View>
  );
};

export default SearchCategory;
