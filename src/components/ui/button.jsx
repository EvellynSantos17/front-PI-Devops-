export function Button({ type = "submit", onCLick = () => null, children, rounded }) {
   return (
    <button className={`${rounded} p-2 bg-laranjaProdunfo w-full`} onClick={onCLick} type={type}>
      {children}
    </button>
  );

}
