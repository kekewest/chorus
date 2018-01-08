import { ElementBase } from "app/sheet/element/element-base";
import * as marked from 'marked';
import { SafeHtml, DomSanitizer } from "@angular/platform-browser";

export class TextArea extends ElementBase {

  elementName: string = "TextArea";

  constructor(
    public posX?: number,
    public posY?: number,
    public text?: string,
    private safeHtmlCache?: SafeHtml
  ) {
    super(posX, posY);
  }

  getSafeHtmlCache(domSanitizer: DomSanitizer) {
    if (!this.safeHtmlCache) {
      this.safeHtmlCache = domSanitizer.bypassSecurityTrustHtml(marked(this.text));
    }
    return this.safeHtmlCache;
  }

  clearSafeHtmlCache() {
    this.safeHtmlCache = null;
  }

  toJSON(): TextArea {
    return new TextArea(this.posX, this.posY, this.text, null);
  }

  fromJSON(json: any): TextArea {
    if (!json) {
      return null;
    }
    super.fromJSON(json);

    this.text = json.text;
    this.safeHtmlCache = null;
    
    return this;
  }

}
