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
import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* Types & Action Creators */

const { Types, Creators } = createActions({
  getToolsRequest: [],
  getToolsSuccess: ['data'],
  getToolsFailure: [],
});

export const ToolsTypes = Types;
export default Creators;

/* Initial State */

export const INITIAL_STATE = Immutable({
  loading: false,
  data: [],
  error: false,
});

/* Reducers */

const getToolsRequest = (state) => state.merge({
  ...state,
  loading: true,
});

const getToolsSuccess = (state, { data }) => state.merge({
  data,
  loading: false,
  error: false,
});

const getToolsFailure = (state) => state.merge({
  ...state,
  error: true,
  loading: false,
});

/* Reducers to types */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_TOOLS_REQUEST]: getToolsRequest,
  [Types.GET_TOOLS_SUCCESS]: getToolsSuccess,
  [Types.GET_TOOLS_FAILURE]: getToolsFailure,
});

```

## Combine Reducers

This step is very important to combine your `reducers` with a unique reducer called `rootReducer`.

#### Example:
```js
/* #FILE: ./src/store/ducks/index.js */
import { combineReducers } from 'redux';

import { reducer as tools } from './tools';

const reducers = combineReducers({
  default: () => [], // => remove this
  tools,
});

export default reducers;

``` 

This setting is required to configure the reducer in `store` and you can check the creation of `store` in `./src/store/index.js`. All the settings are already made especially for you!
