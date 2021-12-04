// TODO: This is just a placeholder. Do the preprocessing of the reviews here.
let review_tags = ["placeholder", "tags", "placeholder", "tags", "placeholder", "tags", "placeholder", "tags", "placeholder"];

chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({ tags: review_tags },
        function() {
            console.log(`[INFO][background.js] tags for this web page now set to ${review_tags}`);
        });
});

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        let page_url = request.url
        console.log(typeof page_url)
        fetch("http://127.0.0.1:5000/get_url", {
            method : 'POST',
            mode : 'cors',
            body: JSON.stringify({
                'page_url': page_url
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(response => console.log('Success:', response.status))
        .catch(error => console.error('Error:', error));

        sendResponse({status: "Got url in the backend"});
    }
);