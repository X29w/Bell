import Taro from '@tarojs/taro';

const BASE_URL = process.env.TARO_APP_API_BASE_URL || 'http://localhost:3000/api';
const TOKEN_KEY = 'bell_token';

/** 获取本地存储的 token */
export const getToken = (): string => {
  return Taro.getStorageSync(TOKEN_KEY) || '';
};

/** 设置 token */
export const setToken = (token: string) => {
  Taro.setStorageSync(TOKEN_KEY, token);
};

/** 清除 token */
export const removeToken = () => {
  Taro.removeStorageSync(TOKEN_KEY);
};

/** 统一请求封装 */
async function request<T>(
  url: string,
  options: {
    method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
    data?: Record<string, unknown>;
  },
): Promise<T> {
  const token = getToken();
  const header: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (token) {
    header['Authorization'] = `Bearer ${token}`;
  }

  try {
    const res = await Taro.request<Common.ApiResponse<T>>({
      url: `${BASE_URL}${url}`,
      method: options.method,
      data: options.data,
      header,
    });

    const { code, message, data } = res.data;

    if (code === 401) {
      removeToken();
      Taro.navigateTo({ url: '/pages/inner/signin/index' });
      return Promise.reject(new Error(message));
    }

    if (code !== 200 && code !== 201) {
      Taro.showToast({ title: message, icon: 'none' });
      return Promise.reject(new Error(message));
    }

    return data;
  } catch (err) {
    Taro.showToast({ title: '网络请求失败', icon: 'none' });
    return Promise.reject(err);
  }
}

export const http = {
  get: <T>(url: string, data?: Record<string, unknown>) =>
    request<T>(url, { method: 'GET', data }),
  post: <T>(url: string, data?: Record<string, unknown>) =>
    request<T>(url, { method: 'POST', data }),
  put: <T>(url: string, data?: Record<string, unknown>) =>
    request<T>(url, { method: 'PUT', data }),
  patch: <T>(url: string, data?: Record<string, unknown>) =>
    request<T>(url, { method: 'PATCH', data }),
  delete: <T>(url: string, data?: Record<string, unknown>) =>
    request<T>(url, { method: 'DELETE', data }),
};
