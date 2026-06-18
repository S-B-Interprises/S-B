# S-B Project - Universal AI Agent VS Code Extension

## 📋 Overview
S-B एक innovative project है जो **Universal AI Agent** - एक comprehensive VS Code extension develop कर रहा है। यह extension multiple AI providers को support करता है और production-ready architecture के साथ built है।

## 🚀 Quick Start
```bash
git clone https://github.com/S-B-Interprises/S-B.git
cd S-B
npm install
npm run watch
```

## 📚 Documentation
- [PRD.md](./PRD.md) - Product Requirements Document
- [ARCHITECTURE.md](./ARCHITECTURE.md) - System Architecture
- [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md) - VS Code Extension Structure

## 📁 Project Structure

### Universal AI Agent Extension

```
src/
├── extension.ts                 # Extension entry point
├── core/
│   ├── agent/
│   │   ├── AgentEngine.ts      # Main AI orchestrator
│   │   ├── TaskManager.ts      # Task management
│   │   └── types.ts
│   ├── memory/
│   │   ├── ChatMemory.ts       # Conversation history
│   │   ├── ProjectMemory.ts    # Project context
│   │   └── types.ts
│   └── router/
│       ├── AIRouter.ts         # Smart routing
│       └── types.ts
├── providers/
│   ├── base/
│   │   └── AIProvider.ts       # Base interface
│   ├── openai/
│   │   └── OpenAIProvider.ts   # GPT integration
│   ├── gemini/
│   │   └── GeminiProvider.ts   # Gemini integration
│   └── claude/
│       └── ClaudeProvider.ts   # Claude integration
├── context/
├── tools/
├── ui/
└── shared/
    ├── permissions/
    │   └── PermissionManager.ts # Access control
    ├── constants.ts
    ├── logger.ts
    ├── errors.ts
    ├── utils.ts
    └── types.ts
```

## 🛠️ Technology Stack

- **Language**: TypeScript 5.3+ (Strict Mode)
- **Framework**: VS Code Extension API v1.85.0+
- **Runtime**: Node.js 18+
- **Build**: TypeScript Compiler (tsc)

## ✅ Project Status

### Completed ✨
- [x] Folder structure setup
- [x] TypeScript strict configuration
- [x] package.json with VS Code API
- [x] Core agent classes (interfaces)
- [x] Memory management system
- [x] Multi-provider support (base + 3 implementations)
- [x] Permission manager
- [x] Shared utilities and logging
- [x] Error handling system
- [x] Extension entry point

### Core Classes Created
| Component | Class | Status |
|-----------|-------|--------|
| Agent | `AgentEngine` | ✅ Interface Ready |
| Task | `TaskManager` | ✅ Interface Ready |
| Memory | `ChatMemory` | ✅ Interface Ready |
| Context | `ProjectMemory` | ✅ Interface Ready |
| Routing | `AIRouter` | ✅ Interface Ready |
| Permissions | `PermissionManager` | ✅ Interface Ready |
| **Providers** | | |
| Base | `AIProvider` | ✅ Abstract Base |
| OpenAI | `OpenAIProvider` | ✅ Skeleton |
| Gemini | `GeminiProvider` | ✅ Skeleton |
| Claude | `ClaudeProvider` | ✅ Skeleton |

## 📦 Available Commands

```bash
# Development
npm run watch          # Watch mode for development
npm run compile        # Build TypeScript
npm run dev            # Development mode

# Quality
npm run lint           # ESLint code analysis
npm run test           # Run test suite

# Production
npm run vscode:prepublish  # Prepare for publishing
```

## 🔧 Configuration

### TypeScript Configuration
- **Strict Mode**: ✅ Enabled
- **No Implicit Any**: ✅ Enabled
- **No Unused Variables**: ✅ Enabled
- **No Unused Parameters**: ✅ Enabled
- **Strict Null Checks**: ✅ Enabled

### VS Code Extension Settings
- **Min Version**: VS Code 1.85.0+
- **Publisher**: S-B-Interprises
- **Version**: 0.1.0

## 🤝 Contributing

Contributions का स्वागत है!

1. Issue create करें या PR submit करें
2. Code में हमारे strict guidelines follow करें
3. Test cases add करें
4. Documentation update करें

## 🎯 Next Steps

1. **API Integration**: OpenAI, Gemini, Claude client libraries integrate करें
2. **UI Implementation**: WebView-based chat interface बनाएं
3. **Business Logic**: Core classes में implementation add करें
4. **Testing**: Comprehensive test suite लिखें
5. **Documentation**: API documentation तैयार करें

## 📝 License
MIT License

## 📧 Contact
S-B-Interprises Team

---

**Project Status**: 🚀 Active Development
**Version**: 0.1.0
**Last Updated**: 2026-06-18
