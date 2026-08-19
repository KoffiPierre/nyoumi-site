interface FolioProps {
  index?: string;
  label: string;
}

export default function Folio({ index, label }: FolioProps) {
  return (
    <span className="folio">
      {index && <span className="folio-num">§ {index} — </span>}
      {label}
    </span>
  );
}
