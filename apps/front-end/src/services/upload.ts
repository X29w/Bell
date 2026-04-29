import Taro from '@tarojs/taro';
import { getToken } from '@/utils/config/request';

const BASE_URL = process.env.TARO_APP_API_BASE_URL || 'http://localhost:3000/api';

/**
 * 上传图片
 * @param filePath 本地临时文件路径（Taro.chooseImage 返回的 tempFilePaths）
 * @returns 图片可访问 URL
 */
export const uploadImage = async (filePath: string): Promise<string> => {
  const token = getToken();

  const res = await Taro.uploadFile({
    url: `${BASE_URL}/upload`,
    filePath,
    name: 'file',
    header: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = JSON.parse(res.data) as Common.ApiResponse<{ url: string }>;

  if (data.code !== 200 && data.code !== 201) {
    Taro.showToast({ title: data.message, icon: 'none' });
    return Promise.reject(new Error(data.message));
  }

  return data.data.url;
};
