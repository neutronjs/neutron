---
id: add-component
title: How to create a new Component?
sidebar_label: Create Component
---

To create a new component, you need to stay at the root of the project and enter this command in your terminal:

```shell
neutron add:component <componentName>
```

You don't need to inform the platform because the CLI read your `package.json` to identify the project type. This is awesome, isn't it?


## Usage command example

```shell
neutron add:component custom
```

After the execution, this command will create a new folder in `src/components` with two new files: `index.js` and `styles.js`.

#### Example:

```js
/* #FILE: ./src/components/Custom/index.js */
import React from 'react';
import { StyledContainer } from './styles';

export default function Custom() {
  return (
    <StyledContainer>
      <h1>Custom component!</h1>
    </StyledContainer>
  );
}
```

```js
/* #FILE: ./src/components/CustomComponent/styles.js */
import styled from 'styled-components';

import colors from '../../styles/colors';

export const StyledContainer = styled.div`
  align-items: center;
  background-color: ${colors.secundary};
  border-radius: 3px;
  color: ${colors.light};
  display: flex;
  flex-direction: column;
  max-width: 500px;
  padding: 50px 0;
  width: 100%;
`;
```
