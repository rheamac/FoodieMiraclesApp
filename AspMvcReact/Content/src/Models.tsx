export interface FoodModel {
    Id: number;
    Name: string;
    Description: string;
    Picture: string;
    Price: number;
    Quantity: number;  
}

export interface IAppState {
    items: FoodModel[];
    myOrder: FoodModel[];
    showPopup: boolean;
    userId: number;
    orderPlaced: boolean;
}