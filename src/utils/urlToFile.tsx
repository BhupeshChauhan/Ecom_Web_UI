export async function urlToFile(url, fileName) {
  try {
    // Fetch the content from the URL
    const response = await fetch(url);

    // Check if the response is OK
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // Convert the response to a Blob
    const blob = await response.blob();

    // Create a File object from the Blob
    const file = new File([blob], fileName, { type: blob.type });

    return file;
  } catch (error) {
    console.error("Failed to convert URL to File:", error);
  }
}
