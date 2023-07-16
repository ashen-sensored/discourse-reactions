import { h } from "virtual-dom";
import { createWidget } from "discourse/widgets/widget";
import RawHtml from "discourse/widgets/raw-html";
import { emojiUnescape } from "discourse/lib/text";

export default createWidget("discourse-reactions-list-dunit-button", {
  tagName: "div.discourse-reactions-list-dunit-button.reactionInner",
  click() {
    // this.callWidgetFunction("cancelCollapse");

    const postReacted = this.attrs.post.current_user_reaction;
    const currentEmojiReacted = this.attrs.post.current_user_reaction?.id === this.attrs.reaction.id;
    // if (!this.capabilities.touch || !this.site.mobileView) {
    if (!(postReacted && !currentEmojiReacted)) {
      this.callWidgetFunction("toggleFromEmoji", {
        reaction: this.attrs.reaction.id
      });
    }
    // }
  },
  html(attrs) {
    const reaction = attrs.reaction;
    const rawEmoji = new RawHtml({
      html: emojiUnescape(`:${reaction.id}:`, {
        skipTitle: true,
        class: this.siteSettings
          .discourse_reactions_desaturated_reaction_panel
          ? "desaturated"
          : "",
      })
    });
    const emoji_part = h("div", rawEmoji);
    const count_part = h("div.reactionCount", attrs.reaction.count.toString());

    return [
      emoji_part,count_part
    ];
  },
});
