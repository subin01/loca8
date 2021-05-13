import { header, footer } from './partials'
import { welcomeTemplate } from './welcome-body'
import { returnTemplate } from './return-body'

export function htmlEmail({
  template = '',
  displayName = 'There',
  tid = '8888-8888',
  key = '00000000',
  name,
  phone,
  email,
  message,
}: any): string {
  let body = ''

  if (template == 'activation') body = welcomeTemplate({ displayName, tid, key })
  if (template == 'return') body = returnTemplate({ displayName, tid, name, phone, email, message })

  return header + body + footer
}
