!(function () {
  function loadScript(url) {
    var parentElement = document.body || document.head;
    var scriptElement = document.createElement('script');

    scriptElement.src = url;
    scriptElement.async = true;
    scriptElement.id;
    scriptElement.crossOrigin = 'anonymous';

    parentElement.appendChild(scriptElement);
  }

  function loadStyle(url) {
    var parentElement = document.body || document.head;
    var linkElement = document.createElement('link');

    linkElement.rel = 'stylesheet';
    linkElement.href = url;

    linkElement.crossOrigin = 'anonymous';

    parentElement.appendChild(linkElement);
  }

  function appendReactAppContainer() {
    var containerElement = document.createElement('div');
    containerElement.id = 'file-extension';
    document.body.appendChild(containerElement);
  }

  var pathToEntryFile = 'http://localhost:5173/dist/assets/app.js';
  var pathToAssetsFile = 'http://localhost:5173/dist/assets/style.css';

  var scripts = document.getElementsByTagName('script');
  var src = scripts[scripts.length - 1].src;
  var queryString = src.split('?')[1];

  var urlParams = new URLSearchParams(queryString);

  const paramsKeys = {
    top: 'widgettop',
    left: 'widgetleft',
    right: 'widgetright',
    bottom: 'widgetbottom',
  };
  const [top, left, right, bottom] = [
    urlParams.get(paramsKeys.top),
    urlParams.get(paramsKeys.left),
    urlParams.get(paramsKeys.right),
    urlParams.get(paramsKeys.bottom),
  ];

  window.localStorage.setItem(
    'widget',
    JSON.stringify({ top, left, right, bottom })
  );

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      loadStyle(pathToAssetsFile);
      loadScript(pathToEntryFile);
      appendReactAppContainer();
    });
  } else {
    loadStyle(pathToAssetsFile);
    loadScript(pathToEntryFile);
    appendReactAppContainer();
  }
})();
