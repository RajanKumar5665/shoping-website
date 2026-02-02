import { useTheme } from "next-themes";
import { Toaster as Sonner } from "sonner";

const Toaster = ({ ...props }) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme}
      position="top-right"
      duration={3000}
      closeButton
      richColors
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast rounded-lg border border-border bg-background text-foreground shadow-lg",
          title: "font-semibold",
          description: "text-sm text-muted-foreground",
          actionButton:
            "bg-primary text-primary-foreground hover:bg-primary/90",
          cancelButton:
            "bg-muted text-muted-foreground hover:bg-muted/80",
          success:
            "border-green-500/20 bg-green-500/10 text-green-600",
          error:
            "border-red-500/20 bg-red-500/10 text-red-600",
          warning:
            "border-yellow-500/20 bg-yellow-500/10 text-yellow-600",
          info:
            "border-blue-500/20 bg-blue-500/10 text-blue-600",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
