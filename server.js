const express = require("express");
const axios = require("axios");
const path = require("path");

const app = express();

app.use(express.json());

// ✅ SERVIR ARQUIVOS CORRETAMENTE
app.use(express.static(path.join(__dirname)));

// 🔐 TOKEN (Render)
const TOKEN = process.env.TOKEN_MELHOR_ENVIO;

// ✅ ROTA PRINCIPAL (corrigida)
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

// 🚚 CALCULAR FRETE
app.post("/calcular-frete", async (req, res) => {
    try {
        const { cep } = req.body;

        if (!TOKEN) {
            return res.status(500).json({ erro: "Token não configurado" });
        }

        const response = await axios.post(
            "https://melhorenvio.com.br/api/v2/me/shipment/calculate",
            {
                from: { postal_code: "03621010" },
                to: { postal_code: cep },
                products: [
                    {
                        id: "1",
                        width: 15,
                        height: 10,
                        length: 20,
                        weight: 0.5,
                        insurance_value: 50,
                        quantity: 1
                    }
                ]
            },
            {
                headers: {
                    Authorization: `Bearer ${TOKEN}`,
                    Accept: "application/json",
                    "Content-Type": "application/json"
                }
            }
        );

        res.json(response.data);

    } catch (error) {
        console.log("ERRO FRETE:", error.response?.data || error.message);
        res.status(500).json({ erro: "Erro ao calcular frete" });
    }
});

// 🚀 INICIAR SERVIDOR
app.listen(process.env.PORT || 3000, () => {
    console.log("Servidor rodando");
});
