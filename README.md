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

## Como publicar o link do Power BI

O link ainda não foi inserido. No Power BI Service, abra o relatório e use
**Arquivo → Inserir relatório → Site ou portal** (ou **Compartilhar → Inserir**).
Copie o link gerado e, em `index.html`, dentro da seção `#painel`:

1. substitua `COLE_AQUI_O_LINK_DO_POWER_BI` no `href` do botão "Abrir o painel";
2. descomente o bloco do `<iframe>` e cole o mesmo link no `src`, para o painel aparecer embutido na página;
3. apague o parágrafo de aviso com a classe `pendente`.

## Publicar o site no GitHub Pages

Em **Settings → Pages**, escolha *Deploy from a branch*, branch `main`, pasta `/ (root)`.
O endereço fica `https://flaviohlara.github.io/trabalho-bi/`.

## Estrutura

```
index.html              a página
assets/css/style.css    estilos
dados/                  planilhas de origem do trabalho (CSV e XLSX)
```

## Fontes dos dados

- Nomes, endereços, bandeiras e serviços: [GasoRadar](https://gasoradar.com.br)
- Preços: GasPedia (31/07/2026) e GasoRadar
- Carregador elétrico: [Carregados](https://carregados.com.br)
- Coordenadas: geocodificação via Google Places (WGS84)
