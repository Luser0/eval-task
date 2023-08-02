describe("template spec", () => {
  it("passes", () => {
    cy.visit("http://localhost:3000");
    const searchFeild = cy.get("input");
    searchFeild.should("have.id", "search");

    const stockCard = cy
      .get("[data-testid=stock-card-href]", {
        timeout: 30000,
      })
      .first();
    stockCard.should("be.visible");

    cy.get("[id=asset-name]")
      .first()
      .then(($p) => {
        const stockCardAssetName = $p.get(0).innerText;
        cy.get("[id=asset-ticker]")
          .first()
          .then(($p) => {
            const stockCardAssetTicker = $p.get(0).innerText;

            stockCard.click();

            cy.get("[id=asset-name]", {
              timeout: 30000,
            }).then(($h1) => {
              expect($h1.get(0).innerText).to.eq(stockCardAssetName);
            });
            cy.get("[id=asset-ticker]", {
              timeout: 30000,
            }).then(($p) => {
              expect($p.get(0).innerText).to.eq(stockCardAssetTicker);
            });
          });
      });
  });
});
