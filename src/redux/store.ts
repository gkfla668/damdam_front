import { configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'

import storage from 'redux-persist/lib/storage'
import rootReducer from '../redux/rootReducer'

// redux-persist whiteList처리. auth 스토리지는 계속 유지하도록
const persistConfig = {
	key: 'root',
	storage,
}

// persist reducer에 적용
const pReducer = persistReducer(persistConfig, rootReducer)
// redux 스토리지 처리
const store = configureStore({
	reducer: pReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}),
})
// 추가적으로 persist도 적용
const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export { persistor, store }
