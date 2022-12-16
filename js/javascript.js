let botao = document.querySelector('.botao_busca')
let aguarde = document.querySelector('.aguarde')
let container = document.querySelector('.contaier-resposta')
let conversaoKevin = 0
let quantidade = 0
let res = []
let temalgo = []
let nome = ''
let pais = ''


var clicou = async (e) =>{
    quantidade ++
    document.querySelector('.error').style.display = 'none'

   if (quantidade == 1){
    aguarde.style.display = 'block'
    setTimeout(()=>{
        aguarde.style.display = 'none'

    },'500')    
   }
   container.style.display = 'block'

    let input = document.querySelector('input').value
    let url = `http://api.openweathermap.org/geo/1.0/direct?q=${input}&limit=1&appid=297c8e1c49b86f7d3cd75ffb4de43966
    `
    let dados_url = await fetch(url) 
    let dados_url_json = await dados_url.json()
        if(dados_url_json.length == 0 || input.length == 0){
            error()
        }
        else{
           
            fazerConversao(dados_url_json) }        
        
    


   
}
function fazerConversao (dadosdaURL) {
     dadosdaURL.map((parametro)=>{
        let lat = parametro.lat
        let lon = parametro.lon

        nome = parametro.name 
        pais = parametro.country
       pegarTemperatura(lat,lon)


    })
}


var pegarTemperatura = async (lat,lon)=>{
   
    let url2 = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&lang=pt_br&appid=297c8e1c49b86f7d3cd75ffb4de43966` 
    var r = await fetch(url2)
    var resultado = await r.json()
        mostrarTemperatura(resultado)
    
}

let mostrarTemperatura = async (res) =>{
        conversaoKevin = res.main.temp - 273.15
        document.querySelector('.nome-estado').innerHTML = `${nome} - ${pais}`
        document.querySelector('.valor-vento').innerHTML = `${res.wind.speed}<small> km/h</small>`
        document.querySelector('.valor-temperatura').innerHTML = `${conversaoKevin.toFixed(2)} <small>°C</small>`
        idCidade = res.sys.id
        id = res.id
        let clima = res.weather[0].description 
        let rotacao = res.wind.deg
        console.log(rotacao)
        document.querySelector(".imagem-vento").style.display = 'flex'
        let ponteiro = document.querySelector('.imagem-vento-ponteiro')
        ponteiro.style.transform= ` rotate(${rotacao}deg)
        `
        
        climaUp(clima)
    
}

function climaUp (clima){
      let imgTemp =   document.getElementById('imagem')
      imgTemp.style.display = "block"
      let resultado_img = ''
        switch (clima.toLowerCase()){
            case "céu limpo":
                resultado_img = "sol.png"
            break
            case "nublado":
                resultado_img = "nublado.png"
            break 
            case "neblina":
                resultado_img = "nublado.png"
            break   
            case "chuva forte":
                resultado_img = "tempestade.png"
            break
            case "chuva leve":
                resultado_img = "moderada.png"
            break
            case "chuva moderada":
                resultado_img = "moderada.png"
            break
            case "névoa":
                resultado_img = "nevoa.png"
            break
            case  "algumas nuvens":
                resultado_img = "nevoa.png"
            break
            case "nuvens dispersas":
                resultado_img = "chuvadispersa.png"
            break
            case "chuviscos com intensidade de raios":
                resultado_img = "chuvadispersa.png"
                break
            case"garoa de leve intensidade":
                resultado_img = ""

            break
            case "trovoada com chuva forte" :
                resultado_img = "tempestade.png"
            break
            case "trovoada com chuva moderada" :
                resultado_img = "tempestade.png"
            break
            case "trovoada com chuva fraca" :
                resultado_img = "tempestade.png"
            break
            case "poeira":
                resultado_img = "poeria.png"
            break


        }
    
      imgTemp.src = `./imagens/${resultado_img}`

}






function error (){
    document.querySelector('.error').style.display = 'block'
    container.style.display = 'none'
   
}
botao.addEventListener('click',clicou)
/*Aqui eu comecei criando uma variavel com meu input, depois criei um evento de teclado pra ele, depois passei como parametro o proprio evento, depois junto com o if perguntei se o e.code ou seja a tecla clicada é o enter, se for TRUE, ele vai previnir o envento de click do meu E. e depois chama a função de click, clicou !!*/ 
let input = document.querySelector('input')
input.addEventListener('keypress',(e)=>{
    
    if(e.code === 'Enter'){ 
        e.preventDefault()
       clicou()

    
   }
})
