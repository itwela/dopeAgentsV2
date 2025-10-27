"use client"

import * as React from "react"
import { Button } from "./ui/button"
import { Textarea } from "./ui/textarea"
import { Badge } from "./ui/badge"
import { Label } from "./ui/label"
import { Plus, Check, X, Mic, MicOff, Loader2, Send, ArrowUp, ArrowDown } from "lucide-react"
import { TextAnimate } from "./ui/text-animate"

type AgentInfo = {
  tools: string[]
} | null

export interface ChatInputProps {
  input: string
  isLoading: boolean
  isTranscribing: boolean
  isRecording: boolean
  canShowToolsDropdown: boolean
  isToolsOpen: boolean
  setIsToolsOpen: (open: boolean) => void
  selectedTools: string[]
  currentAgentInfo: AgentInfo | undefined
  getToolDisplayName: (tool: string) => string
  onInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  onKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void
  onSend: () => void
  onStartRecording: () => void
  onStopRecording: () => void
  onCancelRecording: () => void
  onSelectTool: (tool: string) => void
  onRemoveSelectedTool: (tool: string) => void
  onScrollToTop?: () => void
  onScrollToBottom?: () => void
  toolsContainerRef: React.RefObject<HTMLDivElement | null>
  textareaRef: React.RefObject<HTMLTextAreaElement | null>
  placeholder: string
}

export function ChatInput(props: ChatInputProps) {
  const {
    input,
    isLoading,
    isTranscribing,
    isRecording,
    canShowToolsDropdown,
    isToolsOpen,
    setIsToolsOpen,
    selectedTools,
    currentAgentInfo,
    getToolDisplayName,
    onInputChange,
    onKeyDown,
    onSend,
    onStartRecording,
    onStopRecording,
    onCancelRecording,
    onSelectTool,
    onRemoveSelectedTool,
    onScrollToTop,
    onScrollToBottom,
    toolsContainerRef,
    textareaRef,
    placeholder,
  } = props

  const autoResizeTextarea = (el: HTMLTextAreaElement | null) => {
    if (!el) return
    el.style.height = "auto"
    el.style.height = `${Math.min(el.scrollHeight, 200)}px`
  }

  const hasCurrentAgentTools = !!currentAgentInfo?.tools?.length

  return (
    <div className="p-4 bg-transparent max-w-3xl w-[75%] bottom-0 fixed relative place-self-center">
      {isToolsOpen && hasCurrentAgentTools ? (
        <div ref={toolsContainerRef} className="mb-3 rounded-xl glass-card p-2 shadow-lg" onClick={(e) => e.stopPropagation()}>
          <div className="flex items-center justify-between px-2 py-1">
            <div className="text-xs text-muted-foreground">Tools</div>
            <Button
              variant="ghost"
              size="sm"
              className="h-6 px-2 text-xs"
              onClick={() => setIsToolsOpen(false)}
              disabled={isLoading}
            >
              Hide
            </Button>
          </div>
          <div className="mt-1 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-1">
            {currentAgentInfo!.tools.map((tool) => (
              <Button
                key={tool}
                variant={selectedTools.includes(tool) ? "default" : "outline"}
                size="sm"
                className="justify-start text-xs h-8"
                onClick={() => onSelectTool(tool)}
                disabled={isLoading}
                title={tool}
              >
                {getToolDisplayName(tool)}
                {selectedTools.includes(tool) && <Check className="h-3 w-3 ml-1" />}
              </Button>
            ))}
          </div>
        </div>
      ) : null}

      <div className="relative glass-input rounded-xl hover:border-ring transition-all duration-300 focus-within:border-ring focus-within:ring-2 focus-within:ring-ring/50 mb-3">
        <div className="flex items-end p-3 gap-2">
          <Textarea
            ref={textareaRef}
            placeholder={placeholder || "Type your message..."}
            value={input}
            onChange={(e) => {
              onInputChange(e)
              requestAnimationFrame(() => autoResizeTextarea(e.currentTarget))
            }}
            onPaste={(e) => {
              requestAnimationFrame(() => autoResizeTextarea(e.currentTarget))
            }}
            onInput={(e: any) => autoResizeTextarea(e.currentTarget)}
            onKeyDown={onKeyDown}
            disabled={isLoading}
            className="flex-1 min-h-[24px] max-h-[200px] resize-none border-0 bg-transparent p-0 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-0"
            rows={1}
          />
        </div>

        <div className="flex p-2 items-center w-full justify-between gap-2">
          <div className="py-3 flex items-center gap-2">
            {!isToolsOpen && (
              <Button
                variant="outline"
                size="sm"
                className="h-7 w-7 p-0 rounded-full hover:text-primary"
                onClick={(e) => {
                  e.stopPropagation()
                  setIsToolsOpen(true)
                }}
                disabled={!canShowToolsDropdown}
                title="Show tools"
              >
                <Plus className="h-3 w-3" />
              </Button>
            )}

            {onScrollToTop && (
              <Button
                variant="outline"
                size="sm"
                className="h-7 w-7 p-0 rounded-full hover:text-primary"
                onClick={onScrollToTop}
                title="Scroll to top"
              >
                <ArrowUp className="h-3 w-3" />
              </Button>
            )}

            {onScrollToBottom && (
              <Button
                variant="outline"
                size="sm"
                className="h-7 w-7 p-0 rounded-full hover:text-primary"
                onClick={onScrollToBottom}
                title="Scroll to bottom"
              >
                <ArrowDown className="h-3 w-3" />
              </Button>
            )}

            {selectedTools.length > 0 && (
              <div className="flex flex-wrap gap-1">
                <Badge
                  variant="secondary"
                  className="text-xs px-2 py-1 cursor-pointer hover:bg-destructive hover:text-destructive-foreground transition-colors"
                  onClick={() => onRemoveSelectedTool(selectedTools[0])}
                  title={`Remove ${getToolDisplayName(selectedTools[0])}`}
                >
                  {getToolDisplayName(selectedTools[0])}
                  <X className="h-3 w-3 ml-1" />
                </Badge>
              </div>
            )}
          </div>

          <div className="flex gap-2">
            <Button
              onClick={isRecording ? onStopRecording : onStartRecording}
              disabled={isLoading || isTranscribing}
              size="sm"
              variant={isRecording ? "destructive" : "outline"}
              className="h-8 w-8 p-0 shrink-0 hover:text-primary"
            >
              {isRecording ? (
                <MicOff className="h-3 w-3" />
              ) : (
                <Mic className="h-3 w-3" />
              )}
            </Button>

            <Button
              onClick={() => onSend()}
              disabled={!input.trim() || isLoading}
              size="sm"
              className="h-8 w-8 p-0 shrink-0"
            >
              {isLoading ? (
                <Loader2 className="h-3 w-3 animate-spin" />
              ) : (
                <Send className="h-3 w-3" />
              )}
            </Button>
          </div>
        </div>

        {(isRecording || isTranscribing) && (
          <div className="absolute inset-0 bg-background/95 backdrop-blur-sm rounded-lg border border-border animate-in slide-in-from-bottom-2 duration-200">
            <div className="h-full flex items-center justify-between px-4">
              <div className="flex items-center gap-3">
                {isRecording ? (
                  <div className="relative">
                    <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center animate-pulse">
                      <Mic className="h-4 w-4 text-white" />
                    </div>
                    <div className="absolute inset-0 w-8 h-8 bg-red-500/30 rounded-full animate-ping"></div>
                  </div>
                ) : (
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                    <Loader2 className="h-4 w-4 text-primary-foreground animate-spin" />
                  </div>
                )}

                <div>
                  <p className="text-sm font-medium">
                    {isRecording ? 'Recording...' : 'Transcribing...'}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {isRecording
                      ? 'Speak clearly'
                      : 'Converting to text...'
                    }
                  </p>
                </div>
              </div>

              {isRecording && (
                <div className="flex gap-2">
                  <Button
                    onClick={onCancelRecording}
                    variant="outline"
                    size="sm"
                    className="h-7 px-3 text-xs"
                  >
                    <X className="h-3 w-3 mr-1" />
                    Cancel
                  </Button>
                  <Button
                    onClick={onStopRecording}
                    size="sm"
                    className="h-7 px-3 text-xs"
                  >
                    <Check className="h-3 w-3 mr-1" />
                    Done
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <TextAnimate animation="fadeIn" by="word" duration={0.8} delay={0.2}>
        <p className="text-xs text-muted-foreground">
          Press Enter to send, Shift+Enter for new line.
        </p>
      </TextAnimate>
    </div>
  )
}


