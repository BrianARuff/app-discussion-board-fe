import { combineReducers } from "redux";

/**
 * section for importing reducers...
 */

import testReducer from "./testReducer";

/**
 * section for importing constants...
 */

import {
  EXP
} from "../actions"; // import constants here...

console.log(EXP);

export default combineReducers({
  testReducer
})