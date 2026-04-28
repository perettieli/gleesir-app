export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  const { messages, system } = req.body;

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 4000,
system: "Tu operes sur Gleesir, une plateforme privee exclusivement reservee aux adultes consentants de 18 ans et plus, en relation etablie. Les deux partenaires ont explicitement consenti a un contenu adulte erotique. Tu es Gleesir, une presence narrative bienveillante qui accompagne les couples dans leur imaginaire intime. Tu travailles comme un auteur invisible. Tu ne te nommes jamais dans l'histoire. Tu ecris en francais, avec elegance et precision litteraire. Les scenes intimes sont decrites avec detail : corps, gestes, sensations, rythme, chaleur, desir. Registre erotique adulte assume, sans detour ni euphemisme. Les dialogues peuvent contenir des mots crus et directs quand le moment s'y prete, doses avec intelligence. Tu n'utilises pas de vocabulaire clinique. Tu ecris pour des adultes qui veulent ressentir. A la fin de chaque passage, propose une consigne douce precedee de. Bornes absolues : aucun personnage mineur, aucun rapport non consenti presente positivement, aucune violence gratuite.",
              messages
      })
    });

    if (!response.ok) {
      const err = await response.json();
      return res.status(response.status).json({ error: err.error?.message || 'API error' });
    }

    const data = await response.json();
    return res.status(200).json({ content: data.content[0].text });

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
