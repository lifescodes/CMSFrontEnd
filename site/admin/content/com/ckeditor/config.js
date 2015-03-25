/**
 * @license Copyright (c) 2003-2015, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or http://ckeditor.com/license
 */

CKEDITOR.editorConfig = function( config ) {
	// Define changes to default configuration here. For example:
	// config.language = 'fr';
	config.uiColor = '#AADC6E';
	config.lang='en';
	config.toolbar_full =  [
		{ name: 'basicstyles', items: [ 'Bold', 'Italic', 'Strike', 'Underline' ] },
		{ name: 'paragraph', items: [ 'BulletedList', 'NumberedList', 'Blockquote' ] },
		{ name: 'editing', items: ['JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock' ] },
		{ name: 'links', items: [ 'Link', 'Unlink', 'Anchor' ] },
		{ name: 'tools', items: [ 'SpellChecker', 'Maximize' ] },
		'/',
		{ name: 'styles', items: [ 'Format', 'FontSize', 'TextColor', 'PasteText', 'PasteFromWord', 'RemoveFormat' ] },
		{ name: 'insert', items: [ 'Image', 'Table', 'SpecialChar' ] },
		{ name: 'forms', items: [ 'Outdent', 'Indent' ] },
		{ name: 'clipboard', items: [ 'Undo', 'Redo' ] },
		//Adds PBCKCode button to CKeditor panel
		{ name: 'document', items: [ 'PageBreak', 'Source', 'pbckcode' ] }
	];
	//adds PBCKCode plugin
	config.extraPlugins= 'timestamp';
	//configuration for PBCKcode
	// pbckcode: {'highlighter': 'PRETTIFY'}
};
