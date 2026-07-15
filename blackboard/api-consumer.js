/**
 * API Consumer - Adoção de Animais
 * Gerencia requisições para a API de adoção
 */

// Configuração da API
const API_CONFIG = {
    baseURL: 'http://localhost:3000/api', // Ajuste para sua API
    endpoints: {
        animals: '/animais',
        animal: '/animais/:id'
    }
};

// Constantes de mensagens
const MESSAGES = {
    success: {
        create: '🐾 Animal cadastrado com sucesso!',
        load: 'Lista carregada com sucesso!'
    },
    error: {
        create: '❌ Erro ao cadastrar animal. Tente novamente.',
        load: '❌ Erro ao carregar lista. Recarregue a página.',
        general: '❌ Ocorreu um erro inesperado.'
    }
};

/**
 * Exibe toast de notificação
 */
function showToast(message, type = 'success') {
    const toastContainer = $('#toastContainer');
    const toastId = 'toast-' + Date.now();
    
    const bgClass = type === 'success' ? 'bg-success' : 'bg-danger';
    const icon = type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle';
    
    const toastHtml = `
        <div id="${toastId}" class="toast align-items-center text-white ${bgClass} border-0" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="d-flex">
                <div class="toast-body">
                    <i class="fas ${icon} me-2"></i> ${message}
                </div>
                <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
        </div>
    `;
    
    toastContainer.append(toastHtml);
    const toastElement = new bootstrap.Toast(document.getElementById(toastId), {
        delay: 5000
    });
    toastElement.show();
    
    // Remover após fechar
    $(`#${toastId}`).on('hidden.bs.toast', function() {
        $(this).remove();
    });
}

/**
 * Mostra loading em elementos
 */
function showLoading(elementId) {
    $(`#${elementId}`).show();
    if (elementId === 'loadingList') {
        $('#animalsContainer').hide();
    }
}

/**
 * Esconde loading em elementos
 */
function hideLoading(elementId) {
    $(`#${elementId}`).hide();
    if (elementId === 'loadingList') {
        $('#animalsContainer').show();
    }
}

/**
 * Valida formulário de cadastro
 */
function validateForm() {
    const tipo = $('#tipo').val();
    const raca = $('#raca').val().trim();
    const caracteristicas = $('#caracteristicas').val().trim();
    
    if (!tipo) {
        showToast('Por favor, selecione o tipo do animal.', 'error');
        return false;
    }
    
    if (!raca) {
        showToast('Por favor, informe a raça do animal.', 'error');
        return false;
    }
    
    if (!caracteristicas) {
        showToast('Por favor, informe as características do animal.', 'error');
        return false;
    }
    
    return true;
}

/**
 * Envia dados do formulário para cadastrar animal
 */
function submitAnimal() {
    if (!validateForm()) {
        return;
    }
    
    const animalData = {
        tipo: $('#tipo').val(),
        raca: $('#raca').val().trim(),
        caracteristicas: $('#caracteristicas').val().trim()
    };
    
    // Mostra loading
    $('#submitBtn').hide();
    $('#loadingForm').show();
    
    // Faz a requisição POST
    $.ajax({
        url: `${API_CONFIG.baseURL}${API_CONFIG.endpoints.animals}`,
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(animalData),
        success: function(response) {
            console.log('Animal cadastrado:', response);
            showToast(MESSAGES.success.create, 'success');
            
            // Limpa formulário
            $('#animalForm')[0].reset();
            
            // Recarrega lista e estatísticas
            loadAnimals();
            updateStats();
        },
        error: function(xhr, status, error) {
            console.error('Erro ao cadastrar:', error);
            console.log('Status:', status);
            console.log('Resposta:', xhr.responseText);
            
            let errorMsg = MESSAGES.error.create;
            try {
                const response = JSON.parse(xhr.responseText);
                if (response.message) {
                    errorMsg = `❌ ${response.message}`;
                }
            } catch (e) {
                // Se não for JSON, usa mensagem padrão
            }
            showToast(errorMsg, 'error');
        },
        complete: function() {
            // Esconde loading
            $('#loadingForm').hide();
            $('#submitBtn').show();
        }
    });
}

/**
 * Carrega lista de animais da API
 */
function loadAnimals() {
    showLoading('loadingList');
    
    $.ajax({
        url: `${API_CONFIG.baseURL}${API_CONFIG.endpoints.animals}`,
        method: 'GET',
        success: function(animals) {
            console.log('Animais carregados:', animals);
            renderAnimals(animals);
        },
        error: function(xhr, status, error) {
            console.error('Erro ao carregar lista:', error);
            showToast(MESSAGES.error.load, 'error');
            $('#animalsContainer').html(`
                <div class="alert alert-danger">
                    <i class="fas fa-exclamation-triangle"></i> Não foi possível carregar a lista de animais. 
                    <br>Verifique se a API está funcionando corretamente.
                </div>
            `);
        },
        complete: function() {
            hideLoading('loadingList');
        }
    });
}

/**
 * Renderiza lista de animais no HTML
 */
function renderAnimals(animals) {
    const container = $('#animalsContainer');
    
    if (!animals || animals.length === 0) {
        container.html(`
            <div class="text-center text-muted py-5">
                <i class="fas fa-heart fa-3x mb-3" style="color: #667eea;"></i>
                <p>Nenhum animal cadastrado ainda.</p>
                <p class="small">Cadastre o primeiro animal no formulário ao lado!</p>
            </div>
        `);
        return;
    }
    
    let html = '';
    animals.forEach(animal => {
        const tipoIcon = animal.tipo === 'cachorro' ? 'fa-dog' : 'fa-cat';
        const badgeColor = animal.tipo === 'cachorro' ? 'bg-primary' : 'bg-success';
        
        html += `
            <div class="card animal-card">
                <div class="card-body">
                    <div class="d-flex justify-content-between align-items-start">
                        <div>
                            <h5 class="card-title">
                                <i class="fas ${tipoIcon}"></i> ${capitalize(animal.tipo)}
                            </h5>
                            <h6 class="card-subtitle mb-2 text-muted">
                                <i class="fas fa-paw"></i> Raça: ${animal.raca}
                            </h6>
                            <p class="card-text">
                                <i class="fas fa-info-circle"></i> ${animal.caracteristicas}
                            </p>
                        </div>
                        <span class="badge ${badgeColor} badge-animal">
                            <i class="fas fa-check-circle"></i> Disponível
                        </span>
                    </div>
                    <small class="text-muted">
                        <i class="far fa-calendar-alt"></i> ID: ${animal.id || 'N/A'}
                    </small>
                </div>
            </div>
        `;
    });
    
    container.html(html);
}

/**
 * Atualiza estatísticas
 */
function updateStats() {
    $.ajax({
        url: `${API_CONFIG.baseURL}${API_CONFIG.endpoints.animals}`,
        method: 'GET',
        success: function(animals) {
            if (animals && animals.length > 0) {
                const total = animals.length;
                const cachorros = animals.filter(a => a.tipo === 'cachorro').length;
                const gatos = animals.filter(a => a.tipo === 'gato').length;
                
                $('#totalAnimais').text(total);
                $('#totalCachorros').text(cachorros);
                $('#totalGatos').text(gatos);
            } else {
                $('#totalAnimais').text('0');
                $('#totalCachorros').text('0');
                $('#totalGatos').text('0');
            }
        },
        error: function() {
            $('#totalAnimais').text('?');
            $('#totalCachorros').text('?');
            $('#totalGatos').text('?');
        }
    });
}

/**
 * Função auxiliar para capitalizar primeira letra
 */
function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}