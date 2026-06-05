import { http } from "../api/http.js";

export const getReservations = () =>
  http.get("/reservations");

export const createReservation = (data) =>
  http.post("/reservations", data);
