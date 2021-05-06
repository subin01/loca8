export type ITagID = string

export const SERVER_ERROR = 'server_error'
export type SERVER_ERROR = typeof SERVER_ERROR
export const TAG_INVALID = 'invalid'
export type TAG_INVALID = typeof TAG_INVALID
export const TAG_STATUS_REGISTERED = 'registered'
export type TAG_STATUS_REGISTERED = typeof TAG_STATUS_REGISTERED
export const TAG_STATUS_UNREGISTERED = 'unregistered'
export type TAG_STATUS_UNREGISTERED = typeof TAG_STATUS_UNREGISTERED

export type TagVerifyErrorType = SERVER_ERROR | TAG_INVALID | TAG_STATUS_REGISTERED | TAG_STATUS_UNREGISTERED
export interface ITagVerifyResponse {
  error: boolean
  message: string
  errorType: TagVerifyErrorType
}
