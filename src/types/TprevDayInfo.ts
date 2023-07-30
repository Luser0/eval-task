export type TprevDayInfo = {
  adjusted: true;
  queryCount: number;
  request_id: string;
  results: [
    {
      T: string;
      c: number;
      h: number;
      l: number;
      o: number;
      t: number;
      v: number;
      vw: number;
    }
  ];
  resultsCount: number;
  status: "OK" | "ERROR";
  ticker: string;
};
