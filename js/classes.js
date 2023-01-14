class Currency {
  constructor() {
    this.popularCurrencies = [
      "PHP",
      "USD",
      "AUD",
      "EUR",
      "JPY",
      "GBP",
      "CAD",
      "CNY",
    ];
    this.table2 = [1, 10, 50, 100, 200, 500, 1000, 10000];
  }

  convertAmount(base, to, amount) {
    const convertFunction = () =>
      fetch(
        `https://api.exchangerate.host/convert?amount=${amount}&from=${base}&to=${to}`
      ).then((response) => response.json());

    const data = convertFunction();

    data.then((currencyValues) => {
      let value = currencyValues["result"].toLocaleString();
      let currency = currencyValues["query"]["to"];
      if (isNaN(amount)) {
        $("div.value-here").html(`Invalid amount input`);
      } else if (amount == "") {
        $("div.value-here").html(`No input`);
      } else {
        $("div.value-here").html(`${value} ${currency}`);
      }
    });
  }

  createTable1(base) {
    const latestFunction = () =>
      fetch(`https://api.exchangerate.host/latest?base=${base}`).then(
        (response) => response.json()
      );

    const data = latestFunction();

    data.then((currencyRates) => {
      var rates = currencyRates["rates"];
      var placer = 0;
      $("td.baserate").html(`${base} 1`);
      for (var [key, value] of Object.entries(rates)) {
        for (let i = 0; i < this.popularCurrencies.length; i++) {
          if (key == this.popularCurrencies[i]) {
            $(`#rate${placer}`).html(`${key} ${value.toLocaleString()}`);
            placer++;
          }
        }
      }
    });
  }

  changedOption(base, to) {
    this.createTable1(base);
    this.createTable2(base, to);
  }

  createTable2(base, to) {
    const latestFunction = () =>
      fetch(`https://api.exchangerate.host/convert?from=${base}&to=${to}`).then(
        (response) => response.json()
      );

    const data = latestFunction();

    data.then((currencyRates) => {
      let value = currencyRates["result"];
      let currency = currencyRates["query"]["to"];
      let td = document.getElementsByClassName("baserate2");
      for (let i = 0; i < this.table2.length; i++) {
        let finalValue = value * this.table2[i];
        $(`#t2rate${this.table2[i]}`).html(`${base} ${this.table2[i]}`);
        td[i].innerHTML = `${(
          Math.round((finalValue + Number.EPSILON) * 100) / 100
        ).toLocaleString()} ${currency}`;
      }
    });
  }
}
