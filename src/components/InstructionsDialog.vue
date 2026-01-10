<template>
  <TheDialog ref="dialog">
    <template v-slot:header>
      <h2>instructions</h2>
    </template>
    <h3>level 1</h3>
    <p>some basic peanut butter has the following nutrition information per serving: 32g amount, 190 calories, 16g fat, 6g carbs, and 7g protein (32g 190/16/6/7). but you ate 70g of peanut butter. this tool helps you figure out the macros for the amount you ate (72g 593.8/50.0/18.8/21.9).</p>
    <h3>level 2</h3>
    <p>you can build up individual ingredients to figure out totals for the entire meal. maybe you had a peanut butter and jelly sandwich. you can add the peanut butter amounts (32g 190/16/6/7) and hit save. add the jelly amounts (36g 70/0/16/0) and hit save. and finally add the bread amounts (60g 160/0/32/6) and hit save. you can quickly tabulate the macros for the entire pb&amp;j (420/16/54/13).</p>
    <h3>level 3</h3>
    <p>you can click the reverse checkbox in the header to put in the overall totals you built. let's say i made a big batch of oatmeal from a recipe. after adding up all the amounts of the different ingredients, the oatmeal has the following macros: 1050 calories, 53g fat, 135g carbs, and 15g protein. but this is the the entire batch. how do we turn this into individual servings?</p>
    <p>since there is a variable amount of weight added during cooking (from water either soaking into things or evaporating out of ingredients), you can't just build out what a single serving looks like. you need to first weigh the entire output. for this batch of oatmeal, it ended up at 1672g. now that you have the total weight, calories, fats, carbs, and proteins, you can pick a serving size weight (for me it is 250g), and it will give you the macros for your desired serving size (157.0/7.9/20.2/2.2).</p>
  </TheDialog>
</template>

<script setup>
import { useTemplateRef } from 'vue';
import TheDialog from '@/components/TheDialog.vue';

const dialogRef = useTemplateRef('dialog');

const openDialog = () => {
  dialogRef.value.openDialog();
};

defineExpose({ openDialog });
</script>
