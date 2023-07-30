export type TtickerDetailsResults = {
  active: true;
  address: {
    address1: string;
    city: string;
    postal_code: string;
    state: string;
  };
  branding: {
    icon_url: string;
    logo_url: string;
  };
  cik: string;
  composite_figi: string;
  currency_name: string;
  description: string;
  homepage_url: string;
  list_date: string;
  locale: string;
  market: string;
  market_cap: number;
  name: string;
  phone_number: string;
  primary_exchange: string;
  round_lot: number;
  share_class_figi: string;
  share_class_shares_outstanding: number;
  sic_code: string;
  sic_description: string;
  ticker: string;
  ticker_root: string;
  total_employees: number;
  type: string;
  weighted_shares_outstanding: number;
};
