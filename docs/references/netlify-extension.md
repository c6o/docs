---
sidebar_position: 8
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Codezero Zero Trust Extension for Netlify

A [Netlify extension](https://app.netlify.com/extensions/lm0he2wq-codezero-extension) that lets you use connect your Netlify site to your Codezero Teamspace.

After installing the extension in Netlify, you'll need to configure it:

1. In the Netlify app, navigate to the site you want to give access to your Codezero Teamspace
2. Under _Extensions_, click on _Codezero Zero Trust_
3. Copy your Organization ID and Organization API Key from the [Codezero Hub](https://hub.codezero.io/api-keys)
4. Select the Teamspace and click on _Save_
5. In your code add the NPM package [@c6o/codezero-agent](https://www.npmjs.com/package/@c6o/codezero-agent)

After the deployment, you can now make requests in your Netlify Function to your Teamspace like this:

<Tabs>
<TabItem value="node-fetch" label="node-fetch" default>

```js
import fetch from "node-fetch";
import { CodezeroAgent } from "@c6o/codezero-agent";

const agent = new CodezeroAgent();
const response = await fetch("http://my-service.namespace/path", { agent });)
```

</TabItem>
<TabItem value="axios" label="Axios">

```js
import axios from "axios";
import { CodezeroAgent } from '@c6o/codezero-agent';

const agent = new CodezeroAgent();
const response = axios({
    method: 'get',
    url: 'http://my-service.namespace/path',
    httpAgent: agent,
});
```

</TabItem>
<TabItem value="http-request" label="http.request">

```js
import * as http from "http";
import { CodezeroAgent } from "@c6o/codezero-agent";

const agent = new CodezeroAgent();
http.get("http://my-service.namespace/path", { agent }, (res) => {
  console.log(res.statusCode, res.headers);
  res.pipe(process.stdout);
});
```

</TabItem>
</Tabs>

## Example

A full example of a Netlify Function that forwards calls to `http://my-service.namespace/path` is below.

:::note
The CodezeroAgent should be instantiated outside the request handler because it caches the credentials needed to connect to the Teamspace.
:::

```js
import fetch from 'node-fetch'
import { CodezeroAgent } from '@c6o/codezero-agent';

const agent = new CodezeroAgent();

const api = async (request, context) => {
    const response = await fetch('http://my-service.namespace/path', { agent });

    if (!response.ok) {
        return new Response('Failed to fetch data', {
            status: response.status,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    return new Response(await response.text(), {
        headers: {
            'Content-Type': 'application/json'
        }
    });
};

export const config = {};

export default api;
```
