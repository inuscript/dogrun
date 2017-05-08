
/**
 * @template T
 * @return {Promise<T>}
 */
export const lib = () => import("./lib")

const main = () => {
  lib()
}