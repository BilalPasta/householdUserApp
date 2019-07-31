import {createStore,combineReducers,applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

import {App} from './reducer/index';

const store = createStore(
    combineReducers ({
        Appdata:App
    }),
    {},
    applyMiddleware(thunk)
);
export default  store;























































