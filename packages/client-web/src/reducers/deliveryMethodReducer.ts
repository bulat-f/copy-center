import { IAction, DeliveryMethod } from "types";
import {
  SET_DELIVERY_METHOD,
  SET_DELIVERY_ADDRESS,
} from "constants/actionTypes";

interface IState {
  method: DeliveryMethod;
  address: string;
}

export const deliveryMethodDefaultState: IState = {
  method: "pick_up",
  address: "Курашева 12",
};

export const deliveryMethodReducer = (
  state: IState,
  action: IAction
): IState => {
  switch (action.type) {
    case SET_DELIVERY_METHOD:
      return { ...state, method: action.payload };
    case SET_DELIVERY_ADDRESS:
      return { ...state, address: action.payload };
    default:
      return state;
  }
};
