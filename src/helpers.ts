import { customAlphabet } from 'nanoid'

/**
 * Generate random code. This uses the nanoid library
 * under the hood
 *
 * @param {Number} length - Number of characters to generate
 */
export const randomCode = (length: number): string => {
  const generator = customAlphabet('0123456789', length)
  return generator()
}
