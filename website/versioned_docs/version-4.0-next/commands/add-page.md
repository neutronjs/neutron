---
id: add-page
title: How to create a new Page?
sidebar_label: Create Page
---

The `page` is like a `component`, but we prefer to think that components don't need to know the application state directly, because the change of state should be responsability of the pages.

To create a new page, you need to stay at the root of the project and enter this command in your terminal:

```shell
neutron add:page <pageName>
```

You don't need to inform the `technology` because the CLI reads your `package.json` to identify the project type. This is awesome, isn't it?


## Usage command example

```shell
neutron add:page Tools
```

After the execution, this command will create a new folder in `src/pages` with two new files: `index.js` and `styles.js`.

#### Example:

```js
/* #FILE: ./src/pages/Tools/index.js */
import React, { useState, useEffect } from 'react';
import { StyledContainer } from './styles';

function Tools() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    setMessage('Tools page!');
  }, []);

  return (
    <StyledContainer>
      <h1>{message}</h1>
    </StyledContainer>
  );
}

export default Tools;
```

```js
/* #FILE: ./src/pages/Tools/styles.js */
import styled from 'styled-components';

import colors from '@/styles/colors';

export const StyledContainer = styled.div`
  background-color: ${colors.background};
  color: ${colors.primary};
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: center;
`;
```


## Connecting the Page with Store

To connect the page with store, you should import these references on the `index.js` file:

```js
import React, { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ToolsActions from '@/store/ducks/tools';
```

Finally, you need to use `useSelector` to retrieve data and the `useDispatch` instance to call your actions:

```js

function Tools() {
  const dispatch = useDispatch();
  const tools = useSelector((state) => state.tools);

  const getToolsRequest = useCallback(() => {
    dispatch(ToolsActions.getToolsRequest());
  }, [dispatch]);

  useEffect(() => {
    getToolsRequest();
  }, [getToolsRequest]);

  return (
    <StyledContainer>
      <ul>
        {tools.data.map(tool => (
          <li>{tool.name}</li>
        ))}
      </ul>
    </StyledContainer>
  );
}

export default Tools;

```

