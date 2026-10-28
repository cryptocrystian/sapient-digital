import { VectorLockHero } from "@/components/vectorlock/VectorLockHero";
import { Worldview } from "@/components/vectorlock/Worldview";
import { Friction } from "@/components/vectorlock/Friction";
import { VectorLockMethod } from "@/components/vectorlock/VectorLockMethod";
import { Services } from "@/components/vectorlock/Services";
import { MissionControl } from "@/components/vectorlock/MissionControl";
import { Evidence } from "@/components/vectorlock/Evidence";
import { Close } from "@/components/vectorlock/Close";
import { PullQuote } from "@/components/vectorlock/PullQuote";
import { ScrollProgress } from "@/components/vectorlock/ScrollProgress";
import { ScrollReveal } from "@/components/vectorlock/ScrollReveal";

export const metadata = {
  title: "Vector Lock — Homepage Proof · Sapient Digital",
  description:
    "Full homepage proof: Vector Lock concept and Swiss technical editorial direction. Not public.",
  robots: { index: false, follow: false },
};

export default function VectorProofPage() {
  return (
    <main className="vl-proof">
      <ScrollProgress />
      <ScrollReveal />
      <VectorLockHero />
      <Worldview />
      <PullQuote>
        Attention is a declining asset.{" "}
        <span className="vl-pq-hi">Authority</span> is the only one that
        keeps gaining.
      </PullQuote>
      <Friction />
      <VectorLockMethod />
      <PullQuote>
        The method is the loop.{" "}
        <span className="vl-pq-hi-volt">The disciplines</span> are the craft.
      </PullQuote>
      <Services />
      <MissionControl />
      <Evidence />
      <Close />
    </main>
  );
}
