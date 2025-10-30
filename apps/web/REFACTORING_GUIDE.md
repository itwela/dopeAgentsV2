# Agent Chat Refactoring Guide

## Overview

The `agent-chat.tsx` component has been refactored from a monolithic ~1,300 line file into a modular, maintainable architecture with **~518 lines** in the main file.

## Architecture Changes

### Before
- Single 1,300+ line component
- All state, logic, and UI in one file
- Difficult to maintain and test
- Heavy prop drilling

### After
- Main component: ~450 lines
- Modular components and custom hooks
- Separated concerns
- Provider-based state management

## New File Structure

```
apps/web/
├── components/
│   ├── agent-chat.tsx (REFACTORED - 518 lines)
│   ├── chat/
│   │   ├── agent-handoff.tsx (Agent handoff display)
│   │   ├── empty-chat-view.tsx (Initial empty state UI)
│   │   ├── message-actions.tsx (Copy, Knowledge Base actions)
│   │   ├── message-bubble.tsx (Individual message rendering)
│   │   ├── messages-list.tsx (Messages container)
│   │   ├── tool-calls.tsx (Tool execution display)
│   │   └── tool-result-message.tsx (Collapsible tool results)
│   └── providers/
│       ├── message-state-provider.tsx (Message UI state management)
│       └── agent-chat-provider.tsx (Existing - Thread/message state)
├── hooks/
│   ├── use-audio-recording.ts (Audio recording & transcription)
│   └── use-input-handler.ts (Input state & textarea management)
└── lib/
    └── chat-utils.ts (Shared utilities & constants)
```

## Components Breakdown

### 1. **Providers**

#### `MessageStateProvider` (`providers/message-state-provider.tsx`)
Manages all message-related UI state:
- Scroll state and refs
- Expanded tool calls/results
- Error state
- Thinking duration
- Copy message state
- Knowledge base modal state

**Usage:**
```tsx
import { useMessageState } from './providers/message-state-provider';

const {
  shouldAutoScroll,
  messagesEndRef,
  scrollToBottom,
  toggleToolCallsExpansion,
  // ... other state and functions
} = useMessageState();
```

### 2. **Custom Hooks**

#### `useAudioRecording` (`hooks/use-audio-recording.ts`)
Encapsulates all audio recording logic:
- Recording state
- Media recorder management
- Transcription API calls

**Usage:**
```tsx
const { 
  isRecording, 
  isTranscribing, 
  startRecording, 
  stopRecording, 
  cancelRecording 
} = useAudioRecording();
```

#### `useInputHandler` (`hooks/use-input-handler.ts`)
Manages input field state and behavior:
- Input value
- Textarea auto-resize
- Keyboard shortcuts
- Focus management

**Usage:**
```tsx
const {
  input,
  textareaRef,
  handleInputChange,
  handleKeyPress,
  clearInput,
  appendToInput,
} = useInputHandler();
```

### 3. **UI Components**

#### `EmptyChatView` (`chat/empty-chat-view.tsx`)
Displays the initial state when there are no messages:
- Agent header
- Agent selector
- Chat input

#### `MessagesList` (`chat/messages-list.tsx`)
Renders the list of messages:
- Maps over messages array
- Handles different message types
- Shows loading state

#### `MessageBubble` (`chat/message-bubble.tsx`)
Renders individual message:
- User/assistant/system styling
- Markdown rendering
- Timestamps
- Agent name badges

#### `MessageActions` (`chat/message-actions.tsx`)
Action buttons for messages:
- Copy to clipboard
- Add to knowledge base
- Agent capability badges

#### `ToolCalls` (`chat/tool-calls.tsx`)
Displays tool execution details:
- Collapsible tool list
- Input parameters
- Tool results
- Special handling for agent handoffs

#### `ToolResultMessage` (`chat/tool-result-message.tsx`)
Collapsible tool result display:
- Minimized by default
- Expandable content
- Markdown rendering

#### `AgentHandoff` (`chat/agent-handoff.tsx`)
Visual display of agent-to-agent handoffs:
- Timeline view
- From/To badges
- Timestamps

### 4. **Utilities**

#### `chat-utils.ts` (`lib/chat-utils.ts`)
Shared functions and constants:
- `TOOL_DISPLAY_NAMES`: Tool name mappings
- `getToolDisplayName()`: Get friendly tool names
- `extractContent()`: Parse message content
- `STYLE_GUIDE_PROMPT`: AI style guidelines

## Benefits of Refactoring

### 1. **Maintainability**
- Each component has a single responsibility
- Easy to locate and update specific features
- Changes are isolated to relevant files

### 2. **Reusability**
- Components can be reused in other parts of the app
- Hooks can be shared across multiple components
- Utilities are centralized

### 3. **Testability**
- Small, focused components are easier to test
- Hooks can be tested independently
- Mock providers for unit tests

### 4. **Performance**
- Better code splitting opportunities
- Smaller component re-renders
- Memoization is easier to implement

### 5. **Developer Experience**
- Faster to understand each piece
- Easier to onboard new developers
- Better TypeScript intellisense

## Migration Guide

If you need to modify the old behavior:

1. **Find the feature**: Use the structure guide above
2. **Check the component**: Open the relevant component file
3. **Update as needed**: Modify only what's necessary
4. **Test thoroughly**: Ensure no regressions

## State Flow

```
┌─────────────────────────────────────┐
│     AgentChatProvider (Existing)     │
│   - messages, threads, currentAgent  │
└─────────────────┬───────────────────┘
                  │
                  │ wraps
                  ▼
┌─────────────────────────────────────┐
│      MessageStateProvider (New)      │
│   - UI state, scroll, expansions     │
└─────────────────┬───────────────────┘
                  │
                  │ wraps
                  ▼
┌─────────────────────────────────────┐
│        AgentChatInner (New)          │
│   - Orchestrates all sub-components  │
└─────────────────┬───────────────────┘
                  │
        ┌─────────┴──────────┐
        │                    │
        ▼                    ▼
┌──────────────┐    ┌──────────────────┐
│ EmptyChatView│    │  Full Chat View  │
│  (No msgs)   │    │  (With messages) │
└──────────────┘    └─────────┬────────┘
                              │
                    ┌─────────┴─────────┐
                    ▼                   ▼
            ┌──────────────┐    ┌──────────────┐
            │ MessagesList │    │  ChatInput   │
            └──────┬───────┘    └──────────────┘
                   │
        ┌──────────┴──────────┐
        ▼                     ▼
┌──────────────┐     ┌──────────────────┐
│MessageBubble │     │ToolResultMessage │
└──────┬───────┘     └──────────────────┘
       │
   ┌───┴────┐
   ▼        ▼
┌────────┐ ┌───────────────┐
│ToolCalls│ │MessageActions │
└─────────┘ └───────────────┘
```

## Common Tasks

### Adding a New Message Type
1. Update `ChatMessage` interface in `interfaces/agentChatInterfaces.ts`
2. Add rendering logic in `MessageBubble` or create new component
3. Update `MessagesList` to handle the new type

### Adding a New Tool Display
1. Update `TOOL_DISPLAY_NAMES` in `lib/chat-utils.ts`
2. Optionally customize rendering in `ToolCalls` component

### Adding New UI State
1. Add to `MessageStateProvider` if message-related
2. Add to local component state if component-specific
3. Add to `AgentChatProvider` if global/persistent

### Modifying Message Rendering
1. Open `components/chat/message-bubble.tsx`
2. Update the `ReactMarkdown` component props
3. Test with various message types

## Performance Considerations

### Current Optimizations
- Provider separation prevents unnecessary re-renders
- Refs used for DOM operations (scrolling)
- Custom hooks memoize expensive operations

### Future Improvements
- Implement React.memo for message components
- Add virtualization for long message lists
- Lazy load tool result details
- Debounce textarea auto-resize

## Troubleshooting

### Messages not scrolling
- Check `useMessageState` scroll functions
- Verify `messagesEndRef` is properly attached
- Ensure `shouldAutoScroll` is set correctly

### Tools not displaying
- Verify `TOOL_DISPLAY_NAMES` includes the tool
- Check `currentAgentInfo.tools` array
- Ensure `canShowToolsDropdown` is true

### Recording not working
- Check `useAudioRecording` hook
- Verify microphone permissions
- Test transcription API endpoint

## Best Practices

1. **Keep components focused**: One responsibility per component
2. **Use providers for shared state**: Avoid prop drilling
3. **Extract reusable logic**: Create custom hooks
4. **Type everything**: Leverage TypeScript
5. **Document complex logic**: Add comments for tricky parts
6. **Test incrementally**: Test each component independently

## File Organization

All refactored files are now in place:
- ✅ Main component: `components/agent-chat.tsx` (518 lines)
- ✅ Chat components: `components/chat/*.tsx` (7 files)
- ✅ Custom hooks: `hooks/use-*.ts` (2 files)
- ✅ Utilities: `lib/chat-utils.ts`
- ✅ Provider: `components/providers/message-state-provider.tsx`

## Questions?

For questions about specific components or architecture decisions, refer to:
- Component JSDoc comments
- This guide
- Git commit history for the refactoring

