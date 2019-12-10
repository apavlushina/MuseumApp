import request from "superagent";

export const SET_MUSEUMS = "SET_MUSEUMS";

export function setMuseums(museums) {
  return {
    type: SET_MUSEUMS,
    payload: {
      museums
    }
  };
}

export const getMuseums = () => (dispatch, getState) => {
  const state = getState();
  const { museums } = state;

  if (!museums.length) {
    request("../museums.json")
      .then(response => {
        const action = setMuseums(response.body);

        dispatch(action);
      })
      .catch(console.error);
  }
};
