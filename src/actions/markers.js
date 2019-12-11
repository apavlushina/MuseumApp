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

const baseUrl = "http://localhost:4000";

export const getMuseums = () => (dispatch, getState) => {
  const state = getState();
  const { museums } = state;
  if (!museums.length) {
    request(`${baseUrl}/museums`)
      .then(response => {
        const action = setMuseums(response.body);

        dispatch(action);
      })
      .catch(console.error);
  }
};
