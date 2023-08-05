import MarkdownRender from './MarkdownRender.vue';
import { markedHighlight } from 'marked-highlight';
import hljs from 'highlight.js';
import { marked } from 'marked';

marked.use(
  markedHighlight({
    highlight(code) {
      return hljs.highlightAuto(code).value;
    },
  }),
);

export default MarkdownRender;
