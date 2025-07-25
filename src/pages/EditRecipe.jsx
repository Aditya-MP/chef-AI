import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getRecipeById, updateRecipe } from '../api/api';
import { useAuth } from '../context/AuthContext';

export default function EditRecipe() {
  const { id } = useParams();
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        setLoading(true);
        const response = await getRecipeById(id);
        
        // Check if current user is the creator
        if (response.data.createdBy._id !== currentUser?._id) {
          navigate('/');
          return;
        }
        
        setFormData({
          ...response.data,
          tags: response.data.tags?.join(', ') || ''
        });
      } catch (err) {
        setError('Failed to fetch recipe details');
      } finally {
        setLoading(false);
      }
    };
    
    fetchRecipe();
  }, [id, currentUser, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleIngredientChange = (index, e) => {
    const { name, value } = e.target;
    const ingredients = [...formData.ingredients];
    ingredients[index][name] = value;
    setFormData({ ...formData, ingredients });
  };

  const addIngredient = () => {
    setFormData({
      ...formData,
      ingredients: [...formData.ingredients, { name: '', quantity: '' }]
    });
  };

  const removeIngredient = (index) => {
    const ingredients = formData.ingredients.filter((_, i) => i !== index);
    setFormData({ ...formData, ingredients });
  };

  const handleInstructionChange = (index, e) => {
    const instructions = [...formData.instructions];
    instructions[index] = e.target.value;
    setFormData({ ...formData, instructions });
  };

  const addInstruction = () => {
    setFormData({
      ...formData,
      instructions: [...formData.instructions, '']
    });
  };

  const removeInstruction = (index) => {
    const instructions = formData.instructions.filter((_, i) => i !== index);
    setFormData({ ...formData, instructions });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      // Process tags
      const tags = formData.tags 
        ? formData.tags.split(',').map(tag => tag.trim())
        : [];
      
      const recipeData = {
        ...formData,
        tags
      };
      
      await updateRecipe(id, recipeData);
      navigate(`/recipe/${id}`);
    } catch (err) {
      setError('Failed to update recipe: ' + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!formData) {
    return (
      <div className="max-w-4xl mx-auto p-4">
        <p>Recipe not found or you don't have permission to edit it.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Edit Recipe</h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Recipe Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="3"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-medium text-gray-700">
              Ingredients
            </label>
            <button
              type="button"
              onClick={addIngredient}
              className="text-sm bg-blue-500 text-white px-2 py-1 rounded"
            >
              + Add Ingredient
            </button>
          </div>
          
          {formData.ingredients.map((ingredient, index) => (
            <div key={index} className="grid grid-cols-12 gap-2 mb-2">
              <div className="col-span-5">
                <input
                  type="text"
                  name="name"
                  placeholder="Ingredient"
                  value={ingredient.name}
                  onChange={(e) => handleIngredientChange(index, e)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div className="col-span-5">
                <input
                  type="text"
                  name="quantity"
                  placeholder="Quantity"
                  value={ingredient.quantity}
                  onChange={(e) => handleIngredientChange(index, e)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div className="col-span-2">
                <button
                  type="button"
                  onClick={() => removeIngredient(index)}
                  className="w-full bg-red-500 text-white px-3 py-2 rounded-md"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-medium text-gray-700">
              Instructions
            </label>
            <button
              type="button"
              onClick={addInstruction}
              className="text-sm bg-blue-500 text-white px-2 py-1 rounded"
            >
              + Add Step
            </button>
          </div>
          
          {formData.instructions.map((instruction, index) => (
            <div key={index} className="mb-2">
              <div className="flex items-start">
                <span className="mr-2 mt-3 font-bold">{index + 1}.</span>
                <textarea
                  value={instruction}
                  onChange={(e) => handleInstructionChange(index, e)}
                  rows="2"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                />
                <button
                  type="button"
                  onClick={() => removeInstruction(index)}
                  className="ml-2 bg-red-500 text-white px-3 py-2 rounded-md mt-0.5"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="prepTime" className="block text-sm font-medium text-gray-700 mb-1">
              Prep Time (minutes)
            </label>
            <input
              type="number"
              id="prepTime"
              name="prepTime"
              value={formData.prepTime}
              onChange={handleChange}
              min="1"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          
          <div>
            <label htmlFor="cookTime" className="block text-sm font-medium text-gray-700 mb-1">
              Cook Time (minutes)
            </label>
            <input
              type="number"
              id="cookTime"
              name="cookTime"
              value={formData.cookTime}
              onChange={handleChange}
              min="1"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          
          <div>
            <label htmlFor="servings" className="block text-sm font-medium text-gray-700 mb-1">
              Servings
            </label>
            <input
              type="number"
              id="servings"
              name="servings"
              value={formData.servings}
              onChange={handleChange}
              min="1"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
        </div>
        
        <div>
          <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-1">
            Tags (comma separated)
          </label>
          <input
            type="text"
            id="tags"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            placeholder="e.g., vegan, quick, dessert"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-green-600 text-white font-medium rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:bg-gray-400"
          >
            {loading ? 'Updating...' : 'Update Recipe'}
          </button>
        </div>
      </form>
    </div>
  );
}
