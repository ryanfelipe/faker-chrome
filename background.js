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
        parentId: parentId || "parent",
        contexts: contexts
    });
};

/**
 * Load all items.
 *
 * @param items
 * @param parent
 */
const loadAllItems = function(items, parent) {
    items.map(function (item) {
        if (item.children) {
            createSimpleMenu({
                title: item.title,
                id: item.id,
                parentId: item.parentId || parent
            });

            loadAllItems(item.children, item.id);
            return item;
        }

        createSimpleGenerator({
            title: item.title,
            id: item.id,
            parentId: item.parentId || parent,
            parentAction: item.parentAction,
            action: item.action
        })
    });
};

chrome.contextMenus.create({
    "title": "Faker",
    "id": "parent",
    "contexts": contexts
});

var xhr = new XMLHttpRequest;
xhr.open("GET", chrome.runtime.getURL("contextMenus.json"));
xhr.onreadystatechange = function() {
    if (this.readyState == 4) {
        loadAllItems(JSON.parse(xhr.responseText));
    }
};
xhr.send();