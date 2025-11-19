<?php
// This file is generated. Do not modify it manually.
return array(
	'fs-image-gallery' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'fsig/fs-image-gallery',
		'version' => '0.1.0',
		'title' => '4Site Image Gallery',
		'category' => 'media',
		'icon' => 'images-alt2',
		'description' => 'Provides an image gallery block for the Gutenberg editor.',
		'example' => array(
			
		),
		'attributes' => array(
			'images' => array(
				'type' => 'array',
				'default' => array(
					
				)
			)
		),
		'supports' => array(
			'html' => false,
			'align' => array(
				'wide',
				'full'
			)
		),
		'textdomain' => 'fs-image-gallery',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css',
		'viewScript' => 'file:./view.js'
	)
);
