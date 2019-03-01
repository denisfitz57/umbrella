import { AppContext } from "../api";
import { USER_LIST, HOME, CONTACT } from "../routes";

import { routeLink } from "./route-link";

/**
 * Main nav component with hard coded routes.
 *
 * @param ctx injected context object
 */
export function nav(ctx: AppContext) {
    const ui = ctx.ui.nav;
    return [
        "nav",
        ["h1", ui.title, "Demo app"],
        [
            "div",
            ui.inner,
            [routeLink, HOME.id, null, ui.link, "Home"],
            [routeLink, USER_LIST.id, null, ui.link, "Users"],
            [routeLink, CONTACT.id, null, ui.linkLast, "Contact"]
        ]
    ];
}
