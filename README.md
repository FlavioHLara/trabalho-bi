# Postos de Combustível de Betim/MG — Painel de BI

Página estática que apresenta os dados levantados pelo grupo sobre os postos de combustível de
Betim/MG: preços por combustível, bandeira, serviços oferecidos e localização no mapa.

Trabalho da disciplina de Business Intelligence.

## Integrantes

- Diogo Lamera dos Santos
- Flávio Henrique Lara Santos
- Mateus Amaral Lara
- Ronaldo Soares de Oliveira Junior

## O que a página mostra

- **Indicadores gerais** — total de postos, preço médio da gasolina, extremos e a economia possível entre eles.
- **Preços** — média por combustível, comparação por bandeira e ranking dos postos. Como os preços da
  gasolina variam pouco entre postos, os gráficos de comparação mostram a diferença em relação ao mais
  barato; o preço cheio aparece ao passar o mouse.
- **Mapa** — os 20 postos georreferenciados, coloridos pela bandeira (Leaflet + OpenStreetMap).
- **Base de dados** — tabela completa com busca, filtro por bandeira e por serviço, e ordenação por coluna.

## Como rodar localmente

A página precisa ser servida por HTTP (abrir o `index.html` direto pelo arquivo não carrega os scripts).

```powershell
npx --yes http-server . -p 4173 -c-1
```

Depois acesse <http://localhost:4173>.

## Publicar no GitHub Pages

Em **Settings → Pages**, escolha *Deploy from a branch*, branch `main`, pasta `/ (root)`.

## Estrutura

```
index.html              página única
assets/css/style.css    estilos e temas claro/escuro
assets/js/data.js       base dos 20 postos + fontes
assets/js/app.js        indicadores, gráficos, filtros, tabela e mapa
dados/                  planilhas originais (CSV e XLSX)
```

Para atualizar os dados, edite `assets/js/data.js` — o restante da página se recalcula sozinho.

## Fontes

- Nomes, endereços, bandeiras e serviços: [GasoRadar](https://gasoradar.com.br)
- Preços: GasPedia (31/07/2026) e GasoRadar. Postos com preços desatualizados ficaram em branco.
- Carregador elétrico: [Carregados](https://carregados.com.br)
- Coordenadas: geocodificação via Google Places (WGS84)

Os preços variam diariamente e servem como referência comparativa, não como cotação oficial.

## Links do trabalho

- [Portfólio de mapas no ArcGIS](https://www.arcgis.com/apps/instant/portfolio/index.html?appid=b191c9f16548430f80f37fa9dd80865e)
