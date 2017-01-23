define("dummy/templates/application", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["multiple-nodes", "wrong-type"]
        },
        "revision": "Ember@2.5.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 17,
            "column": 0
          }
        },
        "moduleName": "dummy/templates/application.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("h2");
        dom.setAttribute(el1, "id", "title");
        var el2 = dom.createTextNode("Welcome to Ember");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(2);
        morphs[0] = dom.createMorphAt(fragment, 2, 2, contextualElement);
        morphs[1] = dom.createMorphAt(fragment, 4, 4, contextualElement);
        return morphs;
      },
      statements: [["inline", "multi-input", [], ["inputs", ["subexpr", "@mut", [["get", "inputs", ["loc", [null, [3, 9], [3, 15]]]]], [], []], "validation", ["subexpr", "action", ["validation"], [], ["loc", [null, [4, 13], [4, 34]]]], "type", "email", "uniqness", true, "max", ["subexpr", "@mut", [["get", "max", ["loc", [null, [7, 6], [7, 9]]]]], [], []], "onEnter", true, "onSpace", true, "onAction", false, "clearOnBlur", false, "alwaysShowPlaceholder", false, "placeholder", "placehoder", "mustValidate", true], ["loc", [null, [2, 0], [15, 2]]]], ["content", "outlet", ["loc", [null, [16, 0], [16, 10]]]]],
      locals: [],
      templates: []
    };
  })());
});