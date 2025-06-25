import { h } from 'preact';
import { ReservationForm } from './ReservationForm';

export function ReservationModal() {
  return (
    <div class="modal fade" id="reservationModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Haz tu reserva</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <ReservationForm />
          </div>
        </div>
      </div>
    </div>
  );
}
