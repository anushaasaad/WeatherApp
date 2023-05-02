import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import App from "./App.js";
test("renders weather data after search", async () => {
  const mockResponse = {
    name: "London",
    sys: { country: "GB" },
    main: { temp: 12 },
    weather: [{ main: "Clouds" }],
  };
  jest.spyOn(global, "fetch").mockResolvedValue({
    json: jest.fn().mockResolvedValue(mockResponse),
  });

  render(<App />);
  const searchInput = screen.getByPlaceholderText("Search...");
  fireEvent.change(searchInput, { target: { value: "London" } });
  fireEvent.keyPress(searchInput, { key: "Enter", keyCode: 13 });

  await waitFor(async () => {
    const locationElement = screen.getByText("London, GB");
    const temperatureElement = screen.getByText("12°c");
    const weatherElement = screen.getByText("Clouds");
    expect(locationElement).toBeInTheDocument();
    expect(temperatureElement).toBeInTheDocument();
    expect(weatherElement).toBeInTheDocument();
    console.log("Test passed!");
    });

  global.fetch.mockRestore();
  await Sleep(3000);  
  
});
