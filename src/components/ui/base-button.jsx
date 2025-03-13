export function BaseButton({ type = "submit", onCLick = () => null, children }) {
    return (
      <button onClick={onCLick} type={type}>
        {children}
      </button>
    );
}
