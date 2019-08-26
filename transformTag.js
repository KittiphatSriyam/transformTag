var sanitizeHtml = require("sanitize-html");
let html = `<div style="width:100%"><div style="text-align:center"></div><br/><div style="display:inline-block;width:47%"><div><p style="font-weight:bold;">ชื่อ</p></div><div><div>esrewrwet</div></div></div><div style="display:inline-block;width:47%"><div><p style="font-weight:bold;">นามสกุล</p></div><div><div>wetewt</div></div></div><br/><div style="display:inline-block;width:96%"><div><p style="font-weight:bold;">กรอกรายละเอียด</p></div><div><div>wtwetew</div></div></div><br/><div style="display:inline-block;width:31%"><div><p style="font-weight:bold;">วันที่โอน</p></div><div><div>08-20-2019</div></div></div><div style="display:inline-block;width:30%"><div><p style="font-weight:bold;">ช่องทางการชำระ</p></div><div><div><div style="width:350px"><div style="width:140px"><div>ธนาคาร</div></div></div></div></div></div><div style="display:inline-block;width:31%"><div><p style="font-weight:bold;">เลชบัญชี</p></div><div><div><div style="width:350px"><div style="width:140px;display:inline-block"><div>-1234-567-890</div></div></div></div></div></div><br/><div style="display:inline-block;width:96%"><div><p style="font-weight:bold;">ClicktoEditText</p></div><div>NoFileUpload</div></div></div><br/><div style="display:inline-block;width:31%"><div><p style="font-weight:bold;">ClicktoEditText</p></div><div><div><div style="width:350px"><div style="width:140px;display:inline-block">OptioOptio</div></div></div></div></div><div style="display:inline-block;width:30%"><div><p style="font-weight:bold;">ClicktoEditText</p></div><div><div><div style="width:350px"><div style="width:140px;display:inline-block">OptioOptio</div></div></div></div></div><div style="display:inline-block;width:31%"></div><br/><div style="display:inline-block;width:31%"></div><div style="display:inline-block;width:30%"><div style="display:inline-block;font-size:30px;width:90%"><p style="font-weight:bold;">ClicktoEditText</p></div><br/></div><div style="display:inline-block;width:31%"><div style="display:inline-block;width:100%"><p style="font-weight:bold;">ClicktoEditText</p></div><br/><br/></div><br/><div style="display:inline-block;width:31%"></div><div style="display:inline-block;width:30%"><div><p style="font-weight:bold;">ClicktoEditText</p></div><div><div>จังหวัด:กรุงเทพมหานคร<br/>อำเภอ/เขต:เขตพระนคร<br/>ตำบล/แขวง:พระบรมมหาราชวัง<br/>รหัสไปรษณีย์:10200</div></div></div><div style="display:inline-block;width:31%"></div><br/><a href="http://localhost/Files/Name/"></a><br/>`;

const transformTagTD = html => {
  var contentSantize = sanitizeHtml(html, {
    allowedTags: false,
    allowedAttributes: false,
    transformTags: {
      div: function(tagName, attribs) {
        if (attribs.style) {
          let attr = attribs.style.match(/display:inline-block;width:\d{2}%/gi);
          if (attr != null) {
            return {
              tagName: "td",
              attribs: attribs
            };
          }
        }

        return {
          tagName: "div",
          attribs: attribs
        };
      }
    }
  });
  return contentSantize;
};
const transformTagTR = html => {
  html = html.replace(/<br \/><br \/>/gi, "");
  html = html.replace(/<br \/><\/td>/gi, "</td>");

  let countBR = html.split(/<br\s?\/>/gi);

  let i = 1;
  html = html.replace(
    /(<\/td><br\s?\/>|<\/div><br\s?\/>|<\/a><br\s?\/>)/gi,
    Tag => {
      if (i == 1) {
        return Tag.replace(/<br\s?\/>/gi, "<tr>");
      } else {
        if (i == countBR.length - 1) {
          return Tag.replace(/<br\s?\/>/gi, "</tr>");
        } else {
          return Tag.replace(/<br\s?\/>/gi, "</tr><tr>");
        }
      }
      i++;
    }
  );
  return html;
};

html = transformTagTD(html);
html = transformTagTR(html);

html = `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0" /><meta http-equiv="X-UA-Compatible" content="ie=edge" /><title>Custom Form</title><style>table tr td {border-collapse: collapse;border-style: hidden;border: none;}</style></head><body><table style="width:100%" cellspacing="0" cellpadding="0">${html}</table></body></html>`;
console.log("html->>", html);
var wordDocumentLinkURL =
  "data:application/vnd.ms-word;charset=utf-8," + encodeURIComponent(html);
// console.log("wordDocumentLinkURL->>", wordDocumentLinkURL);
