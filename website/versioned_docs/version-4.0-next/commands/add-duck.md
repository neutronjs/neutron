---
id: add-duck
title: How to create a new Duck?
sidebar_label: Create Duck
---

Thinking about how to organize our `actions`, `reducers` and `types`, we decided to use <a href="https://github.com/erikras/ducks-modular-redux" target="_blank">Duck Modular Redux</a> due to the creation of a compact file with everything we need to work with redux.

To create a new duck, you need to stay at the root of the project and enter this command in your terminal:

```shell
neutron add:duck <duckName>
```


## Usage command example

```shell
neutron add:duck tools
```

After the execution, this command will create a new file in `./src/store/ducks`.

#### Example:

```js
/* #FILE: ./src/store/ducks/tools.js */
import { createSlice } from '@reduxjs/toolkit';

const toolsSlice = createSlice({
  name: 'tools',
  initialState: {
    loading: false,
    data: [],
    error: false,
  },
  reducers: {
    getToolsRequest(state) {
      state.loading = true;
    },
    getToolsSuccess(state, { payload }) {
      state.loading = false;
      state.error = false;
      state.data.push(payload);
    },
    getToolsFailure(state) {
      state.error = true;
      state.loading = false;
    },
  },
});

export const { reducer } = toolsSlice;
export default toolsSlice.actions;

```

## Combine Reducers

This step is very important to combine your `reducers` with a unique reducer called `rootReducer`.

#### Example:
```js
/* #FILE: ./src/store/ducks/index.js */
import { combineReducers } from '@reduxjs/toolkit';
import { connectRouter } from 'connected-react-router';

/* Reducers */
import { reducer as tools } from './tools';

export default (history) =>
  combineReducers({
    router: connectRouter(history),
    tools,
  });

```

This setting is required to configure the reducer in `store` and you can check the creation of `store` in `./src/store/index.js`. All the settings are already made especially for you!
