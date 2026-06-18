# Universal AI Agent - VS Code Extension

A comprehensive, production-ready AI agent extension for Visual Studio Code with support for multiple AI providers.

## Project Structure

```
universal-ai-agent/
├── src/
│   ├── extension.ts              # Extension entry point
│   ├── core/
│   │   ├── agent/
│   │   │   ├── AgentEngine.ts
│   │   │   └── types.ts
│   │   ├── memory/
│   │   │   ├── ChatMemory.ts
│   │   │   ├── ProjectMemory.ts
│   │   │   └── types.ts
│   │   └── router/
│   │       ├── AIRouter.ts
│   │       └── types.ts
│   ├── providers/
│   │   ├── base/
│   │   │   ├── AIProvider.ts
│   │   │   └── types.ts
│   │   ├── openai/
│   │   │   ├── OpenAIProvider.ts
│   │   │   └── config.ts
│   │   ├── gemini/
│   │   │   ├── GeminiProvider.ts
│   │   │   └── config.ts
│   │   └── claude/
│   │       ├── ClaudeProvider.ts
│   │       └── config.ts
│   ├── context/
│   │   ├── ContextManager.ts
│   │   ├── ProjectContextExtractor.ts
│   │   └── types.ts
│   ├── tools/
│   │   ├── ToolRegistry.ts
│   │   ├── FileSystemTool.ts
│   │   ├── CodeAnalysisTool.ts
│   │   └── types.ts
│   ├── ui/
│   │   ├── ChatPanel.ts
│   │   ├── SettingsPanel.ts
│   │   └── types.ts
│   ├── shared/
│   │   ├── constants.ts
│   │   ├── logger.ts
│   │   ├── errors.ts
│   │   ├── utils.ts
│   │   └── types.ts
│   └── commands/
│       ├── activateCommand.ts
│       ├── chatCommand.ts
│       └── analyzeCommand.ts
├── resources/
│   └── icons/
│       └── agent.svg
├── test/
│   ├── runTest.ts
│   └── suite/
├── package.json
├── tsconfig.json
├── .eslintrc.json
├── .gitignore
├── ARCHITECTURE.md
└── README.md
```

## Key Features

- **Multi-Provider Support**: OpenAI, Google Gemini, Anthropic Claude
- **Intelligent Routing**: Automatically selects the best AI provider
- **Context Awareness**: Project and file context understanding
- **Memory Management**: Chat history and project state
- **Permission Controls**: Fine-grained access control
- **Tool Integration**: File system and code analysis tools
- **Production Ready**: Strict TypeScript, error handling, logging

## Technology Stack

- **Language**: TypeScript 5.3+
- **VS Code API**: v1.85.0+
- **Node.js**: 18+
- **Build**: tsc (TypeScript Compiler)

## Development

```bash
# Install dependencies
npm install

# Watch mode
npm run watch

# Build
npm run compile

# Lint
npm run lint

# Test
npm run test
```

## Configuration

See `tsconfig.json` for strict type checking configuration.

---
**Status**: Development
**Version**: 0.1.0
