import { FIRM, getTeamEmail, getCopyright } from "./constants.js";

export const siteContent = {
    nav: [
      { label: "Home", target: "hero" },
      { label: "About", target: "about" },
      { label: "Practice Areas", target: "practice" },
      { label: "FAQ", target: "faq" },
      { label: "Contact", target: "contact" }
    ],
    hero: {
      title: FIRM.nameDisplay,
      titleSubtext: FIRM.nameSubtitle,
      subtitle: FIRM.tagline,
      cta: "Request a Consultation"
    },
    stats: [
      { number: "15+", label: "Years of Experience", icon: "⚖️" },
      { number: "500+", label: "Cases Handled", icon: "🏆" },
      { number: "100%", label: "Client Focused", icon: "⭐" },
      { number: "1-on-1", label: "Personal Attention", icon: "👥" }
    ],
    about: {
      heading: "About Our Practice",
      text: `${FIRM.name} is a general practice law firm founded and operated by Wael Amer, Esq., serving clients throughout the northern New Jersey area. The firm provides dedicated and client-focused legal representation across a range of practice areas.\n\nWe are committed to delivering quality legal services through thorough analysis, careful preparation, and a disciplined focus on our clients' unique objectives. Our practice is centered on personal injury matters, medical insurance disputes for healthcare providers, a spectrum of commercial law issues, and real estate transactions.\n\nAccessibility, clear communication, and professional conduct are the cornerstones of our practice. We ensure our clients are consistently informed and that their questions are addressed promptly, striving to exceed expectations at every stage of representation.`
    },
    whySolo: {
      heading: "Why Choose a Solo Practice?",
      text: `Unlike large firms where you may be passed between associates and paralegals, here you work directly with an experienced attorney on every aspect of your case. This means faster responses, clearer communication, and a deeper understanding of your unique situation. With a solo practice, you get the individual attention and expertise your case deserves, ensuring that your attorney understands every detail from start to finish.`
    },
    practiceAreas: [
      { 
        title: "Personal Injury", 
        desc: "Comprehensive representation for injury claims. Thorough analysis and careful preparation to protect your rights and pursue fair compensation.",
        detailed: "Personal injury law encompasses claims arising from accidents, negligence, or intentional harm that result in physical or emotional injury. When you suffer harm due to another party's actions or failure to act, you may be entitled to compensation for medical expenses, lost wages, pain and suffering, and other damages. These cases require careful evaluation of the circumstances, documentation of injuries, and understanding of applicable legal standards. Whether your injury resulted from a motor vehicle accident, workplace incident, premises liability, or other circumstances, thorough preparation and strategic advocacy are essential to protect your rights and pursue fair compensation for your losses.",
        image: "/cards/PersonalInjury_stock.png"
      },
      { 
        title: "Medical Insurance Disputes", 
        desc: "Advocating for healthcare providers in medical insurance disputes. Experienced in complex insurance matters and provider representation.",
        detailed: "Healthcare providers face significant administrative and financial challenges when insurance reimbursement is incorrectly denied, delayed, or reduced. These disputes demand a sophisticated understanding of complex policy provisions, medical coding, and the regulatory frameworks governing payment.\n\nOur practice is dedicated to representing New Jersey medical professionals and facilities in resolving these critical matters. We possess specific expertise in the arbitration and appeal processes that determine fair reimbursement, including disputes arising under the No Surprises Act (NSA) and Out-of-Network (OON) payment disagreements. We guide clients through qualifying payment amount (QPA) challenges, independent dispute resolution (IDR), and related proceedings to enforce your rights. Our representation is built on a meticulous analysis of contracts, patient records, and applicable state and federal law, with the focused goal of securing the complete compensation your practice is entitled to receive.",
        image: "/cards/InsuranceDispute_stock.png"
      },
      { 
        title: "Commercial Law", 
        desc: "Handling general and complex commercial law matters. Strategic guidance for businesses with attention to your unique goals and concerns.",
        detailed: "Commercial law encompasses a broad range of legal matters affecting businesses, including contract negotiations, business formation, corporate governance, commercial transactions, and dispute resolution. Whether you are starting a new business, entering into commercial agreements, or facing business disputes, understanding your legal rights and obligations is crucial. Commercial law matters can involve contract drafting and review, partnership agreements, employment issues, regulatory compliance, and litigation. Each business situation requires careful analysis of the specific circumstances, applicable laws, and strategic considerations to protect your interests and achieve your business objectives.",
        image: "/cards/Corporate_stock.png"
      },
      { 
        title: "Real Estate", 
        desc: "Expert legal support for real estate transactions and related issues. Protecting your interests in property purchases, sales, and disputes.",
        detailed: "Real estate law covers transactions involving property, including purchases, sales, leases, development, and disputes. Whether you are buying or selling property, entering into lease agreements, dealing with zoning issues, or facing property disputes, legal guidance can help protect your interests throughout the process. Real estate transactions involve complex documentation, title issues, financing arrangements, and regulatory requirements. Common matters include purchase and sale agreements, lease negotiations, property development, easements, boundary disputes, and landlord-tenant issues. Careful review of documents, understanding of local regulations, and strategic negotiation are essential to ensure your real estate transactions proceed smoothly and your interests are protected.",
        image: "/cards/RealEstate_stock.png"
      }
    ],
    team: [
      {
        name: "Wael Amer, ESQ",
        role: "Attorney & Founder",
        title: "Your Direct Legal Counsel",
        bio: `Wael Amer, Esq. is the founder and principal attorney of ${FIRM.name}. A New Jersey resident since his childhood, he is dedicated to providing strategic legal counsel to clients throughout the northern New Jersey area.\n\nMr. Amer is admitted to practice law in the State of New Jersey and before the United States District Court for the District of New Jersey. He earned his Juris Doctor, cum laude, from Seton Hall University School of Law, where he distinguished himself as a Comments Editor for the Seton Hall Legislative Journal and as a Semifinalist in national and internal moot court competitions. He holds a Bachelor of Science in Finance from The College of New Jersey, where he graduated on the Dean's List.\n\nBefore founding his own practice, Mr. Amer refined his skills as an Associate at Day Pitney, LLP, one of the preeminent law firms in the region. There, he gained valuable experience handling complex litigation and commercial matters, including product liability, employment law, and other commercial disputes. His background also includes roles in financial services, providing him with a unique perspective on the business and financial implications of legal issues.\n\nMr. Amer established ${FIRM.name} to offer clients the high-caliber legal representation of a large firm, combined with the direct attention, personalized strategy, and responsiveness of a dedicated practitioner. He focuses his practice on personal injury, medical insurance disputes for healthcare providers, commercial law, and real estate matters.`,
        email: FIRM.contact.email
      }
    ],
    faq: [
      {
        question: "What areas of law do you specialize in?",
        answer: "I specialize in Personal Injury, Medical Insurance Disputes, Real Estate, and Commercial Law. With extensive experience in these areas, I focus on providing the best possible representation for my clients."
      },
      {
        question: "How much do your services cost?",
        answer: "My fees vary depending on the complexity of your case and the type of legal service needed. I offer both hourly rates and flat-fee arrangements. During your consultation, I'll provide a clear, upfront estimate of costs with no surprises."
      },
      {
        question: "Will I work directly with you?",
        answer: "Yes, absolutely. As a solo practitioner, you'll work directly with me on your case. You won't be passed to associates or paralegals - you'll have my direct attention and expertise throughout your matter."
      },
      {
        question: "How long does a typical case take?",
        answer: "Every legal case has its own unique timeline. Straightforward matters may be resolved in weeks, but more complex situations involving litigation, discovery, or arbitration often require a commitment of many months. In some instances, particularly with highly contested or intricate disputes, the process can extend beyond a year. I will review the details of your specific circumstances during our consultation to provide an honest assessment of the expected timeframe."
      },
      {
        question: "What should I bring to my first consultation?",
        answer: "Please bring any relevant documents related to your case, such as contracts, court papers, correspondence, and identification. If you're unsure what to bring, I'll guide you when we schedule your appointment."
      }
    ],
    social: FIRM.social,
    contact: FIRM.contact,
    legalDocs: [
      {
        id: "privacy",
        title: "Privacy Policy",
        description: "Learn how we collect, use, and protect your personal information.",
        pdfUrl: "/assets/documents/privacy-policy.pdf"
      },
      {
        id: "terms",
        title: "Terms of Service",
        description: "Review the terms and conditions for using our website and services.",
        pdfUrl: "/assets/documents/terms-of-service.pdf"
      },
      {
        id: "disclaimer",
        title: "Disclaimer",
        description: "Important legal disclaimers regarding our services and website content.",
        pdfUrl: "/assets/documents/disclaimer.pdf"
      }
    ],
    footer: {
      copyright: getCopyright(),
      links: [
        { label: "Privacy Policy", href: "/privacy-policy/" },
        { label: "Terms of Service", href: "/terms-of-service/" },
        { label: "Disclaimer", href: "/disclaimer/" }
      ]
    }
  };
  