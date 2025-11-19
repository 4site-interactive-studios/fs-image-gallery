/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps, MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';

import { Button } from '@wordpress/components';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, RadioControl } from '@wordpress/components';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
export default function Edit({ attributes, setAttributes }) {
	const { images } = attributes;

	const onSelectImages = (media) => {		
		setAttributes({
			images: media.map((img) => ({
				id: img.id,
				full_url: img.url,
				alt: img.alt || '',
				caption: img.caption || '',
				url: img.sizes && img.sizes.large ? img.sizes.large.url : img.url,
				orientation: img.orientation,
			})),
		});
	};	

	const onRemoveImage = (index) => {
		const newImages = [...images];
		newImages.splice(index, 1);
		setAttributes({ images: newImages });
	};

	return (
		<div {...useBlockProps()}>
			<InspectorControls>
				<PanelBody title={__('Caption', 'image-gallery-block')} initialOpen={true}>
					<RadioControl
						label={__('Select style:', 'image-gallery-block')}
						selected={attributes.caption_style}
						options={[
							{ label: __('None', 'image-gallery-block'), value: 'none' },
							{ label: __('Below', 'image-gallery-block'), value: 'below' },
							{ label: __('Overlay', 'image-gallery-block'), value: 'overlay' },
						]}
						onChange={(value) => setAttributes({ caption_style: value })}
					/>
				</PanelBody>
			</InspectorControls>
			<div className="image-gallery-block-editor">
				<MediaUploadCheck>
					<MediaUpload
						onSelect={onSelectImages}
						allowedTypes={['image']}
						multiple='add'
						value={images.map((img) => img.id)}
						render={({ open }) => (
							<Button
								onClick={open}
								variant="primary"
								className="image-gallery-upload-button"
							>
								{images.length === 0
									? __('Upload Images', 'image-gallery-block')
									: __('Edit Gallery', 'image-gallery-block')}
							</Button>
						)}
					/>
				</MediaUploadCheck>

				{images.length > 0 && (
					<div className={`fs-image-gallery-preview fs-image-gallery--caption-style--${attributes.caption_style}`} data-count={images.length}>
						{images.map((image, index) => (
							<div key={image.id} className="fs-image-gallery-preview__item">
								<Button
									onClick={() => onRemoveImage(index)}
									isDestructive
									className="fs-image-gallery-preview__item__remove"
									size="small"
								>
									{__('X', 'image-gallery-block')}
								</Button>
								<div style={{backgroundImage: `url('${image.url}')`}} className="fs-image-gallery-preview__item__image"></div>
								{image.caption && (
									<div className="fs-image-gallery-preview__item__caption">{image.caption}</div>
								)}
							</div>
						))}
					</div>
				)}

				{images.length === 0 && (
					<p className="image-gallery-placeholder">
						{__('No images selected. Click the button above to add images.', 'image-gallery-block')}
					</p>
				)}
			</div>
		</div>
	);
}
