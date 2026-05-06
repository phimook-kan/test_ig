const express = require('express');
const { instagramGetUrl } = require('instagram-url-direct');

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => res.json({ status: 'ok' }));

app.get('/get-image', async (req, res) => {
  const { url } = req.query;
  if (!url) return res.json({ success: false, error: 'ไม่มี url' });

  try {
    const data = await instagramGetUrl(url);
    if (!data.url_list || data.url_list.length === 0) {
      return res.json({ success: false, error: 'ไม่พบรูป' });
    }
    res.json({ success: true, urls: data.url_list });
  } catch (e) {
    res.json({ success: false, error: e.message });
  }
});

app.listen(PORT, () => console.log(`Running on port ${PORT}`));
