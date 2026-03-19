const express = require("express");
const axios = require("axios");

const app = express();

app.use(express.json());
app.use(express.static("public"));

// 🔥 COLE SEU TOKEN NOVO AQUI
const TOKEN = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiYWM1N2JiMWQzNmJjYzk3OGU1YWQwMWY4OTI1MzM4ODU5OGM4ODdiZGU4MzZmMGY3ZjdjMGVjMzFlMzA0ZDRkNTVkZGZhNDk0OWE1YzQ0NzMiLCJpYXQiOjE3NzM5NjA4OTkuMjM3OTMxLCJuYmYiOjE3NzM5NjA4OTkuMjM3OTMyLCJleHAiOjE4MDU0OTY4OTkuMjI2MTU4LCJzdWIiOiI5ZTI0NWNiMS1kMTlhLTQyM2MtYjhkMS03ZmYyODU5MTg4MzYiLCJzY29wZXMiOlsiY2FydC1yZWFkIiwiY2FydC13cml0ZSIsImNvbXBhbmllcy1yZWFkIiwiY29tcGFuaWVzLXdyaXRlIiwiY291cG9ucy1yZWFkIiwiY291cG9ucy13cml0ZSIsIm5vdGlmaWNhdGlvbnMtcmVhZCIsIm9yZGVycy1yZWFkIiwicHJvZHVjdHMtcmVhZCIsInByb2R1Y3RzLWRlc3Ryb3kiLCJwcm9kdWN0cy13cml0ZSIsInB1cmNoYXNlcy1yZWFkIiwic2hpcHBpbmctY2FsY3VsYXRlIiwic2hpcHBpbmctY2FuY2VsIiwic2hpcHBpbmctY2hlY2tvdXQiLCJzaGlwcGluZy1jb21wYW5pZXMiLCJzaGlwcGluZy1nZW5lcmF0ZSIsInNoaXBwaW5nLXByZXZpZXciLCJzaGlwcGluZy1wcmludCIsInNoaXBwaW5nLXNoYXJlIiwic2hpcHBpbmctdHJhY2tpbmciLCJlY29tbWVyY2Utc2hpcHBpbmciLCJ0cmFuc2FjdGlvbnMtcmVhZCIsInVzZXJzLXJlYWQiLCJ1c2Vycy13cml0ZSIsIndlYmhvb2tzLXJlYWQiLCJ3ZWJob29rcy13cml0ZSIsIndlYmhvb2tzLWRlbGV0ZSIsInRkZWFsZXItd2ViaG9vayJdfQ.ZdA2Bsm0lFBiGATq3OBc9QsYI1rQ9eDtHAXg_fvNN4ufjjU7mHlpg8TVnJvdlQjoyDoN6bx5EByaQU6rHzFFhKm_GKTUa9jr_CJlG5DUjr6xjgCVksNrbnA7UnZEYE0mb7DvuRB178XtbiLQcEZOP1Oe86wFaj5zP5m92gZrSn8eH70LWn1QmZ3rEfoYgDm1toknWUh6O9tKaeNxgSLsMqNFPBOaKKqnxhztyPfsWprjsdA7BJSGkDLUZ2qfH_-qMG6GGn-7hX6M07DzgUdhjJks8ro2NmV6d-QpNN_KiZsXYA4WX7nDS5grl7wxs-OMf66dLRELm0bS_iFQYkFdS432z7HkJLJTpTiZxP12VQ0sds3tvt6zyyn-tXm9jp_Cy5HVIF0iN-CoaE2Oiqxy9AsimrXTXT9pI6gawu4iHnucQsdUpbSk4AbY8coR0YTT2-hJ-8ngaA63La2TmszTiOiRk6NjxFY5xf2YpF1O9rteymQ_CWJe90G88mN989AV9i5mSmqdXwTi7W9WzeA0yuC0xNpkyfmyI09xXzoLoEcfKOG6ZxiM5Umx1UCtGrHd_MNfvqAhP4DRUYbpSoH1nD91xyasf２qUuQegliMJbygXDohVjGTY9zv１m3BrytCoadD4FSA33UpSjcg0ea_BNRepVrJ-UOCcU_IQZpnbtQo";

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

app.listen(3000, () => {
    console.log("Servidor rodando em http://localhost:3000");
});