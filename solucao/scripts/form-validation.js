$(document).ready(
    () => {

        $('#simular-button').on(
            'click',
            (e) => {
                e.preventDefault()

                /* pega os inputs */
                let versaoComboBox = $('#selectVersao')
                let nomeTextField = $('#inputNome')
                let emailTextField = $('#inputEmail')
                let telefoneTextField = $('#inputTelefone')
                let valorEntradaTextField = $('#inputValorEntrada')

                let formValido = true

                /* valida os dados submetidos */
                if (!validateNome(nomeTextField.val())) {
                    shakeElement(nomeTextField)
                    formValido = false
                    return
                } else {
                    nomeTextField.next().addClass('d-none')
                }
                
                if (!validateEmail(emailTextField.val())) {
                    shakeElement(emailTextField)
                    formValido = false
                    return
                } else {
                    emailTextField.next().addClass('d-none')
                }

                if (!validateTelefone(telefoneTextField.val())) {
                    shakeElement(telefoneTextField)
                    formValido = false
                    return
                } else {
                    telefoneTextField.next().addClass('d-none')
                }

                if (!validateValorEntrada(valorEntradaTextField.val())) {
                    shakeElement(valorEntradaTextField)
                    formValido = false
                    return
                } else {
                    valorEntradaTextField.next().addClass('d-none')
                }
                
                let radioContainer = $('#radio-container')
                if (!validateNumeroParcelas()) {
                    shakeElement(radioContainer)
                    formValido = false
                    return
                } else {
                    radioContainer.next().addClass('d-none')
                } 
                
                if (formValido) {
                    // $('small.mt-1.text-danger').addClass('d-none')
                    /* se tudo for valido, submete o formulario via ajax */
                    submeterFormulario(
                        {
                            versao: versaoComboBox.val(),
                            nome: nomeTextField.val(),
                            email: emailTextField.val(),
                            telefone: telefoneTextField.val(),
                            numeroParcelas: $('input.input-radio:checked').val(),
                            receberNoticias: $('input.input-check:checked').val() == 'on' ? true : false
                        }
                    )
                }
            }
        )

        /* se o usuario escrever algo nos inputs, remove o feedback de invalido */
        $('input.form-input').on(
            'input',
            (e) => {
                $(e.target).removeClass('is-invalid')
            }
        )
    }
)

/* animação de shake, disparada se o elemento não foi preenchido com dados válidos */
function shakeElement(element) {
    element.addClass('shake-animation')

    setTimeout(
        () => {
            element.addClass('is-invalid')
            element.removeClass('shake-animation')
            $(element).next().toggleClass('d-none')
            element[0].focus()
        },
        750
    )

}

/* regras de validação dos campos do formulario */
function validateNome(nome) {
    return (nome && (nome.length > 2)) ? true : false
}

function validateEmail(email) {
    let regEx = /\S+@\S+\.\S+/;
    return regEx.test(email);
}

function validateTelefone(telefone) {
    return (telefone && ((telefone.length === 10) || (telefone.length === 11))) ? true : false
}

function validateValorEntrada(valorEntrada) {
    return (valorEntrada && (parseFloat(valorEntrada) > 0)) ? true : false
}

function validateNumeroParcelas() {
    let checked = $('input.input-radio:checked')
    return checked.val()
}

/* configura os parametros e mostra a modal dependendo do resultado do ajax */
function showModalFeedback(requestWasSuccessful) {
    if (requestWasSuccessful) {
        var modalTitle = 'Sucesso'
        var modalDescription = 'A simulação do financiamento foi enviado com sucesso. Aguarde retorno no email informado.'

        $('#feedback-modal .modal-footer button').removeClass('btn-danger').modal()
        $('#feedback-modal .modal-footer button').addClass('btn-success').modal()

    } else {
        var modalTitle = 'Erro'
        var modalDescription = 'Houve um erro na simulção do seu financiamento. Por favor contate o time de suporte.'

        $('#feedback-modal .modal-footer button').removeClass('btn-success').modal()
        $('#feedback-modal .modal-footer button').addClass('btn-danger').modal()
    }

    $('#feedback-modal .modal-header h4').html(modalTitle)
    $('#feedback-modal .modal-body p').html(modalDescription)
    $('#feedback-modal').modal()
}


/* realiza um ajax para a api fake do json server, no path '/simulacoes' */
function submeterFormulario(formData) {
    $.ajax(
        {
            method: 'post',
            url: "http://localhost:3000/simulacoes",
            data: formData
        }
    ).done(
        () => {
            showModalFeedback(true)
            let versaoComboBox = $('#selectVersao')
            let nomeTextField = $('#inputNome')
            let emailTextField = $('#inputEmail')
            let telefoneTextField = $('#inputTelefone')
            let valorEntradaTextField = $('#inputValorEntrada')
            let numeroParcelasComboBox = $('input.input-radio:checked')


            nomeTextField.val('')
            emailTextField.val('')
            telefoneTextField.val('')
            valorEntradaTextField.val('')

            numeroParcelasComboBox.attr('checked', false)
        }
    ).fail(
        () => {
            showModalFeedback(false)
        }
    )
}