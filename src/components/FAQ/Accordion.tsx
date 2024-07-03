import React from 'react';

type AccordionProp = {
  question: string;
  answer: string;
};

export const Accordion: React.FC<AccordionProp> = ({ question, answer }) => {
  const [open, setOpen] = React.useState<boolean>(false);
  const [height, setHeight] = React.useState<string>('0px');

  const content = React.useRef<HTMLDivElement | null>(null);

  const toggleOpen = () => {
    setOpen(!open);
    if (content.current) {
      setHeight(!open ? `${content.current.scrollHeight}px` : '0px');
    }
  };

  return (
    <div className='faq-block__item'>
      <div className={`question ${open ? 'open' : ''}`} onClick={toggleOpen}>
        <h4>{question}</h4>
        <svg
          className={`cross ${open ? 'open' : ''}`}
          width='25'
          height='26'
          viewBox='0 0 25 26'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M12.9509 12.387H25V13.637H12.9509V25.5002H11.5731V13.637H0V12.387H11.5731V0.500244H12.9509V12.387Z'
            fill='white'
          />
        </svg>
      </div>
      <div className='answer' style={{ maxHeight: height }} ref={content}>
        <p className='content'>{answer}</p>
      </div>
    </div>
  );
};
