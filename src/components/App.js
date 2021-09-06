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
    onClick: (index) => {
      if (index === null) {
        this.setState({
          ...this.state,
          isLoading: true,
          imagePath: "",
        });
         getDirectoryData(index).then((res) =>
        this.setState({
            ...this.state,
            isLoading: false,
            isRoot: true,
            nodes: res,
            depth: [],
          }));
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
         getDirectoryData(nextDepth[length - 1].id).then(
          (res) =>
            this.setState({
              ...this.state,
              isLoading: false,
              nodes: res,
              depth: nextDepth,
            })
        );
      }
    },
  });
  const nodes = new Nodes({
    $app,
    initialState: { nodes: this.state.nodes },
    onClick: (node) => {
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
        getDirectoryData(node.id).then((res) =>
          this.setState({
            ...this.state,
            isRoot: false,
            isLoading: false,
            nodes: res,
            depth: [...this.state.depth, node],
          })
        );
      }
    },
    prevClick: async () => {
      this.setState({
        ...this.state,
        isLoading: true,
        imagePath: "",
      });
      const prevDirectory = [...this.state.depth];
      prevDirectory.pop();
      const prevId =
        prevDirectory.length === 0
          ? null
          : prevDirectory[prevDirectory.length - 1].id;
      if (prevId) {
        getDirectoryData(prevId).then((res) =>
          this.setState({
            ...this.state,
            isLoading: false,
            nodes: res,
            depth: prevDirectory,
          })
        );
      } else {
        getDirectoryData().then((res) =>
          this.setState({
            ...this.state,
            isRoot: true,
            isLoading: false,
            nodes: res,
            depth: prevDirectory,
          })
        );
      }
    },
  });
  const imageView = new ImageView({
    $app,
    initialState: { imagePath: this.state.imagePath },
  });
  const loading = new Loading({
    $app,
    initialState: { isLoading: this.state.isLoading },
  });

  this.setState = (nextState) => {
    (this.state = nextState), breadcrumb.setState({ depth: this.state.depth });
    nodes.setState({ isRoot: this.state.isRoot, nodes: this.state.nodes });
    imageView.setState({ imagePath: this.state.imagePath });
    loading.setState({ isLoading: this.state.isLoading });
  };

  const init = () => {
    getDirectoryData().then((res) =>
      this.setState({
        ...this.state,
        isLoading: false,
        nodes: res,
      })
    );
  };

  init();
}

export default App;
