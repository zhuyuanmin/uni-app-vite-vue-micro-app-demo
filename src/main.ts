import { createSSRApp } from "vue";
import { setupStore } from '@/store'
import App from "./App.vue";

const showToast = (title: string | object) => uni.showToast(typeof title === 'object' ? title : { title });

export function createApp() {
  const app = createSSRApp(App);
  setupStore(app);
  app.config.globalProperties.$toast = showToast;

  return { app };
}
