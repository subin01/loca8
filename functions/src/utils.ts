/* eslint-disable no-unused-vars */
import { iTagID } from './types'
import { TAG_FORMAT_REGEX } from './global_constants'

export function validateTagFormat(tid: iTagID) {
  return TAG_FORMAT_REGEX.test(tid)
}

export function validateKeyFormat(key: iTagID) {
  return TAG_FORMAT_REGEX.test(key)
}

export function trimName(name: string): string {
  if (name.length <= 15) return name
  const firstSpace = name.search(' ') // first space
  const trimAt = firstSpace >= 3 && firstSpace < 15 ? firstSpace : 15
  return name.substring(0, trimAt)
}

export function trimTagname(name: string): string {
  return name.substring(0, 25)
}
