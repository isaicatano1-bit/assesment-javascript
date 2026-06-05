import ReservationCard from "../components/ReservationCard.js";
import { getReservations, createReservation } from "../services/reservation.service.js";
import { getSession } from "../utils.js";

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

  
  container.addEventListener("click", (e) => {
    const btnEliminar = e.target.closest(".btn-eliminar");
    
    if (btnEliminar) {
      e.preventDefault();
      if (confirm("¿Quieres quitar esta reserva de la pantalla?")) {
        const tarjeta = btnEliminar.closest(".reservation-card");
        if (tarjeta) {
          tarjeta.remove();
        }
        
        if (container.children.length === 0) {
          container.innerHTML = `
            <div class="w-full text-center py-8 col-span-2">
              <p class="text-slate-500">No hay reservas disponibles</p>
            </div>
          `;
        }
      }
    }
  });



  // Abrir modal de user
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

  reservationes(container, miModal, user);
};







async function reservationes(container, modal, user) {
  const btnEnviar = document.getElementById("btnEnviar"); 
  const inputNombre = document.getElementById("inputNombre");
  const inputFecha = document.getElementById("inputFecha");
  const selectLugar = document.getElementById("lugar");
  const inputDescripcion = document.getElementById("inputDescripcion");

  btnEnviar.addEventListener("click", async (e) => { 
    e.preventDefault();

    if (!inputNombre.value || !inputFecha.value || !selectLugar.value || !inputDescripcion.value) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    
    const nuevaReservaData = {
      userId: user.id, 
      workspace: selectLugar.value,       
      date: inputFecha.value,       
      startHour: "09:00", 
      endHour: "18:00",   
      reason: inputDescripcion.value,
      status: "Pendiente"
    };

    try {
      const reservaGuardada = await createReservation(nuevaReservaData);

      if (container.querySelector(".text-slate-500") || container.querySelector(".text-emerald-800")) {
        container.innerHTML = "";
      }

      
      const cardHTML = ReservationCard(reservaGuardada);
      container.insertAdjacentHTML("beforeend", cardHTML);

      inputNombre.value = "";
      inputFecha.value = "";
      selectLugar.value = "";
      inputDescripcion.value = "";
      modal.classList.remove("open");

      alert("Reserva guardada con éxito en db.json");

    } catch (error) {
      console.error(error);
      alert("Hubo un problema al conectar con el servidor.");
    }
  });
}
