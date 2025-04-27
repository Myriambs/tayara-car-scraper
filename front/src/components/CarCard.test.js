
const { render, screen, fireEvent } = require('@testing-library/react');
const CarCard = require('./CarCard');

describe("CarCard", () => {
  const cars = [
    { id: 1, name: "Voiture 1", price: 10000, image: "image1.jpg", url: "http://example.com" },
    { id: 2, name: "Voiture 2", price: 20000, image: "image2.jpg", url: "http://example.com" },
    { id: 3, name: "Voiture 3", price: 30000, image: "image3.jpg", url: "http://example.com" }
  ];

  it("doit afficher toutes les voitures initialement", () => {
    render(<CarCard cars={cars} />);

    expect(screen.getByText("Voiture 1")).toBeInTheDocument();
    expect(screen.getByText("Voiture 2")).toBeInTheDocument();
    expect(screen.getByText("Voiture 3")).toBeInTheDocument();
  });

  it("doit filtrer les voitures par nom", () => {
    render(<CarCard cars={cars} />);

    const searchInput = screen.getByPlaceholderText("Rechercher par nom...");
    fireEvent.change(searchInput, { target: { value: "Voiture 1" } });

    expect(screen.getByText("Voiture 1")).toBeInTheDocument();
    expect(screen.queryByText("Voiture 2")).not.toBeInTheDocument();
    expect(screen.queryByText("Voiture 3")).not.toBeInTheDocument();
  });

  it("doit filtrer les voitures par prix minimum", () => {
    render(<CarCard cars={cars} />);

    const minPriceInput = screen.getByPlaceholderText("Prix min");
    fireEvent.change(minPriceInput, { target: { value: "15000" } });

    expect(screen.queryByText("Voiture 1")).not.toBeInTheDocument();
    expect(screen.getByText("Voiture 2")).toBeInTheDocument();
    expect(screen.getByText("Voiture 3")).toBeInTheDocument();
  });

  it("doit filtrer les voitures par prix maximum", () => {
    render(<CarCard cars={cars} />);

    const maxPriceInput = screen.getByPlaceholderText("Prix max");
    fireEvent.change(maxPriceInput, { target: { value: "25000" } });

    expect(screen.getByText("Voiture 1")).toBeInTheDocument();
    expect(screen.getByText("Voiture 2")).toBeInTheDocument();
    expect(screen.queryByText("Voiture 3")).not.toBeInTheDocument();
  });

  it("doit afficher un message 'Aucune voiture trouvée' si aucun résultat ne correspond au filtre", () => {
    render(<CarCard cars={cars} />);

    const searchInput = screen.getByPlaceholderText("Rechercher par nom...");
    fireEvent.change(searchInput, { target: { value: "Voiture Inconnue" } });

    expect(screen.getByText("Aucune voiture trouvée.")).toBeInTheDocument();
  });
});
