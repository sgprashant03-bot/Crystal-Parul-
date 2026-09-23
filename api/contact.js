module.exports = async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ ok: false, error: 'Method not allowed' });
  const body = req.body || {};
  if (body.website) return res.status(400).json({ ok: false, error: 'Spam detected' });
  if (!body.name || !body.email || !body.message) return res.status(400).json({ ok: false, error: 'Missing required fields' });
  console.log(JSON.stringify({ event: 'contact.received', ...body }));
  return res.status(201).json({ ok: true, message: 'Received' });
};
