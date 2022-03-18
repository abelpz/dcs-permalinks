# useRoute

Receives a route object and url data, and retrieves a single new object.

```js
import { useState } from 'react';
import { useRoute, useLocation } from 'dcs-permalinks';
import ReactJson from 'react-json-view';

const route = {
  entry: "post",
  path: ['username', '...postPath']
}

function Component () {
  const { patharray, query, push } = useLocation();
  const data = useRoute({route,routePath:patharray,query});

  const link = '/johndoe/javascript/how-to-react?search=custom+hooks';

  return (
    <>
      <ReactJson
        style={{ maxHeight: '500px', overflow: 'scroll', whiteSpace: 'pre' }}
        src={data || {}}
        theme="monokai"
      />
      <button style={{margin: '1em'}} onClick={() => {push(link);}}>Change location</button>
      <button style={{margin: '1em'}} onClick={() => {push('/');}}>Go home</button>
    </>
  );
};

<Component />
```