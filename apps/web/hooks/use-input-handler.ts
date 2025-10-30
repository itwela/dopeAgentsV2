import { useState, useRef } from 'react';

export function useInputHandler() {
  const [input, setInput] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const autoResizeTextarea = (el?: HTMLTextAreaElement) => {
    const textarea = el ?? textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      const scrollHeight = textarea.scrollHeight;
      const maxHeight = 200; // Maximum height in pixels
      textarea.style.height = Math.min(scrollHeight, maxHeight) + 'px';
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    autoResizeTextarea(e.currentTarget);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>, onSend: () => void) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSend();
    } else if (e.key === 'Enter' && e.shiftKey) {
      // Allow new line, then auto-resize
      setTimeout(autoResizeTextarea, 0);
    }
  };

  const clearInput = () => {
    setInput("");
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const appendToInput = (text: string) => {
    setInput(prevInput => prevInput + (prevInput ? ' ' : '') + text);
    if (textareaRef.current) {
      textareaRef.current.focus();
      autoResizeTextarea();
    }
  };

  return {
    input,
    setInput,
    textareaRef,
    handleInputChange,
    handleKeyPress,
    clearInput,
    appendToInput,
    autoResizeTextarea,
  };
}

