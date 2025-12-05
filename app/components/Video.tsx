export default function Video({
  src,
  className,
}: {
  src: string;
  className: string;
}) {
  return (
    <video autoPlay muted loop playsInline className={className}>
      <source src={src} type="video/mp4" />
    </video>
  );
}
