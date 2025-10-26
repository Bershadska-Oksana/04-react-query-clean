interface Props {
  message: string;
}

const ErrorMessage = ({ message }: Props) => (
  <div className="error">{message}</div>
);

export default ErrorMessage;
