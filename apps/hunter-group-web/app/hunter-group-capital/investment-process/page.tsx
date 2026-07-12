import Link from "next/link";
import styles from "../info.module.css";

const steps = [
  ["Choose an offering", "Compare managers, real assets, terms, targets, documents, and risks without creating an account."],
  ["Review strategy and properties", "Move from the fund-level thesis to verified examples of the buildings and markets underneath it."],
  ["Compare share classes", "Understand minimums, account eligibility, distributions, liquidity, and the source date for every material term."],
  ["Complete investor readiness", "Answer a short Ontario or Turkey path. The result is preliminary and never an approval."],
  ["Speak with Hunter Group Capital", "Discuss objectives, questions, language preference, and the next licensed step."],
  ["Complete licensed review", "The supervising process verifies identity, exemption eligibility, KYC, KYP, conflicts, and suitability."],
  ["Review official documents", "Read the controlling offering documents, risk acknowledgements, and independent advice."],
  ["Subscribe through the approved process", "Only after review, execute documents and fund through the applicable dealer or issuer workflow."],
];

export default function ProcessPage() { return <main className={styles.page}><header><p>Investment process</p><h1>Clear steps. No hidden leap from research to investing.</h1><span>Public research is open. Personal eligibility, suitability, signatures, and funding remain within the licensed process.</span></header><ol className={styles.timeline}>{steps.map(([title,text],i) => <li key={title}><b>{String(i+1).padStart(2,"0")}</b><div><h2>{title}</h2><p>{text}</p></div><span>{i < 3 ? "Research" : i < 5 ? "Readiness" : "Licensed review"}</span></li>)}</ol><div className={styles.cta}><div><h2>Begin with the opportunity, not the paperwork.</h2><p>Choose the fund you want to understand. Your selection will carry into the readiness profile.</p></div><Link href="/hunter-group-capital/offerings">Explore offerings</Link></div></main>; }
