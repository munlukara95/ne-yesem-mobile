import AsyncStorage from '@react-native-async-storage/async-storage';
import CryptoUtil from "../util/crypto-util";

const uuidRegex = new RegExp("[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}");

/**
 *
 * @param meal<{beginning: string, main: string, sides: [string]}>
 * @returns {Promise<void>}
 */
export async function addMeal(meal){
    const mealKey = CryptoUtil.createUUID();
    meal['isUsed'] = false;
    meal['id'] = mealKey;
    const mealStr = JSON.stringify(meal);
    try{
        await AsyncStorage.setItem(mealKey, mealStr);
    }catch(err){
        console.error('Got error while adding meal ', err);
    }
}

/**
 *
 * @returns {Promise<[{id: string, beginning: string, main: string, sides: [string], isUsed: boolean}]>}
 */
export async function findAllMeal(){
    const keys = await getAllKeys();
    let meals = [];
    try{
        meals = await AsyncStorage.multiGet(keys);
    }catch(err){
        console.error('Got error while getting all meals ', err);
    }

    return meals.map(meal => JSON.parse(meal[1]));
}

/**
 *
 * @param id
 * @param newValue
 * @returns {Promise<void>}
 */
export async function updateMeal(id: string, newValue: JSON){
    const mealStr = JSON.stringify(newValue);
    try{
        await AsyncStorage.mergeItem(id, mealStr);
    }catch(err){
        console.error('Got error while updating meal ', err);
    }
}

/**
 *
 * @param id
 * @returns {Promise<void>}
 */
export async function removeMeal(id: string){
    try{
        await AsyncStorage.removeItem(id);
    }catch(err){
        console.error('Got error while removing meal ', err);
    }
}

/**
 *
 * @returns {Promise<void>}
 */
export async function clearAllMeal () {
    try {
        await AsyncStorage.clear()
    } catch(e) {
        console.error('Got error while clearing all meal data');
    }
}

export async function getRandomShuffledMeal() {
    let meals = await findAllMeal();
    let neverUsedMeals = meals.filter(meal => meal.isUsed === false);

    if(neverUsedMeals.length === 0){
        await meals.forEach(el => {
            const newEl = {...el, isUsed: false};
            updateMeal(el.id, newEl);
        });
        meals = await findAllMeal();
        neverUsedMeals = meals.filter(meal => meal.isUsed === false);
    }

    const randomNumber = Math.floor(Math.random() * neverUsedMeals.length);
    return neverUsedMeals[randomNumber];
}

async function getAllKeys(){
    let keys = []
    try {
        keys = await AsyncStorage.getAllKeys()
    } catch(err) {
        console.error('Got error while getting all keys ', err);
    }

    return keys.filter(val => uuidRegex.test(val));
}
