# Minecraft RCon Client

A simple asynchronous RCon Client for NodeJS with TypeScript support.

## Installation

You will also need to install the
[Signal](https://github.com/CalmDownVal/signal) peer dependency.

```sh
# using Npm
npm install @calmdownval/mc-rcon @calmdownval/signal

# using Yarn
yarn add @calmdownval/mc-rcon @calmdownval/signal
```

## Example Usage

This script will connect to a Minecraft Server's RCon port, log in and execute
the `say Hello, World!` command.

```ts
import { Client } from '@calmdownval/mc-rcon';

const RCON_HOSTNAME = 'mc.your-server.com';
const RCON_PORT = 25575;
const RCON_PASSWORD = 'sup3r-s3cr3t';

(async () => {
  const client = new Client();
  try {
    await client.connect(RCON_HOSTNAME, RCON_PORT);
    await client.login(RCON_PASSWORD);
    await client.exec('say Hello, World!');
    console.info('Done!');
  }
  catch (ex) {
    console.error('An error occurred:', ex);
  }
  finally {
    await client.close();
  }
})();
```
