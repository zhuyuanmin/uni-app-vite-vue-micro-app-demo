import { defineStore } from 'pinia'

export const useAppStore = defineStore({
  id: 'app-store',
  state: () => ({ test: '测试数据' }),
  getters: {
    getTest(): string {
      return this.test
    }
  },
  actions: {
    changeVal() {
      this.test = '改变测试数据为123'
    }
  }
})