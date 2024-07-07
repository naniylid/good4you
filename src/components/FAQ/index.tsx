import React from 'react';
import './FAQ.module.scss';
import { Accordion } from './Accordion';

export const FAQ: React.FC = () => {
  const faqData = [
    {
      question: 'How can I track the status of my order?',
      answer:
        'After placing your order, you will receive a confirmation email containing your order number and a tracking link. You can also log in to your account on our website and go to the "My Orders" section to track your delivery status.',
      id: 1,
    },
    {
      question: 'What payment methods do you accept?',
      answer:
        'These methods include cash, credit / debit cards, bank transfers, mobile payments and digital wallets.',
      id: 2,
    },
    {
      question: 'How can I return or exchange an item?',
      answer:
        'When a customer brings an item to the store and asks for an exchange or refund, the sales staff will need to verify this request. ',
      id: 3,
    },
  ];

  return (
    <section id='faq' className='faq'>
      <h2 title='Frequently Asked Questions'>FAQ</h2>
      <div className='faq-block'>
        {faqData.map(({ question, answer, id }) => (
          <Accordion key={id} question={question} answer={answer} />
        ))}
      </div>
    </section>
  );
};
