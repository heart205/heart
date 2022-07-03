/**
 * @author heart
 * @description 设置默认参数
 * @Date 2022-07-02
 */
import * as readFile from '../utils/readEnvFile'

export const setupDefine = () => {
  return {
    __VUEPRESS_ENV: readFile.readEnvFile(process.cwd() + '/.env'),
  }
}
