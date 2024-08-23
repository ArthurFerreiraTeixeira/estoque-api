const express = require('express');
const app = express();

app.use(express.json());

// Simulação de banco de dados com uma lista
let produtos = [];

// Função para encontrar um produto por ID
function encontrarProduto(produtoId) {
    return produtos.find(produto => produto.id === produtoId);
}

// Rota para obter um produto pelo ID
app.get('/api/produto/:id', (req, res) => {
    const produto = encontrarProduto(parseInt(req.params.id));
    if (produto) {
        res.json(produto);
    } else {
        res.status(404).json({ mensagem: 'Produto não encontrado' });
    }
});

// Rota para obter todos os produtos
app.get('/api/produtos', (req, res) => {
    res.json(produtos);
});

// Rota para cadastrar um novo produto
app.post('/api/produto/cadastrar', (req, res) => {
    const novoProduto = {
        id: produtos.length + 1, // Simulação de ID automático
        nome: req.body.nome,
        quantidade: req.body.quantidade
    };
    produtos.push(novoProduto);
    res.status(201).json(novoProduto);
});

// Rota para atualizar a quantidade de um produto existente
app.post('/api/produto/atualizar', (req, res) => {
    const produto = encontrarProduto(req.body.id);
    if (produto) {
        produto.quantidade = req.body.quantidade;
        res.json(produto);
    } else {
        res.status(404).json({ mensagem: 'Produto não encontrado' });
    }
});

// Rota para excluir um produto
app.post('/api/produto/excluir', (req, res) => {
    const produtoIndex = produtos.findIndex(produto => produto.id === req.body.id);
    if (produtoIndex !== -1) {
        produtos.splice(produtoIndex, 1);
        res.json({ mensagem: 'Produto excluído com sucesso' });
    } else {
        res.status(404).json({ mensagem: 'Produto não encontrado' });
    }
});

// Inicia o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});