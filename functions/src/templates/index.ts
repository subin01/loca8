import { header, footer } from './partials'
import { welcomeTemplate } from './welcome-body'
import { returnTemplate } from './return-body'
import { MESSAGE_TYPE_ACTIVATION, MESSAGE_TYPE_RETURN } from '../global_constants'

export function htmlEmail({
  template = '',
  displayName = 'There',
  tid = '0000-0000',
  key = '00000000',
  name,
  phone,
  email,
  message,
}: any): string {
  let body = ''

  if (template === MESSAGE_TYPE_ACTIVATION) body = welcomeTemplate({ displayName, tid, phone, key })
  if (template === MESSAGE_TYPE_RETURN) body = returnTemplate({ displayName, tid, name, phone, email, message })

  return header + body + footer
}
