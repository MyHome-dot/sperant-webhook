const express = require('express');
const app = express();
app.use(express.json());

const SPERANT_TOKEN = '5PrYiXZgyc56UCSZNoVbeDYjCRX6diO4dlyWOs05';
const SPERANT_URL = 'https://api.eterniasoft.com/v3/clients';

app.post('/webhook-ghl', async (req, res) => {
  console.log('Datos recibidos de GHL:', req.body);

  const body = req.body;

  const payload = {
    fname:            body.first_name || body.name || '',
    lname:            body.last_name  || '',
    email:            body.email      || '',
    phone:            body.phone      || body.phone_number || '',
    project_id:       578
    input_channel_id: 33,
    source_id:        13,
    interest_type_id: 15,
  };

  try {
    const response = await fetch(SPERANT_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${SPERANT_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    console.log('Respuesta de Sperant:', data);
    res.status(200).json({ success: true, data });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

app.get('/', (req, res) => res.send('Webhook activo ✅'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
