const MINHA_CHAVE = '76b6a96cf6b0bb5682151f9d532cecb5';

const botao = document.getElementById('buscar');
const inputCidade = document.getElementById('cidade');
const divResultado = document.getElementById('resultado');

botao.onclick = function () {
    const cidade = inputCidade.value.trim();
    if (cidade === '') return alert('Preencha a cidade');

    divResultado.innerHTML = `⏳ Buscando clima para ${cidade}...`;

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${MINHA_CHAVE}&units=metric&lang=pt_br`;

    fetch(url)
        .then(resposta => {
            if (!resposta.ok) throw new Error(`Erro HTTP: ${resposta.status}`);
            return resposta.json();
        })
        .then(dados => {
            // Extrair mais informações
            const nome = dados.name;
            const pais = dados.sys.country;
            const temp = dados.main.temp;
            const sensacao = dados.main.feels_like;
            const tempMin = dados.main.temp_min;
            const tempMax = dados.main.temp_max;
            const umidade = dados.main.humidity;
            const pressao = dados.main.pressure;
            const descricao = dados.weather[0].description;
            const icone = dados.weather[0].icon;
            const ventoVel = dados.wind.speed;
            const ventoDir = dados.wind.deg;
            const visibilidade = dados.visibility ? (dados.visibility / 1000).toFixed(1) : 'N/A';
            const nascerSol = new Date(dados.sys.sunrise * 1000).toLocaleTimeString('pt-BR');
            const porSol = new Date(dados.sys.sunset * 1000).toLocaleTimeString('pt-BR');

            // Construir HTML
            let html = `
                <div class="weather-header">
                    <h2>${nome}, ${pais}</h2>
                    <img src="https://openweathermap.org/img/wn/${icone}@2x.png" alt="${descricao}">
                </div>
                <div class="weather-main">
                    <p class="temp">${temp.toFixed(1)}°C</p>
                    <p class="desc">${descricao}</p>
                </div>
                <div class="weather-details">
                    <div><span>Sensação:</span> ${sensacao.toFixed(1)}°C</div>
                    <div><span>Mín/Máx:</span> ${tempMin.toFixed(1)}°C / ${tempMax.toFixed(1)}°C</div>
                    <div><span>Umidade:</span> ${umidade}%</div>
                    <div><span>Pressão:</span> ${pressao} hPa</div>
                    <div><span>Vento:</span> ${ventoVel} m/s (${ventoDir}°)</div>
                    <div><span>Visibilidade:</span> ${visibilidade} km</div>
                    <div><span>Nascer do sol:</span> ${nascerSol}</div>
                    <div><span>Pôr do sol:</span> ${porSol}</div>
                </div>
            `;
            divResultado.innerHTML = html;
        })
        .catch(erro => {
            divResultado.innerHTML = 'Erro: ' + erro.message;
        });
};