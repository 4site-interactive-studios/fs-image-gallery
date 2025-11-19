/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps } from '@wordpress/block-editor';

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#save
 *
 * @return {Element} Element to render.
 */
export default function save({ attributes }) {
	const { images } = attributes;

	return (
		<div {...useBlockProps.save()}>
			{images.length > 0 && (
				<div className={`fs-image-gallery fs-image-gallery--caption-style--${attributes.caption_style}`} data-count={images.length}>
					{images.map((image) => (
						<a key={image.id} className="fs-image-gallery__item" href={image.url} target="_blank" rel="noreferrer">
							<div style={{backgroundImage: `url('${image.url}')`}} className="fs-image-gallery__item__image"></div>
							{image.caption && (
								<div className="fs-image-gallery__item__caption">{image.caption}</div>
							)}
						</a>
					))}
				</div>
			)}
		</div>
	);
}
