/**
 * Slow drifting light behind every page; it is what the glass panels show through. Soft radial
 * gradients moved with transform only, so it costs almost nothing to animate.
 */
export function AuroraBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute -top-[25vmax] -left-[20vmax] size-[70vmax] animate-aurora-a rounded-full bg-[radial-gradient(closest-side,var(--color-accent),transparent)] opacity-20 motion-reduce:animate-none" />
      <div className="absolute top-[20vh] -right-[30vmax] size-[75vmax] animate-aurora-b rounded-full bg-[radial-gradient(closest-side,var(--color-accent-deep),transparent)] opacity-25 motion-reduce:animate-none" />
      <div className="absolute -bottom-[35vmax] left-[5vw] size-[65vmax] animate-aurora-c rounded-full bg-[radial-gradient(closest-side,var(--color-silver),transparent)] opacity-[0.07] motion-reduce:animate-none" />
      {/* Darkens the middle so text always reads well over the light. */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgb(5_7_10/0.55),transparent_75%)]" />
    </div>
  );
}
