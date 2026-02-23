import { Text, View } from "@tarojs/components";
import { useState, type FC } from "react";

interface SearchStatusProps {
  value: string;
  onChange: (value: string) => void;
}

const SearchStatus: FC<SearchStatusProps> = ({ value, onChange }) => {
  const handleSelect = (status: string) => onChange(status);

  return (
    <View className="mt-4 flex flex-wrap gap-3">
      <View
        className={`flex items-center gap-2 px-4 py-2.5 rounded-3xl  border border-solid  ${value === "Expired" ? "bg-blue-1/10 border-blue-1" : "border-red-1 bg-[#FEE2E2]"}`}
        onClick={() => handleSelect("Expired")}
      >
        <View
          className={`w-2 h-2 rounded-full ${value === "Expired" ? "bg-blue-1" : "bg-red-1"}`}
        />
        <Text
          className={`text-sm font-medium ${value === "Expired" ? "text-blue-1" : "text-red-1"}`}
        >
          Expired
        </Text>
      </View>
      <View
        className={`flex items-center gap-2 px-4 py-2.5 rounded-3xl  border border-solid  ${value === "Soon" ? "bg-blue-1/10 border-blue-1" : "border-[#D97706] bg-[#FEF3C7]"}`}
        onClick={() => handleSelect("Soon")}
      >
        <View
          className={`w-2 h-2 rounded-full ${value === "Soon" ? "bg-blue-1" : "bg-[#D97706]"}`}
        />
        <Text
          className={`text-sm font-medium ${value === "Soon" ? "text-blue-1" : "text-[#D97706]"}`}
        >
          Soon
        </Text>
      </View>
      <View
        className={`flex items-center gap-2 px-4 py-2.5 rounded-3xl  border border-solid  ${value === "Fresh" ? "bg-blue-1/10 border-blue-1" : "border-[#16A34A] bg-[#DCFCE7]"}`}
        onClick={() => handleSelect("Fresh")}
      >
        <View
          className={`w-2 h-2 rounded-full ${value === "Fresh" ? "bg-blue-1" : "bg-[#16A34A]"}`}
        />
        <Text
          className={`text-sm font-medium ${value === "Fresh" ? "text-blue-1" : "text-[#16A34A]"}`}
        >
          Fresh
        </Text>
      </View>
    </View>
  );
};

export default SearchStatus;
