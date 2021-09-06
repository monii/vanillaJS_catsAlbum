function Breadcrumb({ $app, initialState, onClick }) {
  this.state = initialState;
  this.onClick = onClick;

  const $breadcrumbArticle = document.createElement("article");
  const $breadcrumb = document.createElement("nav");
  $breadcrumb.className = "Breadcrumb";
  $breadcrumbArticle.appendChild($breadcrumb);
  $app.appendChild($breadcrumbArticle);

  this.render = () => {
    const { depth = [] } = this.state;
    $breadcrumb.innerHTML = `<div class='navItem'>root</div>${depth
      .map((dep, i) => `<div class='navItem' data-index=${i}>${dep.name}</div>`)
      .join("")}`;
  };

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  $breadcrumb.addEventListener("click", (e) => {
    const clicked = e.target.closest(".navItem");
    const index = clicked.dataset.index;
    this.onClick(index ? parseInt(index) : null);
  });
}

export default Breadcrumb;
