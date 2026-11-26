const BRL = (v) => v == null ? "—" : v.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const el = (id) => document.getElementById(id);

const mediaPosto = (p) => {
  const vals = COMBUSTIVEIS.map((c) => p[c.chave]).filter((v) => v != null);
  return vals.length ? vals.reduce((a, b) => a + b, 0) / vals.length : null;
};

const media = (vals) => {
  const v = vals.filter((x) => x != null);
  return v.length ? v.reduce((a, b) => a + b, 0) / v.length : null;
};

const comPreco = POSTOS.filter((p) => p.gasolina != null);
const bandeiras = [...new Set(POSTOS.map((p) => p.bandeira))].sort();

/* ---------- Gráfico de barras horizontais ---------- */

function barras(alvo, dados, opts = {}) {
  const { formato = BRL, prefixo = "R$ ", cor = "var(--seq-450)", max } = opts;
  const topo = max ?? Math.max(...dados.map((d) => d.valor));
  alvo.innerHTML = dados.map((d) => {
    const pct = topo > 0 ? (d.valor / topo) * 100 : 0;
    const fill = d.cor || cor;
    const texto = d.texto ?? `${prefixo}${formato(d.valor)}`;
    return `<div class="hbar-row" title="${d.rotulo}: ${texto}${d.nota ? " · " + d.nota : ""}">
      <span class="hbar-name">${d.rotulo}</span>
      <span class="hbar-track"><span class="hbar-fill" style="width:${pct.toFixed(1)}%;background:${fill}"></span></span>
      <span class="hbar-val">${texto}</span>
    </div>`;
  }).join("");
}

// Quando os preços variam pouco, a barra a partir do zero não distingue nada:
// o que separa os postos é o quanto cobram a mais que o mais barato.
function acrescimo(valor, base) {
  return valor - base < 0.005
    ? { valor: 0, texto: "mais barato" }
    : { valor: valor - base, texto: `+R$ ${BRL(valor - base)}` };
}

const inteiro = (v) => String(v);

/* ---------- Indicadores ---------- */

function montarKpis() {
  const mediaGas = media(POSTOS.map((p) => p.gasolina));
  const maisBarato = comPreco.reduce((a, b) => (b.gasolina < a.gasolina ? b : a));
  const maisCaro = comPreco.reduce((a, b) => (b.gasolina > a.gasolina ? b : a));
  const diferenca = ((maisCaro.gasolina - maisBarato.gasolina) / maisBarato.gasolina) * 100;

  const tiles = [
    {
      label: "Postos mapeados",
      valor: `${POSTOS.length}`,
      nota: `${comPreco.length} com preço publicado e atualizado`,
    },
    {
      label: "Gasolina comum — média",
      valor: `<small>R$ </small>${BRL(mediaGas)}`,
      nota: `Média dos ${comPreco.length} postos com preço`,
    },
    {
      label: "Menor preço da gasolina",
      valor: `<small>R$ </small>${BRL(maisBarato.gasolina)}`,
      nota: maisBarato.nome,
    },
    {
      label: "Maior preço da gasolina",
      valor: `<small>R$ </small>${BRL(maisCaro.gasolina)}`,
      nota: maisCaro.nome,
    },
    {
      label: "Economia entre extremos",
      valor: `${diferenca.toLocaleString("pt-BR", { maximumFractionDigits: 1 })}<small>%</small>`,
      nota: `R$ ${BRL(maisCaro.gasolina - maisBarato.gasolina)} de diferença por litro`,
    },
    {
      label: "Bandeiras na cidade",
      valor: `${bandeiras.length}`,
      nota: bandeiras.join(" · "),
    },
  ];

  el("kpis").innerHTML = tiles.map((t) => `
    <div class="card">
      <p class="kpi-label">${t.label}</p>
      <div class="kpi-value">${t.valor}</div>
      <p class="kpi-note">${t.nota}</p>
    </div>`).join("");
}

/* ---------- Gráficos ---------- */

function montarGraficos() {
  barras(el("chart-combustivel"), COMBUSTIVEIS.map((c) => {
    const vals = POSTOS.map((p) => p[c.chave]).filter((v) => v != null);
    return { rotulo: c.rotulo, valor: media(vals), nota: `${vals.length} postos` };
  }).sort((a, b) => b.valor - a.valor));

  const porBandeira = bandeiras.map((b) => {
    const grupo = POSTOS.filter((p) => p.bandeira === b && p.gasolina != null);
    return { bandeira: b, preco: media(grupo.map((p) => p.gasolina)), postos: grupo.length };
  }).filter((d) => d.preco != null).sort((a, b) => a.preco - b.preco);

  const baseBandeira = porBandeira[0].preco;
  barras(el("chart-bandeira"), porBandeira.map((d) => ({
    rotulo: d.bandeira,
    cor: CORES_BANDEIRA[d.bandeira],
    nota: `R$ ${BRL(d.preco)} · ${d.postos} posto(s) com preço`,
    ...acrescimo(d.preco, baseBandeira),
  })));

  const chipsLegenda = bandeiras.map((b) =>
    `<span><i style="background:${CORES_BANDEIRA[b]}"></i>${b}</span>`).join("");
  el("legend-bandeira").innerHTML = chipsLegenda;
  el("legend-mapa").innerHTML = chipsLegenda;

  barras(el("chart-contagem"), bandeiras.map((b) => ({
    rotulo: b,
    valor: POSTOS.filter((p) => p.bandeira === b).length,
    cor: CORES_BANDEIRA[b],
    nota: "postos",
  })).sort((a, b) => b.valor - a.valor), { formato: inteiro, prefixo: "" });

  const servicos = [
    ["Banheiro", "banheiro"],
    ["Calibrador de pneu", "calibrador"],
    ["Loja de conveniência", "conveniencia"],
    ["Lava-jato", "lavaJato"],
    ["Carregador elétrico", "eletrico"],
  ];
  barras(el("chart-servicos"), servicos.map(([rotulo, chave]) => ({
    rotulo,
    valor: POSTOS.filter((p) => p[chave]).length,
    nota: `de ${POSTOS.length} postos`,
  })), { formato: inteiro, prefixo: "", max: POSTOS.length });

  const ranking = [...comPreco].sort((a, b) => a.gasolina - b.gasolina);
  const baseRanking = ranking[0].gasolina;
  barras(el("chart-ranking"), ranking.map((p) => ({
    rotulo: p.nome.replace(/^Posto /, ""),
    cor: CORES_BANDEIRA[p.bandeira],
    nota: `R$ ${BRL(p.gasolina)} · ${p.bandeira}`,
    ...acrescimo(p.gasolina, baseRanking),
  })));
}

/* ---------- Tabela ---------- */

const estado = { busca: "", bandeira: "", ordem: "nome", servicos: new Set() };

const minimos = Object.fromEntries(COMBUSTIVEIS.map((c) => {
  const vals = POSTOS.map((p) => p[c.chave]).filter((v) => v != null);
  return [c.chave, vals.length ? Math.min(...vals) : null];
}));

function filtrar() {
  const termo = estado.busca.trim().toLowerCase();
  return POSTOS.filter((p) => {
    if (estado.bandeira && p.bandeira !== estado.bandeira) return false;
    if (termo && !`${p.nome} ${p.endereco} ${p.bairro}`.toLowerCase().includes(termo)) return false;
    for (const s of estado.servicos) {
      if (s === "precos") { if (p.gasolina == null) return false; }
      else if (!p[s]) return false;
    }
    return true;
  });
}

function ordenar(lista) {
  const chave = estado.ordem;
  const copia = [...lista];
  if (chave === "nome" || chave === "endereco" || chave === "bandeira") {
    copia.sort((a, b) => a[chave].localeCompare(b[chave], "pt-BR"));
  } else {
    const valor = (p) => (chave === "media" ? mediaPosto(p) : p[chave]);
    copia.sort((a, b) => {
      const va = valor(a), vb = valor(b);
      if (va == null) return 1;
      if (vb == null) return -1;
      return va - vb;
    });
  }
  return copia;
}

function celulaPreco(valor, chave) {
  if (valor == null) return `<td class="num dash">—</td>`;
  const destaque = valor === minimos[chave] ? " best" : "";
  return `<td class="num${destaque}">${BRL(valor)}</td>`;
}

function servicosTexto(p) {
  const marcas = [];
  if (p.conveniencia) marcas.push("C");
  if (p.lavaJato) marcas.push("L");
  if (p.banheiro) marcas.push("B");
  if (p.calibrador) marcas.push("P");
  if (p.eletrico) marcas.push("E");
  if (p.horario) marcas.push("24h");
  return marcas.join(" ");
}

function montarTabela() {
  const lista = ordenar(filtrar());
  el("result-count").textContent = `${lista.length} de ${POSTOS.length} postos`;
  el("tbody").innerHTML = lista.map((p) => `
    <tr>
      <td class="cell-nome">${p.nome}</td>
      <td class="cell-end">${p.endereco} — ${p.bairro}</td>
      <td><span class="tag"><i style="background:${CORES_BANDEIRA[p.bandeira]}"></i>${p.bandeira}</span></td>
      ${celulaPreco(p.gasolina, "gasolina")}
      ${celulaPreco(p.aditivada, "aditivada")}
      ${celulaPreco(p.alcool, "alcool")}
      ${celulaPreco(p.diesel, "diesel")}
      <td class="num">${mediaPosto(p) == null ? '<span class="dash">—</span>' : BRL(mediaPosto(p))}</td>
      <td class="svc">${servicosTexto(p)}</td>
    </tr>`).join("");
}

function ligarFiltros() {
  const sel = el("f-bandeira");
  bandeiras.forEach((b) => sel.add(new Option(b, b)));

  el("f-busca").addEventListener("input", (e) => { estado.busca = e.target.value; montarTabela(); });
  sel.addEventListener("change", (e) => { estado.bandeira = e.target.value; montarTabela(); });
  el("f-ordem").addEventListener("change", (e) => { estado.ordem = e.target.value; marcarColuna(); montarTabela(); });

  document.querySelectorAll(".chip").forEach((chip) => {
    chip.addEventListener("click", () => {
      const s = chip.dataset.svc;
      const ativo = chip.getAttribute("aria-pressed") === "true";
      chip.setAttribute("aria-pressed", String(!ativo));
      if (ativo) estado.servicos.delete(s); else estado.servicos.add(s);
      montarTabela();
    });
  });

  document.querySelectorAll("thead th[data-sort]").forEach((th) => {
    th.addEventListener("click", () => {
      estado.ordem = th.dataset.sort;
      const opcao = [...el("f-ordem").options].find((o) => o.value === estado.ordem);
      el("f-ordem").value = opcao ? estado.ordem : "nome";
      marcarColuna();
      montarTabela();
    });
  });
}

function marcarColuna() {
  document.querySelectorAll("thead th[data-sort]").forEach((th) => {
    if (th.dataset.sort === estado.ordem) th.setAttribute("aria-sort", "ascending");
    else th.removeAttribute("aria-sort");
  });
}

/* ---------- Mapa ---------- */

function montarMapa() {
  if (typeof L === "undefined") {
    el("mapa").innerHTML = '<p style="padding:20px;color:var(--text-secondary)">O mapa precisa de conexão com a internet para carregar os blocos do OpenStreetMap.</p>';
    return;
  }
  const mapa = L.map("mapa").setView([-19.9655, -44.17], 12);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 18,
    attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(mapa);

  const grupo = [];
  POSTOS.forEach((p) => {
    const icone = L.divIcon({
      className: "",
      html: `<div class="map-pin" style="background:${CORES_BANDEIRA[p.bandeira]}"></div>`,
      iconSize: [15, 15],
      iconAnchor: [7, 7],
    });
    const precos = COMBUSTIVEIS
      .filter((c) => p[c.chave] != null)
      .map((c) => `${c.rotulo}: R$ ${BRL(p[c.chave])}`)
      .join("<br>") || "Sem preço publicado atualizado";
    const marcador = L.marker([p.lat, p.lng], { icon: icone }).addTo(mapa);
    marcador.bindPopup(
      `<strong>${p.nome}</strong>${p.bandeira} · ${p.bairro}<br>${p.endereco}<br><br>${precos}` +
      (servicosTexto(p) ? `<br><br>Serviços: ${servicosTexto(p)}` : "")
    );
    grupo.push([p.lat, p.lng]);
  });

  mapa.fitBounds(grupo, { padding: [36, 36] });
}

/* ---------- Tema ---------- */

function ligarTema() {
  const btn = el("theme-btn");
  const salvo = localStorage.getItem("tema");
  const inicial = salvo || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  aplicar(inicial);

  function aplicar(tema) {
    document.documentElement.dataset.theme = tema;
    btn.textContent = tema === "dark" ? "Modo claro" : "Modo escuro";
  }

  btn.addEventListener("click", () => {
    const novo = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    localStorage.setItem("tema", novo);
    aplicar(novo);
  });
}

/* ---------- Início ---------- */

el("fontes").innerHTML = FONTES.map((f) => `<li>${f}</li>`).join("");
montarKpis();
montarGraficos();
ligarFiltros();
marcarColuna();
montarTabela();
montarMapa();
ligarTema();
