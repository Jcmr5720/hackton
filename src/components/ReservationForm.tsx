import { h } from 'preact';
import { useState } from 'preact/hooks';

interface Status { type: 'success' | 'error'; message: string; }

export function ReservationForm() {
  const [data, setData] = useState({
    customer_username: '',
    customer_name: '',
    customer_phone: '',
    customer_mobile: '',
    customer_email: '',
    reservation_date: '',
    number_of_people: 1,
    special_requests: ''
  });
  const [status, setStatus] = useState<Status | null>(null);

  const handleChange = (e: any) => {
    const { name, value } = e.currentTarget;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    setStatus(null);
    try {
      const res = await fetch('/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      const json = await res.json();
      if (res.ok) {
        setStatus({ type: 'success', message: 'Reserva realizada con éxito' });
        setData({
          customer_username: '',
          customer_name: '',
          customer_phone: '',
          customer_mobile: '',
          customer_email: '',
          reservation_date: '',
          number_of_people: 1,
          special_requests: ''
        });
      } else {
        setStatus({ type: 'error', message: json.error || 'Error al crear reserva' });
      }
    } catch (err) {
      setStatus({ type: 'error', message: 'Error de red' });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div class="mb-3">
        <label class="form-label">Usuario</label>
        <input type="text" class="form-control" name="customer_username" value={data.customer_username} onInput={handleChange} />
      </div>
      <div class="mb-3">
        <label class="form-label">Nombre</label>
        <input type="text" class="form-control" name="customer_name" value={data.customer_name} onInput={handleChange} />
      </div>
      <div class="mb-3">
        <label class="form-label">Teléfono</label>
        <input type="text" class="form-control" name="customer_phone" value={data.customer_phone} onInput={handleChange} />
      </div>
      <div class="mb-3">
        <label class="form-label">Móvil *</label>
        <input type="text" class="form-control" name="customer_mobile" required value={data.customer_mobile} onInput={handleChange} />
      </div>
      <div class="mb-3">
        <label class="form-label">Email</label>
        <input type="email" class="form-control" name="customer_email" value={data.customer_email} onInput={handleChange} />
      </div>
      <div class="mb-3">
        <label class="form-label">Fecha y hora</label>
        <input type="datetime-local" class="form-control" name="reservation_date" required value={data.reservation_date} onInput={handleChange} />
      </div>
      <div class="mb-3">
        <label class="form-label">Número de personas</label>
        <input type="number" class="form-control" name="number_of_people" min="1" value={data.number_of_people} onInput={handleChange} />
      </div>
      <div class="mb-3">
        <label class="form-label">Peticiones especiales</label>
        <textarea class="form-control" name="special_requests" rows={3} value={data.special_requests} onInput={handleChange}></textarea>
      </div>
      {status && (
        <div class={`alert alert-${status.type === 'success' ? 'success' : 'danger'}`} role="alert">
          {status.message}
        </div>
      )}
      <button type="submit" class="btn btn-danger w-100">Enviar reserva</button>
    </form>
  );
}
