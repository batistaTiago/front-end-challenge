$(document).ready(
    () => {
        // altera a transparencia das imagens do carrossel que o mouse não está em cima   

        let itens = $('.carousel-item-body a')

        itens.hover(
            (e) => {
                for (let item of itens) {
                    if (e.target.parentNode != item) {
                        if (e.type === 'mouseenter') {
                            $(item).children().css({ opacity: 0.4 })
                        } else if (e.type === 'mouseleave') {
                            $(item).children().css({ opacity: 1 })
                        }
                    }
                }
            }
        )
    }
)