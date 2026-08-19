interface DimensionDividerProps {
  label: string;
}

export default function DimensionDivider({ label }: DimensionDividerProps) {
  return (
    <div className="wrap">
      <div className="dim">
        <div className="dim-line" />
        <span className="dim-label">{label}</span>
        <div className="dim-line" />
      </div>
    </div>
  );
}
