import { getToken, removeToken } from './auth'
import env from './env'

function service(options: Parameters<typeof uni.request>[0]) {
  options.url = `${env.domain.test}${options.url}`;

  if (getToken()) {
    options.header = {
      'content-type': 'application/json',
      'Authorization': `${getToken()}`,
      ...(options.header || {})
    };
  }

  return new Promise((resolved, rejected) => {
    uni.showLoading({ title: '加载中' });
    // @ts-ignore
    options.success = (
      res: {
        data: { code: number, data: unknown, msg: string },
        statusCode: number
      }
    ) => {
      if (res.statusCode !== 200) {
        uni.showToast({
          icon: 'none',
          duration: 3000,
          title: `${res.statusCode}`
        });

        if (res.statusCode === 403) {
          removeToken()
          uni.reLaunch({
            url: '/pages/login/login'
          })
        }

        rejected(res)
      } else {
        resolved(res.data.data)
      }
    };

    options.fail = (err: {errMsg: string}) => {
      console.log(err)
      uni.showToast({
        icon: 'none',
        duration: 3000,
        title: '服务器错误,请稍后再试'
      });
      rejected(err);
    };

    options.complete = () => {
      uni.hideLoading();
    }

    uni.request(options);
  });
}

export default service;
