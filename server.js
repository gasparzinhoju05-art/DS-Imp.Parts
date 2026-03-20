const express = require("express");
const axios = require("axios");

const app = express();

app.use(express.json());
app.use(express.static(__dirname + "/public"));

// 🔥 COLE SEU TOKEN NOVO AQUI
const TOKEN = process.env.TOKEN;

app.post("/calcular-frete", async (req, res) => {

    try {

        const { cep } = req.body;

        const response = await axios.post(
            "https://melhorenvio.com.br/api/v2/me/shipment/calculate",
            {
                from: { postal_code: "03621010" }, // CEP da sua loja
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
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "content-type": "application/json"

                }
            }
        );

        res.json(response.data);

    } catch (error) {
        console.log(error.response?.data || error.message);
        res.status(500).json({ erro: "Erro ao calcular frete" });
    }

});

app.listen(process.env.PORT || 3000, () => {
    console.log("Servidor rodando");
});