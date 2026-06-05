export default function ReservationCard(reservation, userRole = "user") {
  const { id, workspace, date, startHour, endHour, reason, status } = reservation;
  
  // Condición: Si es admin y la reserva está Pendiente, muestra el botón
  const mostrarBotonAprobar = userRole === "admin" && status.toLowerCase() === "pendiente";

  return `
    <article class="reservation-card rounded border p-4 bg-white shadow-sm" data-id="${id}">
      <h3 class="font-bold text-lg">
        ${workspace}
      </h3>

      <div>
        <p>Fecha: ${date}</p>
        <p>Horario: ${startHour} - ${endHour}</p>
        <p>Motivo: ${reason}</p>
        <p>
          Estado: 
          <!-- Le ponemos una clase identificadora al estado para poder cambiarlo en vivo -->
          <span class="estado-texto font-semibold text-amber-600">
            ${status}
          </span>
        </p>
      </div>

      <div class="flex gap-2 mt-4">
        
        ${mostrarBotonAprobar ? `
          <button class="btn-aprobar bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1 rounded text-sm font-medium">
            Aprobar
          </button>
        ` : ""}

        <button class="btn-eliminar bg-red-500 text-white px-3 py-1 rounded text-sm">
          Eliminar
        </button>
      </div>
    </article>
  `;
}
