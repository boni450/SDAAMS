import { user } from '@/lib/reducer'
import { useState, useEffect, useReducer, createContext } from 'react'

const initialState = { user: {} }
export const Context = createContext({})

const combineReducers = (...reducers) => (state, action) => {
	for (let count = 0; count < reducers.length; count++)
		state = reducers[count](state, action)
	return state
}

export const Provider = ({ children }) => {
	const [state, dispatch] = useReducer(combineReducers(user), initialState)
	const value = { state, dispatch }
	return <Context.Provider value={value}>{children}</Context.Provider>
}
