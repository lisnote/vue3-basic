export { default } from './MarkdownRender.vue';
import { marked } from 'marked';
import hljs from 'highlight.js';
import { markedHighlight } from 'marked-highlight';
import { gfmHeadingId } from 'marked-gfm-heading-id';

marked.use(
  markedHighlight({
    highlight(code) {
      return hljs.highlightAuto(code).value;
    },
  }),
  gfmHeadingId({ prefix: 'marked-heading-' }),
);
