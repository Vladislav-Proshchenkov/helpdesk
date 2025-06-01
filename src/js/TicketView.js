export default class TicketView {
  static createTicketElement(ticket) {
    const ticketEl = document.createElement('div');
    ticketEl.className = `ticket ${ticket.status ? 'done' : ''}`;
    ticketEl.dataset.id = ticket.id;

    ticketEl.innerHTML = `
      <div class="ticket-main">
        <div class="ticket-status">
          <input type="checkbox" ${ticket.status ? 'checked' : ''}>
        </div>
        <div class="ticket-name">${ticket.name}</div>
        <div class="ticket-date">${new Date(ticket.created).toLocaleString()}</div>
        <div class="ticket-actions">
          <button class="edit-btn">✎</button>
          <button class="delete-btn">×</button>
        </div>
      </div>
      <div class="ticket-description hidden">${ticket.description}</div>
    `;

    return ticketEl;
  }

  static createModal(title, ticket = null) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
      <div class="modal-content">
        <h2>${title}</h2>
        <form class="ticket-form">
          <input type="hidden" id="ticket-id" value="${ticket ? ticket.id : ''}">
          <div class="form-group">
            <label for="ticket-name">Название:</label>
            <input type="text" id="ticket-name" value="${ticket ? ticket.name : ''}" required>
          </div>
          <div class="form-group">
            <label for="ticket-description">Описание:</label>
            <textarea id="ticket-description">${ticket ? ticket.description : ''}</textarea>
          </div>
          <div class="form-actions">
            <button type="button" class="cancel-btn">Отмена</button>
            <button type="submit">Сохранить</button>
          </div>
        </form>
      </div>
    `;
    return modal;
  }

  static createConfirmModal() {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
      <div class="modal-content">
        <h2>Подтверждение удаления</h2>
        <p>Вы уверены, что хотите удалить этот тикет?</p>
        <div class="form-actions">
          <button type="button" class="cancel-btn">Отмена</button>
          <button type="button" class="confirm-delete-btn">Удалить</button>
        </div>
      </div>
    `;
    return modal;
  }
}