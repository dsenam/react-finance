import incomeImg from '../../assets/income.svg'
import outcomeImg from '../../assets/outcome.svg'
import totalImg from '../../assets/total.svg'
import { useTransactions } from '../../hooks/useTransactions';
import { Container } from "./styles";
import { formatCurrency } from '../../utils/formatCurrency';

export function Summary() {
    const {transactions} = useTransactions()

    const summary = transactions.reduce((acc, transaction) => {
        switch (transaction.type) {
            case 'deposit':
                acc.deposits += transaction.amount
                acc.total += transaction.amount
                break;

            case 'withdraw':
                acc.withdraws += transaction.amount
                acc.total -= transaction.amount
                break;
        
            default:
                break;
        }

        return acc
    }, {
        deposits: 0,
        withdraws: 0,
        total: 0
    })

    return (
        <Container>
            <div>
                <header>
                    <p>Entradas</p>
                    <img src={incomeImg} alt="Entradas" />
                </header>
                <strong>{formatCurrency(summary.deposits)}</strong>
            </div>

            <div>
                <header>
                    <p>Saídas</p>
                    <img src={outcomeImg} alt="Saídas" />
                </header>
                <strong> - {formatCurrency(summary.withdraws)}</strong>
            </div>

            <div className='highlight-background'>
                <header>
                    <p>Total</p>
                    <img src={totalImg} alt="Total" />
                </header>
                <strong>{formatCurrency(summary.total)}</strong>
            </div>
        </Container>
    )
}