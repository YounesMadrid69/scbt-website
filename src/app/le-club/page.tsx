import ClubHero from "@/components/club/ClubHero";
import Timeline from "@/components/club/Timeline";
import Values from "@/components/club/Values";
import Staff from "@/components/club/Staff";
import Infrastructure from "@/components/club/Infrastructure";
import Labels from "@/components/club/Labels";

export const metadata = {
  title: "Le Club | SCBT - Sporting Club Bron Terraillon",
  description:
    "Découvrez l'histoire du Sporting Club Bron Terraillon, fondé en 1964. Club formateur de Karim Benzema, 450+ licenciés, Label FFF Argent.",
};

export default function LeClubPage() {
  return (
    <>
      <ClubHero />
      <Timeline />
      <Values />
      <Staff />
      <Infrastructure />
      <Labels />
    </>
  );
}
