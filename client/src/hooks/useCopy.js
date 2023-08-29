import { useToast } from "../components/ui/use-toast";

function useCopy() {
  const { toast } = useToast();
  const CopyAndAlert = ({ content, title, description }) => {
    navigator.clipboard.writeText(content);
    toast({
      title: title || `Copied ${ content } to clipboard.`,
      description: description || 'Copied color to clipboard.',
      variant: 'success'
    })
  }
  return { CopyAndAlert }
}

export { useCopy };

