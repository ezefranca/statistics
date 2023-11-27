let recomendacaoNormalidadeDiv = document.getElementById('recomendacaoNormalidade');
let recomendacoesNormalidade = [];

document.addEventListener('DOMContentLoaded', function() {
    var campos = ['tamanhoAmostra', 'numeroVariaveis', 'tipoAmostra', 'resultadoNormalidade'];

    campos.forEach(function(campo) {
        document.getElementById(campo).addEventListener('change', verificarCampos);
    });

    verificarCampos(); // Chama no carregamento inicial para definir o estado do botão.
});

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('numeroVariaveis').addEventListener('change', function() {
        var tipoAmostraContainer = document.getElementById('tipoAmostraContainer');
        if (this.value === '1') {
            tipoAmostraContainer.classList.add('d-none');
        } else {
            tipoAmostraContainer.classList.remove('d-none');
        }
    });

    document.getElementById('tamanhoAmostra').addEventListener('input', function() {
        atualizarRecomendacaoNormalidade();
    });
});

function verificarCampos() {
    var tamanhoAmostra = document.getElementById('tamanhoAmostra').value;
    var numeroVariaveis = document.getElementById('numeroVariaveis').value;
    var tipoAmostra = document.getElementById('tipoAmostra').value;
    var resultadoNormalidade = document.getElementById('resultadoNormalidade').value;
    var botaoRecomendar = document.getElementById('botaoRecomendar');

    if (tamanhoAmostra > 0 && numeroVariaveis && (numeroVariaveis === '1' || tipoAmostra) && resultadoNormalidade) {
        botaoRecomendar.disabled = false;
    } else {
        botaoRecomendar.disabled = true;
    }
}

function atualizarRecomendacaoNormalidade() {
    const tamanhoAmostra = parseInt(document.getElementById('tamanhoAmostra').value);
    recomendacoesNormalidade = [];
    if (isNaN(tamanhoAmostra) || tamanhoAmostra < 1) {
        recomendacaoNormalidadeDiv.classList.add('d-none');
        return;
    }

    if (tamanhoAmostra < 50) {
        recomendacoesNormalidade.push('Shapiro-Wilk');
    } else if (tamanhoAmostra <= 2000) {
        recomendacoesNormalidade.push('D\'Agostino-Pearson', 'Kolmogorov-Smirnov');
    } else {
        recomendacoesNormalidade.push('Kolmogorov-Smirnov');
    }

    document.getElementById('testeNormalidadeSugerido').textContent = recomendacoesNormalidade.join(', ');
    recomendacaoNormalidadeDiv.classList.remove('d-none');
}

function recomendarTeste() {
    const tamanhoAmostra = parseInt(document.getElementById('tamanhoAmostra').value);
    const numeroVariaveis = document.getElementById('numeroVariaveis').value;
    const tipoAmostra = document.getElementById('tipoAmostra').value;
    const resultadoNormalidade = document.getElementById('resultadoNormalidade').value;

    let recomendacoesTeste = [];

    if (isNaN(tamanhoAmostra) || tamanhoAmostra < 1) {
        alert('Por favor, insira um tamanho de amostra válido (maior que 0).');
        return;
    }

    if (numeroVariaveis === '1') {
        recomendacoesTeste.push(resultadoNormalidade === 'sim' ? 't-teste (uma amostra)' : 'Teste de Mann-Whitney U');
    } else if (numeroVariaveis === '2') {
        if (tipoAmostra === 'independentes') {
            recomendacoesTeste.push(resultadoNormalidade === 'sim' ? 't-teste independente' : 'Teste de Mann-Whitney U');
        } else {
            recomendacoesTeste.push(resultadoNormalidade === 'sim' ? 't-teste pareado' : 'Teste de Wilcoxon');
        }
    } else if (numeroVariaveis === '3') {
        recomendacoesTeste.push(resultadoNormalidade === 'sim' ? 'ANOVA' : 'Kruskal-Wallis');
    }

    let resultadoHtml = `<h4>Resumo da Análise:</h4>
                         <ul>
                             <li>Tamanho da Amostra: ${tamanhoAmostra}</li>
                             <li>Testes de Normalidade Recomendados: ${recomendacoesNormalidade.join(', ')}</li>
                             <li>Testes Estatísticos Recomendados: ${recomendacoesTeste.join(', ')}</li>
                         </ul>`;

    let resultadoDiv = document.getElementById('resultado');
    resultadoDiv.innerHTML = resultadoHtml;
    resultadoDiv.classList.remove('d-none');
}