let fadeDuration = 450
let slideDuration = 200

let colorPrimaryBase = '#b71d3e'
let colorGrayDarker = '#2a2a2a'

let largeScreenSizeInPixels = 992

$(document).ready(
    () => {


        /* condições iniciais */
        $('#submenu-1').slideToggle(1)
        $('#submenu-2').slideToggle(1)
        rescaleVideoPlayer()
        


        /* eventos */
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

        $('.carousel-item .col img').hover(
            (e) => {
                let imagens = $('.carousel-item .col img')

                imagens.each(
                    (index) => {
                        if (e.target != imagens[index]) {
                            if (e.type === 'mouseenter') {
                                imagens[index].style.opacity = 0.6;
                            } else if (e.type === 'mouseleave') {
                                imagens[index].style.opacity = 1;
                            }
                        }
                    }
                )
            }
        )

        $(window).on('resize', rescaleVideoPlayer)
    }
)

function rescaleVideoPlayer() {
    let wrapper = $('.video-wrapper')[0]
    if (wrapper.offsetWidth >= largeScreenSizeInPixels) {
        let videoPlayerHeight = (9 / 16) * wrapper.offsetWidth
        scale = wrapper.offsetHeight / videoPlayerHeight
        $('.video-wrapper iframe')[0].style.transform = `scaleY(${scale})`
    }    
}

function toggleSubmenu(id) {
    let submenu = $('#submenu-' + id)
    submenu.slideToggle(slideDuration)

    let toggler = $('#submenu-' + id + '-toggler')
    toggler.toggleClass('clicado')

    let icon = $('#submenu-' + id + '-toggler' + ' i')
    icon.toggleClass('fa-caret-down')
    icon.toggleClass('fa-caret-up')
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