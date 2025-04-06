const ingredientes = [];

function adicionarIngrediente() {
  const nome = document.getElementById('nome').value;
  const tipo = document.getElementById('tipo').value;
  const precoUnidade = parseFloat(document.getElementById('precoUnidade').value);
  const quantidade = parseFloat(document.getElementById('quantidadeUsada').value);

  if (!nome || isNaN(precoUnidade) || isNaN(quantidade)) {
    alert("Preencha todos os campos corretamente.");
    return;
  }

  const custo = (precoUnidade / 1000) * quantidade;
  ingredientes.push({ nome, tipo, precoUnidade, quantidade, custo });

  const lista = document.getElementById('lista-ingredientes');
  const item = document.createElement('li');
  item.textContent = `${nome} (${quantidade}${tipo === 'solido' ? 'g' : 'ml'}) - R$ ${custo.toFixed(2)}`;
  lista.appendChild(item);

  document.getElementById('nome').value = '';
  document.getElementById('precoUnidade').value = '';
  document.getElementById('quantidadeUsada').value = '';
}

function calcular() {
  const tempoGas = parseFloat(document.getElementById('tempoGas').value);
  const precoGas = parseFloat(document.getElementById('precoGas').value);
  const margemLucro = parseFloat(document.getElementById('margemLucro').value);

  if (isNaN(tempoGas) || isNaN(precoGas) || isNaN(margemLucro)) {
    alert("Preencha os campos de gás e margem corretamente.");
    return;
  }

  const custoIngredientes = ingredientes.reduce((total, ing) => total + ing.custo, 0);
  const consumoGasGramas = (300 / 60) * tempoGas;
  const porcentagemGasto = consumoGasGramas / 13000;
  const custoGas = precoGas * porcentagemGasto;
  const custoTotal = custoIngredientes + custoGas;
  const precoVenda = custoTotal * (1 + margemLucro / 100);

  const resultado = document.getElementById('resultado');
  resultado.innerHTML = `
    <p><strong>Custo dos ingredientes:</strong> R$ ${custoIngredientes.toFixed(2)}</p>
    <p><strong>Custo do gás:</strong> R$ ${custoGas.toFixed(2)} (≈ ${porcentagemGasto.toFixed(2)}% do botijão)</p>
    <p><strong>Custo total:</strong> R$ ${custoTotal.toFixed(2)}</p>
    <p><strong>Preço de venda sugerido:</strong> <span style="color: green; font-size: 1.3em;">R$ ${precoVenda.toFixed(2)}</span></p>
  `;
}
