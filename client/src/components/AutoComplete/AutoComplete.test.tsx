import { render, screen, fireEvent } from "@testing-library/react";
import AutoComplete from "./AutoComplete"; // Assurez-vous de remplacer le chemin avec le chemin réel vers votre composant

test("renders AutoComplete component with data", () => {
  const data = ["Item 1", "Item 2", "Item 3"];
  const onClickMock = jest.fn();

  render(<AutoComplete data={data} onClick={onClickMock} />);

  const autoCompleteElement = screen.getByRole("list");
  expect(autoCompleteElement).toBeInTheDocument();

  data.forEach((value) => {
    const listItem = screen.getByText(value);
    expect(listItem).toBeInTheDocument();
  });
});

test("handles click events correctly", () => {
  const data = ["Item 1", "Item 2", "Item 3"];
  const onClickMock = jest.fn();

  render(<AutoComplete data={data} onClick={onClickMock} />);

  const firstListItem = screen.getByText(data[0]);
  fireEvent.click(firstListItem);

  expect(onClickMock).toHaveBeenCalledWith(data[0]);
});
