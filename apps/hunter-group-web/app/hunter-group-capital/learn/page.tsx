import styles from "../info.module.css";

const topics = [
  ["Offering", "The fund or security being considered. It is not the same thing as a building."],
  ["Manager", "The organization responsible for investment or asset management, as disclosed in current materials."],
  ["Property", "An underlying real estate asset. One offering can hold many properties and one manager can manage several offerings."],
  ["Target return", "A management objective based on assumptions. It is not promised, guaranteed, or equivalent to historical performance."],
  ["Distribution", "Cash paid to investors when declared. Frequency and amount may change and do not represent total return by themselves."],
  ["Liquidity", "The ability to sell or redeem. Private securities may have hold periods, redemption limits, or no secondary market."],
];

export default function LearnPage() { return <main className={styles.page}><header><p>Investor learning centre</p><h1>Understand the structure before comparing the numbers.</h1><span>Plain-language explanations for Canadian private real estate research.</span></header><section className={styles.topicGrid}>{topics.map(([title,text]) => <article key={title}><span>Definition</span><h2>{title}</h2><p>{text}</p></article>)}</section><section className={styles.legalPanel}><h2>Preliminary investor categories</h2><div><article><h3>Accredited investor</h3><p>May qualify through specific income, financial-asset, net-asset, or other tests under NI 45-106. The applicable dealer and issuer must substantiate the exemption.</p></article><article><h3>Eligible investor</h3><p>May meet lower income or net-asset tests under the offering-memorandum exemption, with aggregate investment limits and suitability requirements.</p></article><article><h3>Non-eligible investor</h3><p>May have limited access under the Ontario offering-memorandum exemption and is generally subject to a lower preceding-12-month aggregate limit.</p></article><article><h3>Turkey / cross-border</h3><p>Canadian and Turkish requirements, product permissions, tax residence, AML, source of funds, and transfer rules require manual review.</p></article></div><p>This educational content is not a determination of eligibility or legal advice. Rules and offering availability can change.</p></section></main>; }
