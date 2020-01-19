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

You don't need to inform the platform because the CLI reads your `package.json` to identify the project type. This is awesome, isn't it?


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

import colors from '../../styles/colors';

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

> Consider using the `useSelector` and `useDispatch` hooks.  
> To learn more, check <a href="https://react-redux.js.org/api/hooks" target="_blank">React Redux - Hooks</a> and skip next steps.

To connect the page with store, you should import these references on the `index.js` file:

```js
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ToolsActions from '../../store/ducks/tools'; // example
```

The next step is map the `state` and `dispatchs` to properties of the page and replace `export default Tools`, just like this:


```js
const mapStateToProps = state => ({
  tools: state.tools, // example
});

const mapDispatchToProps = dispatch => 
  bindActionCreators(ToolsActions, dispatch); // example

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Tools);
```

Now, you can use all properties mapped in your page:

```js
function Tools({ tools, getToolsRequest }) { // example
  // ...
}
```

