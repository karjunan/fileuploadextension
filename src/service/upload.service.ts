export async function uploadFileAPI(
  fileString: string
): Promise<{ isError: boolean; data: any }> {
  try {
    console.log(fileString);
    const URL = 'http://localhost:8081/blob/write';
    const response = await fetch(URL, {
      method: "post",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: fileString
  });
    console.log(response);
    return { isError: false, data: response };
  } catch (e) {
    return { isError: false, data: null };
  }
}
