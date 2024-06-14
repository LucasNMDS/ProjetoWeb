let produtos = [];

function displayProducts() {
  const container = document.getElementById('products-container');
  let html = '';

  fetch('../JS-JSON/products.json')
    .then(response => response.json())
    .then(data => {
      produtos = data.produtos;
      produtos.forEach(product => {
        html += `
          <div class="produto">
            <div class="card-inner">
              <div class="face">
                <img src="${product.imagem}" alt="${product.nome}">
                <h2>${product.nome}</h2>
              </div>
              <div class="face back">
                <p>${product.descricao}</p>
              </div>
            </div>
          </div>
        `;
      });
      container.innerHTML = html;
    })
    .catch(error => console.error('Erro ao carregar os produtos:', error));
}

function addProduct() {
  // Captura os valores dos campos de entrada do formulário
  const nome = document.getElementById('nome').value;
  const imagem = document.getElementById('imagem').value;
  const descricao = document.getElementById('descricao').value;

  // Cria um objeto com os dados do novo produto
  const newProduct = {
    nome,
    imagem,
    descricao
  };

  // Adiciona o novo produto à lista de produtos (variável global 'produtos')
  produtos.push(newProduct);

  // Chama a função para atualizar a visualização na página com o novo produto
  addProductToView(newProduct);

  // Limpa os campos do formulário após adicionar o produto
  document.getElementById('nome').value = '';
  document.getElementById('imagem').value = '';
  document.getElementById('descricao').value = '';
}

function limparFormulario() {
  document.getElementById('nome').value = '';
  document.getElementById('imagem').value = '';
  document.getElementById('descricao').value = '';
}

function saveProductsToXML() {
  let xmlContent = '<?xml version="1.0" encoding="UTF-8"?>\n<produtos>\n';
  produtos.forEach(product => {
    xmlContent += `\t<produto>\n\t\t<nome>${product.nome}</nome>\n\t\t<descricao>${product.descricao}</descricao>\n\t\t<imagem>${product.imagem}</imagem>\n\t</produto>\n`;
  });
  xmlContent += '</produtos>';

  const blob = new Blob([xmlContent], { type: 'application/xml' });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = 'products.xml';
  document.body.appendChild(a);
  a.click();

  URL.revokeObjectURL(url);
}

document.addEventListener('DOMContentLoaded', () => {
  // Chamada inicial para carregar produtos
  displayProducts();
});

function toggleExclusao() {
  const btnExcluir = document.getElementById('btn-excluir');
  const cards = document.querySelectorAll('.produto');

  btnExcluir.classList.toggle('exclusao-ativa');
  cards.forEach(card => {
    if (btnExcluir.classList.contains('exclusao-ativa')) {
      card.addEventListener('click', selecionarProduto);
    } else {
      card.removeEventListener('click', selecionarProduto);
    }
  });
}

function selecionarProduto(event) {
  const modal = document.getElementById('modal-exclusao');
  const produtoSelecionado = event.currentTarget;

  modal.style.display = 'block';
  produtoSelecionado.classList.add('produto-selecionado');
}

function fecharModalExclusao() {
  const modal = document.getElementById('modal-exclusao');
  modal.style.display = 'none';

  const produtoSelecionado = document.querySelector('.produto-selecionado');
  if (produtoSelecionado) {
    produtoSelecionado.classList.remove('produto-selecionado');
  }
}

function confirmarExclusao() {
  const modal = document.getElementById('modal-exclusao');
  const produtoSelecionado = document.querySelector('.produto-selecionado');

  if (produtoSelecionado) {
    produtoSelecionado.remove();
  }

  modal.style.display = 'none';
}

function limparFormulario() {
  document.getElementById('nome').value = '';
  document.getElementById('imagem').value = '';
  document.getElementById('descricao').value = '';
}

function filterProducts() {
  const filter = document.getElementById('search').value;
  const produtos = document.querySelectorAll('.produto');

  produtos.forEach(produto => {
    if (filter === 'all' || produto.classList.contains(filter)) {
      produto.style.display = 'block';
    } else {
      produto.style.display = 'none';
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  displayProducts();
});
