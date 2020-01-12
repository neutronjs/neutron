---
id: add-saga
title: How to create a new Saga?
sidebar_label: Create Saga
---

To create a new saga, you need to stay at the root of the project and enter this command in your terminal:

```shell
neutron add:saga <sagaName>
```


## Usage command example

```shell
neutron add:saga tools
```

After the execution, this command will create a new file in `./src/store/sagas` and, if it does not exists, will also create a new file in `./src/store/ducks`.

#### Example:

```js
/* #FILE: ./src/store/sagas/tools.js */
import { call, put } from 'redux-saga/effects';
import api from '@/services/api';

import ToolsActions from '@/store/ducks/tools';

export function* getToolsRequest() {
  try {
    const endpoint = '/tools';
    const { data } = yield call(api.get, endpoint);
    yield put(ToolsActions.getToolsSuccess(data));
  } catch (error) {
    console.log(error);
    yield put(ToolsActions.getToolsFailure());
  }
}
```

> For more information about `ducks`, check: <a href="add-duck" target="_blank">How to create a new Duck?</a>.

## Register Sagas

This step is very important to register your `sagas` to listen all calls related to the configured `types`.

```js
/* #FILE: ./src/store/ducks/sagas.js */
import { all, takeLatest } from 'redux-saga/effects';

import { ToolsTypes } from '@/store/ducks/tools'; // example
import { getToolsRequest } from './tools'; // example

export default function* rootSaga() {
  yield all([
    takeLatest(ToolsTypes.GET_TOOLS_REQUEST, getToolsRequest), // example
  ]);
}
```

> We decided to use `takeLatest` to ensure that only the last call is executed. For more information on other options, you can check the <a href="https://redux-saga.js.org/docs/api/" target="_blank">Redux-Saga - API Reference</a>
