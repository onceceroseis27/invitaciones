const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));


// CÓDIGOS VÁLIDOS
const codigosValidos = {
  "ABC123": "La mejor mama del mundo, gracias por dar este paso conmigo",
  "XYZ789": "Pedro",
  "VIP001": "Familia Rodríguez"
};

app.post("/validar", (req, res) => {
  const { codigo } = req.body;

  if (!codigo) {
    return res.status(400).json({ error: "Código no recibido" });
  }

  const nombre = codigosValidos[codigo];

  if (!nombre) {
    return res.status(404).json({ error: "Código incorrecto" });
  }

  return res.json({ nombre });
});

// PARA RENDER: puerto dinámico
const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Servidor funcionando en puerto ${PORT}`)
);
