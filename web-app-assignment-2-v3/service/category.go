package service

import (
	"a21hc3NpZ25tZW50/model"
	repo "a21hc3NpZ25tZW50/repository"
	"fmt"
)

type CategoryService interface {
	Store(category *model.Category) error
	Update(id int, category model.Category) error
	Delete(id int) error
	GetByID(id int) (*model.Category, error)
	GetList() ([]model.Category, error)
}

type categoryService struct {
	categoryRepository repo.CategoryRepository
}

func NewCategoryService(categoryRepository repo.CategoryRepository) CategoryService {
	return &categoryService{categoryRepository}
}

func (c *categoryService) Store(category *model.Category) error {
	err := c.categoryRepository.Store(category)
	if err != nil {
		return err
	}

	return nil
}

func (c *categoryService) Update(id int, category model.Category) error {
	
	existingCategory, err := c.categoryRepository.GetByID(id)
	if err != nil {
		return fmt.Errorf("category not found")
	}

	
	existingCategory.Name = category.Name
	err = c.categoryRepository.Update(id, *existingCategory)
	if err != nil {
		return fmt.Errorf("failed to update category: %v", err)
	}
	return nil
}

func (c *categoryService) Delete(id int) error {
	_, err := c.categoryRepository.GetByID(id)
	if err != nil {
		return fmt.Errorf("category with ID %d not found", id)
	}

	err = c.categoryRepository.Delete(id)
	if err != nil {
		return fmt.Errorf("failed to delete category: %v", err)
	}
	return nil
}

func (c *categoryService) GetByID(id int) (*model.Category, error) {
	category, err := c.categoryRepository.GetByID(id)
	if err != nil {
		return nil, err
	}

	return category, nil
}

func (c *categoryService) GetList() ([]model.Category, error) {

    categories, err := c.categoryRepository.GetList()
    if err != nil {
	    return nil, err
    }
	
    return categories, nil  
}
