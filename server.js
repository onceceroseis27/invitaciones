// server.js
const express = require("express");
const path = require("path");
const cors = require("cors");

const app = express();

// Habilitar CORS para cualquier origen (Netlify, local, etc.)
app.use(cors());
app.use(express.json());

// Servir archivos estáticos desde public/
app.use(express.static(path.join(__dirname, "public")));

// Mensajes directos por código
const mensajes = {
    "ABC123": "La mejor mama del mundo, gracias por dar este paso conmigo",
    "ANA1": "Hola Ana, ¡nos vemos en la boda!",
    "LUIS2": "Hola Luis, ¡gracias por acompañarnos!",
    "FAM3": "Querida familia, ¡os esperamos con ilusión!"
};

// Endpoint POST /validar
app.post("/validar", (req, res) => {
    const { codigo } = req.body;

    if (!codigo || !mensajes[codigo]) {
        return res.json({ valido: false, mensaje: "Código incorrecto" });
    }

    return res.json({ valido: true, mensaje: mensajes[codigo] });
});

// Puerto dinámico para Render
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));

