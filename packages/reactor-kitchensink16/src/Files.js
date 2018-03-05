import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TabPanel, Panel } from '@extjs/ext-react';
import hljs, { highlightBlock } from 'highlightjs';

// JSX syntax highlighting
import 'highlightjs/styles/atom-one-dark.css';
import H_js from './H_js';
hljs.registerLanguage('js', H_js);

Ext.require('Ext.panel.Resizer');

function codeClassFor(file)  {
    if (file.endsWith('.css')) {
        return 'css';
    } else {
        return 'js xml'
    }
}

export default class Files extends Component {

    static propTypes = {
        files: PropTypes.object
    }

    componentWillMount() {
      this._refs = {};
    }

    componentDidMount() {
        this.highlightCode();
    }

    componentDidUpdate(prev) {
        if (this.props.files !== prev.files) {
            this.highlightCode();
        }
    }    

    highlightCode() {
      console.log(`tabstabstabstabstabstabstabstabs`)
      console.log(this._refs[`tabs`])
      var tabs = this._refs[`tabs`]
      // if (tabs) for (let el of tabs.el.query('.code')) {
      //     highlightBlock(el);
      // }
    }
    //ref="tabs"
    //https://github.com/facebook/react/issues/7371
    render() {
        const { files } = this.props;

        return (
            <TabPanel 
                ref={(c) => this._refs[`tabs`] = c }
                shadow
                tabBar={{
                    layout: {
                        pack: 'left'
                    }
                }}
            >
                { Object.keys(files).map((file, i) => (
                    <Panel 
                        key={i}
                        scrollable={true}
                        title={file}
                        layout="fit"
                        ui="code-panel"
                        tab={{
                            ui: 'app-code-tab',
                            flex: 0,
                            minWidth: 120
                        }}
                        userSelectable
                        html={`<pre><code class="code ${codeClassFor(file)}">${files[file].replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>`}
                    />
                ))}
            </TabPanel>        
        )
    }

}