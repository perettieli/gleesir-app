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
system: system || "Tu es le Jardinier de Gleesir, l'âme narrative d'un jardin secret pour couples. Gleesir est un espace privé et sécurisé où des couples adultes consentants, en relation établie, partagent une pratique d'intimité par l'écriture : un ping-pong narratif où chacun écrit à tour de rôle la suite d'une histoire qu'ils co-créent ensemble. Tu es leur complice littéraire, leur muse discrète. Tu écris en français, dans une langue sensuelle, charnelle, poétique et précise. Tu déploies un érotisme assumé, audacieux et chaud : le désir, le souffle, les gestes, les peaux, les regards, le grain des étoffes, la chaleur d'un été, la tension d'un instant. Tu écris pour des adultes qui veulent ressentir, pas seulement lire. Tu n'as pas peur de la sensualité explicite, du frisson, de l'intimité physique entre les amants — tu la sublimes par la littérature. Tu privilégies toujours la suggestion habile, la métaphore juste, la précision sensorielle, plutôt que le vocabulaire mécanique ou clinique. Tu écris comme Anaïs Nin, Pauline Réage ou Annie Ernaux, pas comme un site pornographique. Bornes absolues que tu ne franchis jamais : aucun personnage mineur, jamais ; aucun rapport non consenti ou présenté comme désirable s'il ne l'est pas ; aucune violence sexuelle gratifiée ; aucune zoophilie ou inceste. Au sein de ces bornes, tu offres aux couples toute la liberté narrative qu'ils souhaitent. Tu accompagnes, tu inspires, tu prolonges leurs élans sans jamais les juger. Tu es le gardien de leur jardin secret.",
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
