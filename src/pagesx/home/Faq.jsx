import { ReAccordion } from '@/shared/ReAccordion';
import React from 'react';

const faqData = [
    {
        title: "Is the news trusted?",
        description: "Yes, the news provided on our platform undergoes a rigorous authentication process. Our team of experienced journalists and fact-checkers verify the information from multiple reliable sources before publishing. We are committed to delivering accurate and trustworthy news to our audience."
    },
    {
        title: "How often is the news updated?",
        description: "We strive to keep our audience informed with the latest developments. Our news articles are updated regularly throughout the day as new information becomes available. You can trust us to provide timely and up-to-date news coverage on a wide range of topics."
    },
    {
        title: "Can I contribute news stories?",
        description: "Absolutely! We encourage our community to contribute news stories. If you have firsthand information or an interesting news tip, you can submit it to our editorial team. Our editors will review the submissions, and if the information is credible, we may feature your contribution on our platform. Together, we can create a more comprehensive and diverse news experience."
    },
    {
        title: "How do you ensure the privacy of user data?",
        description: "Protecting the privacy of our users is a top priority. We employ industry-standard security measures and encryption protocols to safeguard user data. Our platform adheres to strict privacy policies, and we do not share personal information with third parties without explicit consent. You can trust us to handle your data responsibly and with the utmost care."
    },
    {
        title: "What types of news categories do you cover?",
        description: "Our platform covers a wide range of news categories to cater to diverse interests. From politics and world affairs to technology, entertainment, and lifestyle, we strive to provide a comprehensive news experience. Our team of reporters and editors curates content from various sources to ensure that our audience stays informed about the latest happenings across different domains."
    },
    {
        title: "How can I report fake news or misinformation?",
        description: "We take misinformation seriously and rely on our community to help maintain the integrity of our platform. If you come across content that you believe is fake or misleading, you can report it through our dedicated reporting system. Our team will investigate the reported content promptly, and if it violates our content guidelines, appropriate actions will be taken to address the issue. Your vigilance is crucial in helping us maintain a trustworthy news environment."
    },
    {
        title: "Do you offer a subscription service?",
        description: "Yes, we provide a subscription service that offers additional benefits to our users. Subscribers enjoy ad-free browsing, exclusive access to premium content, and personalized news recommendations based on their interests. Subscriptions help support the sustainability of our platform, allowing us to continue delivering high-quality journalism to our audience. You can find more information about our subscription plans on our website."
    },
];


const Faq = () => {
    return (
        <div>
            <ReAccordion infos={faqData} />
        </div>
    );
};

export default Faq;