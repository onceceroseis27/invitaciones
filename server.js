// server.js
const express = require("express");
const path = require("path");
const cors = require("cors");

const app = express();

// Habilitar CORS para cualquier origen
app.use(cors());
app.use(express.json());

// Servir archivos estáticos desde public/
app.use(express.static(path.join(__dirname, "public")));

// Mensajes directos por código
const mensajes = {
    "ABC123": "La mejor mamá del mundo, gracias por dar este paso conmigo",
    "ANA1": "Hola Ana, ¡nos vemos en la boda!",
    "LUIS2": "Hola Luis, ¡gracias por acompañarnos!",
    "FAM3": "Querida familia, ¡os esperamos con ilusión!"
};

// Google Apps Script URL
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyG8kfBqABeK-PkjaNy5K8dp1qEcskjzXrlFB0h6DpvSRj5LZmqQBxxqf36uEbMyne3aw/exec";

// POST /validar -> mensaje personalizado
app.post("/validar", (req, res) => {
    const { codigo } = req.body;

    if (!codigo || !mensajes[codigo]) {
        return res.json({ valido: false, mensaje: "Código incorrecto" });
    }

    return res.json({ valido: true, mensaje: mensajes[codigo] });
});

// POST /confirmar -> enviar datos al Google Apps Script
app.post("/confirmar", async (req, res) => {
    try {
        const datos = req.body;

        const response = await fetch(SCRIPT_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(datos)
        });

        res.json({ result: "OK" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ result: "ERROR", message: error.message });
    }
});

// GET /verificar/:codigo -> comprobar si el código ya se usó
app.get("/verificar/:codigo", async (req, res) => {
    try {
        const codigo = req.params.codigo;
        const response = await fetch(`${SCRIPT_URL}?codigo=${codigo}`);
        const data = await response.json();

        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ enviado: false, error: error.message });
    }
});

// Puerto dinámico para Render
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
