/**
 * @author heart
 * @description 设置默认参数
 * @Date 2022-07-02
 */
import * as readFile from '../utils/readEnvFile'
// https://vuepress.github.io/zh/advanced/cookbook/passing-data-to-client-code.html#%E4%BD%BF%E7%94%A8-define-hook
// 定义客户端全局常量
export const setupDefine = () => {
  return {
    __VUEPRESS_ENV: readFile.readEnvFile(process.cwd() + '/.env'),
  }
}
