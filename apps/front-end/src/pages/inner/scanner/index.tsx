import { Input, Picker, Text, View } from "@tarojs/components";
import type { FC } from "react";
import { AtList, AtListItem } from "taro-ui";

const Scanner: FC = () => {
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
        <View className="aspect-[358/243] bg-gray-200"></View>
      </View>

      <View className="px-4">
        <View>
          <Text className="text-xs text-gray-1 font-semibold">Item Name</Text>
          <Input />
        </View>

        <View>
          <Text className="text-xs text-gray-1 font-semibold">Category</Text>
          <Picker
            mode="selector"
            range={["美国", "中国", "巴西", "日本"]}
            onChange={() => {}}
          >
            <AtList>
              <AtListItem title="国家地区" />
            </AtList>
          </Picker>
        </View>
        <View>
          <Text className="text-xs text-gray-1 font-semibold">Exp. Date</Text>
          <Picker mode="date" value="" onChange={() => {}}>
            <AtList>
              <AtListItem title="请选择日期" />
            </AtList>
          </Picker>
        </View>
      </View>
    </View>
  );
};

export default Scanner;
