import _extends from 'babel-runtime/helpers/extends';
import React from 'react';
import { reactify } from './reactify';

//ccimport { ExtReact } from '@extjs/ext-react';
//var ExtReact = reactify('ExtReact')

import { settings } from './reactify';
export { reactify };

export function l(name, val, val2, val3, val4) {
  if (settings.debug) {
    console.group(name);
    if (val != undefined) {
      console.log(val);
    }
    if (val2 != undefined) {
      console.log(val2);
    }
    if (val3 != undefined) {
      console.log(val3);
    }
    if (val4 != undefined) {
      console.log(val4);
    }
    console.groupEnd();
  }
}

import ReactDOM from 'react-dom';
import './overrides';
import { configure } from './reactify';

export { default as Template } from './Template';
export { default as renderWhenReady } from './renderWhenReady';

var Ext = window.Ext;

export function go(_ref) {
  var callback = _ref.callback,
      element = _ref.element;

  debugger;
  Ext.namespace('Ext.reactor').ReactDOM = ReactDOM; // needed for RendererCell and any other components that can render React elements;
  //var rootEl = rootElement
  // 
  Ext.application({
    name: '$ExtReactApp',
    //    ...appConfig,
    launch: function launch() {
      debugger;
      if (Ext.Viewport && Ext.Viewport.getRenderTarget) {
        // modern, ext-react
        var target = Ext.Viewport.getRenderTarget().dom;
        if (callback != undefined) {
          var rootElement = element;
          //        if (typeof rootComponent === 'function') {
          //r theElement = React.createElement(rootElement,null)

          //rootComponent(<ExtReact></ExtReact>, target);
          //rootComponent(rootElement, target);
          //var theElements = <ExtReact> <element/> </ExtReact>

          var appElement = React.createElement(rootElement);
          //var v1 = React.isValidElement(e1)
          //var m = React.Children.map(rootElement, null)
          //var o1 = React.Children.only(e1)

          var theElements = React.createElement(ExtReact, null, [].concat(appElement));
          //var theElements = React.createElement(ExtReact,null,React.createElement(element,null,null))
          //var theElements = React.createElement(element)

          callback(theElements, target);
        }
        if (rootComponent) {
          ReactDOM.render(React.createElement(
            ExtReact,
            null,
            'React.createElement(rootComponent,null)'
          ), target);
        }
      } else {
        // classic
        if (options.viewport || rootComponent) {
          var style = document.createElement('style');
          style.innerHTML = 'html, body, div[reactroot] { height: 100%; }';
          document.head.appendChild(style);
        }

        var _target = document.createElement('div');
        _target.setAttribute('reactroot', 'on');
        _target.setAttribute('class', 'reactroot');
        document.body.appendChild(_target);

        if (typeof rootComponent === 'function') {
          rootComponent = rootComponent(_target);
        }

        if (rootComponent) {
          ReactDOM.render(rootComponent, _target);
        }
      }
    }
  });
}

/**
 * Launches an ExtReact application, creating a viewport and rendering the specified root component into it.
 * @xparam {React.Component/Function} rootComponent You application's root component, or a function that returns the root component.
 * @xparam {Object} [options] Additional config parameters for reactor.
 * @xparam {Object} options.debug Set to true to show debug information in the console related to creating, updating, and destroying Ext JS components.
 * @xparam {Object} options.viewport  When using Ext JS classic, set to true to have the root component sized to the full height and width of the window.
 * @xparam {Object} [appConfig] Additional config parameters for Ext.application
 */
export function launch(rootComponent) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : { debug: false, viewport: false };
  var appConfig = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  configure(options);
  Ext.namespace('Ext.reactor').ReactDOM = ReactDOM; // needed for RendererCell and any other components that can render React elements;

  // 
  Ext.application(_extends({
    name: '$ExtReactApp'
  }, appConfig, {
    launch: function launch() {
      if (Ext.Viewport && Ext.Viewport.getRenderTarget) {
        // modern, ext-react
        var target = Ext.Viewport.getRenderTarget().dom;
        if (typeof rootComponent === 'function') {
          rootComponent = rootComponent(target);
        }
        if (rootComponent) {
          ReactDOM.render(rootComponent, target);
        }
      } else {
        // classic
        if (options.viewport || rootComponent) {
          var style = document.createElement('style');
          style.innerHTML = 'html, body, div[reactroot] { height: 100%; }';
          document.head.appendChild(style);
        }

        var _target2 = document.createElement('div');
        _target2.setAttribute('reactroot', 'on');
        _target2.setAttribute('class', 'reactroot');
        document.body.appendChild(_target2);

        if (typeof rootComponent === 'function') {
          rootComponent = rootComponent(_target2);
        }

        if (rootComponent) {
          ReactDOM.render(rootComponent, _target2);
        }
      }
    }
  }));
}

/**
 * Configures React to resolve jsx tags.
 * @deprecated
 * @param {Object} options
 * @param {String} options.viewport When true, adds a stylesheet that mimics an Ext JS Viewport
 *  by setting the html, body, and react root element to height: 100%. Set this to true when using an
 *  Ext JS component at the root of your app.
 */
export function install(options) {
  if (options.viewport) {
    console.warn('[@extjs/reactor] Warning: install({ viewport: true }) is deprecated.  Use launch(<App/>) in place of Ext.onReady(() => ReactDOM.render(<App/>, document.getElementById(\'root\'))).');
  } else {
    console.warn('[@extjs/reactor] Warning: install() is deprecated.  Use launch(() => ReactDOM.render(<App/>, document.getElementById(\'root\'))) in place of Ext.onReady(() => ReactDOM.render(<App/>, document.getElementById(\'root\'))).');
  }

  launch(null, options);
};
//# sourceMappingURL=index.js.map