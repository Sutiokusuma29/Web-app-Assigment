package repository

import (
	"encoding/json"
	"a21hc3NpZ25tZW50/db/filebased"
	"a21hc3NpZ25tZW50/model"
	"fmt"

	"go.etcd.io/bbolt"
	
)

type UserRepository interface {
	GetUserByEmail(email string) (model.User, error)
	CreateUser(user model.User) (model.User, error)
	GetUserTaskCategory() ([]model.UserTaskCategory, error)
}

type userRepository struct {
	filebasedDb *filebased.Data
}

func NewUserRepo(filebasedDb *filebased.Data) *userRepository {
	return &userRepository{filebasedDb}
}

func (r *userRepository) GetUserByEmail(email string) (model.User, error) {
	var user model.User
	found := false

	err := r.filebasedDb.DB.View(func(tx *bbolt.Tx) error {
		bucket := tx.Bucket([]byte("Users"))
		if bucket == nil {
			return fmt.Errorf("users bucket not found")
		}

		cursor := bucket.Cursor()
		for k, v := cursor.First(); k != nil; k, v = cursor.Next() {
			var u model.User
			if err := json.Unmarshal(v, &u); err != nil {
				continue 
			}
			if u.Email == email {
				user = u
				found = true
				break
			}
		}
		return nil
	})

	if err != nil {
		return model.User{}, err 
	}

	if !found {
		return model.User{}, nil 
	}

	return user, nil 
}

func (r *userRepository) CreateUser(user model.User) (model.User, error) {
	createdUser, err := r.filebasedDb.CreateUser(user)

	if err != nil {
		return model.User{}, err
	}

	return createdUser, nil
}


func (r *userRepository) GetUserTaskCategory() ([]model.UserTaskCategory, error) {
		var userTaskCategories []model.UserTaskCategory
	
		
		err := r.filebasedDb.DB.View(func(tx *bbolt.Tx) error {

			userBucket := tx.Bucket([]byte("Users"))
			if userBucket == nil {
				return fmt.Errorf("users bucket not found")
			}
	
			
			taskBucket := tx.Bucket([]byte("Tasks"))
			if taskBucket == nil {
				return fmt.Errorf("tasks bucket not found")
			}
	
			
			categoryBucket := tx.Bucket([]byte("Categories"))
			if categoryBucket == nil {
				return fmt.Errorf("categories bucket not found")
			}
	
			
			err := userBucket.ForEach(func(_, userValue []byte) error {
				var user model.User
				
				if err := json.Unmarshal(userValue, &user); err != nil {
					return fmt.Errorf("failed to unmarshal user: %w", err)
				}
	
				
				err := taskBucket.ForEach(func(_, taskValue []byte) error {
					var task model.Task
					
					if err := json.Unmarshal(taskValue, &task); err != nil {
						return fmt.Errorf("failed to unmarshal task: %w", err)
					}
	
					
					if task.UserID == user.ID {
						
						categoryValue := categoryBucket.Get([]byte(fmt.Sprintf("%d", task.CategoryID)))
						var category model.Category
						if categoryValue != nil {
							if err := json.Unmarshal(categoryValue, &category); err != nil {
								return fmt.Errorf("failed to unmarshal category: %w", err)
							}
						}
	
						
						userTaskCategories = append(userTaskCategories, model.UserTaskCategory{
							ID:       int(user.ID),
							Fullname: user.Fullname,
							Email:    user.Email,
							Task:     task.Title,
							Deadline: task.Deadline,
							Priority: task.Priority,
							Status:   task.Status,
							Category: category.Name,
						})
					}
	
					return nil
				})
				return err
			})
			return err
		})
	
		if err != nil {
			return nil, fmt.Errorf("failed to get user task categories: %w", err)
		}
	
		return userTaskCategories, nil
	}
	