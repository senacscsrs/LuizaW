# Sistema de Adoção de Animais

## Descrição
Aplicação web para cadastro e listagem de animais disponíveis para adoção, consumindo uma API REST desenvolvida em Node.js/Express.

## Funcionalidades
- ✅ Cadastro de animais (tipo, raça, características)
- ✅ Listagem de todos os animais cadastrados
- ✅ Estatísticas em tempo real (total, por tipo)
- ✅ Notificações toast para feedback ao usuário
- ✅ Design responsivo com Bootstrap 5
- ✅ API RESTful com suporte completo (GET, POST, PUT, DELETE)

## Tecnologias Utilizadas

### Frontend
- HTML5
- CSS3 (Bootstrap 5)
- JavaScript (jQuery)
- jQuery AJAX para consumo da API

### Backend
- Node.js
- Express.js
- CORS para requisições cross-origin
- Body-parser para parsing de JSON

## Instalação

### Pré-requisitos
- Node.js e npm instalados
- Navegador web moderno

### Passo 1: Instalar dependências
```bash
npm install
```

### Passo 2: Iniciar a API
```bash
npm start
```
A API estará disponível em `http://localhost:3000`

### Passo 3: Abrir a aplicação
Abra o arquivo `index.html` no navegador (ou use um server local como Live Server)

## Estrutura de Arquivos
```
blackboard/
├── index.html           # Interface principal da aplicação
├── api-consumer.js      # Consumidor da API (jQuery/AJAX)
├── server.js            # Servidor Express da API
├── package.json         # Dependências do projeto
└── README.md            # Este arquivo
```

## Endpoints da API

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/api/animais` | Lista todos os animais |
| GET | `/api/animais/:id` | Retorna um animal específico |
| POST | `/api/animais` | Cadastra um novo animal |
| PUT | `/api/animais/:id` | Atualiza um animal |
| DELETE | `/api/animais/:id` | Remove um animal |
| GET | `/api/status` | Status da API |

## Como Usar

1. **Cadastrar Animal**: Preencha o formulário no lado esquerdo com tipo, raça e características
2. **Visualizar Lista**: A lista atualiza automaticamente após cadastro
3. **Atualizar Manualmente**: Clique no botão "Atualizar" para recarregar a lista
4. **Estatísticas**: As estatísticas são atualizadas em tempo real

## Formato de Dados

### Requisição POST (Cadastro)
```json
{
  "tipo": "cachorro",
  "raca": "Labrador",
  "caracteristicas": "Amigável, enérgico e ótimo para famílias"
}
```

### Resposta
```json
{
  "message": "Animal cadastrado com sucesso",
  "animal": {
    "id": 1,
    "tipo": "cachorro",
    "raca": "Labrador",
    "caracteristicas": "Amigável, enérgico e ótimo para famílias",
    "dataCadastro": "2024-01-15T10:30:00.000Z"
  }
}
```

## Notas de Desenvolvimento

- A API usa armazenamento em memória. Os dados serão perdidos ao reiniciar o servidor.
- Para produção, configure um banco de dados (MongoDB, PostgreSQL, etc.)
- Todos os endpoints incluem validação de dados
- Erros são retornados com status HTTP apropriado

## Troubleshooting

### Erro: "Não foi possível carregar a lista de animais"
- Verifique se a API está rodando em `http://localhost:3000`
- Abra o Console (F12) e procure por erros CORS
- Certifique-se de que o `server.js` foi iniciado com `npm start`

### Erro: "Cannot POST /api/animais"
- A API não está rodando
- Execute `npm start` no terminal

### Animais não aparecem após cadastro
- Recarregue a página
- Verifique o Console (F12) para mensagens de erro
- Confirme que a API está respondendo em `http://localhost:3000/api/status`
