/**
 * @license Copyright (c) 2003-2017, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or http://ckeditor.com/license
 */

CKEDITOR.editorConfig = function(config) {
  // Define changes to default configuration here.
  // For complete reference see:
  // http://docs.ckeditor.com/#!/api/CKEDITOR.config

  // The toolbar groups arrangement, optimized for two toolbar rows.

  config.toolbarGroups = [
    { name: 'clipboard', groups: ['clipboard', 'undo'] },
    { name: 'editing', groups: ['find', 'selection', 'spellchecker'] },
    { name: 'links' },
    { name: 'insert' },
    { name: 'forms' },
    { name: 'tools' },
    { name: 'document', groups: ['mode', 'document', 'doctools'] },
    '/',
    { name: 'others' },
    { name: 'basicstyles', groups: ['basicstyles', 'cleanup'] },
    { name: 'paragraph', groups: ['list', 'indent', 'blocks', 'align', 'bidi'] },
    { name: 'styles' },
    { name: 'colors' },
    { name: 'about' }
  ];

  // [config]="{extraPlugins: 'divarea'}"
  config.extraPlugins = 'divarea,placeholder,richcombo,tokens';

  config.resize_enabled = false;
  config.allowedContent = true;
  config.height = 300;
  config.language = 'it';
  config.skin = 'moonocolor';

  // Upload images to a CKFinder connector (note that the response type is set to JSON).
  // config.uploadUrl = '/ckfinder/core/connector/php/connector.php?command=QuickUpload&type=Files&responseType=json';

  // Configure your file manager integration. This example uses CKFinder 3 for PHP.
  // filebrowserBrowseUrl: '/ckfinder/ckfinder.html',
  // filebrowserImageBrowseUrl: '/ckfinder/ckfinder.html',
  // filebrowserUploadUrl: '/ckfinder/core/connector/php/connector.php?command=QuickUpload&type=Files',
  // filebrowserImageUploadUrl: '/ckfinder/core/connector/php/connector.php?command=QuickUpload&type=Images',

  // The following options are not necessary and are used here for presentation purposes only.
  // They configure the Styles drop-down list and widgets to use classes.

  // config.stylesSet = [
  //   { name: 'Narrow image', type: 'widget', widget: 'image', attributes: { class: 'image-narrow' } },
  //   { name: 'Wide image', type: 'widget', widget: 'image', attributes: { class: 'image-wide' } }
  // ];

  // Load the default contents.css file plus customizations for this sample.
  // config.contentsCss = [CKEDITOR.basePath + 'contents.css', 'http://sdk.ckeditor.com/samples/assets/css/widgetstyles.css'];

  // Configure the Enhanced Image plugin to use classes instead of styles and to disable the
  // resizer (because image size is controlled by widget styles or the image takes maximum
  // 100% of the editor width).

  // config.image2_alignClasses = ['image-align-left', 'image-align-center', 'image-align-right'];
  // config.image2_disableResizer = true;

  // Remove some buttons provided by the standard plugins, which are
  // not needed in the Standard(s) toolbar.
  config.removeButtons = 'Image,CreatePlaceholder,Maximize,Anchor,Underline,Subscript,Superscript,About,SpecialChar,Table';

  // Set the most common block elements.
  config.format_tags = 'p;h1;h2;h3;pre';

  // Simplify the dialog windows.
  config.removeDialogTabs = 'image:advanced;image:upload;image:Link;link:advanced';
  // config.filebrowserImageUploadUrl = '/uploader/upload.php?type=Images';
};
