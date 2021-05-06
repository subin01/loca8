/* eslint-disable no-unused-vars */
import { iTagID } from '../../../types'

export function validateTagFormat(tid: iTagID) {
  const t = tid.trim()
  return !(t.startsWith('0') || t.length < 6 || t.length > 8)
}
