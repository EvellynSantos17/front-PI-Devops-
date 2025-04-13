export function Button({
  type = "submit",
  onCLick = () => null,
  children,
  rounded,
  disable = false
}) {
  return (
    <button
      className={`${rounded} bg-laranjaProdunfo hover:bg-opacity-80 p-2  w-full ${disable ? 'bg-opacity-35': null}`}
      disabled={disable}
      onClick={onCLick}
      type={type}
    >
      {children}
    </button>
  );
}
