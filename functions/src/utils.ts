/* eslint-disable no-unused-vars */
import { iTagID } from './types'
import { TAG_FORMAT_REGEX } from './global_constants'

export function validateTagFormat(tid: iTagID) {
  return TAG_FORMAT_REGEX.test(tid)
}

export function validateKeyFormat(key: iTagID) {
  return TAG_FORMAT_REGEX.test(key)
}
