const createURL = (path) => {
  console.log(path, "PATH");
  return window.location.origin + path;
};

export const updatedEntry = async (id, content) => {
  const res = await fetch(
    new Request(createURL(`/api/journal/${id}`), {
      method: "PATCH",
      body: JSON.stringify({ content }),
    })
  );
  if (res.ok) {
    const data = await res.json();
    return data.data;
  }
  //when error- return error: true
};

export const createNewEntry = async () => {
  const res = await fetch(
    new Request(createURL("/api/journal"), {
      method: "POST",
    })
  );
  if (res.ok) {
    const data = await res.json();
    return data.data;
  } else {
    console.error("Failed to create entry:", res.status, res.statusText);
  }
};

export const askQuestion = async (question) => {
  console.log(question, "QUESTION")
  const res = await fetch(
    new Request(createURL("/api/question"), {
        method: "POST",
        body: JSON.stringify({ question }),
    })
  );
  if (res.ok) {
    const data = await res.json();
    return data.data;
  } else {
    console.error("Failed to ask question:", res.status, res.statusText);
  }
};


//if you send a body JSON.stringify({})
