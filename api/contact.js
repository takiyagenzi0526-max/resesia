const nodemailer = require('nodemailer');

function buildMailText(payload) {
  return [
    'RESESIA Webサイトよりお問い合わせが届きました。',
    '',
    `お名前: ${payload.name}`,
    `フリガナ: ${payload.kana || '未入力'}`,
    `メールアドレス: ${payload.email}`,
    `電話番号: ${payload.phone || '未入力'}`,
    `お問い合わせ種別: ${payload.inquiryType || '未選択'}`,
    '',
    'お問い合わせ内容:',
    payload.message,
  ].join('\n');
}

function buildMailHtml(payload) {
  const rows = [
    ['お名前', payload.name],
    ['フリガナ', payload.kana || '未入力'],
    ['メールアドレス', payload.email],
    ['電話番号', payload.phone || '未入力'],
    ['お問い合わせ種別', payload.inquiryType || '未選択'],
    ['お問い合わせ内容', payload.message.replace(/\n/g, '<br>')],
  ];

  return `
    <div style="font-family: Arial, sans-serif; line-height: 1.7; color: #1c1a17;">
      <h2 style="margin: 0 0 16px; color: #577037;">RESESIA Webサイトからのお問い合わせ</h2>
      <table style="width: 100%; border-collapse: collapse;">
        ${rows
          .map(
            ([label, value]) => `
              <tr>
                <th style="width: 160px; padding: 10px; border: 1px solid #d8e6bf; text-align: left; background: #f1ece4;">${label}</th>
                <td style="padding: 10px; border: 1px solid #d8e6bf;">${value}</td>
              </tr>
            `
          )
          .join('')}
      </table>
    </div>
  `;
}

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { GMAIL_USER, GMAIL_APP_PASSWORD, CONTACT_TO_EMAIL } = process.env;

  if (!GMAIL_USER || !GMAIL_APP_PASSWORD) {
    return res.status(500).json({ message: 'Mail server is not configured' });
  }

  const payload = {
    name: String(req.body?.name || '').trim(),
    kana: String(req.body?.kana || '').trim(),
    email: String(req.body?.email || '').trim(),
    phone: String(req.body?.phone || '').trim(),
    inquiryType: String(req.body?.inquiryType || '').trim(),
    message: String(req.body?.message || '').trim(),
  };

  if (!payload.name || !payload.email || !payload.message) {
    return res.status(400).json({ message: '必須項目が未入力です。' });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: GMAIL_USER,
        pass: GMAIL_APP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: `RESESIA Contact <${GMAIL_USER}>`,
      to: CONTACT_TO_EMAIL || GMAIL_USER,
      replyTo: payload.email,
      subject: '【RESESIA】Webサイトからお問い合わせがありました',
      text: buildMailText(payload),
      html: buildMailHtml(payload),
    });

    return res.status(200).json({ message: 'お問い合わせを送信しました。' });
  } catch (error) {
    console.error('Failed to send contact email', error);
    return res.status(500).json({ message: '送信に失敗しました。時間をおいて再度お試しください。' });
  }
};