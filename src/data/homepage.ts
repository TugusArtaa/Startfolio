import {
  Target,
  Palette,
  FileText,
  Download,
  Zap,
  Shield,
  Smartphone,
  Clock,
  Users,
  Mail,
  Phone,
  MapPin,
  MessageCircle,
} from "lucide-react";

export const features = [
  {
    icon: Target,
    title: "ATS-Friendly Templates",
    description:
      "Our templates are optimized for Applicant Tracking Systems, ensuring your CV gets past automated screening and into human hands.",
    gradient: "from-teal-100 to-teal-200",
    iconColor: "text-teal-600",
  },
  {
    icon: Palette,
    title: "Creative Designs",
    description:
      "Stand out with our collection of creative CV templates perfect for design, marketing, and creative industries.",
    gradient: "from-teal-100 to-teal-200",
    iconColor: "text-teal-600",
  },
  {
    icon: FileText,
    title: "Easy to Use",
    description:
      "A simple interface with a live preview. No design experience is required to create a professional CV.",
    gradient: "from-teal-100 to-teal-200",
    iconColor: "text-teal-600",
  },
];

export const howItWorks = [
  {
    step: 1,
    title: "Choose & Fill",
    description:
      "Select your preferred template and fill in your information using our intuitive form builder.",
    iconBg: "bg-teal-300",
  },
  {
    step: 2,
    title: "Preview & Edit",
    description:
      "See your CV in real-time and make adjustments until it looks perfect for your industry.",
    iconBg: "bg-teal-400",
  },
  {
    step: 3,
    title: "Download PDF",
    description:
      "Export your finished CV as a high-quality PDF ready for job applications and interviews.",
    iconBg: "bg-teal-400",
  },
];

export const atsTemplateFeatures = [
  "Machine-readable format",
  "Clean typography",
  "Structured layout",
];

export const creativeTemplateFeatures = [
  "Visual elements",
  "Color schemes",
  "Modern layouts",
];

export const faqData = [
  {
    question: "Is the CV builder really free?",
    answer:
      "Yes! Our basic CV builder is completely free. You can create, edit, and download your CV without any cost. We also offer premium templates and features for users who want additional customization options.",
  },
  {
    question: "Are the templates ATS-friendly?",
    answer:
      "All our templates are designed to be ATS (Applicant Tracking System) compatible. They use standard formatting, proper heading structures, and avoid complex graphics that might confuse automated systems.",
  },
  {
    question: "Can I edit my CV after downloading?",
    answer:
      "Yes, you can always come back and edit your CV. Your data is saved securely in your account, and you can make unlimited changes and re-download your updated CV anytime.",
  },
  {
    question: "What file formats can I download?",
    answer:
      "Currently, we support PDF downloads, which is the most widely accepted format for job applications. PDF ensures your CV looks exactly the same on any device or system.",
  },
  {
    question: "How long does it take to create a CV?",
    answer:
      "Most users complete their CV in 10-15 minutes. Our guided form and pre-written suggestions help speed up the process while ensuring you don't miss any important information.",
  },
  {
    question: "Can I use multiple templates?",
    answer:
      "Yes! You can create multiple CVs with different templates. This is useful for applying to different types of jobs or industries that may require different presentation styles.",
  },
  {
    question: "Is my personal information secure?",
    answer:
      "We take data security seriously. All your personal information is encrypted and stored securely. We never share your data with third parties, and you can delete your account and data at any time.",
  },
  {
    question: "Do you offer customer support?",
    answer:
      "Yes, we provide customer support through email and live chat. Our team is available to help with any questions about using the CV builder or technical issues you might encounter.",
  },
];

export const contactInfo = [
  {
    icon: Mail,
    title: "Email Us",
    description: "Get in touch with our support team",
    contact: "support@startfolio.com",
    action: "mailto:support@startfolio.com",
  },
  {
    icon: Phone,
    title: "Call Us",
    description: "Speak with our experts directly",
    contact: "+62 812-3456-7890",
    action: "tel:+6281234567890",
  },
  {
    icon: MessageCircle,
    title: "Live Chat",
    description: "Chat with us in real-time",
    contact: "Available 24/7",
    action: "#",
  },
];
