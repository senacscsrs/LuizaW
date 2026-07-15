$(document).ready(function() {
    // Configuração da API
    const API_URL = 'http://localhost:3000/api/reciclagens';
    
    // Variáveis globais
    let currentPage = 1;
    const itemsPerPage = 5;
    let allReciclagens = [];
    let isLoggedIn = false;
    let currentUser = null;
    
    // Inicializar toasts e modals
    const toast = new bootstrap.Toast(document.getElementById('notificationToast'));
    const loginModal = new bootstrap.Modal(document.getElementById('loginModal'));
    const registerModal = new bootstrap.Modal(document.getElementById('registerModal'));
    
    // ==================== FUNÇÕES AUXILIARES ====================
    
    // Função para mostrar loading
    function showLoading() {
        $('#loadingOverlay').addClass('active');
    }
    
    function hideLoading() {
        $('#loadingOverlay').removeClass('active');
    }
    
    // Função para mostrar notificação
    function showNotification(message, type = 'success', title = 'Sucesso!') {
        const toastElement = $('#notificationToast');
        const icon = $('#toastIcon');
        const titleElement = $('#toastTitle');
        const messageElement = $('#toastMessage');
        
        // Reset classes
        toastElement.removeClass('text-bg-success text-bg-danger text-bg-warning text-bg-info');
        
        // Configurar baseado no tipo
        const configs = {
            success: {
                class: 'text-bg-success',
                icon: 'fas fa-check-circle',
                title: 'Sucesso!'
            },
            error: {
                class: 'text-bg-danger',
                icon: 'fas fa-exclamation-circle',
                title: 'Erro!'
            },
            warning: {
                class: 'text-bg-warning',
                icon: 'fas fa-exclamation-triangle',
                title: 'Aviso!'
            },
            info: {
                class: 'text-bg-info',
                icon: 'fas fa-info-circle',
                title: 'Informação'
            }
        };
        
        const config = configs[type] || configs.success;
        toastElement.addClass(config.class);
        icon.removeClass().addClass(`${config.icon} me-2`);
        titleElement.text(title || config.title);
        messageElement.text(message);
        
        toast.show();
    }
    
    // Função para calcular pontos
    function calcularPontos(tipo, quantidade) {
        const pontosPorKg = {
            'pet': 10,
            'metal': 15,
            'vidro': 8,
            'eletronico': 25
        };
        return Math.round((pontosPorKg[tipo] || 0) * quantidade);
    }
    
    // Função para formatar data
    function formatarData(dataString) {
        const data = new Date(dataString);
        return data.toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }
    
    // Função para obter label do tipo
    function getTipoLabel(tipo) {
        const labels = {
            'pet': 'PET',
            'metal': 'Metal',
            'vidro': 'Vidro',
            'eletronico': 'Eletrônico'
        };
        return labels[tipo] || tipo;
    }
    
    // Função para obter cor do tipo
    function getTipoColor(tipo) {
        const colors = {
            'pet': 'primary',
            'metal': 'secondary',
            'vidro': 'success',
            'eletronico': 'warning'
        };
        return colors[tipo] || 'secondary';
    }
    
    // ==================== FUNÇÕES PRINCIPAIS ====================
    
    // Função para validar formulário
    function validarFormulario() {
        const tipo = $('#tipo').val();
        const quantidade = parseFloat($('#quantidade').val());
        
        if (!tipo) {
            showNotification('Por favor, selecione o tipo de material.', 'warning');
            return false;
        }
        
        if (!quantidade || quantidade <= 0) {
            showNotification('Por favor, informe uma quantidade válida (maior que 0).', 'warning');
            return false;
        }
        
        return true;
    }
    
    // Função para cadastrar reciclagem (POST)
    function cadastrarReciclagem(data) {
        showLoading();
        
        $.ajax({
            url: API_URL,
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(data),
            success: function(response) {
                hideLoading();
                const pontos = response.pontos || calcularPontos(data.tipo, data.quantidade);
                showNotification(
                    `♻️ Reciclagem registrada! Você ganhou ${pontos} pontos!`,
                    'success'
                );
                
                carregarReciclagens();
                $('#reciclagemForm')[0].reset();
                atualizarStats();
            },
            error: function(xhr, status, error) {
                hideLoading();
                console.error('Erro ao cadastrar reciclagem:', error);
                
                let errorMessage = 'Erro ao registrar reciclagem. Tente novamente.';
                try {
                    const response = JSON.parse(xhr.responseText);
                    if (response.message) {
                        errorMessage = response.message;
                    }
                } catch(e) {}
                
                showNotification(errorMessage, 'error');
            }
        });
    }
    
    // Função para carregar reciclagens (GET)
    function carregarReciclagens() {
        showLoading();
        
        $.ajax({
            url: API_URL,
            type: 'GET',
            success: function(data) {
                hideLoading();
                allReciclagens = Array.isArray(data) ? data : [];
                renderizarLista();
                atualizarStats();
            },
            error: function(xhr, status, error) {
                hideLoading();
                console.error('Erro ao carregar reciclagens:', error);
                
                // Dados mockados para demonstração
                if (xhr.status === 404 || xhr.status === 0) {
                    showNotification('Usando dados de demonstração.', 'warning');
                    allReciclagens = gerarDadosMock();
                    renderizarLista();
                    atualizarStats();
                } else {
                    showNotification('Erro ao carregar reciclagens.', 'error');
                }
            }
        });
    }
    
    // Função para gerar dados mockados
    function gerarDadosMock() {
        const tipos = ['pet', 'metal', 'vidro', 'eletronico'];
        const descricoes = [
            'Garrafas PET 2L', 'Latas de alumínio', 'Garrafas de vidro',
            'Placas de circuito', 'Fios de cobre', 'Embalagens plásticas',
            'Vidros de conserva', 'Baterias', 'Papelão', 'Resíduos eletrônicos'
        ];
        
        const dados = [];
        for (let i = 1; i <= 20; i++) {
            const tipo = tipos[Math.floor(Math.random() * tipos.length)];
            const quantidade = Math.round((Math.random() * 5 + 0.5) * 10) / 10;
            const data = new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000);
            
            dados.push({
                id: i,
                tipo: tipo,
                quantidade: quantidade,
                descricao: descricoes[Math.floor(Math.random() * descricoes.length)],
                data: data.toISOString(),
                pontos: calcularPontos(tipo, quantidade)
            });
        }
        return dados.sort((a, b) => new Date(b.data) - new Date(a.data));
    }
    
    // Função para renderizar lista com filtros e paginação
    function renderizarLista() {
        const filterText = $('#filterInput').val().toLowerCase();
        const filterTipo = $('#filterTipo').val();
        
        let filtered = allReciclagens.filter(item => {
            const matchText = !filterText || 
                            (item.tipo && item.tipo.toLowerCase().includes(filterText)) ||
                            (item.descricao && item.descricao.toLowerCase().includes(filterText));
            const matchTipo = !filterTipo || 
                            (item.tipo && item.tipo.toLowerCase() === filterTipo.toLowerCase());
            return matchText && matchTipo;
        });
        
        // Ordenar por data (mais recente primeiro)
        filtered.sort((a, b) => new Date(b.data) - new Date(a.data));
        
        // Paginação
        const totalItems = filtered.length;
        const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));
        
        // Garantir página atual válida
        if (currentPage > totalPages) {
            currentPage = totalPages;
        }
        if (currentPage < 1) {
            currentPage = 1;
        }
        
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
        const pageItems = filtered.slice(startIndex, endIndex);
        
        // Atualizar lista
        const container = $('#listaReciclagens');
        
        if (pageItems.length === 0) {
            container.html(`
                <div class="text-center py-5 text-muted">
                    <i class="fas fa-recycle fa-3x mb-3 d-block" style="opacity: 0.3;"></i>
                    <p class="fw-bold">Nenhuma reciclagem encontrada</p>
                    <p class="small">Tente ajustar os filtros ou registre uma nova reciclagem.</p>
                </div>
            `);
        } else {
            let html = '';
            pageItems.forEach(item => {
                const tipoClass = `tipo-${item.tipo}`;
                const tipoLabel = getTipoLabel(item.tipo);
                const tipoColor = getTipoColor(item.tipo);
                const dataFormatada = formatarData(item.data);
                const pontos = item.pontos || calcularPontos(item.tipo, item.quantidade);
                
                html += `
                    <div class="reciclagem-item ${tipoClass} fade-in">
                        <div class="row align-items-center">
                            <div class="col-md-5">
                                <div class="d-flex align-items-center gap-2 flex-wrap">
                                    <span class="badge-tipo" style="background: ${tipoColor === 'primary' ? '#E3F2FD' : tipoColor === 'secondary' ? '#ECEFF1' : tipoColor === 'success' ? '#E8F5E9' : '#FFF3E0'}; 
                                        color: ${tipoColor === 'primary' ? '#1976D2' : tipoColor === 'secondary' ? '#546E7A' : tipoColor === 'success' ? '#2E7D32' : '#E65100'};">
                                        ${tipoLabel}
                                    </span>
                                    <strong>${item.quantidade}kg</strong>
                                    ${item.descricao ? `<span class="text-muted small">${item.descricao}</span>` : ''}
                                </div>
                            </div>
                            <div class="col-md-4">
                                <span class="badge-pontos">
                                    <i class="fas fa-star me-1"></i>
                                    ${pontos} pontos
                                </span>
                            </div>
                            <div class="col-md-3 text-md-end">
                                <span class="text-muted small">${dataFormatada}</span>
                            </div>
                        </div>
                    </div>
                `;
            });
            container.html(html);
        }
        
        // Atualizar paginação
        renderPagination(totalPages);
    }
    
    // Função para renderizar paginação
    function renderPagination(totalPages) {
        const container = $('#pagination');
        
        if (totalPages <= 1) {
            container.html('');
            return;
        }
        
        let html = '<ul class="pagination">';
        
        // Botão anterior
        html += `<li class="page-item ${currentPage === 1 ? 'disabled' : ''}">
                    <a class="page-link" href="#" data-page="${currentPage - 1}">Anterior</a>
                </li>`;
        
        // Números das páginas
        const startPage = Math.max(1, currentPage - 2);
        const endPage = Math.min(totalPages, currentPage + 2);
        
        if (startPage > 1) {
            html += `<li class="page-item"><a class="page-link" href="#" data-page="1">1</a></li>`;
            if (startPage > 2) html += `<li class="page-item disabled"><span class="page-link">...</span></li>`;
        }
        
        for (let i = startPage; i <= endPage; i++) {
            html += `<li class="page-item ${i === currentPage ? 'active' : ''}">
                        <a class="page-link" href="#" data-page="${i}">${i}</a>
                    </li>`;
        }
        
        if (endPage < totalPages) {
            if (endPage < totalPages - 1) html += `<li class="page-item disabled"><span class="page-link">...</span></li>`;
            html += `<li class="page-item"><a class="page-link" href="#" data-page="${totalPages}">${totalPages}</a></li>`;
        }
        
        // Botão próximo
        html += `<li class="page-item ${currentPage === totalPages ? 'disabled' : ''}">
                    <a class="page-link" href="#" data-page="${currentPage + 1}">Próximo</a>
                </li>`;
        
        html += '</ul>';
        container.html(html);
        
        // Eventos de clique para paginação
        container.find('a.page-link').click(function(e) {
            e.preventDefault();
            const page = parseInt($(this).data('page'));
            if (page >= 1 && page <= totalPages) {
                currentPage = page;
                renderizarLista();
            }
        });
    }
    
    // Função para atualizar estatísticas
    function atualizarStats() {
        let totalPontos = 0;
        let totalPeso = 0;
        let totalItems = allReciclagens.length;
        
        allReciclagens.forEach(item => {
            const pontos = item.pontos || calcularPontos(item.tipo, item.quantidade);
            totalPontos += pontos;
            totalPeso += item.quantidade || 0;
        });
        
        $('#totalPontosHero').text(totalPontos);
        $('#totalReciclagensHero').text(totalItems);
        $('#totalPesoHero').text(totalPeso.toFixed(1));
        $('#totalPontos').text(totalPontos);
    }
    
    // ==================== EVENTOS ====================
    
    // Evento de submit do formulário
    $('#reciclagemForm').on('submit', function(e) {
        e.preventDefault();
        
        if (!validarFormulario()) {
            return;
        }
        
        const tipo = $('#tipo').val();
        const quantidade = parseFloat($('#quantidade').val());
        const descricao = $('#descricao').val() || '';
        const doacao = $('#doacaoEletronico').is(':checked');
        
        const data = {
            tipo: tipo,
            quantidade: quantidade,
            descricao: descricao,
            doacao: doacao,
            data: new Date().toISOString()
        };
        
        cadastrarReciclagem(data);
    });
    
    // Evento para atualizar lista
    $('#refreshList').on('click', function() {
        carregarReciclagens();
    });
    
    // Eventos de filtro
    $('#filterInput').on('keyup', function() {
        currentPage = 1;
        renderizarLista();
    });
    
    $('#filterTipo').on('change', function() {
        currentPage = 1;
        renderizarLista();
    });
    
    // ==================== AUTENTICAÇÃO ====================
    
    // Abrir modal de login
    $('#btnLogin').on('click', function() {
        loginModal.show();
    });
    
    // Abrir modal de registro
    $('#btnRegister').on('click', function() {
        registerModal.show();
    });
    
    // Switch entre login e registro
    $('#switchToRegister').on('click', function(e) {
        e.preventDefault();
        loginModal.hide();
        setTimeout(() => registerModal.show(), 300);
    });
    
    $('#switchToLogin').on('click', function(e) {
        e.preventDefault();
        registerModal.hide();
        setTimeout(() => loginModal.show(), 300);
    });
    
    // Login
    $('#loginForm').on('submit', function(e) {
        e.preventDefault();
        showLoading();
        
        // Simular login
        setTimeout(() => {
            hideLoading();
            isLoggedIn = true;
            currentUser = { name: 'Fulano de Tal' };
            
            loginModal.hide();
            showNotification('Bem-vindo de volta, Fulano! 🌱', 'success');
            atualizarInterfaceUsuario();
        }, 1000);
    });
    
    // Registro
    $('#registerForm').on('submit', function(e) {
        e.preventDefault();
        showLoading();
        
        // Simular registro
        setTimeout(() => {
            hideLoading();
            isLoggedIn = true;
            currentUser = { name: $('#registerForm input[placeholder="Nome"]').val() || 'Usuário' };
            
            registerModal.hide();
            showNotification('Conta criada com sucesso! Bem-vindo ao Reviva! 🎉', 'success');
            atualizarInterfaceUsuario();
        }, 1000);
    });
    
    // Logout
    $('#btnLogout').on('click', function(e) {
        e.preventDefault();
        isLoggedIn = false;
        currentUser = null;
        atualizarInterfaceUsuario();
        showNotification('Você saiu da sua conta.', 'info');
    });
    
    // Função para atualizar interface do usuário
    function atualizarInterfaceUsuario() {
        if (isLoggedIn && currentUser) {
            $('#navButtons').hide();
            $('#navUser').show();
            $('#userName').text(currentUser.name || 'Usuário');
            $('#mainPage').show();
        } else {
            $('#navButtons').show();
            $('#navUser').hide();
        }
    }
    
    // ==================== INICIALIZAÇÃO ====================
    
    // Carregar dados inicial
    carregarReciclagens();
    atualizarInterfaceUsuario();
    
    // Atualizar automaticamente a cada 30 segundos
    setInterval(function() {
        carregarReciclagens();
    }, 30000);
    
    console.log('🌱 Reviva - Aplicação de Reciclagem carregada com sucesso!');
});