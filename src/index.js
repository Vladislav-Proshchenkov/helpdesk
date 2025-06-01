import './css/styles.css';
import HelpDesk from './js/HelpDesk';
import TicketService from './js/TicketService';

const root = document.getElementById('root');
const ticketService = new TicketService();
const app = new HelpDesk(root, ticketService);

app.init();