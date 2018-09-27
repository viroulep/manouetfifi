import {} from "selectize";
import _ from "lodash";

window.manouetfifi = window.manouetfifi || {};

const defaultRenderFunc = (style, data) => `<div class="${style}">${data.text}</div>`;

const searchFields = ['name', 'invited_by'];

window.manouetfifi.enableSelectize = function(tag_options, renderFunc = defaultRenderFunc) {
  $(".enable-selectize").each(function() {
    $(this).selectize({
      plugins: ['remove_button'],
      delimiter: ',',
      persist: false,
      options: tag_options,
      create: false,
      searchField: searchFields,
      render: {
        option: _.partial(renderFunc, "option"),
        item: _.partial(renderFunc, "item"),
      },
    });
    $(this).removeClass("enable-selectize");
  });
}
