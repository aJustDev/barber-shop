"use client";

import { useState, useEffect } from "react";

const WHATSAPP_NUMBER = import.meta.env.PUBLIC_WHATSAPP_NUMBER || "34618000000";

const SERVICIOS = [
  { id: "corte", nombre: "Corte", precio: "12€" },
  { id: "barba", nombre: "Barba", precio: "8€" },
  { id: "corte-barba", nombre: "Corte + Barba", precio: "16€" },
  { id: "asesoria", nombre: "Asesoría", precio: "Consultar" },
];

const HORAS = [
  "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30",
  "16:00", "16:30", "17:00", "17:30", "18:00", "18:30", "19:00", "19:30",
];

function getMinDate(): string {
  const maniana = new Date();
  maniana.setDate(maniana.getDate() + 1);
  return maniana.toISOString().split("T")[0];
}

export default function BookingForm() {
  const [mounted, setMounted] = useState(false);
  const [servicio, setServicio] = useState("");
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");
  const [nombre, setNombre] = useState("");

  useEffect(() => {
    setFecha(getMinDate());
    setMounted(true);
  }, []);

  const isValid = mounted && servicio && fecha && hora && nombre.trim();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;

    const servicioText = SERVICIOS.find((s) => s.id === servicio)?.nombre || servicio;
    const fechaFormateada = new Date(fecha + "T00:00:00")
      .toLocaleDateString("es-ES", { day: "numeric", month: "long", year: "numeric" });

    const mensaje = encodeURIComponent(
      `Hola, soy ${nombre.trim()}. Quiero reservar ${servicioText} para el ${fechaFormateada} a las ${hora}.`
    );

    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${mensaje}`, "_blank");
  };

  if (!mounted) {
    return (
      <div className="space-y-6">
        <div className="h-24 bg-[#141414] border border-gray-800 animate-pulse"></div>
        <div className="h-12 bg-[#141414] border border-gray-800 animate-pulse"></div>
        <div className="h-12 bg-[#141414] border border-gray-800 animate-pulse"></div>
        <div className="h-14 bg-[#141414] border border-gray-800 animate-pulse"></div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-xs text-[#C9A227] tracking-wider mb-3 uppercase">
          // Servicio
        </label>
        <div className="grid grid-cols-2 gap-2">
          {SERVICIOS.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setServicio(s.id)}
              className={`p-3 border text-left transition-all text-sm ${
                servicio === s.id
                  ? "border-[#C9A227] bg-[#C9A227] text-[#0A0A0A]"
                  : "border-gray-700 hover:border-gray-500"
              }`}
            >
              <span className="block font-bold">{s.nombre}</span>
              <span className="text-xs opacity-80">{s.precio}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs text-[#C9A227] tracking-wider mb-2 uppercase">
            // Fecha
          </label>
          <input
            type="date"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
            min={getMinDate()}
            className="w-full bg-[#0A0A0A] border border-gray-700 p-3 focus:border-[#C9A227] focus:outline-none transition-colors text-sm"
            required
          />
        </div>

        <div>
          <label className="block text-xs text-[#C9A227] tracking-wider mb-2 uppercase">
            // Hora
          </label>
          <select
            value={hora}
            onChange={(e) => setHora(e.target.value)}
            className="w-full bg-[#0A0A0A] border border-gray-700 p-3 focus:border-[#C9A227] focus:outline-none transition-colors text-sm"
            required
          >
            <option value="">Seleccionar</option>
            {HORAS.map((h) => (
              <option key={h} value={h}>
                {h}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-xs text-[#C9A227] tracking-wider mb-2 uppercase">
          // Nombre
        </label>
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Tu nombre completo"
          className="w-full bg-[#0A0A0A] border border-gray-700 p-3 focus:border-[#C9A227] focus:outline-none transition-colors text-sm placeholder:text-gray-600"
          required
        />
      </div>

      <button
        type="submit"
        disabled={!isValid}
        className={`w-full py-4 text-sm font-bold tracking-wider transition-all flex items-center justify-center gap-2 ${
          isValid
            ? "bg-[#C9A227] text-[#0A0A0A] hover:bg-[#E5C44D]"
            : "bg-gray-800 text-gray-600 cursor-not-allowed"
        }`}
      >
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
        RESERVAR POR WHATSAPP
      </button>

      <p className="text-center text-gray-600 text-xs">
        Al reservar, se abrirá WhatsApp. El barbero confirmará tu cita.
      </p>
    </form>
  );
}
