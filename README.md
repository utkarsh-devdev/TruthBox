# 💬 TruthBox - Anonymous Feedback Platform

> **Say it real, stay unreal.** Share candid feedback and anonymous messages without revealing your identity.

TruthBox is a modern anonymous messaging platform similar to [Qooh.me](https://qooh.me) or [Sarahah](https://sarahah.com). Users can create public profiles and receive honest, unfiltered feedback from anyone—friends, colleagues, or strangers—while maintaining complete anonymity.

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![React](https://img.shields.io/badge/React-19-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green?logo=mongodb)

---

## ✨ Features

### For Senders
- 📝 **Send Anonymous Messages** - Share feedback without revealing identity
- 🤖 **AI-Powered Suggestions** - Get contextual message suggestions via Groq LLama 3.1
- 🎯 **Easy Sharing** - Simple share link to send messages to any user
- 📱 **No Login Required** - Send messages without creating an account

### For Recipients
- 👤 **Custom Profile** - Public profile at `/u/[username]`
- 📬 **Message Management** - View, delete, and organize received messages
- 🚫 **Message Control** - Toggle whether you accept messages
- 🔐 **Privacy First** - All messages are 100% anonymous
- ⏰ **Timestamps** - See when each message was received

### Platform Features
- ✅ **Email Verification** - Secure signup with 6-digit verification codes
- 🔐 **Secure Authentication** - NextAuth with JWT tokens
- 📧 **Email Notifications** - Verification emails via Resend
- 📱 **Responsive Design** - Works on desktop and mobile
- 🎨 **Modern UI** - Built with Shadcn/ui and TailwindCSS

---

## 🚀 Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | Next.js 16, React 19, TypeScript, TailwindCSS |
| **Backend** | Next.js API Routes, Node.js |
| **Database** | MongoDB with Mongoose |
| **Authentication** | NextAuth v4 (JWT) |
| **Form Validation** | Zod |
| **Form Handling** | React Hook Form |
| **UI Components** | Shadcn/ui, Radix UI |
| **Email Service** | Resend |
| **AI Suggestions** | Groq API (Llama 3.1) |
| **Styling** | TailwindCSS 4, Lucide Icons |

---

## 📋 Prerequisites

Before you begin, ensure you have:

- **Node.js** 18+ and **npm**
- **MongoDB Atlas** account ([Create free account](https://www.mongodb.com/cloud/atlas))
- **Resend** API key ([Get API key](https://resend.com))
- **Groq** API key ([Get API key](https://console.groq.com))
- Optional: **NextAuth Secret** (auto-generated, or generate with `openssl rand -base64 32`)

---

## 🔧 Installation

### 1. Clone the repository
```bash
git clone <repository-url>
cd truthbox
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up environment variables

Create a `.env.local` file in the project root:

```env
# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/truthbox?retryWrites=true&w=majority

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here  # Generate with: openssl rand -base64 32

# Email Service
RESEND_API_KEY=your_resend_api_key

# AI Suggestions
GROQ_API_KEY=your_groq_api_key
```

### 4. Run the development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📖 Usage

### For New Users

1. **Sign Up** at `/sign-up`
   - Choose a unique username (2-20 characters)
   - Enter email and password
   - Verify email with 6-digit code

2. **Share Your Profile**
   - Get your profile link: `https://yourapp.com/u/[username]`
   - Share with friends/colleagues
   - They can send you anonymous messages

3. **Receive Messages**
   - Messages appear in your dashboard
   - View timestamp and message content
   - Delete unwanted messages
   - Toggle "Accept Messages" anytime

### For Message Senders

1. **Find Profile** - Visit someone's profile link `/u/[username]`
2. **Get Suggestions** - Click "Suggest Messages" for AI-generated ideas
3. **Write Message** - Type your message (1-300 characters)
4. **Send** - Click "Send It" anonymously
5. **No Identity** - Sender is never revealed

---

## 🛠️ API Routes

### Public Endpoints (No Authentication)

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/sign-up` | Register new user |
| `POST` | `/api/verify-code` | Verify email with code |
| `GET` | `/api/check-username-unique` | Check if username available |
| `POST` | `/api/send-message` | Send anonymous message |
| `POST` | `/api/suggest-messages` | Get AI message suggestions |

### Protected Endpoints (Requires Authentication)

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/get-messages` | Fetch all user messages |
| `GET` | `/api/accept-messages` | Get message acceptance status |
| `POST` | `/api/accept-messages` | Update acceptance status |
| `DELETE` | `/api/delete-message/[messageid]` | Delete specific message |

### Example Requests

**Send Anonymous Message:**
```bash
curl -X POST http://localhost:3000/api/send-message \
  -H "Content-Type: application/json" \
  -d '{
    "username": "john_doe",
    "content": "You are awesome!"
  }'
```

**Get Message Suggestions:**
```bash
curl -X POST http://localhost:3000/api/suggest-messages
```

---

## 📁 Project Structure

```
src/
├── app/
│   ├── (app)/                    # App routes (protected)
│   │   ├── layout.tsx
│   │   ├── page.tsx             # Home
│   │   └── dashboard/           # User dashboard (inbox)
│   │       └── page.tsx
│   ├── (auth)/                   # Auth routes (public)
│   │   ├── sign-up/
│   │   ├── sign-in/
│   │   └── verify/[username]/
│   ├── api/                      # API routes
│   │   ├── sign-up/
│   │   ├── verify-code/
│   │   ├── check-username-unique/
│   │   ├── send-message/
│   │   ├── get-messages/
│   │   ├── accept-messages/
│   │   ├── delete-message/
│   │   ├── suggest-messages/    # Groq API integration
│   │   └── auth/[...nextauth]/  # NextAuth config
│   ├── u/[username]/            # Public profile page
│   ├── globals.css
│   ├── layout.tsx
│   └── middleware.ts            # Route protection
├── components/
│   ├── MessageCard.tsx          # Message display component
│   ├── Navbar.tsx
│   ├── AuthProvider.tsx
│   └── ui/                      # Shadcn components
├── context/
│   └── AuthProvider.tsx         # SessionProvider wrapper
├── helpers/
│   └── sendVerificationEmail.ts # Email sending logic
├── lib/
│   ├── dbConnect.ts            # MongoDB connection
│   ├── resend.ts               # Resend client
│   └── utils.ts                # Utility functions
├── model/
│   └── User.ts                 # Mongoose User schema
├── schemas/                     # Zod validation schemas
│   ├── signUpSchema.ts
│   ├── signInSchema.ts
│   ├── messageSchema.ts
│   ├── acceptMessageSchema.ts
│   └── verifySchema.ts
├── types/
│   ├── ApiResponse.ts
│   └── next-auth.d.ts
└── middleware.ts               # NextAuth middleware
```

---

## 🔐 Authentication Flow

```mermaid
User Sign-up
    ↓
Validate Input (Zod)
    ↓
Hash Password (bcryptjs)
    ↓
Generate 6-digit Code
    ↓
Save Unverified User → Send Email
    ↓
User Enters Code
    ↓
Verify Code (Must be valid & not expired)
    ↓
Mark User as Verified
    ↓
Sign In with Email/Username + Password
    ↓
NextAuth Creates JWT Session
    ↓
User Logged In ✓
```

---

## 💾 Database Schema

### User Collection

```javascript
{
  _id: ObjectId,
  username: String,                  // 2-20 chars, unique, verified only
  email: String,                     // unique
  password: String,                  // hashed with bcryptjs
  verifyCode: String,                // 6-digit code
  verifyCodeExpiry: Date,            // 1 hour from creation
  isVerified: Boolean,               // email verified?
  isAcceptingMessage: Boolean,       // can receive messages?
  messages: [                        // array of received messages
    {
      content: String,               // 1-300 characters
      createdAt: Date
    }
  ],
  createdAt: Date
}
```

---

## 🚀 Scripts

```bash
npm run dev       # Start development server
npm run build     # Create production build
npm start         # Start production server
npm run lint      # Run ESLint
```

---

## 🤖 AI Suggestions

The app uses **Groq's Llama 3.1** model to generate contextual message suggestions.

**Smart Fallback System:**
- If Groq API fails → Uses fallback pool of 20 questions
- No retries (to save quota on free tier)
- Instant suggestions with zero API calls if fallback used

**Questions Example:**
```
"What's a hobby you've recently started?
If you could travel anywhere right now, where would you go?
What's a simple thing that makes you happy?"
```

---

## 📧 Email Setup

Verification emails are sent via **Resend**:

1. Get API key at [resend.com](https://resend.com)
2. Add to `.env.local`: `RESEND_API_KEY=...`
3. Emails sent to: `[email]` with 6-digit verification code

---

## 🔒 Security Features

✅ **Password Security** - bcryptjs hashing (10 salt rounds)
✅ **Email Verification** - Time-limited verification codes (1 hour)
✅ **JWT Sessions** - Secure token-based authentication
✅ **Route Protection** - NextAuth middleware guards protected routes
✅ **Input Validation** - Zod schemas on all forms
✅ **Anonymous Messages** - No sender tracking or IP logging
✅ **HTTPS Ready** - Works with HTTPS in production

---

## 🌐 Deployment

### Deploy on Vercel (Recommended)

1. Push code to GitHub
2. Connect repository to [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy automatically on every push

### Deploy on Other Platforms

**Requirements:**
- Node.js 18+ runtime
- Environment variables configured
- MongoDB Atlas connection accessible

**Platforms:** Heroku, Render, Railway, AWS, DigitalOcean, etc.

---

## 🐛 Troubleshooting

### "Invalid API Key" Error
- Verify `GROQ_API_KEY` is correct in `.env.local`
- Restart dev server: `npm run dev`

### "Email not sent"
- Check `RESEND_API_KEY` is valid
- Verify email address format

### "MongoDB connection failed"
- Ensure `MONGODB_URI` is correct
- Check MongoDB Atlas IP whitelist (allow all IPs)
- Verify database name in URI

### "Username not found"
- Check username exists in database
- Usernames are case-sensitive
- User must be verified (`isVerified: true`)

---

## 📚 Learning Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [MongoDB Mongoose](https://mongoosejs.com)
- [NextAuth.js](https://next-auth.js.org)
- [TailwindCSS](https://tailwindcss.com)
- [Zod Validation](https://zod.dev)
- [Groq API](https://console.groq.com)

---

## 📝 License

This project is open source and available under the **MIT License**.

---

## 🤝 Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

---

## 📞 Support

For issues, questions, or suggestions:
- Open an [Issue](https://github.com/yourusername/truthbox/issues)
- Start a [Discussion](https://github.com/yourusername/truthbox/discussions)
- Contact us at: support@truthbox.com

---

## 🎉 Show Your Support

Give a ⭐ if you find this project useful!

---

**Made with ❤️ by the TruthBox Team**
