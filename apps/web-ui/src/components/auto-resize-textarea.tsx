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

  useImperativeHandle(ref, () => internalRef.current as HTMLTextAreaElement);

  useEffect(() => {
    const textarea = internalRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [value]);

  const handleFocus = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    setTimeout(() => {
      e.target.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }, 300);

    if (props.onFocus) {
      props.onFocus(e);
    }
  };

  return (
    <textarea
      ref={internalRef}
      value={value}
      {...props}
      onFocus={handleFocus}
    />
  );
});

AutoResizeTextarea.displayName = "AutoResizeTextarea";
