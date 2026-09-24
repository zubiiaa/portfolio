import { AlertTriangle, RotateCcw } from "lucide-react";
import { Component, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <main className="min-h-screen flex flex-col items-center justify-center gap-6 bg-[#10151e] p-8 text-[#eef4f0]">
          <AlertTriangle size={48} className="text-[#ff846f]" />
          <h1 className="text-xl">An unexpected error occurred.</h1>
          <pre className="max-w-2xl overflow-auto whitespace-pre-wrap rounded bg-black/20 p-4 text-sm text-[#9aa9a4]">
            {this.state.error?.stack}
          </pre>
          <button
            onClick={() => window.location.reload()}
            className="flex items-center gap-2 rounded border border-[#a4f5bf] px-4 py-2 text-sm text-[#a4f5bf] hover:bg-[#a4f5bf] hover:text-[#10151e]"
          >
            <RotateCcw size={16} />
            Reload page
          </button>
        </main>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
