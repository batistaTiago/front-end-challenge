
/* parametros */
let slideDuration = 300
let largeScreenSizeInPixels = 992

$(document).ready(
    () => {
        // remover o foco do select após a seleção de um item
        $('#selectVersao').on(
            'change',
            (e) => {
                e.target.blur()
            }
        )

        // handler do click nos botões do menu de telefones
        $('#menu-telefones button').click(
            'click',
            function() {
                let id = this.id.replace('submenu-toggler-', '')
                toggleSubmenu(id)
            }
        )
    }
)

// altera a escala do player para se adaptar ao tamanho da seção principal
function rescaleVideoPlayer() {
    let wrapper = $('.video-wrapper')[0]
    if (wrapper.offsetWidth >= largeScreenSizeInPixels) {
        let videoPlayerHeight = (9 / 16) * wrapper.offsetWidth
        scale = wrapper.offsetHeight / videoPlayerHeight
        $('.video-wrapper iframe')[0].style.transform = `scaleY(${scale})`
    }
}

// mostra e esconde os submenus de telefone no click#submenu-toggler-' + id
function toggleSubmenu(id) {
    let submenu = $('#submenu-' + id)
    submenu.slideToggle(slideDuration)

    let toggler = $('#submenu-toggler-' + id)
    toggler.toggleClass('clicado')

    let icon = $('#submenu-toggler-' + id + ' i')
    icon.toggleClass('fa-caret-down')
    icon.toggleClass('fa-caret-up')
}