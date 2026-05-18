package repository

import (
	"a21hc3NpZ25tZW50/db/filebased"
	"a21hc3NpZ25tZW50/model"
	"fmt"
)

type TaskRepository interface {
	Store(task *model.Task) error
	Update(task *model.Task) error
	Delete(id int) error
	GetByID(id int) (*model.Task, error)
	GetList() ([]model.Task, error)
	GetTaskCategory(id int) ([]model.TaskCategory, error)
}

type taskRepository struct {
	filebased *filebased.Data
}

func NewTaskRepo(filebasedDb *filebased.Data) *taskRepository {
	return &taskRepository{
		filebased: filebasedDb,
	}
}

func (t *taskRepository) Store(task *model.Task) error {
	t.filebased.StoreTask(*task)

	return nil
}

func (t *taskRepository) Update(task *model.Task) error {
	
	err := t.filebased.UpdateTask(task.ID, *task)
	if err != nil {
		return fmt.Errorf("failed to update task: %v", err)
	}
   
	return nil 
}

func (t *taskRepository) Delete(id int) error {
	err := t.filebased.DeleteTask(id)
	if err != nil {
		return err 
	}
	return nil 
}

func (t *taskRepository) GetByID(id int) (*model.Task, error) {
	tasks, err := t.filebased.GetTasks()
    if err != nil {
        return nil, fmt.Errorf("failed to retrieve tasks: %v", err)
    }

    for _, task := range tasks {
        if task.ID == id {
            return &task, nil
        }
    }

    
    return nil, fmt.Errorf("record not found")
}

func (t *taskRepository) GetList() ([]model.Task, error) {
	
	
	tasks, err := t.filebased.GetTasks()
	if err != nil {
		return nil, fmt.Errorf("failed to retrieve task list: %v", err)
	}

	return tasks, nil 
}

func (t *taskRepository) GetTaskCategory(id int) ([]model.TaskCategory, error) {
	
	category, err := t.filebased.GetCategoryByID(id)
	if err != nil {
		return nil, fmt.Errorf("failed to get category with ID %d: %v", id, err)
	}
	
	tasks, err := t.filebased.GetTasks()
	if err != nil {
		return nil, fmt.Errorf("failed to get tasks: %v", err)
	}

	
	var taskCategories []model.TaskCategory
	for _, task := range tasks {
		if task.CategoryID == id {
			taskCategory := model.TaskCategory{
				ID:       task.ID,
				Title:    task.Title,
				Category: category.Name, 
			}
			taskCategories = append(taskCategories, taskCategory)
		}
	}

	if len(taskCategories) == 0 {
		return nil, fmt.Errorf("no tasks found for category ID %d", id)
	}

	return taskCategories, nil 
}
