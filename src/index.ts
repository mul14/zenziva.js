import axios from 'axios'

export interface Payload {
  userkey?: string,
  passkey?: string,
  nohp?: string,
  pesan?: string,
  instance?: string,
}

export interface Options {
  domain?: string,
  masking?: boolean,
  whatsappId?: string,
}

export interface Response {
  messageId: string,
  to: string,
  status: string,
  text: string,
}

export default function Zenziva(userkey: string, passkey: string, options?: Options) {

  const defaultOptions: Options = {
    domain: '',
    masking: false,
    whatsappId: '',
  }

  options = Object.assign(defaultOptions, options)

  return {
    options,

    async sms(phone: string, message: string): Promise<Response> {
      const url = `${this.url()}/sendsms/`

      return await this._send(url, {
        nohp: phone,
        pesan: message,
      })
    },

    async wa(phone: string, message: string): Promise<Response> {
      let url = `${this.url()}/sendWA/`

      const payload: Payload = {
        nohp: phone,
        pesan: message,
      }

      if (this.options.whatsappId) {
        url = `${this.url()}/WAsendMsg/`
        payload['instance'] = this.options.whatsappId
      }

      return await this._send(url, payload)
    },

    async voice(phone: string, message: string): Promise<Response> {
      const url = 'https://console.zenziva.net/voice/api/sendvoice/'

      return this._send(url, {
        to: phone,
        message,
      })
    },

    url(): string {
      const url = 'https://{domain}/api'

      if (options.domain) {
        return url.replace('{domain}', options.domain)
      }

      if (options.masking) {
        return url.replace('{domain}', 'masking.zenziva.net')
      }

      return url.replace('{domain}', 'gsm.zenziva.net')
    },

    async _send(url: string, payload: Payload): Promise<Response> {
      const http = axios.create()

      try {
        return await http.post(url, {
          userkey,
          passkey,
          ...payload,
        })

      } catch(e) {
        return e.response.data
      }
    },

  }
}
