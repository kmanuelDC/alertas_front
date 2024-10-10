export const conditions = [
    {
      FLOTA: 'Flota A',
      CONDICION: 'Excelente',
      NIVEL: 'Alto',
      CRITICO: false,
      SONIDO: true,
      NOTIFICACION: true,
      EMAILS: ['correo1@example.com'],
      DETAIL: 'Detalles 1'
    },
    {
      FLOTA: 'Flota B',
      CONDICION: 'Bueno',
      NIVEL: 'Medio',
      CRITICO: true,
      SONIDO: false,
      NOTIFICACION: false,
      EMAILS: ['correo2@example.com'],
      DETAIL: 'Detalles 2'
    },
    {
      FLOTA: 'Flota C',
      CONDICION: 'Regular',
      NIVEL: 'Bajo',
      CRITICO: true,
      SONIDO: true,
      NOTIFICACION: true,
      EMAILS: ['correo3@example.com'],
      DETAIL: 'Detalles 3'
    },
    {
      FLOTA: 'Flota D',
      CONDICION: 'Malo',
      NIVEL: 'Alto',
      CRITICO: false,
      SONIDO: false,
      NOTIFICACION: false,
      EMAILS: ['correo4@example.com'],
      DETAIL: 'Detalles 4'
    },
    {
      FLOTA: 'Flota E',
      CONDICION: 'Regular',
      NIVEL: 'Medio',
      CRITICO: true,
      SONIDO: true,
      NOTIFICACION: true,
      EMAILS: ['correo5@example.com'],
      DETAIL: 'Detalles 5'
    },
    {
      FLOTA: 'Flota F',
      CONDICION: 'Bueno',
      NIVEL: 'Bajo',
      CRITICO: true,
      SONIDO: false,
      NOTIFICACION: false,
      EMAILS: ['correo6@example.com'],
      DETAIL: 'Detalles 6'
    },
    {
      FLOTA: 'Flota G',
      CONDICION: 'Malo',
      NIVEL: 'Alto',
      CRITICO: false,
      SONIDO: true,
      NOTIFICACION: true,
      EMAILS: ['correo7@example.com'],
      DETAIL: 'Detalles 7'
    },
    {
      FLOTA: 'Flota H',
      CONDICION: 'Excelente',
      NIVEL: 'Medio',
      CRITICO: true,
      SONIDO: false,
      NOTIFICACION: false,
      EMAILS: ['correo8@example.com'],
      DETAIL: 'Detalles 8'
    },
    {
      FLOTA: 'Flota I',
      CONDICION: 'Bueno',
      NIVEL: 'Bajo',
      CRITICO: true,
      SONIDO: true,
      NOTIFICACION: true,
      EMAILS: ['correo9@example.com'],
      DETAIL: 'Detalles 9'
    },
    {
      FLOTA: 'Flota J',
      CONDICION: 'Regular',
      NIVEL: 'Alto',
      CRITICO: false,
      SONIDO: false,
      NOTIFICACION: false,
      EMAILS: ['correo10@example.com'],
      DETAIL: 'Detalles 10'
    }
  ];

function randomWorker(workersUsed) {
  const workerList = [
    "Jose Hernandez", "Carlos Ramirez", "Luis Flores", "Miguel Vargas",
    "Juan Sanchez", "Jorge Chavez", "Fernando Diaz", "Ricardo Lopez", "Pedro Castillo"
  ];

  if (workersUsed.length >= 4) {
    return workersUsed[Math.floor(Math.random() * workersUsed.length)];
  }

  const worker = workerList[Math.floor(Math.random() * workerList.length)];
  if (!workersUsed.includes(worker)) {
    workersUsed.push(worker);
  }
  return worker;
}

function randomDuration() {
  const minutes = Math.floor(Math.random() * 4); // 0 to 3 minutes
  const seconds = Math.floor(Math.random() * 60); // 0 to 59 seconds
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function randomAlertLevel() {
  const alertLevels = ["CRITICAL", "WARNING", "NORMAL"];
  return alertLevels[Math.floor(Math.random() * alertLevels.length)];
}

function randomEquipo() {
  const equipoNumber = Math.floor(Math.random() * 25) + 1; // From CM01 to CM25
  return `CM${String(equipoNumber).padStart(2, '0')}`;
}

function randomGrafico(fechaEvento, minPoints = 100) {
  const grafico = [];
  for (let i = 0; i < minPoints; i++) {
    const point = (Math.random() * 900 + 100).toFixed(2); // Points between 100 and 1000
    const timeDelta = Math.floor(Math.random() * 111) + 10; // 10 to 120 seconds before
    const pointDate = new Date(fechaEvento.getTime() - timeDelta * 1000);
    grafico.push({
      point: parseFloat(point),
      fecha: pointDate.toISOString().replace('T', ' ').substring(0, 19)
    });
  }
  return grafico;
}

function randomGPS() {
  const lat = -14.218977 + (Math.random() * 0.02 - 0.01); // Variation of ±0.01 around the base latitude
  const lon = -75.419792 + (Math.random() * 0.02 - 0.01); // Variation of ±0.01 around the base longitude
  return { lat: lat.toFixed(6), lon: lon.toFixed(6) };
}

function randomEventDate() {
  const now = new Date();
  const randomDaysAgo = Math.floor(Math.random() * 2); // 0 to 1 day ago
  const randomMinutes = Math.floor(Math.random() * 60);
  const randomSeconds = Math.floor(Math.random() * 60);
  return new Date(now.setDate(now.getDate() - randomDaysAgo) - randomMinutes * 60000 - randomSeconds * 1000);
}

function generateEvents() {
  const events = [];
  const workersUsed = [];

  for (let i = 0; i < 150; i++) {
    const fechaEvento = randomEventDate();
    const event = {
      FLOTA: "793D",
      EQUIPO: randomEquipo(),
      FECHA_EVENTO: fechaEvento.toISOString().replace('T', ' ').substring(0, 19),
      NIVEL_ALERTA: randomAlertLevel(),
      DESCRIPCION: "TEMPERATURA MOTOR 793D",
      DURACION: randomDuration(),
      WORKER: randomWorker(workersUsed),
      ESTADO: Math.random() > 0.5 ? "cerrado" : "abierto",
      GRAFICO: randomGrafico(fechaEvento, 100),  // Ensure at least 100 points
      GPS: randomGPS()
    };
    events.push(event);
  }

  return events;
}


export const rows = generateEvents();