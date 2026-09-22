module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({
      ok: false,
      error: 'Method not allowed'
    });
  }

  const body = req.body || {};

  const orderNumber =
    `CP-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 899999)}`;

  console.log({
    event: 'order.created',
    orderNumber,
    customer: body.customer,
    items: body.items
  });

  return res.status(201).json({
    ok: true,
    orderNumber
  });
};