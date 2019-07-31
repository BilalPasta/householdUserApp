
var initial_state={
    CategoryWithMenu:[],
    selectedItems:[],
    CurrentUser:null,
    TotalAmount:0,
    riders:[],
    users:[]
}

export const App=(state=initial_state,action)=>{
    switch(action.type){
        

case 'Get_App_Menu':
return{...state,CategoryWithMenu:[...action.payload]}
case 'Add_Item_Into_Cart':
state.CategoryWithMenu[action.Indexes.categoryindex].
subcategoryitemlist[action.Indexes.subcategoryindex].
itemlist[action.Indexes.itemindex].cartstatus=true;
TotalAmount=state.TotalAmount+state.CategoryWithMenu[action.Indexes.categoryindex].
subcategoryitemlist[action.Indexes.subcategoryindex].
itemlist[action.Indexes.itemindex].itemprice;


let Menu=state.CategoryWithMenu;
let items;
items=state.selectedItems;
items.push(action.payload)



return{...state,selectedItems:[...items],CategoryWithMenu:[...Menu],TotalAmount:TotalAmount}
case 'Riders':
return{
    ...state,riders:[...action.payload]

}

case 'Users':
return{
    ...state,users:[...action.payload]

}
case 'Increment_CartItem_Count':

let updateselectitems=state.selectedItems;
updateselectitems[action.payload].count++;
TotalAmount=state.TotalAmount+updateselectitems[action.payload].itemdetails.itemprice;
return{...state,selectedItems:[...updateselectitems],TotalAmount:TotalAmount}
case 'Current_User':
return{...state,CurrentUser:{...action.payload}}
case 'Remove_Item_Into_Cart':


let CategoryWithMenu=state.CategoryWithMenu;

let selectedItems=JSON.stringify(state.selectedItems);
let data=JSON.stringify(action.payload);
let index=selectedItems.indexOf(data);
selectedItems=JSON.parse(selectedItems);
selectedItems.splice(index,1);
selectedItems.splice(action.payload,1);

return{...state,selectedItems:[...selectedItems],CategoryWithMenu:[...CategoryWithMenu]}

case 'abc':
return{...state}
case 'Decrement_CartItem_Count':
updateselectitems=state.selectedItems;
TotalAmount=state.TotalAmount-updateselectitems[action.payload].itemdetails.itemprice;
updateselectitems[action.payload].count<=1?(updateselectitems.splice(action.payload,1)):(updateselectitems[action.payload].count--)
return {...state,selectedItems:[...updateselectitems],TotalAmount:TotalAmount};
default :
return state;
    }
}

