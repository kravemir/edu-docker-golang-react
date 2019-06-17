package dto

type TodoDto struct {
	ID      uint
	Title   string
	Content string
	ListID  *uint
}

type ListDto struct {
	ID   uint
	Name string
}
