package main

type todoDto struct {
	ID      uint
	Title   string
	Content string
	ListID  *uint
}

type listDto struct {
	ID   uint
	Name string
}
