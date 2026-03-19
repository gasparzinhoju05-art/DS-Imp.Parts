const produtos = [

{
id:1,
nome:"Papel Fotográfico A4 180g",
preco:29.90,
imagem:"imagens/papel1.jpg",
descricao:"Papel fotográfico glossy 180g com 50 folhas"
},

{
id:2,
nome:"Papel Glossy Dupla Face 120g",
preco:26.90,
imagem:"https://down-br.img.susercontent.com/file/br-11134207-7r98o-m90ntd661vr6bc.webp",
descricao:"Papel glossy dupla face 120g com 50 folhas"
}

]// pegar id da url
const params = new URLSearchParams(window.location.search)

const id = params.get("id")

// buscar produto
const produto = produtos.find(p => p.id == id)

// preencher página

document.getElementById("nome").innerText = produto.nome
document.getElementById("preco").innerText = "R$ " + produto.preco
document.getElementById("imagem").src = produto.imagem
document.getElementById("descricao").innerText = produto.descricao

function comprar(){

alert("Redirecionar para pagamento")

}