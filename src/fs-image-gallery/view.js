/**
 * Use this file for JavaScript code that you want to run in the front-end
 * on posts/pages that contain this block.
 *
 * When this file is defined as the value of the `viewScript` property
 * in `block.json` it will be enqueued on the front end of the site.
 *
 * Example:
 *
 * ```js
 * {
 *   "viewScript": "file:./view.js"
 * }
 * ```
 *
 * If you're not making any changes to this file because your project doesn't need any
 * JavaScript running in the front-end, then you should delete this file and remove
 * the `viewScript` property from `block.json`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-metadata/#view-script
 */

/* eslint-disable no-console */
document.querySelectorAll('.fs-image-gallery__item').forEach((item) => {
    item.addEventListener('click', (event) => {
        event.preventDefault();
        const imageUrl = item.getAttribute('href');

        // Get all gallery items
        const galleryItems = Array.from(item.closest('.fs-image-gallery').querySelectorAll('.fs-image-gallery__item'));
        const currentIndex = galleryItems.indexOf(item);
        const caption = item.querySelector('.fs-image-gallery__item__caption') ? item.querySelector('.fs-image-gallery__item__caption').textContent : '';

        // Create lightbox modal
        const lightbox = document.createElement('div');
        lightbox.className = 'fs-image-gallery-lightbox';
        lightbox.innerHTML = `
            <div class="fs-image-gallery-lightbox__overlay"></div>
            <div class="fs-image-gallery-lightbox__content">
                <div class="fs-image-gallery-lightbox__close"><span></span><span></span></div>
                <button class="fs-image-gallery-lightbox__prev">&lsaquo;</button>
                <div class="fs-image-gallery-lightbox__image-container">
                    <img class="fs-image-gallery-lightbox__image" src="${imageUrl}" alt="">
                    <div class="fs-image-gallery-lightbox__caption">${caption}</div>
                </div>
                <button class="fs-image-gallery-lightbox__next">&rsaquo;</button>
            </div>
        `;

        document.body.appendChild(lightbox);
        document.body.style.overflow = 'hidden';

        let currentImageIndex = currentIndex;

        const updateImage = (index) => {
            const img = lightbox.querySelector('.fs-image-gallery-lightbox__image');
            img.src = galleryItems[index].getAttribute('href');
            const newCaption = galleryItems[index].querySelector('.fs-image-gallery__item__caption') ? galleryItems[index].querySelector('.fs-image-gallery__item__caption').textContent : '';
            lightbox.querySelector('.fs-image-gallery-lightbox__caption').textContent = newCaption;
            currentImageIndex = index;
        };

        // Navigation
        lightbox.querySelector('.fs-image-gallery-lightbox__prev').addEventListener('click', () => {
            const newIndex = (currentImageIndex - 1 + galleryItems.length) % galleryItems.length;
            updateImage(newIndex);
        });

        lightbox.querySelector('.fs-image-gallery-lightbox__next').addEventListener('click', () => {
            const newIndex = (currentImageIndex + 1) % galleryItems.length;
            updateImage(newIndex);
        });

        // Close lightbox
        const closeLightbox = () => {
            lightbox.remove();
            document.body.style.overflow = '';
        };

        lightbox.querySelector('.fs-image-gallery-lightbox__close').addEventListener('click', closeLightbox);
        lightbox.querySelector('.fs-image-gallery-lightbox__overlay').addEventListener('click', closeLightbox);


        /* Keyboard navigation START */
        const handleKeyboard = (e) => {
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowLeft') lightbox.querySelector('.fs-image-gallery-lightbox__prev').click();
            if (e.key === 'ArrowRight') lightbox.querySelector('.fs-image-gallery-lightbox__next').click();
        };
        document.addEventListener('keydown', handleKeyboard);
        /* Keyboard navigation END */

        lightbox.addEventListener('remove', () => {
            document.removeEventListener('keydown', handleKeyboard);
            lightbox.removeEventListener('remove', this);
            lightbox.remove();
            document.body.style.overflow = '';
        });
    });
});
/* eslint-enable no-console */
