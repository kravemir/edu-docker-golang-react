export const listToModel = list => ({
  id: list.ID,
  name: list.Name
});

export const listToDto = list => ({
  ID: list.id,
  Name: list.name
});

export const todoToModel = todo => ({
  id: todo.ID,
  content: todo.Content,
  listId: todo.ListID
});

export const todoToDto = todo => ({
  ID: todo.id,
  Content: todo.content,
  ListID: todo.listId
});
