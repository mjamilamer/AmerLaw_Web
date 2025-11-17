import { FIRM, getTeamEmail, getCopyright } from "./constants.js";

export const siteContent = {
    nav: [
      { label: "Home", target: "hero" },
      { label: "About", target: "about" },
      { label: "Practice Areas", target: "practice" },
      { label: "Testimonials", target: "testimonials" },
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
      text: `${FIRM.name} is a solo practice founded by attorney Wael Amer, offering dedicated and client-focused legal representation throughout ${FIRM.location.state}. After several years at a major law firm, where he worked on complex and multimillion-dollar matters, Mr. Amer established ${FIRM.name} to provide clients with a more direct, personalized experience.\n\nThe firm focuses on personal injury matters, medical insurance disputes on behalf of healthcare providers, general and complex commercial law matters, and real estate transactions and related issues. Each case is approached with thorough analysis, careful preparation, and attention to the unique goals and concerns of the client.\n\nAt ${FIRM.name}, clients work directly with their attorney from start to finish. The firm prioritizes clear communication, practical guidance, and accessible legal support. Whether navigating an injury claim, resolving insurance disputes, or handling real estate matters, the goal is to ensure clients understand their options and feel confident in their decisions.\n\n${FIRM.name} is committed to professionalism, transparency, and ethical advocacy. All representation is conducted in accordance with the ${FIRM.location.state} Rules of Professional Conduct, with a firm emphasis on integrity, respect, and client trust.`
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
        detailed: "Medical insurance disputes involve conflicts between healthcare providers and insurance companies regarding coverage, reimbursement, claim denials, and payment disputes. These matters often require navigating complex insurance policies, understanding medical billing codes, and addressing issues related to claim processing, coverage determinations, and payment delays. Healthcare providers may face challenges when insurance companies deny claims, reduce payments, or delay reimbursements for services rendered. Effective representation in these disputes involves careful review of insurance contracts, medical documentation, and applicable regulations to ensure providers receive proper compensation for the care they provide to patients.",
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
        bio: `Wael Amer is the founder and managing attorney of ${FIRM.name}, a solo practice built on the principle that clients deserve direct access to their lawyer and clear, practical guidance throughout their legal matter. Before opening his own firm, Mr. Amer spent several years at a major law firm, where he worked on complex and multimillion-dollar cases involving a broad range of issues.\n\nHis experience includes representing clients in personal injury matters, assisting healthcare providers in medical insurance disputes, handling and leading general and complex commercial law matters and handling various real estate transactions and related legal issues. Throughout his career, Mr. Amer has developed a disciplined, detail-oriented approach to advocacy, grounded in careful preparation and a commitment to client communication.\n\nAs a solo practitioner, Mr. Amer manages every aspect of each case himself. This structure ensures that clients receive consistent attention, straightforward explanations of their options, and legal strategy tailored to their goals and circumstances. He believes that informed clients make better decisions, and he works to provide the clarity needed to navigate the legal process with confidence.\n\nMr. Amer is dedicated to practicing law with professionalism, integrity, and respect. All representation is carried out in accordance with the ${FIRM.location.state} Rules of Professional Conduct, with a strong focus on ethical advocacy and client trust.`,
        email: FIRM.contact.email
      }
    ],
    testimonials: [
      {
        name: "Robert Martinez",
        role: "Business Owner",
        text: `Wael helped me navigate a complex business contract negotiation. His expertise and attention to detail were exceptional. Working directly with him made all the difference - he was always available to answer my questions. Highly recommend!`,
        rating: 5
      },
      {
        name: "Jennifer Williams",
        role: "Divorce Client",
        text: "During one of the most difficult times in my life, Wael provided compassionate and professional guidance. I appreciated being able to work directly with him rather than being passed to different attorneys. I couldn't have asked for better representation.",
        rating: 5
      },
      {
        name: "Michael Brown",
        role: "Real Estate Client",
        text: "Wael handled my property purchase with professionalism and efficiency. What I loved most was being able to call him directly with questions - no middlemen, no delays. He made the process smooth and stress-free.",
        rating: 5
      },
      {
        name: "Sarah Johnson",
        role: "Business Formation Client",
        text: "Wael helped me set up my LLC and draft all the necessary contracts. His approach was clear, thorough, and personalized to my specific needs. Having direct access to the attorney handling my case was invaluable.",
        rating: 5
      }
    ],
    faq: [
      {
        question: "Do you offer free consultations?",
        answer: "Yes, I offer a free 30-minute initial consultation to discuss your legal needs and determine how I can help you. This gives us both a chance to see if we're a good fit."
      },
      {
        question: "What areas of law do you specialize in?",
        answer: "I specialize in Family Law, Business Law, and Real Estate. With over 15 years of experience, I focus on these areas to provide the best possible representation for my clients."
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
        answer: "Case duration varies significantly based on the type of matter. Simple transactions may take weeks, while complex litigation can take months. During your consultation, I'll provide a realistic timeline estimate based on your specific situation."
      },
      {
        question: "What should I bring to my first consultation?",
        answer: "Please bring any relevant documents related to your case, such as contracts, court papers, correspondence, and identification. If you're unsure what to bring, I'll guide you when we schedule your appointment."
      }
    ],
    awards: [
      { title: "Licensed Attorney", organization: "New Jersey State Bar", year: "Active" },
      { title: "Member", organization: "American Bar Association", year: "Active" }
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
        id: "accessibility",
        title: "Accessibility Statement",
        description: "Our commitment to making our website accessible to all users.",
        pdfUrl: "/assets/documents/accessibility-statement.pdf"
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
        { label: "Accessibility Statement", href: "/accessibility-statement/" },
        { label: "Disclaimer", href: "/disclaimer/" }
      ]
    }
  };
  