import { Input, View } from "@tarojs/components";
import type { FC } from "react";
import { AtIcon } from "taro-ui";

interface SearchCommodityProps {
  className?: string;
  placeholder?: string;
  searchIcon?: {
    color?: string;
    size?: number;
  };
  filterIcon?: {
    color?: string;
    size?: number;
  };
}

const SearchCommodity: FC<SearchCommodityProps> = ({
  className = "",
  placeholder = "Search inventory...",
  searchIcon = {
    color: "#94A3B8",
    size: 20,
  },
  filterIcon = {
    color: "#94A3B8",
    size: 20,
  },
}) => {
  return (
    <View className={`w-full h-12 flex items-center gap-3 ${className}`}>
      <View className="flex-1 flex items-center">
        <View className="w-12 h-12 grid place-items-center bg-white rounded-tl-2xl rounded-bl-2xl">
          <AtIcon
            prefixClass="icon"
            value="sousuo"
            color={searchIcon.color}
            size={searchIcon.size}
          />
        </View>
        <Input
          adjustPosition
          className="flex-1 h-12 pr-3 bg-white rounded-tr-2xl rounded-br-2xl"
          placeholder={placeholder}
        />
      </View>
      <View className="w-12 h-full grid place-items-center bg-white rounded-2xl">
        <AtIcon
          prefixClass="icon"
          value="shaixuan"
          color={filterIcon.color}
          size={filterIcon.size}
        />
      </View>
    </View>
  );
};

export default SearchCommodity;
