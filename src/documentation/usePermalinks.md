# usePermalinks

Receives an array of routes and matches the current url to return the a data object. The array of routes can be skipped by using the PermalinksConfig component as ancestor.

```js
import { useState } from 'react';
import { usePermalinks } from 'dcs-permalinks';
import ReactJson from 'react-json-view';

const routes = [
  {
    entry: "scripture",
    path: ["org","lang","resource","branch","book","chapter","verse"]
  },
  {
    entry: "resource",
    path: ["org", "lang", "resource", "...pathToFile"]
  }
]

function Component () {

  const { data, push } = usePermalinks({
    routes
  });
  
  const link1 = 'resource/unfoldingWord/en/tw/bible/kt/grace.md?search=gift';
  
  const link2 = '/scripture/unfoldingWord/en/ult/master/tit/3/12';

  return (
    <>
      <ReactJson
        style={{ maxHeight: '500px', overflow: 'scroll', whiteSpace: 'pre' }}
        src={data || {}}
        theme="monokai"
      />
      <button style={{margin: '1em'}} onClick={() => {push(link1);}}>Change location 1</button>
      <button style={{margin: '1em'}} onClick={() => {push(link2);}}>Change location 2</button>
      <button style={{margin: '1em'}} onClick={() => {push('/');}}>Go home</button>
    </>
  );
};

<Component />
```

## Using usePermalinks with PermalinksConfig

```js
import { useState } from 'react';
import { usePermalinks, PermalinksConfig } from 'dcs-permalinks';
import ReactJson from 'react-json-view';

const routes = [
  {
    entry: "scripture",
    path: ["org","lang","resource","branch","book","chapter","verse"]
  },
  {
    entry: "resource",
    path: ["org", "lang", "resource", "...pathToFile"]
  }
]

function Scripture () {
  const { data } = usePermalinks({});
  return(data && data.entry === 'scripture' &&
    <div>
      <h2>Scripture: {data.book} {data.chapter}:{data.verse} {data.resource}</h2>
      <ReactJson
        style={{ maxHeight: '500px', overflow: 'scroll', whiteSpace: 'pre' }}
        src={data}
        theme="monokai"
      />
    </div>
  )
}

function Resource () {
  const { data } = usePermalinks({});
  return(data && data.entry === 'resource'  &&
    <div>
      <h2>Resource: {data.resource}</h2>
      <h3>Data to load translation resources:</h3>
      <ReactJson
        style={{ maxHeight: '500px', overflow: 'scroll', whiteSpace: 'pre' }}
        src={data}
        theme="monokai"
      />
    </div>
  )
}

function Component () {

  const { push } = usePermalinks({});
  
  const link1 = 'resource/unfoldingWord/en/tw/bible/kt/grace.md?search=gift';
  const link2 = '/scripture/unfoldingWord/en/ult/master/tit/3/12';

  return (
    <>
      <Resource/>
      <Scripture/>
      <button style={{margin: '1em'}} onClick={() => {push(link1);}}>Change location 1</button>
      <button style={{margin: '1em'}} onClick={() => {push(link2);}}>Change location 2</button>
      <button style={{margin: '1em'}} onClick={() => {push('/');}}>Go home</button>
    </>
  );
};

<PermalinksConfig routes={routes}>
  <Component />
</PermalinksConfig>
```