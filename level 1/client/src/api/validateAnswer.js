async function validateAnswerAPI(
  questionId,
  answer,
  handleResponse,
  handleError,
  setLoading
) {
  setLoading(true);
  try {
    const baseURL = import.meta.env.VITE_APP_API_BASE_URL;
    const endpoint = `/api/v1/question/validate-answer`;

    const url = new URL(endpoint, baseURL);

    const requestBody = JSON.stringify({
      id: questionId,
      answer,
    });

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: requestBody,
    };

    const response = await fetch(url, requestOptions);

    const jsonData = await response.json();

    if (!response.ok) {
      const errorMessage = jsonData.message || "Unknown Error Occurred";
      throw new Error(errorMessage);
    }

    handleResponse(jsonData);
  } catch (error) {
    handleError(error);
  } finally {
    setLoading(false);
  }
}

export default validateAnswerAPI;
