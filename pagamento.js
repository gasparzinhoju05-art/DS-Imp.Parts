// ===== CARRINHO =====
let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

// ===== MOSTRAR PRODUTOS NO RESUMO =====
function carregarResumo(){

    let container = document.getElementById("resumo-pedido");
    let total = 0;

    container.innerHTML = "";

    carrinho.forEach(produto => {

        let item = document.createElement("div");
        item.classList.add("item-resumo");

        item.innerHTML = `
            <img src="${produto.imagem}" width="60">
            <div>
                <p>${produto.nome}</p>
                <p>R$ ${produto.preco.toFixed(2)}</p>
            </div>
        `;

        container.appendChild(item);

        total += produto.preco;
    });

    document.getElementById("total").innerText = total.toFixed(2);
}

// ===== FRETE REAL =====
let valorFrete = 0;

async function calcularFrete(){

    let cep = document.getElementById("cep").value;

    if(cep.length < 8){
        alert("Digite um CEP válido");
        return;
    }

    let resposta = await fetch("http://localhost:3000/calcular-frete", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ cep, carrinho })
    });

    let dados = await resposta.json();

    if(dados.erro){
        alert("Erro ao calcular frete");
        return;
    }

    let frete = dados[0];

    valorFrete = parseFloat(frete.price);

    document.getElementById("frete-valor").innerText =
        `${frete.name} - R$ ${frete.price} (${frete.delivery_time} dias)`;

    atualizarTotal();
}

// ===== ATUALIZAR TOTAL COM FRETE =====
function atualizarTotal(){

    let total = 0;

    carrinho.forEach(p => total += p.preco);

    total += valorFrete;

    document.getElementById("total").innerText = total.toFixed(2);
}

// ===== FINALIZAR PEDIDO =====
function finalizarPedido(){

    let nome = document.getElementById("nome").value;
    let telefone = document.getElementById("telefone").value;
    let endereco = document.getElementById("endereco").value;

    if(!nome || !telefone || !endereco){
        alert("Preencha todos os dados!");
        return;
    }

    alert("Pedido finalizado com sucesso! 🚀");

    localStorage.removeItem("carrinho");

    window.location.href = "index.html";
}

// ===== CARREGAR AO ABRIR =====
carregarResumo();