const defaultUrl = "http://localhost:8000";

export const urlCheck = async (url = defaultUrl) => {
  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      localStorage.setItem('data', JSON.stringify(data));
      console.log("Success: Data fetched and saved to local storage.");
    } else {
      throw new Error("Fetch failed at initial URL.");
    }
  } catch (error) {
    console.log("First fetch failed. Adding /docs to URL");
    try {
      const newUrl = url + "/docs";
      const response = await fetch(newUrl);
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('data', JSON.stringify(data));
        console.log("Success: Data fetched from /docs and saved to local storage.");
      } else {
        throw new Error("Fetch failed at /docs URL.");
      }
    } catch (error) {
      console.log("Second fetch failed. Adding /api to URL");
      try {
        const newUrl = url + "/api";
        const response = await fetch(newUrl);
        if (response.ok) {
          const data = await response.json();
          localStorage.setItem('data', JSON.stringify(data));
          console.log("Success: Data fetched from /api and saved to local storage.");
        } else {
          throw new Error("Fetch failed at /api URL.");
        }
      } catch (error) {
        console.log("Third fetch failed. Checking local storage");
        const storedData = localStorage.getItem('data');
        if (storedData) {
          console.log("Data loaded from local storage. You are working offline.");
        } else {
          console.log("Fourth failed. Local storage empty. Loading component to have user point to URL or upload file");
          // Load component for URL or file upload
          // This part of the code will depend on your UI framework
          // Example: loadComponentForUploadOrURL();
        }
      }
    }
  }
};
