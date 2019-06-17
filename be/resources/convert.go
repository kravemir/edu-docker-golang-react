package resources

import (
	. "todo-be/dto"
	. "todo-be/model"
)

func todoToDto(m TodoModel) TodoDto {
	var listId *uint = nil
	if m.ListID != 0 {
		listId = &m.ListID
	}

	return TodoDto{
		ID:      m.ID,
		Title:   m.Title,
		Content: m.Content,
		ListID:  listId,
	}
}

func listToDto(m ListModel) ListDto {
	return ListDto{
		ID:   m.ID,
		Name: m.Name,
	}
}
