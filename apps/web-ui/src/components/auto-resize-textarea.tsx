import {
  useEffect,
  useRef,
  TextareaHTMLAttributes,
  forwardRef,
  useImperativeHandle,
} from "react";

export const AutoResizeTextarea = forwardRef<
  HTMLTextAreaElement,
  TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ value, ...props }, ref) => {
  const internalRef = useRef<HTMLTextAreaElement>(null);

  // Forward the internal ref to the parent
  useImperativeHandle(ref, () => internalRef.current as HTMLTextAreaElement);

  // Auto-resize logic based on value or internal state
  useEffect(() => {
    const textarea = internalRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [value]);

  return <textarea ref={internalRef} value={value} {...props} />;
});

AutoResizeTextarea.displayName = "AutoResizeTextarea";
