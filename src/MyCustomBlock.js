import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter/dist/cjs/prism';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';

export class MyCustomBlock extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <div className='MyCustomBlock'>{this.props.children}</div>;
    }
}

export class TitleBlock extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <div className='titleText'>{this.props.children}</div>;
    }
}

export class SubTitleBlock extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <div className='subTitleText'>{this.props.children}</div>;
    }
}

export class QuoteBlock extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <div className='quote'>{this.props.children}</div>;
    }
}

export class CodeBlock extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <pre>{this.props.children}</pre>;
    }
}
