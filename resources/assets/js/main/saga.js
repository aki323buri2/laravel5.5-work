import React from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import createSaga, { delay, eventChannel, END } from 'redux-saga';
import { put, call, fork, take, cancel, cancelled, takeEvery } from 'redux-saga/effects';
import logger from 'redux-logger';
import { createReducer } from 'redux-act';
import { Provider } from 'react-redux';
const reducers = {
	user: createReducer({ USER: (state, v) => v }, ''), 
};
const createApp = App =>
{
	const saga = createSaga();
	const middleware = [ saga, ...(global.debug ? [ logger ] : []) ];
	const store = createStore(combineReducers(reducers), applyMiddleware(...middleware));
	const app = <Provider store={store}><App/></Provider>;
	return {
		...app, 
		run: root => saga.run(root), 
	};
};
const saga = function *()
{
	yield put({ type: 'USER', payload: 'aki323buri2' });
};
export {
	saga, 
	reducers, 
	createApp, 
};