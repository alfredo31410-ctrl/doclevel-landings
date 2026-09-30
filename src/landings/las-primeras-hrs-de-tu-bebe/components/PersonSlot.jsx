import doctorPapaPrimerizo from "../../../assets/papa-primerizo/doctor-papa-primerizo.png";

export function PersonSlot({
  imageSrc = doctorPapaPrimerizo,
  alt = "Doctor del curso",
}) {
  return (
    <div className="person-slot" aria-label={alt}>
      <img src={imageSrc} alt={alt} />
    </div>
  );
}
