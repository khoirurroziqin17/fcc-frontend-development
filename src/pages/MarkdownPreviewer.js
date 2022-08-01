import React from "react";
import { marked } from "marked";
import "../markdown.css";

const renderer = new marked.Renderer();
renderer.link = function (href, title, text) {
  return `<a href=${href} target="_blank">
      ${text}
    </a>`;
};

function MarkdownPreviewer() {
  const [markdown, setMarkdown] = React.useState(placeholder);

  function renderEditor() {
    return (
      <div
        style={{
          flex: 1,
          padding: 16,
        }}
      >
        <h3>Editor</h3>
        <textarea
          id="editor"
          style={{
            width: "100%",
            height: "80vh",
          }}
          value={markdown}
          onChange={(e) => setMarkdown(e.target.value)}
        />
      </div>
    );
  }

  function renderPreview() {
    return (
      <div
        style={{
          flex: 1,
          padding: 16,
        }}
      >
        <h3>Preview</h3>
        <div
          id="preview"
          dangerouslySetInnerHTML={{ __html: marked(markdown, { renderer }) }}
        />
      </div>
    );
  }

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
      }}
    >
      {/* Editor */}
      {renderEditor()}
      {/* Preview */}
      {renderPreview()}
    </div>
  );
}

const placeholder = `# Welcome to my React Markdown Previewer!

## This is a sub-heading...
### And here's some other cool stuff:

Heres some code, \`<div></div>\`, between 2 backticks.

\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`

You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://www.freecodecamp.org), and
> Block Quotes!

And if you want to get really crazy, even tables:

Wild Header | Crazy Header | Another Header?
------------ | ------------- | -------------
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.


1. And there are numbered lists too.
1. Use just 1s if you want!
1. And last but not least, let's not forget embedded images:

![freeCodeCamp Logo](https://cdn.freecodecamp.org/testable-projects-fcc/images/fcc_secondary.svg)
`;

export default MarkdownPreviewer;
