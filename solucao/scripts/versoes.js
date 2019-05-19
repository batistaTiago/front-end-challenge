let fadeDuration = 450

$(document).ready(
    () => {
        $('#versoes button').on(
            'click',
            (e) => {
                
                // remove o estilo do botao previamente selecionado 
                // adiciona ao que foi clicado 
                $('button.active').removeClass('active')
                $('#' + e.target.id).addClass('active')


                // requisita os dados ao servidor para atualizar a tabela
                let idCarro = e.target.id.replace('button', '')
                $.get(
                    'http://localhost:3000/carros?nome=' + idCarro,
                    (data, status) => {
                        if ((status === 'success') && (data.length === 1)) {
                            let dadosCarro = data[0]
                            if (dadosValidos(dadosCarro)) {
                                atualizarImagem(dadosCarro.featured_image)
                                preencherTabela(dadosCarro)
                                atualizarItensDeSerie(dadosCarro.itens_de_serie)
                            }
                        }
                        else {
                            alert('houve um erro')
                        }
                    }
                )
            }
        )
    }
)

// verifica a validade dos dados vindos da API de carros 
function dadosValidos(dados) {
    return (
        dados.featured_image &&
        dados.cilindros_valvulas &&
        dados.diametro_curso &&
        dados.cilindradas &&
        dados.potencia_ecc_cv &&
        dados.potencia_rev_min &&
        dados.torque_maximo &&
        dados.torque_rev_min &&
        dados.itens_de_serie &&
        dados.itens_de_serie.length > 0
    )
}



/* as funções abaixo servem para atualizar os dados mostrados na seção 'versões' */

// imagem principal da seção de versões
function atualizarImagem(url) {
    $(".imagem-carro").fadeOut(
        fadeDuration,
        () => {
            $('.imagem-carro').attr('src', url)
            $(".imagem-carro").fadeIn(fadeDuration)
        }
    )
}

// dados da tabela
function preencherTabela(dados) {
    $("#container-tabela").fadeOut(
        fadeDuration,
        () => {
            $("#cilindros_valvulas").html(dados.cilindros_valvulas)
            $("#diametro_curso").html(dados.diametro_curso)
            $("#cilindradas").html(dados.cilindradas)
            $("#potencia_ecc_cv").html(dados.potencia_ecc_cv)
            $("#potencia_rev_min").html(dados.potencia_rev_min)
            $("#torque_maximo").html(dados.torque_maximo)
            $('#torque_rev_min').html(dados.torque_rev_min)

            $("#container-tabela").fadeIn(fadeDuration)
        }
    )
}

// lista de itens de serie
function atualizarItensDeSerie(dados) {
    $('#itens-serie-container').fadeOut(
        fadeDuration,
        () => {
            $('#itens-serie-container ul').html('')

            for (let item of dados) {
                let itemHTMLElement = document.createElement('li')
                itemHTMLElement.className = 'item-serie'
                itemHTMLElement.innerHTML = item
                $('#itens-serie-container ul').append(itemHTMLElement)
            }

            $('#itens-serie-container').fadeIn(fadeDuration)
        }
    )

}