import { configureStore } from "@reduxjs/toolkit";
import api from "@redux/api"

const store = configureStore({
  reducer: {
    [api.adminApis.reducerPath]: api.adminApis.reducer
  },
  middleware: (getDefaultMiddleWare) => getDefaultMiddleWare().concat(api.adminApis.middleware)
})

export default store;
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch