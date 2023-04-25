const tokenKey: string = 'token';

// 获取 token
export function getToken(): string {
  return uni.getStorageSync(tokenKey)
}

// 设置 token
export function setToken(token: string): void {
  uni.setStorageSync(tokenKey, token)
}

// 移除 token
export function removeToken(): void {
  uni.removeStorageSync(tokenKey)
}
