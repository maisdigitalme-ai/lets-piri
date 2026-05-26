export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { nome, email, telefone } = req.body || {}

  if (!nome || !email || !telefone) {
    return res.status(400).json({ error: 'Campos obrigatórios: nome, email, telefone' })
  }

  const BREVO_API_KEY = process.env.BREVO_API_KEY
  if (!BREVO_API_KEY) {
    console.error('BREVO_API_KEY não configurada')
    return res.status(500).json({ error: 'Configuração interna inválida' })
  }

  const nameParts = nome.trim().split(/\s+/)
  const firstName = nameParts[0]
  const lastName = nameParts.slice(1).join(' ') || ''

  try {
    // 1. Criar/atualizar contato no Brevo
    const contactRes = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'content-type': 'application/json',
        'api-key': BREVO_API_KEY,
      },
      body: JSON.stringify({
        email,
        attributes: {
          FIRSTNAME: firstName,   // atributo criado para personalização de e-mail
          LASTNAME: lastName,     // atributo criado para personalização de e-mail
          NOME: firstName,        // atributo nativo da conta Brevo (em português)
          SOBRENOME: lastName,    // atributo nativo da conta Brevo (em português)
          SMS: telefone,
        },
        listIds: [5], // Lista "Lets Piri - Cadastros" no Brevo (ID correto)
        updateEnabled: true,
      }),
    })

    const contactData = await contactRes.json().catch(() => ({}))

    if (!contactRes.ok && contactRes.status !== 204) {
      console.error('Erro ao criar contato no Brevo:', JSON.stringify(contactData))
      // Não bloqueia — tenta enviar o e-mail mesmo assim
    } else {
      console.log('Contato criado/atualizado com sucesso:', email, firstName)
    }

    // 2. Disparar e-mail de boas-vindas via template ID 1
    const emailRes = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'content-type': 'application/json',
        'api-key': BREVO_API_KEY,
      },
      body: JSON.stringify({
        to: [{ email, name: nome }],
        templateId: 1,
        params: {
          FIRSTNAME: firstName,
          NOME: nome,
        },
      }),
    })

    const emailData = await emailRes.json().catch(() => ({}))

    if (!emailRes.ok) {
      console.error('Erro ao enviar e-mail via Brevo:', JSON.stringify(emailData))
      return res.status(500).json({ error: 'Erro ao enviar e-mail de confirmação' })
    }

    console.log('E-mail de boas-vindas enviado:', email, 'messageId:', emailData.messageId)
    return res.status(200).json({ success: true, messageId: emailData.messageId })
  } catch (err) {
    console.error('Erro interno:', err)
    return res.status(500).json({ error: 'Erro interno do servidor' })
  }
}
