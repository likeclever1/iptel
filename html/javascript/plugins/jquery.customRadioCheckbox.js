(function ($) {
    $.CustomData = {
        elements:$()
    };

    $.fn.extend({

        Custom:function (options) {

            var elements = this;
            $.CustomData.elements = $.CustomData.elements.add(elements);

            var defaults = {
                customStyleClass:"checkbox",
                customHeight:"16",
                enableHover:false
            };

            options = $.extend(defaults, options);

            var pushed = function () {
                var element = $(this).children('input');
                if (element.prop('checked')) {
                    
                    $(this).css('backgroundPosition', "0px -" + options.customHeight * 3 + "px");
                } else {
                    $(this).css('backgroundPosition', "0px -" + options.customHeight + "px");
                }
            };

            var check = function () {
                var el = $(this);
                var element = el.children('input');

                if (element.prop('checked') && element.is(':checkbox')) {
                    el.css('backgroundPosition', '0px 0px');
                    element.prop('checked', false).change();

                } else {
                    if (element.is(':checkbox')) {
                        el.css('backgroundPosition', "0px -" + options.customHeight * 2 + "px");
                    } else {
                        el.css('backgroundPosition', "0px -" + options.customHeight * 2 + "px");
                        $('input[name="' + element.attr('name') + '"]').not(element).parent().css('backgroundPosition', '0px 0px');
                    }

                    element.prop('checked', true).change();
                }

            };

            var update = function () {
                $.CustomData.elements.each(function () {
                    var el = $(this);
                    if (el.prop('checked')) {
                        el.parent().css('backgroundPosition', "0px -" + el.attr('data-height') * 2 + "px");
                    } else {
                        el.parent().css('backgroundPosition', "0px 0px");
                    }
                });
            };

            var refresh = function () {
                var el = $(this);
                el.parent()[!el.prop('disabled') ? 'bind' : 'unbind']({mousedown:pushed, mouseup:check})[!el.prop('disabled') ? 'removeClass' : 'addClass']('disabled');
                !el.prop('disabled') ? hoverBind(el) : $('label[for="' + el.attr('id') + '"]').unbind("mouseenter.label").unbind("mouseout.label");
            };

            var hoverBind = function (element) {
                var el = element;
                var span = el.parent();

                if (options.enableHover && !el.prop('disabled')) {
                    $('label[for="' + el.attr('id') + '"]').bind({
                        "mouseenter.label":function () {
                            if (el.prop('checked')) {
                                span.css('backgroundPosition', "0px -" + el.attr('data-height') * 3 + "px");
                            } else {
                                span.css('backgroundPosition', "0px -" + el.attr('data-height') + "px");
                            }
                        },
                        "mouseout.label":function () {
                            if (el.prop('checked')) {
                                span.css('backgroundPosition', "0px -" + el.attr('data-height') * 2 + "px");
                            } else {
                                span.css('backgroundPosition', "0px 0px");
                            }
                        }
                    });
                }
            };

            return this.each(function () {
                var el = $(this);
                if (el.attr('data-init') != '1') {
                    el.attr({'data-init':'1', 'data-height':options.customHeight}).wrap('<span/>');

                    var span = el.parent().addClass(options.customStyleClass);

                    if (el.prop('checked')) { 
                        span.css('backgroundPosition', "0px -" + (options.customHeight * 2) + "px");
                    }

                    hoverBind(el);

                    el.bind({change:update, 'custom.refresh':refresh});

                    if (!el.prop('disabled')) {
                        span.parent('label').length ? span.bind({mousedown:pushed}) : span.bind({mousedown:pushed, mouseup:check});
                    } else {
                        span.addClass('disabled');
                    }

                }
            });
        }
    });

})(jQuery);