import { combineReducers } from "utils";

import { documentsReducer, documentsDefaultState } from "./documentsReducer";
import {
  deliveryMethodReducer,
  deliveryMethodDefaultState,
} from "./deliveryMethodReducer";

export const reducer = combineReducers({
  documents: documentsReducer,
  deliveryMethod: deliveryMethodReducer,
});

export const defaultState = {
  documents: documentsDefaultState,
  deliveryMethod: deliveryMethodDefaultState,
};
