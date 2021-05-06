import { TagID } from 'types'

export function validateTagFormat(tid: TagID) {
  const t = tid.trim()
  return !(t.startsWith('0') || t.length < 6 || t.length > 8)
}
