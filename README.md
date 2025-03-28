# Outreach Agent

A powerful email outreach automation platform that helps you connect with prospects and manage follow-up sequences.

## Features

- Send personalized outreach at scale
- Automate follow-ups that feel human
- Track email opens, clicks, and responses
- Schedule meetings with interested prospects
- Analyze campaign performance with detailed metrics

## Tech Stack

- **Frontend**: Next.js, React, Tailwind CSS
- **Backend**: Anvil (Python)
- **Authentication**: Custom JWT-based auth
- **State Management**: React Context API
- **HTTP Client**: Axios

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Anvil account with a deployed app

### Setup

1. Clone the repository:

```bash
git clone https://github.com/your-username/outreach-agent.git
cd outreach-agent
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env.local` file in the root directory:

```
NEXT_PUBLIC_API_URL="https://your-anvil-app-name.anvil.app/_/api"
```

4. Start the development server:

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) with your browser.

## Connecting to Anvil Backend

This frontend application is designed to work with the Anvil backend for Outreach Agent. To connect them:

1. Deploy the Anvil backend app provided in the repository
2. Copy your Anvil app's URL and update the `NEXT_PUBLIC_API_URL` in `.env.local`
3. Make sure your Anvil app has CORS configured to allow requests from your frontend domain

## API Services

The application uses several API services to communicate with the Anvil backend:

- **Authentication**: Login, logout, registration, and session management
- **Contacts**: Managing contact information and lists
- **Templates**: Email templates with personalization variables
- **Sequences**: Multi-step email sequences with scheduled timing
- **Emails**: Sending emails and tracking interactions
- **Meetings**: Scheduling and managing prospect meetings
- **Reports**: Analytics and performance reporting

## Folder Structure

```
outreach-agent/
├── public/             # Static assets
├── src/
│   ├── app/            # Next.js app router pages
│   ├── components/     # React components
│   ├── context/        # React context providers
│   ├── services/       # API services
│   └── providers/      # Provider components
├── .env.local          # Environment variables
└── package.json        # Project dependencies
```

## Deployment

Deploy the frontend application to your platform of choice (Vercel, Netlify, etc.):

```bash
npm run build
```

Remember to add the appropriate environment variables to your deployment environment.

## Environment Variables

- `NEXT_PUBLIC_API_URL`: URL of the Anvil backend API
- `NEXT_PUBLIC_AUTH_ENABLED`: Enable/disable authentication (true/false)
- `NEXT_PUBLIC_ENABLE_ANALYTICS`: Enable/disable analytics features
- `NEXT_PUBLIC_ENABLE_DEBUG`: Enable/disable debug mode

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
# next-template
