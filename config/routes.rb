Rails.application.routes.draw do
  root 'commuters#new'
  resources :commuters

end
