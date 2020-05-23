import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import restaurantReducer from './restaurant/restaurantReducer'

const store = createStore(
  restaurantReducer,
  composeWithDevTools(applyMiddleware(logger, thunk))
)

export default store