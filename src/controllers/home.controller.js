import ReservationCard from "@components/ReservationCard";
import { getReservations } from "@services/reservation.service";
import { getSession } from "@/utils";

export const homeController = async () => {
  const container = document.querySelector("#reservationsContainer");

  const user = getSession();

  const reservations = await getReservations();

  const filteredReservations =
    user.role === "admin"
      ? reservations
      : reservations.filter((reservation) => reservation.userId === user.id);

  container.innerHTML = filteredReservations?.length
    ? filteredReservations
        .map((reservation) => ReservationCard(reservation))
        .join("")
    : `
      <div class="w-full text-center py-8 col-span-2">
        <p class="text-slate-500">
          No hay reservas disponibles
        </p>
      </div>
    `;

  //abrir modal de user
  const btnReservar = document.getElementById("reservar");
  const miModal = document.getElementById("miModal");
  const btnCerrar = document.getElementById("btnCerrar");

  
  btnReservar.addEventListener("click", (e) => {
    e.preventDefault();
    miModal.classList.add("open");
  });

  
  btnCerrar.addEventListener("click", () => {
    miModal.classList.remove("open");
  });
  reservationes(container,miModal)
};








function reservationes(container, modal) {
  const btnEnviar = document.getElementById("btnEnviar"); 
  const inputNombre = document.getElementById("inputNombre");
  const inputFecha = document.getElementById("inputFecha");
  const selectLugar = document.getElementById("lugar");
  const inputDescripcion = document.getElementById("inputDescripcion");


  btnEnviar.addEventListener("click", (e) => {
    e.preventDefault();

    if (!inputNombre.value || !inputFecha.value || !selectLugar.value || !inputDescripcion.value) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    
    if (container.querySelector(".text-slate-500") || container.querySelector(".text-emerald-800")) {
      container.innerHTML = "";
    }

    
    const nuevaReservaData = {
      name: inputNombre.value,       
      date: inputFecha.value,       
      location: selectLugar.value,
      description: inputDescripcion.value
    };

    
    const cardHTML = ReservationCard(nuevaReservaData);

    
    container.insertAdjacentHTML("beforeend", cardHTML);

    
    inputNombre.value = "";
    inputFecha.value = "";
    selectLugar.value = "";
    inputDescripcion.value = "";

    
    modal.classList.remove("open");
  });
}