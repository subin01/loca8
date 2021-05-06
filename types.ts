import { SERVER_ERROR, TAG_INVALID, TAG_STATUS_REGISTERED, TAG_STATUS_UNREGISTERED } from './constants'
export type iTagID = string

export type iSERVER_ERROR = typeof SERVER_ERROR
export type iTAG_INVALID = typeof TAG_INVALID
export type iTAG_STATUS_REGISTERED = typeof TAG_STATUS_REGISTERED
export type iTAG_STATUS_UNREGISTERED = typeof TAG_STATUS_UNREGISTERED

export type iTagVerifyErrorType = iSERVER_ERROR | iTAG_INVALID | iTAG_STATUS_REGISTERED | iTAG_STATUS_UNREGISTERED
export type iNotifyOwnerErrorTypes = iTagVerifyErrorType

export interface iTagVerifyResponse {
  error: boolean
  message: string
  errorType: iTagVerifyErrorType
}

export interface iReturnForm {
  name: string
  phone: number
  email: string
  message?: string
}
