import LoadingSpinner from "./LoadingSpinner";
import InlineError from "./InlineError";

interface ContentStateProps {
  isLoading: boolean;
  error?: string | null;
  onRetry?: () => void;
  children: React.ReactNode;
}

//componente para renderizar un loading, inline error o el componente hijo (no critico) dependiendo de los estados
const ContentState = ({ isLoading, error, onRetry, children }: ContentStateProps) => {
  if (isLoading) return <LoadingSpinner />;
  if (error) return <InlineError message={error} showRetry={!!onRetry} onRetry={onRetry} />;
  return <>{children}</>;
};

export default ContentState;