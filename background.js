chrome.action.onClicked.addListener(() => {
    // URL of your React app (adjust this with your live site URL or local development server)
    const url = 'http://localhost:3000';  // Change this to your app URL
    chrome.tabs.create({ url: url });
  });