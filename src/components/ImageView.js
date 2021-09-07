const IMAGE_PREFIX = 'https://fe-dev-matching-2021-03-serverlessdeploymentbuck-t3kpj3way537.s3.ap-northeast-2.amazonaws.com/public';

function ImageView({ $app, initialState, onClickClose }) {
    this.state = initialState;
    this.onClickClose = onClickClose;

    const $imageArticle = document.createElement('article');
    const $imageContainer = document.createElement('div');
    $imageContainer.className = 'Modal ImageViewer';
    $imageArticle.appendChild($imageContainer);
    $app.appendChild($imageArticle);

    $imageContainer.style.display = 'none';

    this.render = () => {
        const { imagePath } = this.state;
        $imageContainer.innerHTML = imagePath ? `<div class='content'>
        <img src=${IMAGE_PREFIX}${imagePath} />
    </div>` : '';
        $imageContainer.style.display = imagePath ? 'block' : 'none';
    }

    this.setState = nextState => {
        this.state = nextState;
        this.render();
    }

    $imageContainer.addEventListener('click', (e) => {
        const target = e.target.closest('.content');
        $imageContainer.style.display = (target !== null) ? 'block' : 'none' ;
        target !== null ? this.onClickClose(false) : this.onClickClose(true);
    })
}

export default ImageView