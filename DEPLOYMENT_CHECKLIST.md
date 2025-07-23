# Prime Phygital Platform - Deployment Checklist

## 🚀 Pre-Deployment Setup

### 1. Database Setup (Neon)
- [ ] Create Neon database account
- [ ] Create new database project
- [ ] Copy connection string
- [ ] Run database initialization scripts:
  \`\`\`sql
  -- In Neon SQL Editor, run:
  -- 1. scripts/01-create-tables.sql
  -- 2. scripts/02-seed-data.sql
  \`\`\`
- [ ] Test database connection

### 2. Blockchain Setup (Alchemy)
- [ ] Create Alchemy account
- [ ] Create new app with multiple chains:
  - Ethereum (Sepolia Testnet)
  - Polygon (Mumbai Testnet) 
  - Base (Sepolia Testnet)
  - Arbitrum (Sepolia Testnet)
- [ ] Copy API key
- [ ] Test RPC endpoints

### 3. Email Setup (Resend) - Optional
- [ ] Create Resend account
- [ ] Verify domain (or use resend.dev for testing)
- [ ] Create API key
- [ ] Test email sending

### 4. NFC Security
- [ ] Generate NFC verification key (32-byte hex)
- [ ] Store securely (never commit to git)

## 📝 Environment Variables

Create `.env.local` file with:

\`\`\`bash
# Database
DATABASE_URL="postgresql://username:password@host/database?sslmode=require"

# Authentication
JWT_SECRET="your-super-secret-jwt-key-here"

# Blockchain (Alchemy)
BLOCKCHAIN_API_KEY="your-alchemy-api-key"
NEXT_PUBLIC_BLOCKCHAIN_NETWORK="ethereum"

# NFC Security (DO NOT use NEXT_PUBLIC_)
NFC_VERIFICATION_KEY="your-32-byte-hex-key"

# Email (Optional)
EMAIL_API_KEY="re_your-resend-api-key"
NEXT_PUBLIC_EMAIL_FROM="noreply@yourdomain.com"

# App URLs
NEXT_PUBLIC_VERIFICATION_URL="https://your-app.vercel.app/verify"
NEXT_PUBLIC_APP_URL="https://your-app.vercel.app"
\`\`\`

## 🔧 Vercel Deployment

### 1. Prepare Repository
- [ ] Push all code to GitHub
- [ ] Ensure `.env.local` is in `.gitignore`
- [ ] Test build locally: `npm run build`

### 2. Deploy to Vercel
- [ ] Connect GitHub repository to Vercel
- [ ] Add all environment variables in Vercel dashboard
- [ ] Deploy and wait for build completion
- [ ] Check deployment logs for errors

### 3. Post-Deployment Setup
- [ ] Update `NEXT_PUBLIC_VERIFICATION_URL` with actual domain
- [ ] Update `NEXT_PUBLIC_APP_URL` with actual domain
- [ ] Redeploy with updated URLs

## ✅ Testing Checklist

### 1. Basic Functionality
- [ ] Homepage loads correctly
- [ ] Login/signup works
- [ ] Dashboard accessible after login
- [ ] User profile displays correctly

### 2. Database Integration
- [ ] User registration creates database record
- [ ] Login retrieves user from database
- [ ] Products can be created and stored
- [ ] Ownership history is tracked

### 3. Blockchain Integration
- [ ] Chain selector shows available networks
- [ ] Test blockchain connection
- [ ] Product registration on testnet works
- [ ] Transaction hashes are stored

### 4. NFC Functionality
- [ ] NFC patch programmer loads
- [ ] Product data can be written to NFC (simulation)
- [ ] NFC verification works
- [ ] Signatures are generated and verified

### 5. Authentication Flow
- [ ] Protected routes redirect to login
- [ ] JWT tokens are set correctly
- [ ] Logout clears authentication
- [ ] Role-based permissions work

## 🐛 Common Issues & Solutions

### Database Connection Issues
\`\`\`bash
# Test connection string
psql "postgresql://username:password@host/database?sslmode=require"
\`\`\`

### Build Errors
- Check for TypeScript errors: `npm run type-check`
- Verify all imports are correct
- Ensure environment variables are set

### Authentication Issues
- Verify JWT_SECRET is set
- Check cookie settings (httpOnly, secure, sameSite)
- Test API endpoints with curl/Postman

### Blockchain Connection Issues
- Verify Alchemy API key is correct
- Test RPC URLs manually
- Check network configurations

## 📊 Performance Optimization

### 1. Database
- [ ] Add database indexes (already in schema)
- [ ] Enable connection pooling
- [ ] Monitor query performance

### 2. Frontend
- [ ] Enable Next.js image optimization
- [ ] Implement proper loading states
- [ ] Add error boundaries

### 3. Caching
- [ ] Configure Vercel edge caching
- [ ] Implement API response caching
- [ ] Use React Query for client-side caching

## 🔒 Security Checklist

### 1. Environment Variables
- [ ] No secrets in client-side code
- [ ] Proper NEXT_PUBLIC_ prefix usage
- [ ] Secure JWT secret (32+ characters)

### 2. Authentication
- [ ] Password hashing with bcrypt
- [ ] HTTP-only cookies for tokens
- [ ] Proper CORS configuration

### 3. Database
- [ ] SQL injection prevention (parameterized queries)
- [ ] Proper user permissions
- [ ] Connection string security

### 4. NFC Security
- [ ] Cryptographic signature verification
- [ ] Secure key storage
- [ ] Tamper detection

## 🚀 Go Live Checklist

### 1. Final Tests
- [ ] All features working in production
- [ ] Performance is acceptable
- [ ] Error monitoring is set up
- [ ] Backup strategy is in place

### 2. Monitoring
- [ ] Set up Vercel analytics
- [ ] Configure error tracking (Sentry)
- [ ] Database monitoring
- [ ] Uptime monitoring

### 3. Documentation
- [ ] User documentation complete
- [ ] API documentation updated
- [ ] Deployment process documented
- [ ] Troubleshooting guide created

## 📞 Support & Maintenance

### Regular Tasks
- [ ] Monitor error logs
- [ ] Update dependencies monthly
- [ ] Backup database regularly
- [ ] Review security updates

### Emergency Contacts
- Database: Neon support
- Hosting: Vercel support  
- Blockchain: Alchemy support
- Email: Resend support

---

## 🎉 Deployment Complete!

Once all items are checked, your Prime Phygital platform is ready for production use!

**Next Steps:**
1. Create your first product
2. Program an NFC chip
3. Test the complete user journey
4. Share with beta users
5. Gather feedback and iterate
\`\`\`

Now let's create an NFC testing workflow:
