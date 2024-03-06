// variaveis

const area = document.querySelector('#areaProdutos')
const btnCart = document.querySelector('#btnCart')
const cart = document.querySelector('#cart')
const fechar = document.querySelector('#close')
const total = document.querySelector('#precoTotal')
precoTotal = 0;

// -----------------------------------------------------------

const produtos = [
    {
        id:0,
        nome:"Camisa",
        preco:46.90,
        qtd:0,
        src:"imgs/camisaImg.jpg"
    },
    {
        id:1,
        nome:"Sapato",
        preco:120.00,
        qtd:0,
        src:"imgs/sapatoImg.jpg"
    },
    {
        id:2,
        nome:"Calça",
        preco:60.10,
        qtd:0,
        src:"imgs/calcaImg.jpg"
    }
]

// adicionar produtos

for (let c = 0; c < produtos.length; c++){
    area.innerHTML += `
        <div id="produto${produtos[c].id}" class="containerProd" onfocus="">
            <img src="${produtos[c].src}" alt="exemplo de imagem" class="imgprod">

            <div class="nome">
                ${produtos[c].nome}
            </div>
            <div class="btns">
                <div class="preco">
                    ${produtos[c].preco.toFixed(2)} R$
                </div>
                <button class="addtocart" >
                    <i class="bi bi-basket"></i>
                </button>
            </div>
        </div>
    `
}

// funcionalidades carrinho

// botôes abrir e fechar

btnCart.addEventListener('click', function (){
    cart.style.display = 'flex'
})

fechar.addEventListener('click', function () {
    cart.style.display = 'none'
})

// botão adicionar

const btnAddCart = document.querySelectorAll('.addtocart')
const containerCart = document.querySelector('#container')

for (let c = 0; c < btnAddCart.length; c++){
    btnAddCart[c].addEventListener('click', function() {

        produtos[c].qtd += 1
        mostraNoCarrinho(produtos[c])

        // cauculo do total da compra

        precoTotal += produtos[c].preco
        total.innerHTML = precoTotal.toFixed(2)

        // ---------------------------------------------

    })
}

// mostrar no carrinho

function mostraNoCarrinho(objeto){
    if(objeto.qtd > 0 && objeto.qtd < 2){

        containerCart.innerHTML += `
            <div class="prodInCart" id="PC${objeto.id}" >
                <img src="${objeto.src}" alt="exemplo de produto" width="50px" height="50px">

                <div class="nomeIncart"> ${objeto.nome} </div>
                <div class="precoIncart"> ${objeto.preco.toFixed(2)} R$ </div>
                <div class="qtdInCart" id="qtdprod${objeto.id}"> ${objeto.qtd} </div>

                <button class="botaoRemover" onclick="removerProd(${objeto.id})"> 
                    Remover
                </button>

            </div>
        `
    }else {

        let qtdProd = document.querySelector(`#qtdprod${objeto.id}`)
        qtdProd.innerHTML = objeto.qtd
    }
}

// botão remover do carrinho

function removerProd(ident){

    let i = parseInt(ident)
    let quant = document.querySelector(`#qtdprod${i}`)
    let child = document.querySelector(`#PC${i}`)

    produtos[i].qtd--
    quant.innerHTML = produtos[i].qtd 

    // cauculo do total da compra

    precoTotal -= produtos[i].preco
    total.innerHTML = precoTotal.toFixed(2)

    // -------------------------------------------------

    if(produtos[i].qtd == 0){

        produtos[i].qtd = 0
        containerCart.removeChild(child)

    }

    if (total.innerHTML == 0) {
        total.innerHTML = ''
    }
}

// finalizando compra

const btnFinalizar = document.querySelector('#finalizar')

btnFinalizar.addEventListener('click', function () {

    if(verificaQtd()){
        alert('compra finalizada')
        location.reload()
    }else {
        alert('nada no carrinho')
    }
})

function verificaQtd(){
    let cont = 0
    for (let c = 0; c < produtos.length; c++){
        if(produtos[c].qtd != 0){
            cont++
        }
    }
    return cont > 0
}