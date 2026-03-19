let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

function carregarCarrinho(){

    let lista = document.getElementById("lista-carrinho");
    let total = 0;

    lista.innerHTML = "";

    if(carrinho.length === 0){
        lista.innerHTML = "<p>Seu carrinho está vazio.</p>";
        return;
    }

    carrinho.forEach((produto, index)=>{

        let item = document.createElement("div");
        item.classList.add("item-carrinho");

        item.innerHTML = `

        <img src="${produto.imagem}" class="img-carrinho">

        <div class="info">
            <h4>${produto.nome}</h4>
            <p>R$ ${produto.preco.toFixed(2)}</p>
        </div>

        <button onclick="removerItem(${index})">Remover</button>

        `;

        lista.appendChild(item);

        total += produto.preco;

    });

    document.getElementById("total").innerText = total.toFixed(2);

}

function removerItem(index){

    carrinho.splice(index,1);

    localStorage.setItem("carrinho", JSON.stringify(carrinho));

    carregarCarrinho();

}

function limparCarrinho(){

    localStorage.removeItem("carrinho");

    carrinho = [];

    carregarCarrinho();

}

function finalizarCompra(){

    if(carrinho.length === 0){
        alert("Carrinho vazio!");
        return;
    }

    let mensagem = "🛒 Pedido:%0A";

    carrinho.forEach(produto=>{
        mensagem += `- ${produto.nome} (R$ ${produto.preco.toFixed(2)})%0A`;
    });

    let total = carrinho.reduce((soma, p)=> soma + p.preco, 0);

    mensagem += `%0ATotal: R$ ${total.toFixed(2)}`;

    let numero = "5511999999999"; // 🔥 TROQUE PELO SEU NÚMERO

    window.open(`https://wa.me/${numero}?text=${mensagem}`, "_blank");

}

// carrega quando abre a página
document.addEventListener("DOMContentLoaded", function(){
    carregarCarrinho();
});