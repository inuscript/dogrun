"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const reselect_1 = require("reselect");
// const itemSumPrice = createSelector<State, number[], number>( 
//   (state) => state.items.map( item => item.price),
//   (prices) => {
//     return prices.reduce( (a, b) => a + b, 0)
//   }
// )
// const itemSumPrice = createSelector( 
//   (state : State) => state.items.map( item => item.price),
//   (prices) => {
//     return prices.reduce( (a, b) => a + b, 0)
//   }
// )
// const itemSumPrice = createSelector( 
//   (state: any) : number[] => state.items.map( item => item.price),
//   (prices) : number => {
//     return prices.reduce( (a, b) => a + b, 0)
//   }
// )
// const itemSumPrice = createSelector<State, number[], string, number,string>( 
//   (state) => state.items.map( item => item.price),
//   (state) => state.unit,
//   (state) => state.tax,
//   (prices, unit, tax) => {
//     return `${prices.reduce( (a, b) => a + b, 0)  * tax} ${unit}`
//   }
// )
const itemSumPrice = reselect_1.createSelector((state) => state.items.map(item => item.price), (state) => state.unit, (state) => state.tax, (prices, unit, tax) => {
    return `${prices.reduce((a, b) => a + b, 0) * tax} ${unit}`;
});
// const itemSumPrice = createSelector( 
//   (state: any): number[] => state.items.map( item => item.price),
//   (state: any): string => state.unit,
//   (state: any): number => state.tax,
//   (prices, unit, tax): string => {
//     return `${prices.reduce( (a, b) => a + b, 0)  * tax} ${unit}`
//   }
// )
// const invalidCreator= createSelector( 
//   (state: number): number => state,
//   (state: string): string => state,
//   (item1, item2): string => {
//     return `${item1} ${item2}`
//   }
// )
