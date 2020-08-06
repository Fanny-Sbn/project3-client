import axios from "axios";

const service = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  withCredentials: true, // Cookie is sent to client when using this service. (used for session)
});

function errorHandler(error) {
  if (error.response.data) {
    console.log(error.response && error.response.data);
    throw error;
  }
  throw error;
}

export default {
  service,
  addPointOfSale(data) {
    return service
      .post("/api/client/creation-point-vente", data)
      .then((res) => res.data)
      .catch(errorHandler);
  },
  getUserPointOfSale() {
    return service
      .get("/api/client/point-vente")
      .then((res) => res.data)
      .catch(errorHandler)
  },
  createIntervention(idPointOfSale,idMachine, data) {
    return service
      .post(`/api/client/machine/${idPointOfSale}/${idMachine}/intervention`, data)
      .then((res) => res.data)
      .catch(errorHandler)
  },
  getMachinePointOfSale(id) {
    return service
      .get(`api/client/point-vente/${id}/machine`)
      .then((res) => res.data)
      .catch(errorHandler)
  },
  updateClient(data) {
    return service
      .patch("/api/client", data)
      .then((res) => res.data)
      .catch(errorHandler);
  },
  addMachine(pointOfSaleId, data) {
    return service
      .post(`/api/client/creation-machine/${pointOfSaleId}`, data)
      .then((res) => res.data)
      .catch(errorHandler);
  },
  getUsers() {
    return service
      .get("/api/admin/all-clients")
      .then((res) => res.data)
      .catch(errorHandler);
  },
  getUserPointOfSaleAdmin(id) {
    return service
      .get(`/api/admin/user/${id}/point-vente`)
      .then((res) => res.data)
      .catch(errorHandler);
  },
  getAllPointsOfSales(){
    return service
    .get("/api/admin/points-vente")
    .then((res) => res.data)
    .catch(errorHandler);
  },
  getDepannage(){
    return service
    .get("/api/admin/depannage")
    .then((res) => res.data)
    .catch(errorHandler);
  },
  getReapprovisionnement(){
    return service
    .get("/api/admin/reapprovisionnement")
    .then((res) => res.data)
    .catch(errorHandler);
  },
  getReglages(){
    return service
    .get("/api/admin/reglages")
    .then((res) => res.data)
    .catch(errorHandler);
  },
  getEntretien(){
    return service
    .get("/api/admin/entretien")
    .then((res) => res.data)
    .catch(errorHandler);
  },
  signup(userInfo) {
    return service
      .post("/api/auth/signup", userInfo)
      .then((res) => res.data)
      .catch(errorHandler);
  },

  signin(userInfo) {
    return service
      .post("/api/auth/signin", userInfo)
      .then((res) => res.data)
      .catch(errorHandler);
  },

  isLoggedIn() {
    return service
      .get("/api/auth/isLoggedIn")
      .then((res) => res.data)
      .catch(errorHandler);
  },

  logout() {
    return service
      .get("/api/auth/logout")
      .then((res) => res.data)
      .catch(errorHandler);
  },
};
