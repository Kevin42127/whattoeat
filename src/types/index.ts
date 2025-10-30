// 美食類型定義
export interface Food {
  id: string;
  name: string;
  category: FoodCategory;
  price: PriceRange;
  mealTime: MealTime;
  description: string;
  tags: string[];
  isFavorite?: boolean;
  createdAt: Date;
}

// 美食分類
export type FoodCategory = 
  | 'chinese'      // 中式
  | 'western'      // 西式
  | 'japanese'     // 日式
  | 'korean'       // 韓式
  | 'thai'         // 泰式
  | 'vietnamese'   // 越式
  | 'indian'       // 印度菜
  | 'italian'      // 義式
  | 'mexican'      // 墨西哥菜
  | 'snacks'       // 小吃
  | 'desserts'     // 甜點
  | 'beverages'    // 飲品
  | 'fastfood'     // 速食
  | 'healthy';     // 健康餐

// 價格區間
export type PriceRange = 
  | 'budget'       // 平價 (< $100)
  | 'moderate'     // 中等 ($100-300)
  | 'premium'      // 高級 ($300-500)
  | 'luxury';      // 奢華 (> $500)

// 用餐時間
export type MealTime = 
  | 'breakfast'    // 早餐
  | 'lunch'        // 午餐
  | 'dinner'       // 晚餐
  | 'snack'        // 點心
  | 'anytime';     // 隨時

// 篩選條件
export interface FilterOptions {
  categories: FoodCategory[];
  priceRanges: PriceRange[];
  mealTimes: MealTime[];
}

// 抽選結果
export interface DrawResult {
  food: Food;
  timestamp: Date;
}
