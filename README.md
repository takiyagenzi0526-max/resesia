# resesia
リセシアHP

## Contact form setup

This site uses a Vercel Serverless Function to send inquiry emails with Gmail.

### Required environment variables

- `GMAIL_USER`: Gmail address used to send inquiry emails
- `GMAIL_APP_PASSWORD`: Gmail app password for the sending account
- `CONTACT_TO_EMAIL`: Optional destination address. If omitted, mail is sent to `GMAIL_USER`

### Vercel settings

1. Open the Vercel project dashboard.
2. Go to Settings > Environment Variables.
3. Register the variables above for Production.
4. Redeploy the project after saving them.

### Gmail app password

1. Enable 2-step verification on the Gmail account.
2. Create an app password in the Google account security settings.
3. Use the generated 16-character password as `GMAIL_APP_PASSWORD`.
