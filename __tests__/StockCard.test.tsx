import "@testing-library/jest-dom";
import StockCard from "../src/components/StockCard";
import {
  fireEvent,
  render,
  screen,
  waitFor,
  act,
} from "@testing-library/react";

describe("StockCard", () => {
  it("fetch and render StockCards", () => {
    render(
      <StockCard
        ticker={{
          ticker: "FLWS",
          name: "1-800-FLOWERS.COM Inc",
          market: "stocks",
          locale: "us",
          primary_exchange: "XNAS",
          type: "CS",
          active: true,
          currency_name: "usd",
          cik: "0001084869",
          composite_figi: "BBG000BBR9P6",
          share_class_figi: "BBG001S60YV4",
          last_updated_utc: "2023-07-31T00:00:00Z",
        }}
        idx={1}
      />
    );

    expect(screen.getByTestId("stock-card-href")).toBeInTheDocument();
  });
});
