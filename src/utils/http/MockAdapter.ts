import { AxiosAdapter, AxiosInstance } from 'axios';
import { isArray } from '@/utils/types';
import type { CustomMockMethod } from '@root/mock';

const mockList: CustomMockMethod[] = Object.values(
  import.meta.glob('@root/mock/*', { eager: true, import: 'default' }),
)
  .filter(isArray)
  .flat();

/**
 * Axios mock 适配器
 */
export default class MockAdapter {
  axiosInstance: AxiosInstance;
  originAdapter: AxiosAdapter;
  constructor(axiosInstance: AxiosInstance) {
    this.axiosInstance = axiosInstance;
    this.originAdapter = axiosInstance.defaults.adapter!;
    this.setup();
  }
  setup() {
    this.axiosInstance.defaults.adapter = (config) => {
      const path = (config.baseURL ?? '') + (config.url ?? '');
      const mock = mockList.find(({ url }) => url === path);
      const that = { res: { statusCode: 200 } };
      if (mock) {
        return new Promise((resolve) => {
          const opts = {
            url: path,
            body: JSON.parse(config.data ?? '{}'),
            query: config.params,
            headers: { ...config.headers },
          };
          resolve({
            config,
            data: new Blob([JSON.stringify(mock.response.call(that, opts))], {
              type: 'application/json',
            }),
            headers: {} as any,
            status: that.res.statusCode,
            statusText: 'OK',
          });
        });
      } else {
        return this.originAdapter(config);
      }
    };
  }
  reset() {
    this.axiosInstance.defaults.adapter = this.originAdapter;
  }
}
