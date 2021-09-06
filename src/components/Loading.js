function Loading ({$app, initialState}) {
    this.state = initialState;

    const $loadingArticle = document.createElement('article');
    const $loadingDiv = document.createElement('div');
    $loadingDiv.className = 'Modal Loading';
    $loadingArticle.appendChild($loadingDiv);
    $app.appendChild($loadingArticle);

    this.render = () =>{
        const {isLoading} = this.state;
        $loadingDiv.innerHTML = `<div class='content'><img src='./assets/nyan-cat.gif' /></div>`;
        $loadingDiv.style.display = isLoading ? 'block' : 'none';
    }

    this.setState = nextState => {
        this.state = nextState;
        this.render();
    }

    this.render();
}

export default Loading