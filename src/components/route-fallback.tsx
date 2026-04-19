type RouteFallbackProps = {
  fullPage?: boolean;
};

export default function RouteFallback({
  fullPage = false,
}: RouteFallbackProps) {
  return (
    <div className={fullPage ? "global-suspense" : "route-suspense"}>
      <div className="global-suspense__spinner" />
      <p>Carregando...</p>
    </div>
  );
}
