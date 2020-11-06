# Zenziva Client for JavaScript / TypeScript

[Zenziva](https://www.zenziva.id/) provide services
to send SMS, WhatsApp, and voice message.

This library written in TypeScript, and it should
working properly on Node.js.

If this library not working for you,
or you found any kind of bugs, please create a new issue.

## Install

```
npm i zenziva
```

## Usage

The `.sms()`, `.wa()`, `.voice()` methods will return a Promise.
You can handle it with `.then` or `async`/`await`.

```js
// import zenziva from 'zenziva'

const zenziva = require('zenziva').default

const z = zenziva('userkey', 'passkey')

// SMS
z.sms('0812223333', 'Halo')

// WhatsApp
z.wa('6285551111', 'Halo')

// Voice Message
z.voice('0812223333', 'Halo')
```

```js
// SMS Masking
const z = zenziva('userkey', 'passkey', {
  masking: true,
})

z.sms('0812223333', 'Halo')
```

```js
// Zenziva Sms Center
const z = zenziva('userkey', 'passkey', {
  domain: 'domain_name.com',
})

z.sms('0812223333', 'Halo')
```

```js
// Zenziva WhatsApp Center
const z = zenziva('userkey', 'passkey', {
  domain: 'domain_name.com',
  whatsappId: '0987654321',
})

z.wa('6285551111', 'Halo')
```
