import request from "superagent";
// import initState from "./museums.json";

export const susolvkaCoords = { lat: 52.283449, lng: 5.162265 };

// export const markersData = [
//   {
//     id: 1,
//     lat: 52.36429,
//     lng: 4.885318,
//     name: "Pipe Museum"
//   },
//   {
//     id: 2,
//     lat: 52.365277,
//     lng: 4.896813,
//     name: "Tassen Museum"
//   }
// ];

const TOTAL_COUNT = 200;
export const markersData = [...Array(TOTAL_COUNT)]
  .fill(0) // fill(0) for loose mode
  .map((__, index) => ({
    id: index,
    lat:
      susolvkaCoords.lat +
      0.01 *
        index *
        Math.sin((30 * Math.PI * index) / 180) *
        Math.cos((50 * Math.PI * index) / 180) +
      Math.sin((5 * index) / 180),
    lng:
      susolvkaCoords.lng +
      0.01 *
        index *
        Math.cos(70 + (23 * Math.PI * index) / 180) *
        Math.cos((50 * Math.PI * index) / 180) +
      Math.sin((5 * index) / 180)
  }));

// export const markersData = initState.d.map((museum, index) => ({
//   id: museum.Id,
//   title: museum.SubTitle,
//   lat: request(
//     `https://nominatim.openstreetmap.org/search?q==${museum.SubTitle}%20${museum.Title}%20Nederlands&format=json`
//   ).then(response => console.log("response", response.body[0].lat)),
//   lng: request(
//     `https://nominatim.openstreetmap.org/search?q==${museum.SubTitle}%20${museum.Title}%20Nederlands&format=json`
//   ).then(response => response.body[0].lon)
// }));
