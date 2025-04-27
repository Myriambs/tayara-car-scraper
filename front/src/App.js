import React, { useState, useEffect } from "react";
import axios from "axios"; // Importer axios
import CarCard from "./components/CarCards";

const CarList = () => {
  const [cars, setCars] = useState([]); // Pour stocker la liste des voitures
  const [loading, setLoading] = useState(true); // Indicateur de chargement
  const [error, setError] = useState(null); // Gestion des erreurs


  // Utilisation de useEffect pour récupérer les données après le montage du composant
  useEffect(() => {
    fetchCars(); // Appel de la fonction pour récupérer les voitures
  }, []);

  // Fonction pour récupérer les voitures
  const fetchCars = async () => {
    try {
      // Appel à l'API backend où nous avons scrappé les données
      const response = await axios.get("http://localhost:5000/api/cars");
      setCars(response.data); // Mettre les données reçues dans l'état `cars`
      setLoading(false); // Fin du chargement
    } catch (err) {
      console.error("Erreur lors de la récupération des voitures:", err);
      setError("Une erreur est survenue lors de la récupération des voitures.");
      setLoading(false); // Fin du chargement même en cas d'erreur
    }
  };

  // Afficher un message de chargement pendant que les données sont récupérées
  if (loading) {
    return <div>Chargement des voitures...</div>;
  }

  // Afficher une erreur si elle se produit
  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Liste des Voitures</h1>
     <CarCard  cars={cars}   />
    </div>
  );
};

export default CarList;
