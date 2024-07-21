import { render, screen } from '../../utils/test-utils';
import '@testing-library/jest-dom';
import { FAQ } from './index';

// Мокаем компонент Accordion
vi.mock('./Accordion', () => ({
  Accordion: ({ question, answer }: { question: string; answer: string }) => (
    <div>
      <button>{question}</button>
      <div>{answer}</div>
    </div>
  ),
}));

describe('FAQ Component', () => {
  it('renders correctly', () => {
    render(<FAQ />);

    // Проверяем, что заголовок FAQ отображается
    expect(screen.getByText('FAQ')).toBeInTheDocument();

    // Проверяем, что вопросы и ответы отображаются
    expect(screen.getByText('How can I track the status of my order?')).toBeInTheDocument();
    expect(screen.getByText('What payment methods do you accept?')).toBeInTheDocument();
    expect(screen.getByText('How can I return or exchange an item?')).toBeInTheDocument();
  });

  it('displays FAQ items with questions and answers', () => {
    render(<FAQ />);

    // Проверяем, что все вопросы отображаются
    expect(screen.getByText('How can I track the status of my order?')).toBeInTheDocument();
    expect(screen.getByText('What payment methods do you accept?')).toBeInTheDocument();
    expect(screen.getByText('How can I return or exchange an item?')).toBeInTheDocument();

    // Проверяем, что ответы отображаются
    expect(
      screen.getByText(
        'After placing your order, you will receive a confirmation email containing your order number and a tracking link. You can also log in to your account on our website and go to the "My Orders" section to track your delivery status.',
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        'These methods include cash, credit / debit cards, bank transfers, mobile payments and digital wallets.',
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        'When a customer brings an item to the store and asks for an exchange or refund, the sales staff will need to verify this request.',
      ),
    ).toBeInTheDocument();
  });
});
