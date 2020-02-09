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

// const baseUrl = "http://localhost:4000";
const baseUrl = "https://fathomless-taiga-66915.herokuapp.com";

export const getMuseums = () => (dispatch, getState) => {
  request(`${baseUrl}/museums`)
    .then(response => {
      console.log("response", response);
      const action = setMuseums(response.body);

      dispatch(action);
    })
    .catch(console.error);
};

export const SET_MUSEUM = "SET_MUSEUM";

export function updMuseum(museum) {
  return {
    type: SET_MUSEUM,
    payload: {
      museum
    }
  };
}

export const setMuseum = key => dispatch => {
  request(`${baseUrl}/museums/${key}`)
    .then(response => {
      const action = updMuseum(response.body);

      dispatch(action);
    })
    .catch(console.error);
};
