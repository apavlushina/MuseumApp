import { SET_MUSEUM } from "../actions/markers";

export default (state = "", action) => {
  console.log("payload", action);
  switch (action.type) {
    case SET_MUSEUM:
      return action.payload.museum;
    default:
      return state;
  }
};
