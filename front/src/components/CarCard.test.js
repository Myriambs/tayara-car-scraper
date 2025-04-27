import { fireEvent, render, screen } from "@testing-library/react";
import CarCard from "./CarCards"; // assure-toi que le nom du fichier est correct

describe("CarCard Component", () => {
  it("affiche une voiture correctement", () => {
    const mockCars = [
      {
        name: "Toyota Corolla",
        price: 15000,
        url: "https://example.com/toyota-corolla",
        image: "https://example.com/image.jpg"
      }
    ];

    render(<CarCard cars={mockCars} />);

    // Vérifie que le nom de la voiture est affiché
    expect(screen.getByText("Toyota Corolla")).toBeInTheDocument();
    
    // Vérifie que le prix est affiché
    expect(screen.getByText(/15000/)).toBeInTheDocument(); // Utilisation d'une expression régulière ici
    
    // Vérifie qu'un lien est bien présent
    expect(screen.getByText("Voir plus")).toBeInTheDocument();
    
    // Vérifie que l'URL est bien présente dans le lien
    expect(screen.getByRole('link')).toHaveAttribute('href', 'https://example.com/toyota-corolla');
    
    // Vérifie que l'image a un attribut alt avec le nom de la voiture
    expect(screen.getByAltText("Toyota Corolla")).toBeInTheDocument();
  });
});



describe("CarCard Component filter feature ", () => {
  const mockCars = [
    {
      name: "Toyota Corolla",
      price: 15000,
      image: "https://example.com/image1.jpg",
      url: "https://example.com/toyota",
    },
    {
      name: "Honda Civic",
      price: 18000,
      image: "https://example.com/image2.jpg",
      url: "https://example.com/honda",
    },
    {
      name: "Ford Focus",
      price: 12000,
      image: "https://example.com/image3.jpg",
      url: "https://example.com/ford",
    },
  ];

  it("affiche correctement les voitures filtrées par nom", () => {
    render(<CarCard cars={mockCars} />);

    // Simuler la saisie dans le champ de recherche
    fireEvent.change(screen.getByPlaceholderText("Rechercher par nom..."), {
      target: { value: "Honda" },
    });

    // Vérifier que seul le véhicule "Honda Civic" est affiché
    expect(screen.getByText("Honda Civic")).toBeInTheDocument();
    expect(screen.queryByText("Toyota Corolla")).not.toBeInTheDocument();
    expect(screen.queryByText("Ford Focus")).not.toBeInTheDocument();
  });
});
