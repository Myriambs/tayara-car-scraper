import React, { useState, useMemo } from "react";
import "./CarCard.css";

function CarCard({ cars }) {
  console.log('cars', cars);
  const [filters, setFilters] = useState({
    searchTerm: "",
    minPrice: "",
    maxPrice: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };
  //**************************** */
  // why we use the previous , ici , Problème : Si plusieurs changements arrivent en même temps 
  // (par exemple plusieurs inputs modifiés rapidement), 
  // tu risques de perdre l'ancien état (filters) car React ne garantit pas que filters est toujours
 //  "le dernier à jour". 
//   Avec (prev) => ({ ...prev, [name]: value }) :
// Tu garantis que tu travailles avec la dernière valeur mise à jour.
// prev est l'ancien état sûr et synchronisé que React fournit.

// C’est donc plus sécurisé
  //**************************** */

  // Optimiser le filtrage avec useMemo pour éviter de recalculer à chaque rendu
  const filteredCars = useMemo(() => {
    const { searchTerm, minPrice, maxPrice } = filters;
    return cars.filter(({ name, price }) => {
      const matchName = name.toLowerCase().includes(searchTerm.toLowerCase());
      //Tu peux protéger un peu plus ton code pour éviter des crashs si car.price n’est pas un nombre.


     const matchMin = minPrice === "" || Number(price) >= Number(minPrice);
const matchMax = maxPrice === "" || Number(price) <= Number(maxPrice);

      return matchName && matchMin && matchMax;
    });
  }, [cars, filters]);

  return (
    <div className="car-list">
      <div className="filters">
        <input
          type="text"
          name="searchTerm"
          placeholder="Rechercher par nom..."
          value={filters.searchTerm}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="minPrice"
          placeholder="Prix min"
          value={filters.minPrice}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="maxPrice"
          placeholder="Prix max"
          value={filters.maxPrice}
          onChange={handleInputChange}
        />
      </div>

      {filteredCars.length ===0 ?(  <p>Aucune voiture trouvée.</p>
):
     ( filteredCars.map((car, index) => (
        <div key={index} className="car-card">
          <img src={car.image} alt={car.name} />
          <h2>{car.name}</h2>
          <p>{car.price} TND</p>
          <a
            href={`${car.url}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Voir plus
          </a>
        </div>
      )))}
    </div>
  );
}

export default CarCard;
