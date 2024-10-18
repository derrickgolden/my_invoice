import { configureStore } from '@reduxjs/toolkit'
import userDetailsReducer from './userDetails'
import callApiReducer from './callApi'
import shopListDetailsReducer from './ispListDetails'
import rerenderReducer from './rerender'
import activeShopReducer from './activeISP'

export const store = configureStore({
  reducer: {
    userDetails: userDetailsReducer, 
    callApi: callApiReducer,
    shopListDetailsList: shopListDetailsReducer,
    rerender: rerenderReducer,
    activeShop: activeShopReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
