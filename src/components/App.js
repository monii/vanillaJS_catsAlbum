import Breadcrumb from "./Breadcrumb.js";
import Nodes from "./Nodes.js";
import ImageView from "./ImageView.js";
import Loading from "./Loading.js";
import { getDirectoryData } from "../Api/api.js";

function App($app) {
  this.state = {
    isRoot: true,
    isLoading: true,
    nodes: [],
    depth: [],
    imagePath: "",
  };

  const breadcrumb = new Breadcrumb({
    $app,
    initialState: { depth: this.state.depth },
    onClick: async (index) => {
      if (index === null) {
        this.setState({
          ...this.state,
          isLoading: true,
          imagePath: "",
        });
        const rootNodes = await getDirectoryData();
        this.setState({
          ...this.state,
          isLoading: false,
          isRoot: true,
          nodes: rootNodes,
          depth: [],
        });
      } else {
        if (index === this.state.depth.length - 1) {
          return;
        }
        this.setState({
          ...this.state,
          isLoading: true,
          imagePath: "",
        });
        const nextDepth = this.state.depth.slice(0, index + 1);
        const nextNodes = await getDirectoryData(nextDepth[nextDepth.length - 1].id);
        this.setState({
          ...this.state,
          isLoading: false,
          nodes: nextNodes,
          depth: nextDepth,
        });
      }
    },
  });
  const nodes = new Nodes({
    $app,
    initialState: { nodes: this.state.nodes },
    onClick: async (node) => {
      this.setState({
        ...this.state,
        isLoading: true,
      });
      if (node.type === "FILE") {
        this.setState({
          ...this.state,
          isRoot: false,
          isLoading: false,
          imagePath: node.filePath,
        });
      } else {
        const nextNodes = await getDirectoryData(node.id);
        this.setState({
          ...this.state,
          isRoot: false,
          isLoading: false,
          nodes: nextNodes,
          depth: [...this.state.depth, node],
        })}
    },
    prevClick: async () => {
      this.setState({
        ...this.state,
        isLoading: true,
        imagePath: "",
      });
      const prevDirectory = [...this.state.depth];
      prevDirectory.pop();
      const prevId = prevDirectory.length === 0 ? null : prevDirectory[prevDirectory.length - 1].id;
      if (prevId) {
        const prevNodes = await getDirectoryData(prevId)
          this.setState({
            ...this.state,
            isLoading: false,
            nodes: prevNodes,
            depth: prevDirectory,
          });
      } else {
        const rootNodes = await getDirectoryData();
          this.setState({
            ...this.state,
            isRoot: true,
            isLoading: false,
            nodes: rootNodes,
            depth: prevDirectory,})
      }
    },
  });
  const imageView = new ImageView({
    $app,
    initialState: { imagePath: this.state.imagePath },
    onClickClose : isClose => {isClose ? this.setState({...this.state, imagePath: ''}) : '';}
  });
  const loading = new Loading({
    $app,
    initialState: { isLoading: this.state.isLoading },
  });

  this.setState = (nextState) => {
    this.state = nextState,
    breadcrumb.setState({ depth: this.state.depth });
    nodes.setState({ isRoot: this.state.isRoot, nodes: this.state.nodes });
    imageView.setState({ imagePath: this.state.imagePath });
    loading.setState({ isLoading: this.state.isLoading });
  };

  const init = async () => {
    const rootNodes = await getDirectoryData();
      this.setState({
        ...this.state,
        isLoading: false,
        nodes: rootNodes,
      });
  };

  init();
}

export default App;
