import createRequest from './api/createRequest';

export default class TicketService {
  list(callback) {
    return createRequest({
      method: 'allTickets',
      callback
    });
  }

  get(id, callback) {
    return createRequest({
      method: 'ticketById',
      id,
      callback
    });
  }

  create(data, callback) {
    return createRequest({
      method: 'createTicket',
      body: data,
      callback
    });
  }

  update(id, data, callback) {
    return createRequest({
      method: 'updateById',
      id,
      body: data,
      callback
    });
  }

  delete(id, callback) {
    return createRequest({
      method: 'deleteById',
      id,
      callback
    });
  }
}