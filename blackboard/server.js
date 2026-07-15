/**
 * API de Adoção de Animais
 * Servidor Express para gerenciar cadastro e listagem de animais
 */

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname)));

// Storage em memória (em produção usaria um banco de dados)
let animals = [
    {
        id: 1,
        tipo: 'cachorro',
        raca: 'Labrador',
        caracteristicas: 'Amigável, enérgico e ótimo para famílias',
        dataCadastro: new Date()
    },
    {
        id: 2,
        tipo: 'gato',
        raca: 'Persa',
        caracteristicas: 'Calmo, carinhoso e gosto de ambientes tranquilos',
        dataCadastro: new Date()
    }
];

let nextId = 3;

/**
 * GET /api/animais - Retorna todos os animais
 */
app.get('/api/animais', (req, res) => {
    console.log('GET /api/animais - Retornando lista de animais');
    try {
        res.json(animals);
    } catch (error) {
        console.error('Erro ao recuperar animais:', error);
        res.status(500).json({
            message: 'Erro ao recuperar animais',
            error: error.message
        });
    }
});

/**
 * GET /api/animais/:id - Retorna um animal específico
 */
app.get('/api/animais/:id', (req, res) => {
    const { id } = req.params;
    console.log(`GET /api/animais/${id}`);
    
    const animal = animals.find(a => a.id === parseInt(id));
    
    if (!animal) {
        return res.status(404).json({
            message: `Animal com ID ${id} não encontrado`
        });
    }
    
    res.json(animal);
});

/**
 * POST /api/animais - Cadastra um novo animal
 */
app.post('/api/animais', (req, res) => {
    console.log('POST /api/animais - Recebido:', req.body);
    
    const { tipo, raca, caracteristicas } = req.body;
    
    // Validação
    if (!tipo || !raca || !caracteristicas) {
        return res.status(400).json({
            message: 'Todos os campos (tipo, raça, características) são obrigatórios'
        });
    }
    
    if (tipo !== 'cachorro' && tipo !== 'gato') {
        return res.status(400).json({
            message: 'Tipo inválido. Use "cachorro" ou "gato"'
        });
    }
    
    // Criar novo animal
    const newAnimal = {
        id: nextId++,
        tipo: tipo.toLowerCase(),
        raca: raca.trim(),
        caracteristicas: caracteristicas.trim(),
        dataCadastro: new Date()
    };
    
    animals.push(newAnimal);
    
    console.log('Animal cadastrado com sucesso:', newAnimal);
    res.status(201).json({
        message: 'Animal cadastrado com sucesso',
        animal: newAnimal
    });
});

/**
 * PUT /api/animais/:id - Atualiza um animal
 */
app.put('/api/animais/:id', (req, res) => {
    const { id } = req.params;
    const { tipo, raca, caracteristicas } = req.body;
    console.log(`PUT /api/animais/${id}`, req.body);
    
    const animal = animals.find(a => a.id === parseInt(id));
    
    if (!animal) {
        return res.status(404).json({
            message: `Animal com ID ${id} não encontrado`
        });
    }
    
    // Validação
    if (!tipo || !raca || !caracteristicas) {
        return res.status(400).json({
            message: 'Todos os campos (tipo, raça, características) são obrigatórios'
        });
    }
    
    if (tipo !== 'cachorro' && tipo !== 'gato') {
        return res.status(400).json({
            message: 'Tipo inválido. Use "cachorro" ou "gato"'
        });
    }
    
    // Atualizar
    animal.tipo = tipo.toLowerCase();
    animal.raca = raca.trim();
    animal.caracteristicas = caracteristicas.trim();
    
    console.log('Animal atualizado:', animal);
    res.json({
        message: 'Animal atualizado com sucesso',
        animal: animal
    });
});

/**
 * DELETE /api/animais/:id - Deleta um animal
 */
app.delete('/api/animais/:id', (req, res) => {
    const { id } = req.params;
    console.log(`DELETE /api/animais/${id}`);
    
    const index = animals.findIndex(a => a.id === parseInt(id));
    
    if (index === -1) {
        return res.status(404).json({
            message: `Animal com ID ${id} não encontrado`
        });
    }
    
    const deletedAnimal = animals.splice(index, 1);
    
    console.log('Animal deletado:', deletedAnimal);
    res.json({
        message: 'Animal deletado com sucesso',
        animal: deletedAnimal[0]
    });
});

/**
 * Rota de status da API
 */
app.get('/api/status', (req, res) => {
    res.json({
        status: 'API funcionando corretamente',
        timestamp: new Date(),
        animaisCount: animals.length
    });
});

/**
 * Tratamento de erro para rotas não encontradas
 */
app.use((req, res) => {
    res.status(404).json({
        message: 'Rota não encontrada',
        path: req.path,
        method: req.method
    });
});

/**
 * Iniciando o servidor
 */
app.listen(PORT, () => {
    console.log(`
    ╔════════════════════════════════════════╗
    ║   API de Adoção de Animais             ║
    ║   Servidor rodando em:                 ║
    ║   http://localhost:${PORT}              ║
    ╚════════════════════════════════════════╝
    `);
    console.log(`Endpoints disponíveis:`);
    console.log(`  GET    /api/animais`);
    console.log(`  GET    /api/animais/:id`);
    console.log(`  POST   /api/animais`);
    console.log(`  PUT    /api/animais/:id`);
    console.log(`  DELETE /api/animais/:id`);
    console.log(`  GET    /api/status`);
});
