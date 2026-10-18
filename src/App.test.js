import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Footer from "./Components/Footer";
import PageNotFound from "./Components/PageNotFound";

test("renders the footer", () => {
  render(<Footer />);
  expect(screen.getByText(/get the freshcart app/i)).toBeInTheDocument();
});

test("404 page links back to home", () => {
  render(
    <MemoryRouter>
      <PageNotFound />
    </MemoryRouter>
  );
  expect(screen.getByRole("link", { name: /back to the home page/i })).toHaveAttribute("href", "/home");
});
