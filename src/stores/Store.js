import { defineStore } from 'pinia';

export const useStore = defineStore('store', {
  state: () => ({
    isReverse: false,
    foodList: [],
  }),
  actions: {
    removeFoodItem(id) {
      const foundIndex = this.foodList.findIndex((item) => item.id === id);
      if (foundIndex === -1) {
        return;
      }
      this.foodList.splice(foundIndex, 1);
    },
    resetFoodList() {
      this.foodList = [];
    },
  },
});
