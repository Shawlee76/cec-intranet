export const fetchConvoyages = (onMessage, onError, token) => {

    const eventSource = new EventSource(`/api/sse/sse-convoyages?token=${token}`);  
    
    eventSource.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        onMessage(data);
      } catch (error) {
        console.error("Erreur lors du traitement des données SSE convoyage :", error);
      }
    };
  
    eventSource.onerror = (error) => {
      console.error("Erreur SSE convoyage :", error);
      if (onError) onError(error);
    };
  
    return eventSource;
};

export const fetchConvoyage = (onMessage, onError, token) => {

  const eventSource = new EventSource(`/api/sse/sse-convoyage?token=${token}`); 
  
  eventSource.onmessage = (event) => {
    try {
      const data = JSON.parse(event.data);
      onMessage(data);
    } catch (error) {
      console.error("Erreur lors du traitement des données convoi :", error);
    }
  };

  eventSource.onerror = (error) => {
    console.error("Erreur SSE convoi :", error);
    if (onError) onError(error);
  };

  return eventSource;
};
