const getLatestConvoyage = async (token) => {
    try {
      
      const response = await fetch(`${process.env.NEXT_PUBLIC_CONVOYAGE_API_URL}/api/sessions?page=1&opened=1`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des données', response);
      }

      return await response.json(); // Renvoie les données si tout est ok
    } catch (error) {
      console.log(process.env.NEXT_PUBLIC_CONVOYAGE_API_URL);
      console.error(error);
      throw error; // Propagation de l'erreur pour la gestion dans le composant
    }
  };
  
const getList = async (token) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_CONVOYAGE_API_URL}/api/sessions`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      console.log(response);
      throw new Error('Erreur lors de la récupération des données', response);
    }
    
    return await response.json(); // Renvoie les données si tout est ok
  } catch (error) {
    console.error(error);
    throw error; // Propagation de l'erreur pour la gestion dans le composant
  }
};

const toggleBoite = async (token, idConvoi, recorded) => {
  try {

    const response = await fetch(`${process.env.NEXT_PUBLIC_CONVOYAGE_API_URL}/api/conveyings/${idConvoi}/toggle-active`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ recorded: recorded }),

    });
    if (!response.ok) {
      throw new Error('Erreur lors de la mise à jour du pointage');
    }
    return await response.json(); // Renvoie les données si tout est ok
  }
  catch (error) {
    console.error(error);
    throw error; // Propagation de l'erreur pour la gestion dans le composant
  }
};

const toggleConvoyage = async (token, convoyage) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_CONVOYAGE_API_URL}/api/sessions/${convoyage.id}/toggle-session`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ opened: !convoyage.opened }),

    });
    if (!response.ok) {
      throw new Error('Erreur lors de la mise à jour de la session de convoyage');
    }
    return await response.json(); // Renvoie les données si tout est ok
  }
  catch (error) {
    console.error(error);
    throw error; // Propagation de l'erreur pour la gestion dans le composant
  }
};

export const ConvoyageService = {
  getLatestConvoyage,
  getList,
  toggleBoite,
  toggleConvoyage

};
 // export default ConvoyageService;
  