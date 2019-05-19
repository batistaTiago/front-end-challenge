$(document).ready(
    () => {
        // altera a transparencia das imagens do carrossel que o mouse não está em cima
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
    }
)