// variaveis

const area = document.querySelector('#areaProdutos')
const btnCart = document.querySelector('#btnCart')
const cart = document.querySelector('#cart')
const fechar = document.querySelector('#close')
const total = document.querySelector('#precoTotal')
const pesquisa = document.querySelector('#search')
const btnpsq = document.querySelector('#lupa')
precoTotal = 0;

const stringBtn = `<button id="voltar" onclick="voltarParaHome()">
    voltar para pagina inicial
</button>
`

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
    },
    {
        id:3,
        nome:"Blusa",
        preco:59.15,
        qtd:0,
        src:"imgs/blusaImg.jpg"
    }
]

function printarProd(id,src,nome,preco){
    area.innerHTML += `
        <div id="produto${id}" class="containerProd">
            <img src="${src}" alt="exemplo de imagem" class="imgprod">

            <div class="nome">
                ${nome}
            </div>
            <div class="btns">
                <div class="preco">
                    ${preco.toFixed(2)} R$
                </div>
                <button class="addtocart" onclick="adicionarAoCart(${id})">
                    <i class="bi bi-basket"></i>
                </button>
            </div>
        </div>
    `
}

// adicionar produtos

for (let c = 0; c < produtos.length; c++){
    printarProd(produtos[c].id ,produtos[c].src ,produtos[c].nome ,produtos[c].preco)
}

// funcionalidades barra de pesquisa

btnpsq.addEventListener('click', function () {

    if (pesquisa.value != ''){

        for (let c = 0; c < produtos.length; c++){

            if (pesquisa.value.toUpperCase().trim() == produtos[c].nome.toUpperCase().trim()){
                area.innerHTML = ''

                printarProd(produtos[c].id ,produtos[c].src ,produtos[c].nome , produtos[c].preco)

                area.innerHTML += stringBtn

                area.style.display = 'flex'
                area.style.flexDirection = 'column'
                area.style.alignItems = 'center'

            }
        }
    }
})

function voltarParaHome(){

    area.innerHTML = ''
    for (let c = 0; c < produtos.length; c++){
        printarProd(produtos[c].id ,produtos[c].src ,produtos[c].nome , produtos[c].preco)

        area.style.display = 'block'

        pesquisa.value = ''
    }
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

const containerCart = document.querySelector('#container')


function adicionarAoCart(c){
    produtos[c].qtd += 1
    mostraNoCarrinho(produtos[c])

    // cauculo do total da compra

    precoTotal += produtos[c].preco
    total.innerHTML = precoTotal.toFixed(2)

    // ---------------------------------------------
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