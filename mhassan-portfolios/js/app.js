// Get portfolios
function getPortfolios() {
  const container = document.getElementById("portfolios");

  portfolios();
  async function portfolios() {
    const res = await fetch(`json/main.json`);
    const data = await res.json();
    setPortfolios(data.portfolios);
  }

  function setPortfolios(portfolios) {
    portfolios.forEach((portfolio) => {
      const html = `
        <div class="col-xl-3 col-lg-4 col-md-6 portfolio">
          <div class="sp-container">
            <div class="sp-img">
              <img src="img/portfolios/${portfolio.image}" alt="" class="img-fluid" />
            </div>
            <div class="sp-details-wrap">
              <div class="sp-details">
                <h3 class="sp-name">${portfolio.name}</h3>
                <p class="sp-desc">
                  ${portfolio.details}
                </p>
                <a href="${portfolio.url}" class="btn sp-link-btn" target="_blank">view full site</a>
              </div>
            </div>
          </div>
        </div>
      `;;

      container.insertAdjacentHTML('beforeend', html);
    });
    detailsBg();
  }
}
getPortfolios();

// Collerize details background
function detailsBg() {
  const details = document.querySelectorAll(".sp-details");
  const colors = [
    "violet",
    "indigo",
    "teal",
    "seagreen",
    "skyblue",
    "orange",
    "red",
  ];

  let count = 0;
  details.forEach((detail) => {
    detail.style.background = colors[count];
    count++;
    if (count === colors.length) {
      count = 0;
    }
  });
}
