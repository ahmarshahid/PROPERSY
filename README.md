![WhatsApp Image 2025-09-20 at 22 10 52_c7489efc](https://github.com/user-attachments/assets/72ec7c03-16ac-4e86-9d5d-a2fc0309be2a)

An AI-powered PDF analysis application that processes company profiles and RFP documents to provide comprehensive insights including compliance analysis, executive summaries, technical evaluations, pricing strategies, and project timelines.

## 🚀 Features

- **Dual PDF Upload**: Upload both Company Profile and RFP documents simultaneously
- **Real-time Analysis**: Live streaming of analysis results with real-time logging
- **Comprehensive Reports**: 
  - Executive Summary
  - Technical Analysis
  - Pricing Strategies
  - References & Citations
  - Project Timeline
- **Interactive Dashboard**: Clean, modern interface with live response monitoring
- **n8n Integration**: Powerful workflow automation backend
- **Streaming Responses**: Real-time display of analysis progress

## 🛠️ Tech Stack

### Frontend
- **Next.js 15.5.3** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **React Hooks** - Modern state management

### Backend
- **n8n** - Workflow automation platform
- **Node.js** - Server-side runtime
- **Webhook Integration** - Real-time communication

### AI/ML
- **OpenAI GPT Models** - Document analysis and content generation
- **Custom AI Agents** - Specialized analysis workflows

## 📁 Project Structure

```
PDF-AGENT/
├── FRONTEND/
│   └── interent/
│       ├── app/
│       │   ├── api/
│       │   │   └── n8n-proxy/          # API proxy for n8n integration
│       │   ├── components/
│       │   │   ├── N8nBidConsole.tsx   # Main PDF analysis interface
│       │   │   └── landing.tsx         # Landing page component
│       │   ├── globals.css             # Global styles
│       │   ├── layout.tsx              # App layout
│       │   └── page.tsx                # Main page component
│       ├── .env.local                  # Environment variables
│       ├── package.json                # Dependencies
│       ├── tailwind.config.js          # Tailwind configuration
│       └── tsconfig.json               # TypeScript configuration
└── BACKEND/
    └── pdf-agent-/                     # Backend services
```

## 🔧 Installation & Setup

### Prerequisites
- Node.js 18+ 
- npm or yarn
- n8n account and workspace

### 1. Clone the Repository
```bash
git clone <repository-url>
cd PDF-AGENT
```

### 2. Install Frontend Dependencies
```bash
cd FRONTEND/interent
npm install
```

### 3. Environment Configuration
Create or update `.env.local` file:
```env
# n8n webhook URL for server-side proxy
N8N_WEBHOOK_URL=https://your-n8n-instance.app.n8n.cloud/webhook/YOUR-WEBHOOK-ID/chat

# Public webhook URL (optional when using server proxy)
NEXT_PUBLIC_N8N_WEBHOOK_URL=
```

### 4. n8n Workflow Setup

#### Required n8n Nodes:
1. **Webhook Trigger** - Receives PDF files and analysis requests
2. **OpenAI Chat Model** - AI analysis engine
3. **Compliance Checker** - Document compliance validation
4. **Respond to Webhook** - Returns structured results

#### Webhook Configuration:
- **Method**: POST
- **Path**: `/chat`
- **Response Mode**: Using Response Nodes
- **Make Chat Publicly Available**: Enabled

#### Response Node Configuration:
```json
{
  "message": "PDF Analysis Complete",
  "text": "{{ $('ComplianceChecker').item.json.message }}",
  "executive": "Executive summary content...",
  "technical": "Technical analysis content...",
  "pricing": "Pricing strategy content...",
  "references": "References and citations...",
  "timeline": "Project timeline content...",
  "compliant": "{{ $('ComplianceChecker').item.json.Compliant }}"
}
```

### 5. Start Development Server
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## 📖 Usage Guide

### 1. Upload Documents
- **Company Profile PDF**: Upload your company's profile document
- **RFP PDF**: Upload the Request for Proposal document
- **Optional Message**: Add specific analysis instructions

### 2. Run Analysis
- Click "Run workflow" to start the analysis
- Monitor real-time progress in the Network log
- View streaming responses in the Live response panel

### 3. Review Results
Switch between different views:
- **Writers view**: Structured analysis sections
- **All messages**: Complete conversation history
- **Raw**: Raw JSON responses
- **Logs**: Detailed execution logs

### 4. Analysis Sections
- **Executive**: High-level summary and recommendations
- **Technical**: Detailed technical analysis and requirements
- **Pricing**: Cost analysis and pricing strategies
- **References**: Supporting documentation and citations
- **Timeline**: Project milestones and scheduling

## 🔗 API Endpoints

### `/api/n8n-proxy`
Proxy endpoint for n8n webhook communication
- **Method**: POST
- **Content-Type**: multipart/form-data
- **Parameters**:
  - `companyFile`: Company profile PDF
  - `rfpFile`: RFP document PDF
  - `message`: Analysis instructions (optional)

## ⚙️ Configuration

### Tailwind CSS
Custom configuration for responsive design and dark theme support.

### TypeScript
Strict type checking enabled for better code quality and development experience.

### Next.js App Router
Modern Next.js routing with server components and streaming support.

## 🚀 Deployment

### Frontend Deployment
```bash
npm run build
npm start
```

### Environment Variables for Production
```env
N8N_WEBHOOK_URL=https://your-production-n8n-instance.com/webhook/ID/chat
NEXT_PUBLIC_N8N_WEBHOOK_URL=
```

## 🛡️ Security Features

- Server-side webhook proxy to protect n8n credentials
- Environment variable protection
- Type-safe API communication
- Input validation and sanitization

## 🔍 Troubleshooting

### Common Issues

1. **404 Webhook Error**
   - Ensure n8n workflow is activated
   - Verify webhook URL in environment variables
   - Check n8n workspace accessibility

2. **No Analysis Results**
   - Confirm "Respond to Webhook" node is properly configured
   - Check n8n execution logs
   - Verify response format matches frontend expectations

3. **File Upload Issues**
   - Ensure PDF files are valid and readable
   - Check file size limits
   - Verify multipart form data handling

### Debug Mode
Enable detailed logging by checking "Show logs (stream)" in the interface.

## 📝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🙋‍♂️ Support

For support and questions:
- Check the troubleshooting section
- Review n8n workflow configuration
- Ensure all environment variables are properly set

## 🔄 Version History

- **v1.0.0** - Initial release with basic PDF analysis
- **v1.1.0** - Added real-time streaming and enhanced UI
- **v1.2.0** - Improved n8n integration and error handling

---

**Built with ❤️ using Next.js, TypeScript, and n8n**
