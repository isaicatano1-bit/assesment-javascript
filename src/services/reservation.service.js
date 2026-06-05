import { http } from "../api/http.js";

export const getReservations = () =>
  http.get("/reservations");

export const createReservation = (data) =>
  http.post("/reservations", data);

export const deleteReservation = async (id) => {
  return await http.delete(`/reservations/${id}`);
};