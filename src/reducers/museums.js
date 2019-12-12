import { SET_MUSEUMS } from "../actions/markers";

export default (state = [], action) => {
  console.log("payload", action);
  switch (action.type) {
    case SET_MUSEUMS:
      return action.payload.museums;
    default:
      return state;
  }
};
