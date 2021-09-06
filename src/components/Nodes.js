function Nodes({ $app, initialState, onClick, prevClick }) {
  this.state = initialState;
  this.onClick = onClick;
  this.prevClick = prevClick;

  const $nodeArticle = document.createElement("article");
  const $nodesContainer = document.createElement("div");
  $nodesContainer.className = "Nodes";
  $nodeArticle.appendChild($nodesContainer);
  $app.appendChild($nodeArticle);

  const prevBtn = `<div class='node'><img src='./assets/prev.png' /></div>`;

  this.render = () => {
    const { nodes = [], isRoot } = this.state;
    const nodesTemplate = nodes
      .map((node) => {
        const iconPath =
          node.type === "FILE" ? "./assets/file.png" : "./assets/directory.png";
        return `<div class='Node' data-index=${node.id}>
                        <img src=${iconPath} alt=${node.type} />
                        <div>${node.name}</div>
                    </div>`;
      })
      .join("");
    $nodesContainer.innerHTML = isRoot
      ? nodesTemplate
      : `${prevBtn}${nodesTemplate}`;
  };

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  $nodesContainer.addEventListener("click", (e) => {
    const clicckedNode = e.target.closest(".Node");
    const index = clicckedNode.dataset.index;
    if (index) {
      const findNode = this.state.nodes.find((node) => node.id === index);
      this.onClick(findNode);
    } else {
      this.prevClick();
    }
  });
}

export default Nodes;
