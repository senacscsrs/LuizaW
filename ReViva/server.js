const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

let reciclagens = [];

// Gerar dados iniciais
const tipos = ['pet', 'metal', 'vidro', 'eletronico'];
const descricoes = ['Garrafas PET', 'Latas de alumínio', 'Garrafas de vidro', 'Placas de circuito', 'Fios de cobre'];

for (let i = 1; i <= 15; i++) {
    const tipo = tipos[Math.floor(Math.random() * tipos.length)];
    const quantidade = Math.round((Math.random() * 5 + 0.5) * 10) / 10;
    const pontosPorKg = { 'pet': 10, 'metal': 15, 'vidro': 8, 'eletronico': 25 };
    
    reciclagens.push({
        id: i,
        tipo: tipo,
        quantidade: quantidade,
        descricao: descricoes[Math.floor(Math.random() * descricoes.length)],
        data: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
        pontos: Math.round((pontosPorKg[tipo] || 0) * quantidade)
    });
}

// GET - Listar todas as reciclagens
app.get('/api/reciclagens', (req, res) => {
    res.json(reciclagens);
});

// POST - Cadastrar nova reciclagem
app.post('/api/reciclagens', (req, res) => {
    const { tipo, quantidade, descricao, doacao } = req.body;
    
    if (!tipo || !quantidade) {
        return res.status(400).json({ message: 'Tipo e quantidade são obrigatórios' });
    }
    
    const pontosPorKg = {
        'pet': 10,
        'metal': 15,
        'vidro': 8,
        'eletronico': 25
    };
    
    const novaReciclagem = {
        id: reciclagens.length + 1,
        tipo,
        quantidade: parseFloat(quantidade),
        descricao: descricao || '',
        doacao: doacao || false,
        data: new Date().toISOString(),
        pontos: Math.round((pontosPorKg[tipo] || 0) * parseFloat(quantidade))
    };
    
    reciclagens.push(novaReciclagem);
    res.status(201).json(novaReciclagem);
});

app.listen(3000, () => {
    console.log('🚀 API Reviva rodando em http://localhost:3000');
    console.log('📊 Dados mockados carregados com sucesso!');
});