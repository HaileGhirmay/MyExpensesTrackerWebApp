import "./NewExpense.css";
import ExpenseForm from "./ExpenseForm";
import React, { useState } from "react";

const NewExpense = (props) => {

  const [isEditing, setIsEditing] = useState(false);

  const saveExpenseDataHandler = (enteredExpenseData) => {     //the parmater in this function will recieve the value passed by the ExpeseForm.
    const expenseData = {  //this is new object based on the expense data object created in the ExpenseForm.js which is passed to here as an arugment.
      ...enteredExpenseData,
      id: Math.random().toString(),
    };
    props.onAddExpense(expenseData);  //this will pass data back to the parent as a function argument.
    setIsEditing(false);
  };


  const startEditingHandler = () => {
    setIsEditing(true);
  };

  const stopEditingHandler = () => {
    setIsEditing(false);
  };

  return (
    <div className="new-expense">
      {!isEditing && (
        <button onClick={startEditingHandler}>Add New Expense</button>
      )}
      
      {isEditing && (
        <ExpenseForm
          onSaveExpenseData={saveExpenseDataHandler}         //here the onSaveExpeseData will be passed as prop to the ExpenseForm, so that it will send back the EXpensedData to its method handler in ths component which is the {saveExpenseDataHandler} mehtod.
          onCancel={stopEditingHandler}                      //generally you should note the that the function is finally executed in the ExpenseForm  and returns the necessary data back to this component particularly the saveExpenseDataHandler.
        />
      )}
    </div>
  );
};
export default NewExpense;     
