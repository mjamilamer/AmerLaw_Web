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
      title: FIRM.nameFull,
      subtitle: FIRM.tagline,
      cta: "Free Consultation"
    },
    stats: [
      { number: "15+", label: "Years of Experience", icon: "⚖️" },
      { number: "500+", label: "Cases Handled", icon: "🏆" },
      { number: "100%", label: "Client Focused", icon: "⭐" },
      { number: "1-on-1", label: "Personal Attention", icon: "👥" }
    ],
    about: {
      heading: "About Our Practice",
      text: `${FIRM.name} is a solo practice law firm dedicated to providing personalized, client-focused legal representation. Founded with the belief that every client deserves direct access to their attorney, our practice offers a different approach to legal services. Our practice specializes in family law, business law, and real estate matters, bringing over 15 years of combined experience to serve clients throughout New Jersey. We pride ourselves on clear communication, practical solutions, and results that matter to you.`
    },
    whySolo: {
      heading: "Why Choose a Solo Practice?",
      text: `Unlike large firms where you may be passed between associates and paralegals, here you work directly with an experienced attorney on every aspect of your case. This means faster responses, clearer communication, and a deeper understanding of your unique situation. With a solo practice, you get the individual attention and expertise your case deserves, ensuring that your attorney understands every detail from start to finish.`
    },
    practiceAreas: [
      { title: "Family Law", desc: "Compassionate guidance through divorce, custody, and family disputes. Direct representation with personalized attention to your family's needs." },
      { title: "Business Law", desc: "Business formation, contracts, and legal counsel for small businesses and entrepreneurs. Practical solutions tailored to your business." },
      { title: "Real Estate", desc: "Expert legal support for property transactions, purchases, sales, and real estate disputes. Protecting your property interests." }
    ],
    team: [
      {
        name: "Wael Amer, ESQ",
        role: "Attorney & Founder",
        title: "Your Direct Legal Counsel",
        bio: `Wael Amer brings over 15 years of hands-on experience in family law, business matters, and real estate. As the sole attorney at ${FIRM.name}, he personally handles every case, ensuring you receive dedicated attention from start to finish. Wael is committed to clear communication, practical solutions, and results that matter to you.`,
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
  