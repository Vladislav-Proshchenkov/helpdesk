import TicketView from './TicketView';

export default class HelpDesk {
  constructor(container, ticketService) {
    if (!(container instanceof HTMLElement)) {
      throw new Error('This is not HTML element!');
    }
    this.container = container;
    this.ticketService = ticketService;
    this.tickets = [];
    this.currentTicket = null;
  }

  init() {
    this.render();
    this.loadTickets();
    this.setupEventListeners();
  }

  render() {
    this.container.innerHTML = `
      <div class="helpdesk">
        <header class="header">
          <h1>HelpDesk</h1>
          <button class="add-ticket-btn">Добавить тикет</button>
        </header>
        <div class="tickets-list"></div>
      </div>
    `;
  }

  loadTickets() {
    this.ticketService.list((tickets) => {
      this.tickets = tickets;
      this.renderTickets();
    });
  }

  renderTickets() {
    const ticketsList = this.container.querySelector('.tickets-list');
    ticketsList.innerHTML = '';

    this.tickets.forEach(ticket => {
      const ticketEl = TicketView.createTicketElement(ticket);
      ticketsList.appendChild(ticketEl);
    });
  }

  setupEventListeners() {
    // Add ticket button
    this.container.addEventListener('click', (e) => {
      if (e.target.classList.contains('add-ticket-btn')) {
        this.showAddModal();
      }
    });

    // Ticket list events
    const ticketsList = this.container.querySelector('.tickets-list');
    ticketsList.addEventListener('click', (e) => {
      const ticketEl = e.target.closest('.ticket');
      if (!ticketEl) return;

      const id = ticketEl.dataset.id;

      // Checkbox click
      if (e.target.type === 'checkbox') {
        this.toggleTicketStatus(id, e.target.checked);
        return;
      }

      // Edit button click
      if (e.target.classList.contains('edit-btn')) {
        e.stopPropagation();
        this.showEditModal(id);
        return;
      }

      // Delete button click
      if (e.target.classList.contains('delete-btn')) {
        e.stopPropagation();
        this.showDeleteModal(id);
        return;
      }

      // Ticket body click - toggle description
      if (e.target.closest('.ticket-main')) {
        const descEl = ticketEl.querySelector('.ticket-description');
        descEl.classList.toggle('hidden');
      }
    });
  }

  showAddModal() {
    const modal = TicketView.createModal('Добавить тикет');
    this.setupFormModal(modal, null, (formData) => {
      this.ticketService.create(formData, () => {
        this.loadTickets();
      });
    });
    document.body.appendChild(modal);
  }

  showEditModal(id) {
    this.ticketService.get(id, (ticket) => {
      const modal = TicketView.createModal('Редактировать тикет', ticket);
      this.setupFormModal(modal, ticket, (formData) => {
        this.ticketService.update(id, formData, () => {
          this.loadTickets();
        });
      });
      document.body.appendChild(modal);
    });
  }

  showDeleteModal(id) {
    const modal = TicketView.createConfirmModal();
    const confirmBtn = modal.querySelector('.confirm-delete-btn');
    const cancelBtn = modal.querySelector('.cancel-btn');

    confirmBtn.addEventListener('click', () => {
      this.ticketService.delete(id, () => {
        this.loadTickets();
        modal.remove();
      });
    });

    cancelBtn.addEventListener('click', () => {
      modal.remove();
    });

    document.body.appendChild(modal);
  }

  setupFormModal(modal, ticket, onSubmit) {
    const form = modal.querySelector('.ticket-form');
    const cancelBtn = modal.querySelector('.cancel-btn');

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = {
        name: form.querySelector('#ticket-name').value,
        description: form.querySelector('#ticket-description').value,
        status: ticket ? ticket.status : false
      };
      onSubmit(formData);
      modal.remove();
    });

    cancelBtn.addEventListener('click', () => {
      modal.remove();
    });

    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.remove();
      }
    });
  }

  toggleTicketStatus(id, status) {
    this.ticketService.update(id, { status }, () => {
      this.loadTickets();
    });
  }
}