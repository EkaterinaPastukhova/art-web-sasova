const categoryItems = document.querySelectorAll('.category-selector');
const galleryItems = document.querySelectorAll('.gallery-item');
const categoryItemTitle = document.querySelectorAll('.category-title');

const resetCategory = document.querySelector('.reset-category-selector');
resetCategory.addEventListener('click', (event) => {
    event.preventDefault()

    galleryItems.forEach((galleryItem) => {

        galleryItem.style.display = "block";

    })
    const prevSelected = document.querySelector('.category-selector.selected');

    if (prevSelected) {
        prevSelected.classList.remove('selected')
    }
})

galleryItems.forEach((galleryItem, galleryItemIndex) => {
    galleryItem.addEventListener('click', (event) => {
        event.preventDefault();
        createCard(galleryItemIndex)
    })
})


function createCard(selectedImageIndex) {
    const cardWrapper = document.createElement('div');
    cardWrapper.classList.add('gallery-card-wrapper');
    document.body.appendChild(cardWrapper);

    const overlay = document.createElement('div');
    overlay.classList.add('gallery-overlay');
    cardWrapper.appendChild(overlay);

    const card = document.createElement('div');
    card.classList.add('gallery-card');
    cardWrapper.appendChild(card);

    const cardImg = document.createElement('img');
    cardImg.classList.add('gallery-card-img');
    card.appendChild(cardImg);

    const closeCardButton = document.createElement('button');
    closeCardButton.classList.add('gallery-card-close-button');
    cardWrapper.appendChild(closeCardButton);

    const cardDescription = document.createElement('p');
    cardDescription.classList.add('gallery-card-description');
    card.appendChild(cardDescription);

    const nextSliderButton = document.createElement('button');
    nextSliderButton.classList.add('arrow-btn', 'next');
    cardWrapper.appendChild(nextSliderButton);

    const prevSliderButton = document.createElement('button');
    prevSliderButton.classList.add('arrow-btn', 'prev');
    cardWrapper.appendChild(prevSliderButton);

    function updateCard() {
        const selectedGalleryItem = galleryItems[selectedImageIndex];
        const selectedGalleryItemImage = selectedGalleryItem.querySelector('img');

        cardImg.src = selectedGalleryItemImage.src.replace('-sm.jpg', '-lg.jpg');
        cardDescription.innerHTML = selectedGalleryItemImage.alt;
    }

    updateCard();

    function handleEscFromForeground() {
        cardWrapper.remove();
        window.removeEventListener('keyup', handleKeyUp);
    }

    function handleKeyUp(e) {
        if (e.key === "ArrowRight") {
            selectedImageIndex++;
            if (selectedImageIndex === galleryItems.length) {
                selectedImageIndex = 0
            }
            updateCard()

        }
        if (e.key === "ArrowLeft") {
            selectedImageIndex--;
            if (selectedImageIndex < 0) {
                selectedImageIndex = galleryItems.length - 1
            }
            updateCard()
        }

        if (e.key === "Escape") {
            handleEscFromForeground()
        }
    }

    window.addEventListener('keyup', handleKeyUp)

    nextSliderButton.addEventListener('click', (e) => {
        e.preventDefault();
        selectedImageIndex++;
        if (selectedImageIndex === galleryItems.length) {
            selectedImageIndex = 0
        }
        updateCard()
    })

    prevSliderButton.addEventListener('click', (e) => {
        e.preventDefault();
        selectedImageIndex--;
        if (selectedImageIndex < 0) {
            selectedImageIndex = galleryItems.length - 1
        }
        updateCard()
    })

    closeCardButton.addEventListener('click', handleEscFromForeground)
    overlay.addEventListener('click', handleEscFromForeground)
}

function lazyLoad(elements) {
    elements.forEach(image => {
        if (image.intersectionRatio > 0) {
            image.target.src = image.target.src.replace('-sm.jpg', '-lg.jpg');
            observer.unobserve(item.target);
        };
    });
};

const observer = new IntersectionObserver(lazyLoad, {
    rootMargin: "100px",
    threshold: 1.0
});

if (window.innerWidth < 480) {
    const lazyImages = document.querySelectorAll('.gallery-item img');

    lazyImages.forEach(img => {
        observer.observe(img);
    });
}