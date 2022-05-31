import * as readFile from '../utils/readEnvFile'

export const setupDefine = () => {
  return {
    __VUEPRESS_ENV: readFile.readEnvFile(process.cwd() + '/.env'),
  }
}
