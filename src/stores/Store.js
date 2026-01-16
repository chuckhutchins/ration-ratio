import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

/**
 * Pinia store for managing food list and calculation mode state
 * @returns {Object} Store instance with state and actions
 */
export const useStore = defineStore('store', () => {
  // State
  const isReverse = ref(false);
  const foodList = ref([]);

  // Getters
  const hasFoodItems = computed(() => foodList.value.length > 0);
  const foodListLength = computed(() => foodList.value.length);

  // Actions
  /**
   * Adds a food item to the list
   * @param {Object} item - Food item object with id, name, calories, fats, carbs, proteins
   * @returns {void}
   */
  const addFoodItem = (item) => {
    if (!item || !item.id) {
      console.warn('addFoodItem: Invalid item provided', item);
      return;
    }
    foodList.value.push(item);
  };

  /**
   * Removes a food item from the list by ID
   * @param {string} id - Unique identifier of the food item to remove
   * @returns {boolean} True if item was found and removed, false otherwise
   */
  const removeFoodItem = (id) => {
    const foundIndex = foodList.value.findIndex((item) => item.id === id);
    if (foundIndex === -1) {
      return false;
    }
    foodList.value.splice(foundIndex, 1);
    return true;
  };

  /**
   * Clears all food items from the list
   * @returns {void}
   */
  const resetFoodList = () => {
    foodList.value = [];
  };

  return {
    // State
    foodList,
    isReverse,
    // Getters
    hasFoodItems,
    foodListLength,
    // Actions
    addFoodItem,
    removeFoodItem,
    resetFoodList,
  };
});
