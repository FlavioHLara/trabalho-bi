# Postos de Combustível de Betim/MG — Trabalho Prático de BI

Website do Trabalho Prático da disciplina de Business Intelligence.

Conforme o escopo pedido, a página reúne:

1. a descrição do trabalho, o tema e o nome dos alunos;
2. o link para o app do mapa de indicadores geográficos feito no ArcGIS;
3. o link compartilhado do painel construído no Power BI.

## Alunos

- Diogo Lamera dos Santos
- Flávio Henrique Lara Santos
- Mateus Amaral Lara
- Ronaldo Soares de Oliveira Junior

## Montar o painel do Power BI

A pasta `powerbi/` tem tudo o que é preciso:

- **`Postos_Betim_PowerBI.xlsx`** — a base já organizada em três abas (`Postos`, `Precos`, `Servicos`),
  pronta para importar ou colar no Power BI.
- **`GUIA-POWER-BI.md`** — passo a passo da importação, das medidas DAX, dos 8 visuais e da publicação.

## Link do painel do Power BI

O link já está inserido na seção `#painel` do `index.html`, em dois lugares: no `href` do botão
"Abrir o painel" e no `src` do `<iframe>` embutido.

O link atual é do tipo **Inserir relatório → Site ou portal**, que exige login com a conta
institucional — quem não tiver acesso verá "Entre para ver este relatório". Se for preciso um link
aberto a qualquer visitante, gere um novo em **Arquivo → Inserir relatório → Publicar na web
(público)** e troque o endereço nos dois pontos acima.

## Publicar o site no GitHub Pages

Em **Settings → Pages**, escolha *Deploy from a branch*, branch `main`, pasta `/ (root)`.
O endereço fica `https://flaviohlara.github.io/trabalho-bi/`.

## Estrutura

```
index.html              a página
assets/css/style.css    estilos
dados/                  planilhas de origem do trabalho (CSV e XLSX)
powerbi/                base organizada para o Power BI e o guia de montagem
```

## Fontes dos dados

- Nomes, endereços, bandeiras e serviços: [GasoRadar](https://gasoradar.com.br)
- Preços: GasPedia (31/07/2026) e GasoRadar
- Carregador elétrico: [Carregados](https://carregados.com.br)
- Coordenadas: geocodificação via Google Places (WGS84)
