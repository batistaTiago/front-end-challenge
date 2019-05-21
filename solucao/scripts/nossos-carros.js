$(document).ready(
    () => {
        // altera a transparencia das imagens do carrossel que o mouse não está em cima   

        let imagens = $('.carousel-item img')

        imagens.hover(
            (e) => {
                for (let imagem of imagens) {
                    if (e.target != imagem) {
                        if (e.type === 'mouseenter') {
                            $(imagem).css({ opacity: 0.4 })
                        } else if (e.type === 'mouseleave') {
                            $(imagem).css({ opacity: 1 })
                        }
                    }
                }

            }
        )
    }
)