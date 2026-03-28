# Recording Hub Website

A full-stack website for the Recording Hub Discord server, featuring UPI payment submission with Discord notifications.

## Features

- Pricing plans for Minecraft YouTubers
- UPI payment integration (manual submission)
- Discord notifications on payment submission
- Responsive design with aqua theme

## Setup

1. Install dependencies: `npm install`
2. Set up environment variables in `.env`:
   - `DISCORD_WEBHOOK_URL`: Your Discord webhook URL for notifications
   - `PORT`: Server port (default 3000)
3. Upload QR codes for each product in the `images/` folder, named as `qr-{plan}-{members}.png` (e.g., `qr-bronze-5.png`)
4. Run the server: `npm start` or `npm run dev` for development
5. Open `http://localhost:3000` in your browser

## Customization

- Edit `index.html` to update content, plans, or links.
- Modify `style.css` to change colors, fonts, or layout.
- Update `server.js` for backend logic.

## Payment Flow

1. User selects a product and goes to payment page.
2. User pays via UPI using the QR code or ID.
3. User enters transaction ID and submits.
4. Discord notification is sent with payment details for manual verification.