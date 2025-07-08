// Utility to sanitize user content (basic HTML escaping)
function escapeHtml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export function generateHTML(blocks) {
  const blockHTML = blocks
    .map((block) => {
      switch (block.type) {
        case "text":
          return `
            <div style="
              font-size: ${block.content.fontSize || 14}px;
              color: ${block.content.color || "#000000"};
              font-weight: ${block.content.fontWeight || "normal"};
              text-align: ${block.content.textAlign || "left"};
              padding: ${block.styles.padding || "16px"};
              background-color: ${block.styles.backgroundColor || "transparent"};
            ">
              ${escapeHtml(block.content.text || "")}
            </div>
          `;

        case "image":
          return `
            <div style="
              padding: ${block.styles.padding || "16px"};
              background-color: ${block.styles.backgroundColor || "transparent"};
            ">
              <img 
                src="${block.content.src || ""}" 
                alt="${escapeHtml(block.content.alt || "")}"
                style="
                  width: ${block.content.width || "100%"};
                  height: auto;
                  display: block;
                  max-width: 100%;
                "
              />
            </div>
          `;

        case "button":
          return `
            <div style="
              padding: ${block.styles.padding || "16px"};
              background-color: ${block.styles.backgroundColor || "transparent"};
              text-align: center;
            ">
              <a href="${block.content.href || "#"}" style="
                display: inline-block;
                padding: 12px 24px;
                background-color: ${block.content.backgroundColor || "#000"};
                color: ${block.content.textColor || "#fff"};
                text-decoration: none;
                border-radius: ${block.content.borderRadius || 4}px;
                font-weight: 500;
              ">
                ${escapeHtml(block.content.text || "Click Me")}
              </a>
            </div>
          `;

        case "divider":
          return `
            <div style="
              padding: ${block.styles.padding || "16px"};
              background-color: ${block.styles.backgroundColor || "transparent"};
            ">
              <hr style="
                border: none;
                height: ${block.content.height || 1}px;
                background-color: ${block.content.color || "#ccc"};
                margin: 0;
              " />
            </div>
          `;

        case "spacer":
          return `
            <div style="
              height: ${block.content.height || 20}px;
              background-color: ${block.styles.backgroundColor || "transparent"};
            "></div>
          `;

        default:
          return "";
      }
    })
    .join("");

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Email Template</title>
      <style>
        body {
          margin: 0;
          padding: 0;
          font-family: Arial, sans-serif;
          line-height: 1.6;
          background-color: #f4f4f4;
        }
        .email-container {
          max-width: 600px;
          margin: 0 auto;
          background-color: #ffffff;
        }
      </style>
    </head>
    <body>
      <div class="email-container">
        ${blockHTML}
      </div>
    </body>
    </html>
  `;
}

export function generateJSON(blocks) {
  return JSON.stringify(
    {
      version: "1.0",
      blocks: blocks,
    },
    null,
    2
  );
}

export function processMergeTags(content, data = {}) {
  return content.replace(/\{\{(\w+)\}\}/g, (match, key) => data[key] || match);
}
