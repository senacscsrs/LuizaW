const express = require('express');
const fs = require('fs');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;

// Configuração do CORS - permite acesso de diferentes origens
app.use(cors());

// Middleware para parsear JSON no corpo das requisições
app.use(express.json());

// Caminho para o arquivo JSON (arquivo local na mesma pasta)
const arquivoJSON = path.join(__dirname, 'animais.json');

// ==================== FUNÇÕES AUXILIARES ====================

// Função para ler os dados do arquivo JSON
function lerAnimais() {
    try {
        const dados = fs.readFileSync(arquivoJSON, 'utf8');
        return JSON.parse(dados);
    } catch (erro) {
        console.error('Erro ao ler arquivo:', erro);
        return [];
    }
}

// Função para escrever os dados no arquivo JSON
function escreverAnimais(animais) {
    try {
        fs.writeFileSync(arquivoJSON, JSON.stringify(animais, null, 2), 'utf8');
        return true;
    } catch (erro) {
        console.error('Erro ao escrever arquivo:', erro);
        return false;
    }
}

// Função para validar raça e características
function validarAnimal(raca, caracteristicas) {
    const erros = [];
    
    if (!raca || typeof raca !== 'string' || raca.trim() === '') {
        erros.push('O campo "raça" é obrigatório e deve ser um texto não vazio');
    }
    
    if (!caracteristicas || typeof caracteristicas !== 'string' || caracteristicas.trim() === '') {
        erros.push('O campo "características" é obrigatório e deve ser um texto não vazio');
    }
    
    return erros;
}

// ==================== ENDPOINTS ====================

// 1. LISTAR todos os animais (GET)
app.get('/animais', (req, res) => {
    const animais = lerAnimais();
    res.status(200).json({
        sucesso: true,
        quantidade: animais.length,
        animais: animais
    });
});

// 2. BUSCAR animal por ID (GET)
app.get('/animais/:id', (req, res) => {
    const { id } = req.params;
    const animais = lerAnimais();
    
    const animal = animais.find(a => a.id === id);
    
    if (!animal) {
        return res.status(404).json({
            sucesso: false,
            mensagem: `Animal com ID ${id} não encontrado`
        });
    }
    
    res.status(200).json({
        sucesso: true,
        animal: animal
    });
});

// 3. ADICIONAR novo animal (POST)
app.post('/animais', (req, res) => {
    const { tipo, raca, caracteristicas } = req.body;
    
    // Validação dos campos obrigatórios
    const errosValidacao = validarAnimal(raca, caracteristicas);
    
    if (errosValidacao.length > 0) {
        return res.status(400).json({
            sucesso: false,
            erros: errosValidacao
        });
    }
    
    // Validação do tipo (opcional, mas recomendado)
    if (!tipo || (tipo !== 'cachorro' && tipo !== 'gato')) {
        return res.status(400).json({
            sucesso: false,
            erros: ['O campo "tipo" deve ser "cachorro" ou "gato"']
        });
    }
    
    const animais = lerAnimais();
    
    // Gerar novo ID (baseado no maior ID existente + 1)
    let novoId = 1;
    if (animais.length > 0) {
        const ids = animais.map(a => parseInt(a.id)).filter(id => !isNaN(id));
        novoId = Math.max(...ids, 0) + 1;
    }
    
    const novoAnimal = {
        id: novoId.toString(),
        tipo: tipo.trim(),
        raca: raca.trim(),
        caracteristicas: caracteristicas.trim()
    };
    
    animais.push(novoAnimal);
    
    if (escreverAnimais(animais)) {
        res.status(201).json({
            sucesso: true,
            mensagem: 'Animal cadastrado com sucesso',
            animal: novoAnimal
        });
    } else {
        res.status(500).json({
            sucesso: false,
            mensagem: 'Erro interno ao salvar os dados'
        });
    }
});

// 4. ALTERAR animal existente (PUT)
app.put('/animais/:id', (req, res) => {
    const { id } = req.params;
    const { tipo, raca, caracteristicas } = req.body;
    
    // Validação dos campos obrigatórios
    const errosValidacao = validarAnimal(raca, caracteristicas);
    
    if (errosValidacao.length > 0) {
        return res.status(400).json({
            sucesso: false,
            erros: errosValidacao
        });
    }
    
    // Validação do tipo
    if (!tipo || (tipo !== 'cachorro' && tipo !== 'gato')) {
        return res.status(400).json({
            sucesso: false,
            erros: ['O campo "tipo" deve ser "cachorro" ou "gato"']
        });
    }
    
    const animais = lerAnimais();
    const index = animais.findIndex(a => a.id === id);
    
    if (index === -1) {
        return res.status(404).json({
            sucesso: false,
            mensagem: `Animal com ID ${id} não encontrado`
        });
    }
    
    // Atualizar o animal
    const animalAtualizado = {
        id: id,
        tipo: tipo.trim(),
        raca: raca.trim(),
        caracteristicas: caracteristicas.trim()
    };
    
    animais[index] = animalAtualizado;
    
    if (escreverAnimais(animais)) {
        res.status(200).json({
            sucesso: true,
            mensagem: 'Animal atualizado com sucesso',
            animal: animalAtualizado
        });
    } else {
        res.status(500).json({
            sucesso: false,
            mensagem: 'Erro interno ao salvar os dados'
        });
    }
});

// 5. EXCLUIR animal (DELETE)
app.delete('/animais/:id', (req, res) => {
    const { id } = req.params;
    const animais = lerAnimais();
    
    const index = animais.findIndex(a => a.id === id);
    
    if (index === -1) {
        return res.status(404).json({
            sucesso: false,
            mensagem: `Animal com ID ${id} não encontrado`
        });
    }
    
    const animalRemovido = animais[index];
    animais.splice(index, 1);
    
    if (escreverAnimais(animais)) {
        res.status(200).json({
            sucesso: true,
            mensagem: 'Animal removido com sucesso',
            animalRemovido: animalRemovido
        });
    } else {
        res.status(500).json({
            sucesso: false,
            mensagem: 'Erro interno ao salvar os dados'
        });
    }
});

// Rota raiz (opcional, apenas para teste)
app.get('/', (req, res) => {
    res.status(200).json({
        mensagem: 'API de Adoção de Animais',
        versao: '1.0',
        endpoints: {
            listar: 'GET /animais',
            buscarPorId: 'GET /animais/:id',
            adicionar: 'POST /animais',
            alterar: 'PUT /animais/:id',
            excluir: 'DELETE /animais/:id'
        }
    });
});

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
    console.log(`📋 Endpoints disponíveis:`);
    console.log(`   GET    /animais`);
    console.log(`   GET    /animais/:id`);
    console.log(`   POST   /animais`);
    console.log(`   PUT    /animais/:id`);
    console.log(`   DELETE /animais/:id`);
});