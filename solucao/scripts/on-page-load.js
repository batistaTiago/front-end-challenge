$(document).ready(
    () => {

        /* condições iniciais */
        $('#submenu-1').slideToggle(1)
        $('#submenu-2').slideToggle(1)
        rescaleVideoPlayer()

        /* responsividade do player de video */
        $(window).on('resize', rescaleVideoPlayer)
    }
)