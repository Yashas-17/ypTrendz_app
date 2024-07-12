import {FaPhone, FaEnvelope, FaMapMarkerAlt} from 'react-icons/fa'
import Header from '../Header'
import './index.css'

const faqs = [
  {
    question: 'What is your return policy?',
    answer:
      'You can return any item within 30 days of purchase if it is in original condition.',
  },
  {
    question: 'How can I track my order?',
    answer:
      'You will receive a tracking link via email once your order has been shipped.',
  },
  {
    question: 'Do you offer customer support?',
    answer:
      'Yes, we offer 24/7 customer support. You can reach us at yashas2706@gmail.com.com.',
  },
  {
    question: 'Can I change my shipping address?',
    answer:
      'Yes, you can change your shipping address before the order is shipped.',
  },
]

const Contact = () => (
  <>
    <Header />
    <div className="contact-bg-container">
      <div className="faq-section">
        <h2>Frequently Asked Questions</h2>
        <ul className="faq-list">
          {faqs.map(faq => (
            <li key={faq.question} className="faq-item">
              <h3>{faq.question}</h3>
              <p>{faq.answer}</p>
            </li>
          ))}
        </ul>
      </div>
      <div className="contact-text-container">
        <h1 className="contact-heading">Contact us</h1>
        <div className="contact-info">
          <div className="contact-item">
            <FaPhone />
            <p>+917975002366</p>
          </div>
          <div className="contact-item">
            <FaEnvelope />
            <p>yashas2706@gmail.com</p>
          </div>
          <div className="contact-item">
            <FaMapMarkerAlt />
            <p>Amman St, no 35, 4th floor, ap 10, Barbados</p>
          </div>
        </div>
      </div>
    </div>
  </>
)

export default Contact
