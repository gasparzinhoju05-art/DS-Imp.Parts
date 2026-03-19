let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

function addCarrinho(nome, preco, imagem){

let produto = {
nome: nome,
preco: preco,
imagem: imagem
};

carrinho.push(produto);

localStorage.setItem("carrinho", JSON.stringify(carrinho));

atualizarContador();

mostrarToast();

// função de filtro de categorias
function filtrar(categoria){

let produtos = document.querySelectorAll(".produto");

produtos.forEach(produto=>{

if(categoria == "todos"){
produto.style.display="block";
return;
}

if(produto.dataset.categoria == categoria){
produto.style.display="block";
}else{
produto.style.display="none";
}

});

}

// função contador do carrinho
function atualizarContador(){

let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

let quantidade = carrinho.length;

let contador = document.getElementById("contador-carrinho");

if(contador){
contador.innerText = quantidade;
}

}

// executa quando a página carrega
document.addEventListener("DOMContentLoaded", function(){

atualizarContador();

})}
function mostrarToast(){

let toast = document.getElementById("toast");

toast.classList.add("show");

setTimeout(()=>{
    toast.classList.remove("show");
}, 2000);

}