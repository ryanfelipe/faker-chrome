const contexts = [
    "editable"
];

/**
 * Create simple generator item.
 *
 * @param title
 * @param id
 * @param parentId
 * @param parentAction
 * @param action
 * @returns {any}
 */
const createSimpleGenerator = function({title, id, parentId, parentAction, action}) {
    return chrome.contextMenus.create({
        title: title,
        id: id,
        parentId: parentId || "parent",
        contexts: contexts,
        onclick: function (info, tab) {
            chrome.tabs.sendMessage(tab.id, {
                event: "write",
                value: faker[parentAction][action]()
            });
        }
    });
};

/**
 * Create a simple menu.
 *
 * @param title
 * @param id
 * @param parentId
 * @returns {any}
 */
const createSimpleMenu = function({title, id, parentId}) {
    return chrome.contextMenus.create({
        title: title,
        id: id,
        parentId: parentId || "parent"
    });
};

chrome.contextMenus.create({
    "title": "Faker",
    "id": "parent",
    "contexts": contexts
});