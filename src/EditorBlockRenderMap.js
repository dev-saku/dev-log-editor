import { DefaultDraftBlockRenderMap } from 'draft-js';
import { Map } from 'immutable';
import {
    MyCustomBlock,
    TitleBlock,
    SubTitleBlock,
    QuoteBlock,
    CodeBlock,
    OrderedListBlock,
} from './MyCustomBlock';

const blockRenderMap = Map({
    title: {
        element: 'h1',
        wrapper: <TitleBlock />,
    },
    subTitle: {
        element: 'h2',
        wrapper: <SubTitleBlock />,
    },
    quote: {
        element: 'p',
        wrapper: <QuoteBlock />,
    },
    codeBlock: {
        element: 'code',
        wrapper: <CodeBlock />,
    },
    headline: {
        element: 'h3',
        wrapper: <div className='headline' />,
    },
    ol: {
        element: 'p',
        wrapper: <div className='orderedList' />,
    },
});

export const extendedBlockRenderMap =
    DefaultDraftBlockRenderMap.merge(blockRenderMap);
