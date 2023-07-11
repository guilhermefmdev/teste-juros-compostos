const $form = document.querySelector('#form')

$form.onsubmit = (e) => {
    e.preventDefault()
    simulate()
}

const $modal = document.querySelector('#modal')

async function simulate() {
    const $monthlyValue = document.forms['form']['monthlyInput'].value
    const $contribTime = document.forms['form']['timeInput'].value
    const $interestRateValue = document.forms['form']['interestRateInput'].value
    const inputData = {
        expr: [`${$monthlyValue} * 12 * (((1 + ${$interestRateValue})^ ${$contribTime} - 1) / ${$interestRateValue})`]
    }
    const jsonInputData = JSON.stringify(inputData)
    
    const response = await fetch('https://api.mathjs.org/v4/',{
        method: 'POST',
        body: jsonInputData,
        headers: {
            'content-type': 'application/json'
        }
    })

    const $userName = document.forms['form']['nameInput'].value
    const data = await response.json()
    const result = parseInt(data.result, 10)
    const finalMessage = `Olá ${$userName}, juntando <b>R$${$monthlyValue}</b> todo mês, você terá <b>R$${result.toFixed(2)}</b> em <b>${$contribTime}</b> anos.`

    $modal.innerHTML = finalMessage

    $modal.showModal()
    modalConfig()
}

modalConfig = () => {
    const $modalBtn = document.createElement('button')
    const btnText = document.createTextNode('Fechar')
    $modalBtn.appendChild(btnText)
    $modal.appendChild($modalBtn)
    $modalBtn.onclick = () => {
    $modal.close()
    }
}

