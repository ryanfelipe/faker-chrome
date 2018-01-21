const contexts = [
    "editable"
];

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

chrome.contextMenus.create({
    "title": "Faker",
    "id": "parent",
    "contexts": contexts
});