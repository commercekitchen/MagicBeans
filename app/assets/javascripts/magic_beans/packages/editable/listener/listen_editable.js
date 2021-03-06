Listeners.Editable = {
	run: function(){
		Bean.debug('Initializing WYSIWYG Editors', function(){
			$('[data-editable]').each(function(){
				var $this = $(this);

				var options = {
					elementpath: false,
					statusbar: false,
					menubar: false,
					resize: false,
					skin_url: $this.data('editable') == 'lightgray' ? '/assets/tinymce/skins/lightgray' : '/assets/' + $this.data('editable'),
					skin: $this.data('editable'),
					toolbar: $this.data('toolbar') || 'bold italic underline',
					plugins: $this.data('plugins'),
					width: '100%',
					height: $this.height(),
					body_class: $this.attr('class'),
					content_css: Bean.Config.get('stylesheet'),
					init_instance_callback: function(editor){
						$(editor.editorContainer).addClass($this.attr('class'));
						var position = $this.data('position') || 'top';
						if(position.toString().toLowerCase() == 'bottom'){
							var toolbar = $(editor.editorContainer).find('.mce-toolbar-grp');
							var editArea = $(editor.editorContainer).find('.mce-edit-area');
							editArea.after(toolbar).css('border', 'none');
						}
					},
					setup: function(editor){
						editor.on('focus blur', function(event){
							$(editor.targetElm).trigger('pseudo:' + event.type);
							$(editor.editorContainer).toggleClass('pseudo-focus', event.type == 'focus');
						});
					}
				};

				$this.tinymce(options);

				Bean.debug('Initialized WYSIWYG Editor', function(){
					Bean.debug('Element: %o', $this);
					Bean.debug('Options: %O', options);
				});
			});
		});
	}
};