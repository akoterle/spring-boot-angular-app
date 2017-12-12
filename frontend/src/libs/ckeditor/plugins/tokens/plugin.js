'use strict';

(function() {
  CKEDITOR.plugins.add('tokens', {
    requires: ['richcombo'], //, 'styles' ],
    init: function(editor) {
      var config = editor.config,
        lang = editor.lang.format;

      // Gets the list of tags from the settings.
      var tags = []; //new Array();
      //this.add('value', 'drop_text', 'drop_label');
      tags[0] = ['firstName', 'firstName', 'Nome'];
      tags[1] = ['lastName', 'lastName', 'Cognome'];
      tags[2] = ['email', 'email', 'eMail'];
      tags[3] = ['username', 'username', 'Nome utente'];

      // Create style objects for all defined styles.

      editor.ui.addRichCombo('placeholders', {
        label: 'Segnaposto',
        title: 'Segnaposto',
        voiceLabel: 'Segnaposto',
        className: 'cke_format',
        multiSelect: false,

        panel: {
          css: [config.contentsCss, CKEDITOR.getUrl('skins/' + config.skin + '/editor.css')],
          voiceLabel: lang.panelVoiceLabel
        },

        init: function() {

          this.startGroup('Segnaposto');
          //this.add('value', 'drop_text', 'drop_label');
          for (var this_tag in tags) {
            this.add(tags[this_tag][0], tags[this_tag][1], tags[this_tag][2]);
          }
          // editor.buildList = undefined
          // var rebuildList = CKEDITOR.tools.bind(editor.buildList, this);
          // rebuildList();
          // $(editor).bind('rebuildList', rebuildList);
          this._.list.element.setAttribute('title', 'Segnaposto')
        },

        onClick: function(value) {
          editor.focus();
          editor.fire('saveSnapshot');
          editor.insertHtml('['+value+']');
          editor.fire('saveSnapshot');
        }
      }); // .setAttribute('aria-label', 'Tokens');;
    }
  });
})();
