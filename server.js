// server.js
const express = require('express');
const path = require('path');
const app = express();

// Puerto dinámico requerido por Render
const PORT = process.env.PORT || 3000;

// Servir archivos estáticos (HTML, CSS, JS, imágenes)
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint para validar códigos
app.get('/validar/:codigo', (req, res) => {
    const codigos = {
        "ANA1": "personalizado_ana.html",
        "LUIS2": "personalizado_luis.html",
        "FAM3": "personalizado_familia.html"
        // Agrega aquí todos los códigos que necesites
    };

    const codigo = req.params.codigo.toUpperCase();
    if (codigos[codigo]) {
        res.json({ success: true, page: codigos[codigo] });
    } else {
        res.json({ success: false });
    }
});

// Redirigir cualquier otra ruta al index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Arrancar servidor
app.listen(PORT, () => {
    console.log(`Servidor de invitaciones corriendo en puerto ${PORT}`);
});
