<template>
  <view class="content">
    {{ test }}
  </view>
  <button @click="handleClick">点我啊</button>
  <uni-badge text="1"></uni-badge>
  <view @click="jumpTo">去分包页面</view>
  <view @click="requestHandle">发送网络请求</view>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useAppStore } from '@/store/modules/app'
import { login } from '@/api/user'


const useAppState = useAppStore()

const test = computed(() => useAppState.getTest)

const handleClick = () => {
  useAppState.changeVal()
}

const jumpTo = () => {
  uni.navigateTo({
    url: '/subPackages/demo/index'
  })
}

const requestHandle = () => {
  login({ abc: 123 }).then(res => {
    console.log(res)
  })
}

</script>

<style scoped lang="scss">
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 350rpx;
}

.logo {
  height: 200rpx;
  width: 200rpx;
  margin-top: 200rpx;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 50rpx;
}

.text-area {
  display: flex;
  justify-content: center;
}

.title {
  font-size: 36rpx;
  color: #8f8f94;
}
</style>
