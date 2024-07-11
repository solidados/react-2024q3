import { FC } from 'react';

interface ErrorComponentProps {
  error: Error | null;
  onReload: () => void;
}

const ErrorComponent: FC<ErrorComponentProps> = ({ error, onReload }) => {
  return (
    <div className="error-page">
      <h1>Something went wrong.</h1>
      {error && <p>{error.message}</p>}
      <button onClick={onReload}>Reload</button>
    </div>
  );
};

export default ErrorComponent;
