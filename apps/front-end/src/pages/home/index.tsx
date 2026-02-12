import { View, Text } from "@tarojs/components";
import { useLoad } from "@tarojs/taro";
import type { FC } from "react";
import { AtButton, AtIcon } from 'taro-ui';

const Home: FC = () => {
	useLoad(() => {
		console.log("Home page loaded.");
	});
	
	return (
		<View className="index">
			<Text style={{ fontSize: '18px', fontWeight: 'bold', display: 'block', marginBottom: '20px' }}>
				Taro UI 样式测试
			</Text>
			
			<View style={{ padding: '10px', marginBottom: '20px', backgroundColor: '#f5f5f5' }}>
				<Text style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold' }}>Taro UI 按钮测试:</Text>
				
				<View style={{ marginBottom: '15px' }}>
					<Text>默认按钮:</Text>
					<AtButton>默认按钮</AtButton>
				</View>
				
				<View style={{ marginBottom: '15px' }}>
					<Text>主要按钮:</Text>
					<AtButton type='primary'>主要按钮</AtButton>
				</View>
				
				<View style={{ marginBottom: '15px' }}>
					<Text>次要按钮:</Text>
					<AtButton type='secondary'>次要按钮</AtButton>
				</View>
				
				<View style={{ marginBottom: '15px' }}>
					<Text>带图标按钮:</Text>
					<AtButton type='primary'>
						<AtIcon value='heart' size='16' color='#fff'></AtIcon>
						喜欢
					</AtButton>
				</View>
				
				<View style={{ marginBottom: '15px' }}>
					<Text>圆形按钮:</Text>
					<AtButton type='primary' circle>圆</AtButton>
				</View>
			</View>
			
			<View style={{ padding: '10px', backgroundColor: '#e8f4fd' }}>
				<Text style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold' }}>
					调试信息:
				</Text>
				<Text style={{ fontSize: '14px', color: '#666' }}>
					• 如果按钮有背景色和圆角，说明样式正常
				</Text>
				<Text style={{ fontSize: '14px', color: '#666' }}>
					• 如果只有文字没有样式，说明样式导入有问题
				</Text>
			</View>
		</View>
	);
};

export default Home;