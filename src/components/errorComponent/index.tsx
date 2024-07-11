import { FC } from 'react';
import './style.scss';

interface CustomError extends Error {
  code: number;
}

interface ErrorComponentProps {
  error: CustomError | null;
  onReload: () => void;
}

const ErrorComponent: FC<ErrorComponentProps> = ({ error, onReload }) => {
  return (
    <div className="error-page">
      <h1>Something went wrong.</h1>
      <h2>{error?.code}</h2>
      {error && <p>{error.message}</p>}
      <button onClick={onReload}>Reload</button>
    </div>
  );
};

export default ErrorComponent;
