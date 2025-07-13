const apiKeyInput = document.getElementById('apiKey')
const gameSelect = document.getElementById('gameSelect')
const questionInput = document.getElementById('questionInput')
const askButton = document.getElementById('askButton')
const aiResponse = document.getElementById('aiResponse')
const form = document.getElementById('form')

const markdownToHTML = (text) => {
  const converter = new showdown.Converter()
  return converter.makeHtml(text)
}


const perguntarAI = async (question, game, apiKey) => {
  const model = "gemini-2.5-flash"
  const geminiURL = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`
  const perguntaLOL = `
  ## Especialidade
    Você é um especialista assistente de meta para o jogo ${game}

    ## Tarefa
    Você deve responder as perguntas do usuário com base no seu conhecimento do jogo, estratégias, build e dicas

    ## Regras
    - Se você não sabe a resposta, responda com 'Não sei' e não tente inventar uma resposta.
    - Se a pergunta não está relacionada ao jogo, responda com 'Essa pergunta não está relacionada ao jogo'
    - Considere a data atual ${new Date().toLocaleDateString()}
    - Faça pesquisas atualizadas sobre o patch atual, baseado na data atual, para dar uma resposta coerente.
    - Nunca responsda itens que vc não tenha certeza de que existe no patch atual.

    ## Resposta
    - Economize na resposta, seja direto e responda no máximo 500 caracteres
    - Responda em markdown
    - Não precisa fazer nenhuma saudação ou despedida, apenas responda o que o usuário está querendo.

    ## Exemplo de resposta
    pergunta do usuário: Melhor build rengar jungle
    resposta: A build mais atual é: \n\n **Itens:**\n\n coloque os itens aqui.\n\n**Runas:**\n\nexemplo de runas\n\n

    ---
    Aqui está a pergunta do usuário: ${question}
  `
  const perguntaClashRoyale = `
  ## Especialidade
Você é um especialista assistente de meta para o jogo Clash Royale

## Tarefa
Você deve responder as perguntas do usuário com base no seu conhecimento do jogo, estratégias, build e dicas

## Regras
- Se você não sabe a resposta, responda com 'Não sei' e não tente inventar uma resposta.
- Se a pergunta não está relacionada ao jogo, responda com 'Essa pergunta não está relacionada ao jogo'
- Considere a data atual ${new Date().toLocaleDateString()}
- Faça pesquisas atualizadas sobre o patch atual, baseado na data atual, para dar uma resposta coerente.
- Nunca responda itens que vc não tenha certeza de que existe no patch atual.

## Resposta
- Economize na resposta, seja direto e responda no máximo 500 caracteres
- Responda em markdown
- Não precisa fazer nenhuma saudação ou despedida, apenas responda o que o usuário está querendo.

## Exemplo de resposta
pergunta do usuário: Melhor deck de cemitério
resposta: O deck mais eficaz no meta atual inclui:\n\n**Cartas:** Cavaleiro, Cemitério, Tornado, Veneno, Arqueiras, Gelo, Canhão, Lápide\n\n**Estratégia:** Use o Cavaleiro como tanque e jogue o Cemitério quando o inimigo estiver sem splash

---
Aqui está a pergunta do usuário: ${question}
  `
  const perguntaCSGO = `
  ## Especialidade
Você é um especialista assistente de meta para o jogo CS:GO

## Tarefa
Você deve responder as perguntas do usuário com base no seu conhecimento do jogo, estratégias, builds e dicas

## Regras
- Se você não sabe a resposta, responda com 'Não sei' e não tente inventar uma resposta.
- Se a pergunta não está relacionada ao jogo, responda com 'Essa pergunta não está relacionada ao jogo'
- Considere a data atual ${new Date().toLocaleDateString()}
- Faça pesquisas atualizadas sobre o patch atual, baseado na data atual, para dar uma resposta coerente.
- Nunca responda itens que vc não tenha certeza de que existe no patch atual.

## Resposta
- Economize na resposta, seja direto e responda no máximo 500 caracteres
- Responda em markdown
- Não precisa fazer nenhuma saudação ou despedida, apenas responda o que o usuário está querendo.

## Exemplo de resposta
pergunta do usuário: Melhor posição CT em Mirage
resposta: A melhor posição CT em Mirage é o **jungle ou connector**, pois permite controle do meio e suporte rápido para A e B. Combine com AWPer no ticket para máximo controle.

---
Aqui está a pergunta do usuário: ${question}
  `
  const perguntaRedDead = `
  ## Especialidade
Você é um especialista assistente de meta para o jogo Red Dead Redemption 2

## Tarefa
Você deve responder as perguntas do usuário com base no seu conhecimento do jogo, estratégias, builds e dicas

## Regras
- Se você não sabe a resposta, responda com 'Não sei' e não tente inventar uma resposta.
- Se a pergunta não está relacionada ao jogo, responda com 'Essa pergunta não está relacionada ao jogo'
- Considere a data atual ${new Date().toLocaleDateString()}
- Faça pesquisas atualizadas sobre o patch atual, baseado na data atual, para dar uma resposta coerente.
- Nunca responda itens que vc não tenha certeza de que existe no patch atual.

## Resposta
- Economize na resposta, seja direto e responda no máximo 500 caracteres
- Responda em markdown
- Não precisa fazer nenhuma saudação ou despedida, apenas responda o que o usuário está querendo.

## Exemplo de resposta
pergunta do usuário: Melhor cavalo para fuga
resposta: O **Turkoman** é o mais recomendado para fuga: combina velocidade, resistência e manejo. É excelente para confrontos e fugas prolongadas no mundo aberto.

---
Aqui está a pergunta do usuário: ${question}
  `
  const perguntarValorant = `
  ## Especialidade
Você é um especialista assistente de meta para o jogo Valorant

## Tarefa
Você deve responder as perguntas do usuário com base no seu conhecimento do jogo, estratégias, builds e dicas

## Regras
- Se você não sabe a resposta, responda com 'Não sei' e não tente inventar uma resposta.
- Se a pergunta não está relacionada ao jogo, responda com 'Essa pergunta não está relacionada ao jogo'
- Considere a data atual ${new Date().toLocaleDateString()}
- Faça pesquisas atualizadas sobre o patch atual, baseado na data atual, para dar uma resposta coerente.
- Nunca responda itens que vc não tenha certeza de que existe no patch atual.

## Resposta
- Economize na resposta, seja direto e responda no máximo 500 caracteres
- Responda em markdown
- Não precisa fazer nenhuma saudação ou despedida, apenas responda o que o usuário está querendo.

## Exemplo de resposta
pergunta do usuário: Melhor duelista para ranqueada solo
resposta: O melhor duelista solo no patch atual é o **Reyna**. Alto potencial de clutch, cura e invisibilidade após abates. Ideal para jogadas agressivas e auto-suficiência.

---
Aqui está a pergunta do usuário: ${question}
  `

  let pergunta = ''

  if (game == 'valorant') {
    pergunta = perguntaValorant
  } else if (game == 'clash') {
    pergunta = perguntaClashRoyale
  } else if (game == 'csgo') {
    pergunta = perguntaCSGO
  } else if (game == 'red') {
    pergunta = perguntaRedDead
  } else if (game == 'lol') {
    pergunta = perguntaLOL
  } else {
    pergunta = 'Game não encontrado'
  }

  const contents = [{
    role: "user",
    parts: [{
      text: pergunta
    }]
  }]

  const tools = [{
    google_search: {}
  }]

  //chamada API
  const response = await fetch(geminiURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      contents,
      tools
    })
  })

  const data = await response.json()
  return data.candidates[0].content.parts[0].text
}

const enviarFormulario = async (event) => {
  event.preventDefault()
  const apiKey = apiKeyInput.value
  const game = gameSelect.value
  const question = questionInput.value


  if (apiKey == '' || game == '' || question == '') {
    alert('Por favor, preencha todos os campos')
    return
  }

  askButton.disabled = true
  askButton.textContent = 'Perguntando...'
  askButton.classList.add('loading')

  try {
    const text = await perguntarAI(question, game, apiKey)
    aiResponse.querySelector('.response-content').innerHTML = markdownToHTML(text)
    aiResponse.classList.remove('hidden')
  } catch (error) {
    console.log('Erro:', error)
  } finally {
    askButton.disabled = false
    askButton.textContent = "Perguntar"
    askButton.classList.remove('loading')
  }

}
form.addEventListener('submit', enviarFormulario)