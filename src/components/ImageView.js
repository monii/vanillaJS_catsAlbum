const IMAGE_PREFIX = 'https://fe-dev-matching-2021-03-serverlessdeploymentbuck-t3kpj3way537.s3.ap-northeast-2.amazonaws.com/public';

function ImageView({ $app, initialState }) {
    this.state = initialState;

    const $imageArticle = document.createElement('article');
    const $imageModal = document.createElement('div');
    const $imageContainer = document.createElement('div');
    $imageContainer.className = 'ImageViewer';
    $imageModal.className = 'Modal';
    $imageModal.appendChild($imageContainer);
    $imageArticle.appendChild($imageModal);
    $app.appendChild($imageArticle);

    $imageModal.style.display = 'none';

    this.render = () => {
        const { imagePath } = this.state;
        $imageContainer.innerHTML = imagePath ? `<div class='content'>
        <img src=${IMAGE_PREFIX}${imagePath} />
    </div>` : '';
        $imageModal.style.display = imagePath ? 'block' : 'none';
    }

    this.setState = nextState => {
        this.state = nextState;
        this.render();
    }

    $imageContainer.addEventListener('click', (e) => {
        const target = e.target.closest('.Modal');
        $imageModal.style.display = target.style.display === 'block' ? 'none' : '';
    })
}

export default ImageView