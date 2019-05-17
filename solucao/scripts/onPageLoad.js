let fadeDuration = 200
let slideDuration = fadeDuration
let slideDelay = 50

let colorPrimaryBase = '#b71d3e'
let colorGrayDarker = '#2a2a2a'

$(document).ready(
    () => {

        // $('#submenu-1').slideToggle(1)
        // $('#submenu-2').slideToggle(1)

        $('#selectVersao').on(
            'change',
            (e) => {
                e.target.blur()
            }
        )

        $('#versoes button').on(
            'click',
            (e) => {
                $('button.active').removeClass('active')
                $('#' + e.target.id).addClass('active')

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

function toggleSubmenu(id) {
    let submenu = $('#submenu-' + id)
    submenu.slideToggle(slideDuration)

    let toggler = $('#submenu-' + id + '-toggler')
    toggler.toggleClass('clicado')
}

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

function atualizarImagem(url) {
    $(".imagem-carro").fadeOut(
        fadeDuration,
        () => {
            $('.imagem-carro').attr('src', url)
            $(".imagem-carro").fadeIn(fadeDuration)
        }
    )
}

function preencherTabela(dados) {
    $("#tabela-infos").fadeOut(
        fadeDuration,
        () => {
            $("#cilindros_valvulas").html(dados.cilindros_valvulas)
            $("#diametro_curso").html(dados.diametro_curso)
            $("#cilindradas").html(dados.cilindradas)
            $("#potencia_ecc_cv").html(dados.potencia_ecc_cv)
            $("#potencia_rev_min").html(dados.potencia_rev_min)
            $("#torque_maximo").html(dados.torque_maximo)
            $('#torque_rev_min').html(dados.torque_rev_min)

            $("#tabela-infos").fadeIn(fadeDuration)
        }
    )
}

function atualizarItensDeSerie(dados) {
    $('#itens-serie-container').fadeOut(
        fadeDuration,
        () => {
            $('#itens-serie-container').html('')

            for (let item of dados) {
                let itemHTMLElement = document.createElement('li')
                itemHTMLElement.className = 'item-serie'
                itemHTMLElement.innerHTML = item
                $('#itens-serie-container').append(itemHTMLElement)
            }

            $('#itens-serie-container').fadeIn(fadeDuration)
        }
    )

}