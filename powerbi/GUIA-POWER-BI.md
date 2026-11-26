# Guia de montagem do painel no Power BI

Painel dos postos de combustível de Betim/MG. O enunciado pede **no mínimo 6 gráficos** — este guia
monta **8 visuais + 4 cartões + 2 segmentações**, então sobra margem.

Arquivo de dados: **`Postos_Betim_PowerBI.xlsx`** (nesta mesma pasta).

---

## 1. A planilha

O arquivo tem três abas, já formatadas como tabelas do Excel (`tblPostos`, `tblPrecos`, `tblServicos`):

| Aba | Linhas | Para que serve |
|---|---|---|
| **Postos** | 20 | Uma linha por posto. Base dos cartões, do mapa e da tabela detalhada. |
| **Precos** | 44 | Uma linha por posto × combustível. Deixa os gráficos de preço prontos sem precisar de Power Query. |
| **Servicos** | 120 | Uma linha por posto × serviço. Deixa o gráfico de serviços pronto do mesmo jeito. |

As abas `Precos` e `Servicos` são as mesmas informações da aba `Postos`, só que em formato longo
(*unpivot*). Isso evita ter que criar um gráfico separado para cada coluna de preço.

Colunas da aba **Postos**: Posto, Endereço, Bairro, Bandeira, Latitude, Longitude, Cidade, Estado,
Preço Gasolina, Preço Aditivada, Preço Etanol, Preço Diesel, Preço Médio, Tem Preço, Banheiro,
Calibrador de Pneu, Loja de Conveniência, Lava-Jato, Carregador Elétrico, Aberto 24 Horas, Qtd Serviços.

> **Sobre os preços em branco:** 8 dos 20 postos não têm preço público atualizado e ficaram vazios de
> propósito. O Power BI ignora vazios nas médias, então isso não distorce nada — mas vale citar na
> apresentação. A coluna **Tem Preço** serve para filtrar só os 12 postos com preço quando quiser.

---

## 2. Importar os dados

### Opção A — abrir o arquivo (recomendado)

1. Power BI Desktop → **Página Inicial → Obter dados → Pasta de Trabalho do Excel**.
2. Escolha `Postos_Betim_PowerBI.xlsx`.
3. No navegador, marque as três tabelas: **tblPostos**, **tblPrecos**, **tblServicos**.
4. **Carregar**.
5. Renomeie as tabelas no painel **Dados** para `Postos`, `Precos` e `Servicos` (clique com o botão
   direito → Renomear). O guia usa esses nomes.

### Opção B — colar na aba de dados

Se preferir colar em vez de vincular o arquivo:

1. Abra o `.xlsx` no Excel, clique em qualquer célula de uma aba e aperte **Ctrl+A** e **Ctrl+C**.
2. No Power BI: **Página Inicial → Inserir dados**.
3. Clique na primeira célula da grade e **Ctrl+V**. Marque *Usar primeira linha como cabeçalho*.
4. Dê o nome da tabela (`Postos`, `Precos` ou `Servicos`) e clique em **Carregar**.
5. Repita para as outras duas abas.

> Colando, confira se as colunas de preço ficaram como **Número decimal** (ícone `1.2` no cabeçalho).
> Se vierem como texto, clique na coluna → **Ferramentas de coluna → Tipo de dados → Número decimal**.

---

## 3. Ajustes obrigatórios no modelo

Faça estes três antes de montar os gráficos, senão os visuais saem errados.

**a) Latitude e Longitude** (tabela `Postos`) — o mapa não funciona sem isso:

- Clique na coluna `Latitude` → aba **Ferramentas de coluna** → **Categoria de dados: Latitude** e
  **Resumo: Não resumir**.
- Mesma coisa em `Longitude` → **Categoria de dados: Longitude** e **Resumo: Não resumir**.

**b) Colunas de preço** — o Power BI soma números por padrão, e somar preço não significa nada:

- Em `Postos`: para `Preço Gasolina`, `Preço Aditivada`, `Preço Etanol`, `Preço Diesel` e `Preço Médio`,
  defina **Resumo: Média**.
- Em `Precos`: faça o mesmo na coluna `Preço`.

**c) Relacionamentos** — vá em **Exibição de Modelo** e confira se existem (se não, arraste um campo
sobre o outro para criar):

- `Postos[Posto]` → `Precos[Posto]` — cardinalidade **1 para muitos**, direção **Única**.
- `Postos[Posto]` → `Servicos[Posto]` — cardinalidade **1 para muitos**, direção **Única**.

---

## 4. Medidas (DAX)

Em **Página Inicial → Nova medida**, crie uma de cada vez (cole uma linha completa por medida):

```dax
Qtd Postos = COUNTROWS(Postos)
```
```dax
Postos com Preço = CALCULATE(COUNTROWS(Postos), Postos[Tem Preço] = "Sim")
```
```dax
Preço Médio Gasolina = AVERAGE(Postos[Preço Gasolina])
```
```dax
Menor Preço Gasolina = MIN(Postos[Preço Gasolina])
```
```dax
Maior Preço Gasolina = MAX(Postos[Preço Gasolina])
```
```dax
Economia Potencial % =
DIVIDE([Maior Preço Gasolina] - [Menor Preço Gasolina], [Menor Preço Gasolina])
```
```dax
Preço Médio = AVERAGE(Precos[Preço])
```
```dax
Postos com o Serviço = CALCULATE(DISTINCTCOUNT(Servicos[Posto]), Servicos[Disponível] = "Sim")
```
```dax
Posto Mais Barato =
VAR Menor = [Menor Preço Gasolina]
RETURN CALCULATE(MIN(Postos[Posto]), FILTER(ALL(Postos), Postos[Preço Gasolina] = Menor))
```

Depois de criar, selecione as medidas de preço e defina o formato em **Ferramentas de medida →
Formato: Moeda** (ou *Número decimal* com 2 casas). `Economia Potencial %` vai como **Porcentagem**,
1 casa decimal.

---

## 5. Os visuais

### Página 1 — Visão geral

**Cartões (4)** — use o visual **Cartão**, um para cada medida:

| Cartão | Campo | Valor esperado |
|---|---|---|
| Postos mapeados | `Qtd Postos` | 20 |
| Preço médio da gasolina | `Preço Médio Gasolina` | R$ 5,95 |
| Menor preço da gasolina | `Menor Preço Gasolina` | R$ 5,67 |
| Economia potencial | `Economia Potencial %` | 9,2% |

Em cada cartão, **Formato → Rótulo de categoria → Ativado**, e troque o texto pelo título da tabela acima.

---

**Gráfico 1 — Preço médio por combustível**
Visual: **Gráfico de colunas agrupadas**
- Eixo X: `Precos[Combustível]`
- Eixo Y: `Preço Médio`
- Ordenar por `Preço Médio`, decrescente.

Mostra que o diesel é o mais caro e o etanol o mais barato — é o gráfico que dá a escala geral de preços.

---

**Gráfico 2 — Ranking: preço da gasolina por posto**
Visual: **Gráfico de barras clusterizado** (barras horizontais, lê melhor nome de posto)
- Eixo Y: `Postos[Posto]`
- Eixo X: `Preço Médio Gasolina`
- Filtro do visual: `Tem Preço` **é** `Sim` (senão aparecem 8 postos vazios).
- Nas reticências `...` do visual → **Classificar eixo → Preço Médio Gasolina → Crescente**.

> Dica para a apresentação: como os preços vão de R$ 5,67 a R$ 6,19, as barras ficam parecidas.
> Em **Formato → Eixo X → Intervalo**, defina **Início: 5,5** para a diferença entre os postos saltar
> aos olhos. Se fizer isso, avise na legenda que o eixo não começa no zero.

---

**Gráfico 3 — Preço médio por bandeira e combustível**
Visual: **Gráfico de colunas agrupadas**
- Eixo X: `Precos[Bandeira]`
- Eixo Y: `Preço Médio`
- Legenda: `Precos[Combustível]`

Compara as redes entre si em todos os combustíveis de uma vez.

---

**Gráfico 4 — Participação das bandeiras**
Visual: **Gráfico de rosca**
- Legenda: `Postos[Bandeira]`
- Valores: `Qtd Postos`
- **Formato → Rótulos de detalhe → Tipo de rótulo: Categoria e porcentagem**.

Ipiranga tem 8 dos 20 postos (40%), Shell 5, Petrobras 4, Branca 2 e Ale 1.

---

**Gráfico 5 — Cobertura de serviços**
Visual: **Gráfico de barras clusterizado**
- Eixo Y: `Servicos[Serviço]`
- Eixo X: `Postos com o Serviço`
- Classificar decrescente.

Banheiro e calibrador em 20, conveniência em 7, lava-jato em 4, carregador elétrico em 1 e 24h em 1.

---

**Gráfico 6 — Mapa dos postos**
Visual: **Mapa**
- Latitude: `Postos[Latitude]`
- Longitude: `Postos[Longitude]`
- Legenda: `Postos[Bandeira]`
- Tamanho da bolha: `Preço Médio Gasolina`
- Dicas de ferramenta: `Postos[Endereço]` e `Preço Médio`

> Se o visual **Mapa** estiver desabilitado (algumas contas de faculdade bloqueiam os mapas do Bing),
> use o **Mapa do Azure** ou, como último recurso, um gráfico de dispersão com Longitude no eixo X e
> Latitude no eixo Y — fica parecido com um mapa e não depende de serviço externo.

---

### Página 2 — Detalhamento

**Gráfico 7 — Tabela detalhada**
Visual: **Tabela**
- Colunas: `Posto`, `Bairro`, `Bandeira`, `Preço Gasolina`, `Preço Aditivada`, `Preço Etanol`,
  `Preço Diesel`, `Preço Médio`, `Qtd Serviços`.
- **Formato → Formatação condicional → Escalas de cor** na coluna `Preço Gasolina`
  (verde = barato, vermelho = caro).

**Gráfico 8 — Matriz serviços × bandeira**
Visual: **Matriz**
- Linhas: `Servicos[Serviço]`
- Colunas: `Servicos[Bandeira]`
- Valores: `Postos com o Serviço`

---

### Segmentações (filtros)

Coloque duas **Segmentações** na página 1, no topo:

- `Postos[Bandeira]` — estilo **Lista**, com *Seleção múltipla* ativada.
- `Postos[Tem Preço]` — estilo **Lista**.

Em **Formato → Opções de segmentação → Orientação: Horizontal** para ocuparem menos espaço.

---

## 6. Acabamento

- **Título do relatório**: insira uma caixa de texto no topo — *"Postos de combustível de Betim/MG"* e,
  abaixo, em fonte menor, os nomes dos quatro integrantes.
- **Tema**: **Exibição → Temas** → escolha um (o *Executivo* combina com o azul do site).
- Dê nome às páginas: *Visão geral* e *Detalhamento*.
- Em cada gráfico, **Formato → Título geral** com um nome claro — é isso que o professor lê primeiro.
- Rodapé com a fonte dos dados: GasoRadar, GasPedia e Carregados; preços de referência de julho.

---

## 7. Publicar e pegar o link

1. **Página Inicial → Publicar** → escolha o workspace (*Meu workspace* serve).
2. Abra o relatório em [app.powerbi.com](https://app.powerbi.com).

Agora escolha como gerar o link:

**Para colocar no site (o que o trabalho pede):**
**Arquivo → Inserir relatório → Publicar na web (público)**. Gera um link que qualquer pessoa abre sem
login — é o que funciona numa página estática.

> ⚠️ Muita faculdade bloqueia o "Publicar na web" por política do administrador. Se o botão estiver
> cinza, use **Arquivo → Inserir relatório → Site ou portal**: o link funciona, mas só para quem tem
> conta da instituição. Nesse caso, avise o professor na entrega e deixe o `.pbix` junto como garantia.

**Alternativa simples:** **Compartilhar → Copiar link** e ajuste o acesso para *Pessoas na sua
organização*.

3. Copie o link e cole no arquivo `index.html` do site, no lugar de `COLE_AQUI_O_LINK_DO_POWER_BI`
   (aparece duas vezes: no botão e no `iframe` comentado). Veja o `README.md` na raiz do repositório.

---

## Conferência rápida

Se os números abaixo baterem, o modelo está certo:

| Indicador | Valor |
|---|---|
| Postos | 20 |
| Postos com preço | 12 |
| Preço médio da gasolina | R$ 5,95 |
| Menor / maior preço da gasolina | R$ 5,67 (Amazonas) / R$ 6,19 |
| Preço médio do etanol | R$ 3,95 |
| Postos Ipiranga / Shell / Petrobras / Branca / Ale | 8 / 5 / 4 / 2 / 1 |
| Postos com conveniência / lava-jato / carregador elétrico | 7 / 4 / 1 |
