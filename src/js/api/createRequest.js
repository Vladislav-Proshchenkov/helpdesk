const createRequest = async (options = {}) => {
    const { method, id, body, callback } = options;
    const url = `http://localhost:8070/?method=${method}${id ? `&id=${id}` : ''}`;
    
    try {
      const response = await fetch(url, {
        method: body ? 'POST' : 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        body: body ? JSON.stringify(body) : undefined,
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      if (callback) callback(data);
      return data;
    } catch (error) {
      console.error('Error:', error);
      if (callback) callback(null, error);
      return null;
    }
  };
  
  export default createRequest;