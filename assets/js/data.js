// Postos de combustível de Betim/MG — base consolidada do trabalho de BI.
// Preços em R$/litro. `null` = sem preço confiável publicado (ver FONTES).

const POSTOS = [
  { nome: "Posto Abril das Américas", endereco: "Av. das Américas, 670", bairro: "Centro", lat: -19.970984, lng: -44.191972, bandeira: "Petrobras", banheiro: true, lavaJato: true, conveniencia: false, calibrador: true, eletrico: false, horario: "", gasolina: 6.19, alcool: 3.99, diesel: 6.26, aditivada: 6.39 },
  { nome: "Posto Alterosa", endereco: "Av. Campo de Ourique, 1265", bairro: "Jardim Alterosa", lat: -19.949357, lng: -44.158004, bandeira: "Petrobras", banheiro: true, lavaJato: false, conveniencia: false, calibrador: true, eletrico: false, horario: "", gasolina: 5.99, alcool: 3.69, diesel: 6.59, aditivada: 5.99 },
  { nome: "Posto Amazonas", endereco: "Av. Amazonas, 4033", bairro: "Cachoeira", lat: -19.960573, lng: -44.223058, bandeira: "Branca", banheiro: true, lavaJato: false, conveniencia: false, calibrador: true, eletrico: false, horario: "", gasolina: 5.67, alcool: 3.86, diesel: 5.59, aditivada: 5.67 },
  { nome: "Posto Angola", endereco: "Rua do Rosário, 1001", bairro: "Angola", lat: -19.956981, lng: -44.200694, bandeira: "Ipiranga", banheiro: true, lavaJato: false, conveniencia: false, calibrador: true, eletrico: false, horario: "", gasolina: null, alcool: null, diesel: null, aditivada: null },
  { nome: "Posto Aqui Betim", endereco: "Av. Juiz Marco Túlio Isaac, 523", bairro: "Jardim da Cidade", lat: -19.963517, lng: -44.195058, bandeira: "Petrobras", banheiro: true, lavaJato: false, conveniencia: false, calibrador: true, eletrico: false, horario: "", gasolina: 5.87, alcool: 2.99, diesel: 7.79, aditivada: 6.27 },
  { nome: "Posto Arthur Trindade", endereco: "Av. Coletora Artur Trindade, 883", bairro: "Senhora de Fátima", lat: -19.939578, lng: -44.172624, bandeira: "Shell", banheiro: true, lavaJato: false, conveniencia: false, calibrador: true, eletrico: false, horario: "", gasolina: null, alcool: null, diesel: null, aditivada: null },
  { nome: "Posto Atlanta", endereco: "Av. Edméia Mattos Lazzarotti, 4055", bairro: "Senhora das Graças", lat: -19.945317, lng: -44.188354, bandeira: "Ipiranga", banheiro: true, lavaJato: false, conveniencia: false, calibrador: true, eletrico: false, horario: "", gasolina: null, alcool: null, diesel: null, aditivada: null },
  { nome: "Posto Barra Sete", endereco: "Rod. BR-381, KM 485", bairro: "Santo Antônio", lat: -19.955215, lng: -44.098219, bandeira: "Petrobras", banheiro: true, lavaJato: false, conveniencia: true, calibrador: true, eletrico: false, horario: "", gasolina: 5.87, alcool: 3.57, diesel: 6.29, aditivada: 5.87 },
  { nome: "Posto Betim", endereco: "Rod. BR-381, KM 496", bairro: "Brasiléia", lat: -19.976104, lng: -44.196534, bandeira: "Ipiranga", banheiro: true, lavaJato: false, conveniencia: false, calibrador: true, eletrico: false, horario: "", gasolina: null, alcool: null, diesel: null, aditivada: null },
  { nome: "Posto Betim 2", endereco: "Rua Maria das Mercês Lima, 10", bairro: "Betim Industrial", lat: -19.962417, lng: -44.165893, bandeira: "Ipiranga", banheiro: true, lavaJato: false, conveniencia: true, calibrador: true, eletrico: false, horario: "", gasolina: 5.89, alcool: 4.89, diesel: 5.79, aditivada: null },
  { nome: "Posto Hallas", endereco: "Rod. BR-381, KM 484", bairro: "Dist. Ind. Jardim Piemonte Norte", lat: -19.958521, lng: -44.070066, bandeira: "Ipiranga", banheiro: true, lavaJato: false, conveniencia: true, calibrador: true, eletrico: false, horario: "", gasolina: null, alcool: null, diesel: null, aditivada: null },
  { nome: "Posto Millennium", endereco: "Av. Edméia Matos Lazzarotti, 1441", bairro: "Angola", lat: -19.962884, lng: -44.200088, bandeira: "Ale", banheiro: true, lavaJato: false, conveniencia: false, calibrador: true, eletrico: false, horario: "24 Horas", gasolina: 6.19, alcool: 4.39, diesel: null, aditivada: 6.31 },
  { nome: "Posto Nova Rota", endereco: "Av. Fausto Ribeiro da Silva, 900", bairro: "Dist. Ind. Bandeirinhas", lat: -20.00365, lng: -44.170869, bandeira: "Ipiranga", banheiro: true, lavaJato: false, conveniencia: false, calibrador: true, eletrico: false, horario: "", gasolina: null, alcool: null, diesel: null, aditivada: null },
  { nome: "Posto Padre Libério", endereco: "Rod. BR-381, KM 482", bairro: "Dist. Ind. Jardim Piemonte Sul", lat: -19.958551, lng: -44.072015, bandeira: "Shell", banheiro: true, lavaJato: true, conveniencia: true, calibrador: true, eletrico: true, horario: "", gasolina: 5.87, alcool: 2.99, diesel: 6.49, aditivada: 6.56 },
  { nome: "Posto Romão", endereco: "Av. das Américas, 1058", bairro: "Centro", lat: -19.97339, lng: -44.190824, bandeira: "Ipiranga", banheiro: true, lavaJato: false, conveniencia: true, calibrador: true, eletrico: false, horario: "", gasolina: 5.78, alcool: 4.08, diesel: 5.69, aditivada: 5.98 },
  { nome: "Posto Select", endereco: "Av. Bandeirantes, 741", bairro: "Chácara", lat: -19.964622, lng: -44.186095, bandeira: "Shell", banheiro: true, lavaJato: true, conveniencia: true, calibrador: true, eletrico: false, horario: "", gasolina: null, alcool: null, diesel: null, aditivada: null },
  { nome: "Posto Trevo de Betim", endereco: "Av. Bandeirantes, 1360", bairro: "Filadélfia", lat: -19.966701, lng: -44.1798, bandeira: "Shell", banheiro: true, lavaJato: false, conveniencia: false, calibrador: true, eletrico: false, horario: "", gasolina: null, alcool: null, diesel: null, aditivada: null },
  { nome: "Posto Rodrigo", endereco: "Av. Artur da Silva Bernardes, 355", bairro: "Ingá", lat: -19.953589, lng: -44.195662, bandeira: "Branca", banheiro: true, lavaJato: false, conveniencia: false, calibrador: true, eletrico: false, horario: "", gasolina: 6.17, alcool: 4.37, diesel: 5.69, aditivada: null },
  { nome: "Posto Vila Amaral", endereco: "Av. Edméia Matos Lazzarotti, 1110", bairro: "Centro", lat: -19.966134, lng: -44.203236, bandeira: "Ipiranga", banheiro: true, lavaJato: false, conveniencia: false, calibrador: true, eletrico: false, horario: "", gasolina: 5.78, alcool: 4.19, diesel: 5.69, aditivada: null },
  { nome: "Posto Cidade Nova", endereco: "Av. Juiz Marco Túlio Isaac, 330", bairro: "Centro", lat: -19.964654, lng: -44.196714, bandeira: "Shell", banheiro: true, lavaJato: true, conveniencia: true, calibrador: true, eletrico: false, horario: "", gasolina: 6.17, alcool: 4.37, diesel: 6.59, aditivada: 6.57 },
];

const FONTES = [
  "Nomes, endereços, bandeiras e serviços: GasoRadar (gasoradar.com.br) — lista oficial de postos de Betim/MG.",
  "Preços: GasPedia (31/07/2026) e GasoRadar. Postos com preços desatualizados (2–4 anos) foram deixados em branco.",
  "Carregador elétrico: plataforma Carregados (carregados.com.br). Apenas o Posto Padre Libério consta com eletroposto.",
  "Latitude/longitude: geocodificação via Google Places (WGS84, graus decimais). Posto Betim e Posto Vila Amaral não têm ficha própria no Google — a coordenada é a do endereço na via.",
  "Preço médio: média dos combustíveis informados em cada posto; células vazias são ignoradas.",
  "Os preços variam diariamente — use como referência, não como cotação oficial.",
];

// Cor fixa por bandeira (identidade): a mesma cor serve tabela, gráfico e mapa.
const CORES_BANDEIRA = {
  Ipiranga: "var(--series-1)",
  Petrobras: "var(--series-2)",
  Shell: "var(--series-3)",
  Branca: "var(--series-4)",
  Ale: "var(--series-5)",
};

const COMBUSTIVEIS = [
  { chave: "gasolina", rotulo: "Gasolina comum" },
  { chave: "aditivada", rotulo: "Gasolina aditivada" },
  { chave: "diesel", rotulo: "Diesel" },
  { chave: "alcool", rotulo: "Etanol" },
];
